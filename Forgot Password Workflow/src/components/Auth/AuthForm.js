import { useState, useRef, useContext, } from 'react';

import AuthContext from '../../Store/AuthContext'
import classes from './AuthForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef= useRef();
  const navigate = useNavigate()
  let content ;

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setisFormValid] = useState(false);
  const [error , setError]=useState()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2=confirmPasswordInputRef.current.value;

    if ( enteredEmail && enteredPassword && enteredPassword2 && enteredPassword === enteredPassword2 ){
      setisFormValid(true)
      
    }else {
      if (enteredPassword !== enteredPassword2 ){
        setError('Both Passwaord Must Be Match')
        console.log("jkkhnot")
      }
      else {
        setError('All Fields Are Required')
        console.log("jkkh")
      }
      return;
    }


    setIsLoading(true);
    let url;
    if (isLogin && isFormValid) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBS8czfYR6fVHclpZF1rBED6NjtXlKSz2I';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBS8czfYR6fVHclpZF1rBED6NjtXlKSz2I';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
       // navigate('/')
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      { !authCtx.isLoggedIn &&  <div>
      {error && <p style={{color:'red',textAlign:'start'}} >*{error}</p>}
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          {!isLogin && <div><label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          /> </div>}
          {isLogin && <div><label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          /><label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            required
            ref={confirmPasswordInputRef}
          /> </div>}
        </div>
        <div className={classes.forget}>
        <Link to='/forget-password'>Forget Passwaord?</Link>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Have an account? Login'}
          </button>
        </div>
      </form>
      </div>}
      {authCtx.isLoggedIn && <VerifyEmail></VerifyEmail> }
      
    </section>
  );
};

export default AuthForm;
import './ForgetPassward.css'
import AuthContext from '../../Store/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useContext, useRef } from 'react'

const ForgetPassward = ()=>{
    const authCtx = useContext(AuthContext)
    const navigate= useNavigate()
    const emailInputRef= useRef()

    const passwordHandler = ()=>{
        const enteredEmail=emailInputRef.current.value;
        try {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBS8czfYR6fVHclpZF1rBED6NjtXlKSz2I', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredEmail,
              }),
            })
              .then((res) => {
                if (res.ok) {
                  alert('Password reset link sent to your email');
                  navigate('/auth');
                } else {
                  throw new Error('Error sending password reset link');
                }
              })
              .catch((error) => {
                console.log(error);
                alert('Enter valid email');
              });
          } catch {
            alert('Enter valid email');
          }
          
        
    }
    


    return(
        <div className='forget-password'>
            <div className="control">
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' required ref={emailInputRef} />
           </div>
            <button onClick={passwordHandler}>Send Link</button>
        </div>
    )
}

export default ForgetPassward
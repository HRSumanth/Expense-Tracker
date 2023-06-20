import './VerifyEmail.css'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = ()=>{

    const authCtx = useSelector(state=>state.auth)
    const navigate= useNavigate()

    const verifyEmailHandler = ()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBS8czfYR6fVHclpZF1rBED6NjtXlKSz2I',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:authCtx.token
          })
        }).then((res)=>{
         return res.json()
        }).then((data)=>{
          console.log(data)
          
          alert('Verification link sent to your email')
          navigate('/')
        }).catch((error)=>{
          console.log(error)
        })
    }
    


    return(
        <div className='verify-email'>
            <button onClick={verifyEmailHandler}>Verify Email</button>
        </div>
    )
}

export default VerifyEmail
import React from 'react';
import classes from './login.module.css';
import { Redirect } from 'react-router-dom';
import LoginWithFormik, { FormDataType } from './LoginWithFormik';

type PropsType = {
  captchaUrl: string | null
  isAuth: boolean 
  errorMessage: string | null
  loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}


const Login: React.FC<PropsType> = ({captchaUrl, isAuth, errorMessage, loginThunk}) => {

  const onSubmit = (formData: FormDataType) => {
    debugger
   loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (isAuth) {
    return <Redirect to={'/'} />
  } 

  return <div className={classes.login} >
    <h2>LOGIN</h2>
    <LoginWithFormik onSubmit={onSubmit} captchaUrl={captchaUrl} errorMessage={errorMessage}/>
  </div>
  }

export default Login;
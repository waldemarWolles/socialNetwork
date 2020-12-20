import React from 'react';
import classes from './login.module.css';
import { Redirect } from 'react-router-dom';
import { LoginReduxForm } from './LoginForm';
import LoginWithFormik from './LoginWithFormik';


const Login = (props) => {

  const onSubmit = (formData) => {
    props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) {
    return <Redirect to={'/'} />
  } 

  return <div className={classes.login} >
    <h2>LOGIN</h2>
    <LoginWithFormik onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
  </div>
  }

export default Login;
import React from 'react';
import classes from './login.module.css';
import { Redirect } from 'react-router-dom';
import LoginWithFormik, { FormDataType } from './LoginWithFormik';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../reduxx/auth-reducer';
import { getCaptchaUrl, getErrorMessage, getIsAuth } from '../../reduxx/auth-selectors';



export const Login: React.FC = (props) => {

  const captchaUrl = useSelector(getCaptchaUrl)
  const isAuth = useSelector(getIsAuth)
  const errorMessage = useSelector(getErrorMessage)

  const dispatch = useDispatch()



  const onSubmit = (formData: FormDataType) => {
    debugger
   dispatch(loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Redirect to={'/'} />
  } 

  return <div className={classes.login} >
    <h2>LOGIN</h2>
    <LoginWithFormik onSubmit={onSubmit} captchaUrl={captchaUrl} errorMessage={errorMessage}/>
  </div>
  }

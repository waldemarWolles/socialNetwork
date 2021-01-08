import React from 'react';
import classes from './login.module.css';
import { Redirect } from 'react-router-dom';
import LoginWithFormik, { FormDataType } from './LoginWithFormik';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../reduxx/redux-store';
import { loginThunk } from '../../reduxx/auth-reducer';



export const Login: React.FC = (props) => {

  const captchaUrl = useSelector((state: AppRootStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
  const errorMessage = useSelector((state: AppRootStateType) => state.auth.errorMessage)

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

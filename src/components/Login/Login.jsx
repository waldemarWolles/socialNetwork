import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Input, createField } from '../common/FormControls/FormControls';
import classes from './login.module.css';
import { loginThunk } from '../../reduxx/auth-reducer';
import { Redirect } from 'react-router-dom';

let maxLength30 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error}) => {
  return (
    <div backgroundColor='white'>
      <form onSubmit={handleSubmit}>
       {createField('Email', [required, maxLength30], 'email', Input)}
       {createField('Password', [required, maxLength30], 'password', Input, {type: 'password'})}
       {createField(null, [], 'checkbox', Input, {type: 'checkbox'}, 'remember me')}

        {error && <div className={classes.form_error}>
          {error}
        </div>}
        <div>
          <button>Log In</button>
        </div>
      </form>
    </div>

  );
}


const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginForm)




const Login = (props) => {

  const onSubmit = (formData) => {
    props.loginThunk(formData.email, formData.password, formData.rememberMe);
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }

  return <div className={classes.login} >
    <h2>LOGIN</h2>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>

}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, { loginThunk })(Login);
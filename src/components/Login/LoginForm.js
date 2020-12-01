import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Input, createField } from '../common/FormControls/FormControls';
import classes from './login.module.css';

let maxLength30 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
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
            {captchaUrl && <img src={captchaUrl} alt='captchaUrl'/> }
            {captchaUrl && createField('Write symbols from image', [required], 'captcha', Input)}
         
        </div>
        <div>
          <button>Log In</button>
        </div>
      </form>
    </div>

  );
}


export const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginForm)
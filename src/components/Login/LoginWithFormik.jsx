import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormControlsWithFormik from '../common/FormControls/FormControlsWithFormik';


 const LoginWithFormik = ({onSubmit, captchaUrl}) => {

  const checkboxOptions = [
    {key: ' ' , value: ' '}
   
]

  
  const initialValues = {
    email: '',
    password: '',
    rememberMe: []
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required field!'),
    password: Yup.string().required('Required field!'),
    rememberMe: Yup.array().required('Required field!'),
  });

  

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {
        formik => {
          return <Form>
            <FormControlsWithFormik control='input' type='email' name='email' placeholder='Enter your email' label='Email: free@samuraijs.com' />
            <FormControlsWithFormik control='input' type='password' name='password' placeholder='Enter your password' label='Password: free' />
            <FormControlsWithFormik control='checkbox' name='rememberMe' label='Remember me?' options={checkboxOptions} /> 
            {captchaUrl && <img src={captchaUrl} alt='captchaUrl'/> }
            {captchaUrl && <FormControlsWithFormik control='input' placeholder='Write symbols from image' name='captcha' label='Captcha'/>}
            <button type='submit' disabled={!formik.isValid}>Submit</button>
          </Form>
        }
      }
    </Formik>);
}

export default LoginWithFormik;

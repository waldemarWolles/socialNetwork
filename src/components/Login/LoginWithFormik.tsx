import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import FormControlsWithFormik from '../common/FormControls/FormControlsWithFormik'
import classes from './login.module.css'

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

type PropsType = {
  captchaUrl: string | null
  errorMessage: string | null

  onSubmit: (formData: FormDataType) => void
}

const LoginWithFormik: React.FC<PropsType> = ({
  onSubmit,
  captchaUrl,
  errorMessage,
}) => {
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field!'),
    password: Yup.string().required('Required field!'),
    rememberMe: Yup.bool(),
    captcha: Yup.string(),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormControlsWithFormik
              control="input"
              type="email"
              name="email"
              placeholder="Enter your email"
              label="Email: free@samuraijs.com"
            />
            <FormControlsWithFormik
              control="input"
              type="password"
              name="password"
              placeholder="Enter your password"
              label="Password: free"
            />
            <div className={classes.checkbox}>
              <h4>Remember me?</h4>
              <Field
                className={classes.checkbox_field}
                type="checkbox"
                name="rememberMe"
              />
            </div>
            {captchaUrl && <img src={captchaUrl} alt="captchaUrl" />}
            {captchaUrl && (
              <FormControlsWithFormik
                control="input"
                placeholder="Write symbols from image"
                name="captcha"
                label="Captcha"
              />
            )}
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
            {errorMessage}
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginWithFormik

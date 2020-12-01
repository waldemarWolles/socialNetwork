import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormControlsWithFormik from '../common/FormControls/FormControlsWithFormik';


const LoginForm = (props) => {

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string().required('Required!').email('Invalid Email Address'),
    password: Yup.string().required('Required!'),
});

const onSubmit = (values) => {
    console.log(values);
}

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return <Form>
                        <FormControlsWithFormik control='input' type='email' name='email' label='Email' />
                        <FormControlsWithFormik control='input' type='password' name='password' label='Password' />
                        <button type='submit' disabled={!formik.isValid}>Button</button>
                    </Form>
                }
            }
        </Formik>
    );
}

export default LoginForm;


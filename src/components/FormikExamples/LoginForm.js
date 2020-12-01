import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikControl from './FormikControl';
import './../App.css';
import { Button } from '@chakra-ui/react';

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
                        <FormikControl control='chackrainput' type='email' name='email' label='Email' />
                        <FormikControl control='chackrainput' type='password' name='password' label='Password' />
                        <Button colorScheme="blue" type='submit' disabled={!formik.isValid}>Button</Button>
                    </Form>
                }
            }
        </Formik>
    );
}

export default LoginForm;
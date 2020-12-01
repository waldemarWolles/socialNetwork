import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikControl from './FormikControl';
import './../App.css';

const RegistrationForm = (props) => {

    const options = [
        {key: 'Email', value: 'emailMode'},
        {key: 'Telephone', value: 'telephoneMode'},
    ]

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        modeOfContact: '',
        phone: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Formatt').required('Required!'),
        password: Yup.string().required('Required!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Required!'),
        modeOfContact: Yup.string().required('Required!'),
        phone: Yup.string().when('modeOfContact', {
            is: 'telephoneMode',
            then: Yup.string().required('Required!')
        })
    });

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return <Form>
                        <FormikControl className='input' control='input' type='email' name='email' label='Email' />
                        <FormikControl className='input' control='input' type='password' name='password' label='Password' />
                        <FormikControl className='input' control='input' type='password' name='confirmPassword' label='Confirm Password' />
                        <FormikControl className='input' control='radio'  name='modeOfContact' label='ModeOfContact' options={options} />
                        <FormikControl className='input' control='input'  name='phone' label='Phone' />
                      <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                }
            }
        </Formik>
    );
};

export default RegistrationForm;
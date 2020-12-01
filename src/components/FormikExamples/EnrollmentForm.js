import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikControl from './FormikControl';
import './../App.css';


const EnrollmentForm = (props) => {

    const dropDownOptions = [
        { key: 'Select Course', value: '' },
        { key: 'React', value: 'React' },
        { key: 'Angular', value: 'Angular' },
        { key: 'Vue', value: 'Vue' }
    ];

    const checkboxOptions = [
        { key: 'HTML', value: 'HTML' },
        { key: 'CSS', value: 'CSS' },
        { key: 'JavaScript', value: 'JavaScript' }
    ];

    const initialValues = {
        email: '',
        bio: '',
        dropDownOption: '',
        checkboxOption: [],
        date: null
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        bio: Yup.string().required('Required'),
        dropDownOption: Yup.string().required('Required'),
        checkboxOption: Yup.array().required('Required'),
        date: Yup.date().required('Required').nullable(),
    });

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return <Form>
                        <FormikControl
                            className='input'
                            control='input'
                            type='email'
                            name='email'
                            label='Email' />
                        <FormikControl
                            className='input'
                            control='textarea'
                            name='bio'
                            label='Bio' />
                        <FormikControl
                            control='select'
                            name='dropDownOption'
                            label='Choose your Course'
                            options={dropDownOptions} />
                        <FormikControl
                            className='input'
                            control='checkbox'
                            name='checkboxOption'
                            label='Your skillset'
                            options={checkboxOptions} />
                        <FormikControl
                            className='input'
                            control='date'
                            name='date'
                            label='Course date' />
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                }
            }
        </Formik>
    );
};

export default EnrollmentForm;
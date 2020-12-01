import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikControl from './FormikControl';
import './../App.css';

const FormikContainer = (props) => {

    const dropDownOptions = [
        {key: 'Select an option', value: ''},
        {key: 'option1', value: 'option1'},
        {key: 'option2', value: 'option2'},
        {key: 'option3', value: 'option3'}
    ]

    const radioOptions = [
        {key: 'option1', value: 'r option1'},
        {key: 'option2', value: 'r option2'},
        {key: 'option3', value: 'r option3'}
    ]

    const checkboxOptions = [
        {key: 'option1', value: 'c option1'},
        {key: 'option2', value: 'c option2'},
        {key: 'option3', value: 'c option3'}
    ]

    const initialValues =  {
        email: '',
        description: '',
        selectOption: '',
        radioOption: '',
        checkboxOption: '',
        birthDate: null

    }

    const validationSchema = Yup.object({
        email: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        selectOption: Yup.string().required('Required'),
        radioOption: Yup.string().required('Required'),
        checkboxOption: Yup.array().required('Required'),
        birthDate: Yup.date().required('Required').nullable(),
    });

    const onSubmit = values => console.log(values)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => (<Form>
                    <FormikControl control='input' type='email' name='email' label='Email' />
                    <FormikControl control='textarea'  name='description' label='Description' />
                    <FormikControl control='select'  name='selectOption' label='Select an Option' options={dropDownOptions} />
                    <FormikControl control='radio'  name='radioOption' label='Radio Topic' options={radioOptions} />
                    <FormikControl control='checkbox'  name='checkboxOption' label='Checkbox Topic' options={checkboxOptions} />
                    <FormikControl control='date'  name='birthDate' label='birthDate Topic'  />
                    <button type='submit'>Submit</button>
                </Form>
                )}
        </Formik>
    );
}

export default FormikContainer;
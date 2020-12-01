import React, { useState } from 'react';
import './../App.css';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import TextError from './TextError';



const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
}

const savedValues = {
    name: 'jack',
    email: '111@g.zx',
    channel: 'kyku',
    comments: 'aaaaaaaaaaaaasssssssss',
    address: 'aaa 14',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
}
const onSubmit = (values, onSubmitProps) => {
    console.log('Forms Data:', values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
}
const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.channel) {
        errors.channel = 'Required';
    }

    if (!values.address) {
        errors.address = 'Required';
    }
    return errors;
}





const YouTubeForm = (props) => {

    const [formValues, setFormValues] = useState(null)

    return (
        <Formik
            initialValues={initialValues || formValues}
            onSubmit={onSubmit}
            validate={validate}
            enableReinitialize
        >
            {
                formik => {
                    console.log('Formik props', formik )
                    return (
                        <Form >
                        <div className='forms_cotrol'>
                            <label htmlFor='name'>Name</label>
                            <Field type='text' id='name' name='name' />
                            {/* // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.name}  */}
                            <ErrorMessage name='name'>
                                {
                                    (error) =>
                                        <div className='error'>
                                            {error}
                                        </div>
        
                                }
                            </ErrorMessage>
        
                        </div>
                        <div className='forms_cotrol'>
                            <label htmlFor='email'>E-mail</label>
                            <Field type='email' id='email' name='email' />
                            <ErrorMessage name='email' component={TextError} />
                        </div>
                        <div className='forms_cotrol'>
                            <label htmlFor="channel">Channel</label>
                            <Field type='text' id='channel' name='channel' placeholder='Channel Name' />
                            <ErrorMessage name='channel' component={TextError} />
                        </div>
        
                        <div className='forms_cotrol'>
                            <label htmlFor="textarea">Textarea</label>
                            <Field as='textarea' id='comments' name='comments' />
                            <ErrorMessage name='comments' component={TextError} />
                        </div>
        
                        <div className='forms_cotrol'>
                            <label htmlFor="address">Address</label>
                            <FastField name='address'>
                                {
                                    (props) => {
                                        const { field, form, meta } = props;
                                        console.log('REnder');
                                        return (
                                            <div>
                                                <input type='text' id='address' {...field} />
                                                {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
                                            </div>
                                        );
                                    }
                                }
                            </FastField>
                            <ErrorMessage name='comments' component={TextError} />
                        </div>
                        <div className='forms_cotrol'>
                            <label htmlFor="facebook">Facebook</label>
                            <Field type='text' id='facebook' name='social.facebook' />
                            <ErrorMessage name='social.facebook' component={TextError} />
                        </div>
        
                        <div className='forms_cotrol'>
                            <label htmlFor="twitter">Twitter</label>
                            <Field type='text' id='twitter' name='social.twitter' />
                            <ErrorMessage name='social.twitter' component={TextError} />
                        </div>
        
                        <div className='forms_cotrol'>
                            <label htmlFor="primaryPhone">Primary Phone Number</label>
                            <Field type='text' id='primaryPhone' name='phoneNumbers[0]' />
                        </div>
                        <div className='forms_cotrol'>
                            <label htmlFor="secondaryPhone">Secondary Phone Number</label>
                            <Field type='text' id='secondaryPhone' name='phoneNumbers[1]' />
                        </div>
        
                        <div className='forms_cotrol'>
                            <label>Phone Numbers</label>
                            <FieldArray name='phNumbers'>
                                {
                                    fieldArrayProps => {
                                        const { push, remove, form } = fieldArrayProps;
                                        const { values } = form;
                                        const { phNumbers } = values;
                                        return (
                                            <div>
                                                {
                                                    phNumbers.map((phNumber, index) => (
                                                        <div key={index} >
                                                            <Field name={`phNumbers[${index}]`} />
                                                            {index > 0 && <button type='button' onClick={() => { remove(index) }}>
                                                                {' '}
                                                                    -
                                                                    {' '}
                                                            </button>
                                                            }
                                                            <button type='button' onClick={() => { push(phNumber) }}>
                                                                {' '}
                                                                    +
                                                                    {' '}
                                                            </button>
                                                        </div>
                                                    ))
        
                                                }
                                            </div>
                                        );
                                    }
                                }
                            </FieldArray>
                        </div>
        
                        <button type='submit' onClick={() => {setFormValues(savedValues)}}>Save form data</button>
                        <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                     
                        {/* <button type="button" onClick={() => formik.validateField('name')}>
                         Validater Field
                        </button>
                        <button type="button" onClick={() => formik.validateForm()}>
                          Validate all
                        </button>
                        <button type="button" onClick={() => formik.setFieldTouched('comments')}>
                        comments
                        </button>
                        <button type="button" onClick={() => formik.setTouched({
                            name: true,
                            email: true,
                            channel: true,
                            comments: true
                        })}>
                          Set Touched All
                        </button>
                        <button type="button" onClick={() => formik.validateForm()}>
                          Validate all
                        </button>
         */}
                    </Form>
                    );
                }
            }
         </Formik>
    );
};


export default YouTubeForm;
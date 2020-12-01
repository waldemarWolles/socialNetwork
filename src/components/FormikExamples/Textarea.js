import { ErrorMessage, Field } from 'formik';
import React from 'react';
import './../App.css';
import TextError from './TextError';

const Textarea = (props) => {
    const {label, name, ...rest} = props;
    return (
        <div className='forms_control'>
            <label htmlFor={name}>{label}</label>
            <Field as='textarea' id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Textarea;
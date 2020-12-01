import { ErrorMessage, Field } from 'formik';
import React from 'react';
import './../App.css';
import TextError from './TextError';

const Select = (props) => {
    const {options, label, name, ...rest} = props;
    return (
        <div className='forms_control'>
            <label htmlFor={name}>{label}</label>
            <Field as='select' name={name} id={name} {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        );
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Select;
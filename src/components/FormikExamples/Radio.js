import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';
import './../App.css';

const Radio = (props) => {
    const { label, name, options, ...rest } = props;
    return (
        <div className='forms_control'>
            <label>{label}</label>
            <div className='options'>
            <Field  name={name} {...rest}>
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                                <div className='option'>
                                <React.Fragment key={option.key}>
                                   
                                        <input
                                            type="radio"
                                            id={option.value}
                                            {...field}
                                            value={option.value}
                                            checked={field.value === option.value}
                                        />
                                        <label htmlFor={option.value}>{option.key}</label>
                                </React.Fragment>
                                </div>
                            )
                        })

                    }
                }
            </Field>
            </div>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Radio;
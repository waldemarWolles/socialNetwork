import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';
import './../App.css';


const Checkboxes = (props) => {
    const {label, name, options, ...rest} = props;
    return (
        <div className='forms_control'>
            <label>{label}</label>
            <div className='options'>
            <Field name={name} {...rest}>
                {
                    ({field}) => {
                        return options.map(option => {
                            return (
                                <div className='option'>
                                <React.Fragment className='options' key={option.key}>
                                    <input 
                                    type="checkbox" 
                                    id={option.value}
                                    {...field}
                                    value={option.value}
                                    checked={field.value.includes(option.value)}
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

export default Checkboxes;
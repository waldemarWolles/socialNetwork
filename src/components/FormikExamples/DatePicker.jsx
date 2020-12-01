import { ErrorMessage, Field } from 'formik';
import React from 'react';
import DateView from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TextError from './TextError';

const DatePicker = (props) => {
    const { label, name, ...rest } = props;
    return (
        <div className='form_control'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} >
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return <DateView
                            id={name}
                            {...field}
                            {...rest}
                            selected={value}
                            onChange={val => setFieldValue(name, val)}
                        />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default DatePicker;
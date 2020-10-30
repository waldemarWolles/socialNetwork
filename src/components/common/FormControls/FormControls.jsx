import classes from './FormControls.module.css';
import React from 'react';
import { Field } from 'redux-form';

const FormControl = ({ input, meta, child, ...props }) => {

    let hasError = meta.touched && meta.error;

    return (
        <div>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span >{meta.error}</span>}
            </div>
        </div>
    );
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return (
        <div>
            <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
        </div>
    );
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return (
        <div>
            <FormControl {...props}><input {...input} {...restProps} /></FormControl>
        </div>
    );
}


export const createField = (placeholder, validators, name, component, props = {}, text = '') => (
    <div>
         <Field placeholder={placeholder} validate={validators} name={name} component={component} {...props} />{text}
    </div>
);
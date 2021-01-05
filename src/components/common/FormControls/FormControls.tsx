import classes from './FormControls.module.css';
import React from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlsPropsType> = ({ meta, ...props }) => {

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

                

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <div>
            <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
        </div>
    );
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <div>
            <FormControl {...props}><input {...input} {...restProps} /></FormControl>
        </div>
    );
}


export const createField = (placeholder: string, 
    validators: Array<FieldValidatorType>, 
    name: string, 
    component: React.FC<WrappedFieldProps>, 
    props = {}, 
    text = '') => (
    <div>
         <Field placeholder={placeholder} validate={validators} name={name} component={component} {...props} />{text}
    </div>
);
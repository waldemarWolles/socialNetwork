import React from 'react';
import classes from './FormControls.module.css';
import { Field, ErrorMessage } from 'formik';

type FormControlPropsType = {
    control: 'input' | 'textarea'
}

type FormItemPropsType = {
    label?: string
    name: string
    key?: string
    placeholder: string
    type?: string
    className?: string
}

const FormControlsWithFormik: React.FC<FormControlPropsType & FormItemPropsType> = (props) => {
    const { control, ...rest } = props;
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        default:
            return null
    }
}


const Textarea: React.FC<FormItemPropsType>  = (props) => {
    const { label, name, key, ...rest } = props;
    return (
        <div className={classes.formik_controls}>
           <label htmlFor={name}>{label}</label>
           <Field as='textarea' key={key} id={name} name={name} {...rest}/>
           <ErrorMessage name={name} component={ErrorText} />
        </div>
    );
}


const Input: React.FC<FormItemPropsType> = (props) => {
    const { label, name, key, ...rest } = props;
    return (
        <div className={classes.formik_controls}>
           <label htmlFor={name}>{label}</label>
           <Field id={name} key={key} name={name} {...rest} />
           <ErrorMessage name={name} component={ErrorText} />
        </div>
    );
}


const ErrorText: React.FC = (props) => {
    return <div className={classes.error} >
        {props.children}
    </div>
}
    
    


export default FormControlsWithFormik;
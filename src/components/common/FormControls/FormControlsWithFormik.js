import React from 'react';
import classes from './FormControls.module.css';
import { Field, ErrorMessage } from 'formik';

const FormControlsWithFormik = (props) => {
    const { control, ...rest } = props;
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'checkbox':
           return <CheckBoxes {...rest} />
        default:
            return null
    }
}

const Textarea = (props) => {
    const { label, name, ...rest } = props;
    return (
        <div className={classes.formik_controls}>
           <label htmlFor={name}>{label}</label>
           <Field as='textarea' id={name} name={name} {...rest}/>
           <ErrorMessage name={name} component={ErrorText} />
        </div>
    );
}
const Input = (props) => {
    const { label, name,...rest } = props;
    return (
        <div className={classes.formik_controls}>
           <label htmlFor={name}>{label}</label>
           <Field id={name} name={name} {...rest} />
           <ErrorMessage name={name} component={ErrorText} />
        </div>
    );
}

const CheckBoxes = (props) => {
    const { label, name, options, ...rest } = props;
    return (
        <div className={classes.formik_controls}>
           <label>{label}</label>
           <Field name={name} {...rest}>
                {
                    ({field}) => {
                      return options.map(option => {
                          return (
                          <React.Fragment key={option.key}>
                             <input 
                                type="checkbox"
                                id={option.value}
                                {...field}
                                value={option.value}
                                checked={field.value.includes(option.value)}
                             />
                             <label htmlFor={option.value}>{option.key}</label>
                          </React.Fragment>
                            )
                    
                      })
                    }
                }
           </Field>
           <ErrorMessage name={name} component={ErrorText} />
        </div>
    );
}


const ErrorText = (props) => {
    return <div className={classes.error} >
        {props.children}
    </div>
}
    
    


export default FormControlsWithFormik;
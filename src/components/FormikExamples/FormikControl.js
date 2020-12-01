import React from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import Radio from './Radio';
import Checkboxes from './Checkboxes';
import DatePicker from './DatePicker';
import ChackraInput from './ChackraInput';

const FormikControl = (props) => {
    const { control, ...rest } = props;
    switch(control) {
        case 'input': 
            return <Input {...rest} />
        case 'textarea':
             return <Textarea {...rest} />
        case 'select':
             return <Select {...rest}/>
        case 'radio':
            return <Radio {...rest} />
        case 'checkbox': 
            return <Checkboxes {...rest}/>
        case 'date':
            return <DatePicker {...rest}/>
        case 'chackrainput':
            return <ChackraInput {...rest}/>
            
        default: return null
    }
}

export default FormikControl;
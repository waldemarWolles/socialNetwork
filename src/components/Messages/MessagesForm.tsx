import React from 'react';
import classes from './Messages.module.css';
// import { Field, reduxForm, reset } from 'redux-form';
// import { Textarea } from '../common/FormControls/FormControls';
// import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Formik, Form, } from 'formik';
import FormControlsWithFormik from '../common/FormControls/FormControlsWithFormik';
import * as Yup from 'yup';


type PropsType = {
    onSubmit: (values: { newMessageText: string }) => void
    className?: string
}

export const AddMessageFormik: React.FC<PropsType> = ({ onSubmit }) => {

    return (
        <Formik
            initialValues={{ newMessageText: '' }}
            validationSchema={Yup.object({
                newMessageText: Yup.string().required('Cannot send an empty message').max(50)
            })}
            onSubmit={(values: any, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}

        >
            {
                () => {
                    return <Form>
                        <FormControlsWithFormik className={classes.input}
                            control='textarea'
                            name='newMessageText'
                            placeholder='Write your message'
                        />
                        <button className={classes.button} type='submit'>Send</button>
                    </Form>

                }
            }
        </Formik>
    );
}


// let maxLength50 = maxLengthCreator(50);

// const AddMessageForm = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit} >
//             <Field className={classes.input}
//                 component={Textarea}
//                 validate={[required, maxLength50]}
//                 name='newMessageText'
//                 placeholder={'Write your message'} />
//             <div className={classes.button}><button >Add Message</button></div>
//         </form>
//     );
// }

// const afterSubmit = (result, dispatch) =>
//     dispatch(reset('message'));

// const MessageReduxForm = reduxForm({
//     // a unique name for the form
//     form: 'message',
//     onSubmitSuccess: afterSubmit,

// })(AddMessageForm)



import React from 'react';
import classes from './Messages.module.css';
import UserImg from '../../images/sideBar/user.svg';
import { NavLink, Redirect } from 'react-router-dom';
// import { Field, reduxForm, reset } from 'redux-form';
// import { Textarea } from '../common/FormControls/FormControls';
// import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Formik, Form,  } from 'formik';
import FormControlsWithFormik from '../common/FormControls/FormControlsWithFormik';
import * as Yup from 'yup';





const DialogItem = (props) => {
    return (
        <div>
            <NavLink to={'/messages/' + props.id} className={`${classes.item} `} >
                <img src={UserImg} alt="" />{props.name}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={classes.item}><img src={UserImg} alt="" />{props.message}</div>
    );
}




const Messages = (props) => {

    if (!props.isAuth) return <Redirect to='/login' />

    let dialogsElements = props.dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesElements = props.messages.map((message) => <Message message={message.message} />);



    let addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
    }

    return <div id={classes.messagesArticle} className={classes.messagesArticle}>
        <div className={classes.dialogs}>
            {dialogsElements}
        </div>
        <div className={classes.messages}>
            {messagesElements}
            <AddMessageFormik className={classes.messages_form} onSubmit={addNewMessage} />
        </div>
    </div>
}

const AddMessageFormik = (props) => {

    return (
        <Formik
            initialValues={{ newMessageText: '' }}
            validationSchema={Yup.object({
                newMessageText: Yup.string().required('Cannot send an empty message').max(50)
            })}
            onSubmit={(values, {resetForm}) => {
                props.onSubmit(values);
                resetForm();
            }}
            
        >
            {
                formik => {
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

export default Messages;

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



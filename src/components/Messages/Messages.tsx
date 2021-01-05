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
import { DialogsType, MessagesType } from '../../types/types';


type DialogItemPropsType = {
    name: string,
    id: number
}


const DialogItem: React.FC<DialogItemPropsType> = ({name, id}) => {
    return (
        <div>
            <NavLink to={'/messages/' + id} className={`${classes.item} `} >
                <img src={UserImg} alt="" />{name}</NavLink>
        </div>
    );
}

type MessagePropsType = {
    message: string
}

const Message: React.FC<MessagePropsType> = ({message}) => {
    return (
        <div className={classes.item}><img src={UserImg} alt="" />{message}</div>
    );
}

type MessagesPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    isAuth: boolean

    addMessage: (newMessageText: string) => void
}


const Messages: React.FC<MessagesPropsType> = ({dialogs, messages, addMessage}) => {


    let dialogsElements = dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesElements = messages.map((message) => <Message message={message.message} />);

    
    let addNewMessage = (values: any)  => {
        addMessage(values.newMessageText);
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

type AddMessageFormikPropsType = {
    onSubmit: (newMessageText: string) => void
    className?: string
}

const AddMessageFormik: React.FC<AddMessageFormikPropsType> = ({onSubmit}) => {

    return (
        <Formik
            initialValues={{ newMessageText: '' }}
            validationSchema={Yup.object({
                newMessageText: Yup.string().required('Cannot send an empty message').max(50)
            })}
            onSubmit={(values: any, {resetForm}) => {
                onSubmit(values);
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



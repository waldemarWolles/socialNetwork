import React from 'react';
import classes from './Messages.module.css';
import UserImg from '../../images/sideBar/user.svg';
import { NavLink, Redirect } from 'react-router-dom';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../reduxx/messages-reducer';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormControls/FormControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';




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

    return <div id={classes.messagesArticle} className={classes.messagesArticle} >

        <div className={classes.dialogs}>
            {dialogsElements}
        </div>
        <div className={classes.messages}>
            {messagesElements}
            <MessageReduxForm onSubmit={addNewMessage}/>
        </div>

    </div>

}

let maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <Field component={Textarea} validate={[required, maxLength50]} name='newMessageText' placeholder={'Write your message'} />
            <div><button>Add Message</button></div>
        </form>
    );
}

const MessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'message'
  })(AddMessageForm)


export default Messages;
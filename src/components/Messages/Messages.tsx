import React from 'react';
import classes from './Messages.module.css';
import { DialogItem } from './DialogItem';
import { Message } from './Message';
import { AddMessageFormik } from './MessagesForm';
import { AppRootStateType } from '../../reduxx/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { actionsMessagesReducer } from '../../reduxx/messages-reducer';
import { getDialogs, getMessages } from '../../reduxx/messages-selectors';




export const Messages: React.FC = () => {

    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)

    const dispatch = useDispatch()

    const dialogsElements = dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} />);
    const messagesElements = messages.map((message) => <Message message={message.message} />);


    const addNewMessage = (values: { newMessageText: string }) => {
        dispatch(actionsMessagesReducer.addMessageActionCreator(values.newMessageText))
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


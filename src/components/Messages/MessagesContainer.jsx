import React from 'react';
import classes from './Messages.module.css';
import UserImg from '../../images/sideBar/user.svg';
import { NavLink } from 'react-router-dom';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../reduxx/messages-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../common/withAuthRedirect';
import { compose } from 'redux';




const mapStateToProps = (state) => {
    return {
        messages: state.messagesPage.messages,
        dialogs: state.messagesPage.dialogs,
        newMessageText: state.messagesPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageText) => {
            dispatch(addMessageActionCreator(newMessageText))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Messages)


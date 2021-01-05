import { actionsMessagesReducer} from '../../reduxx/messages-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../common/withAuthRedirect';
import { compose } from 'redux';
import { AppRootStateType } from '../../reduxx/redux-store';
import { DialogsType, MessagesType } from '../../types/types';

type OwnPropsType = {}

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
    }
}

type DispatchPropsType = {
    addMessage: (newMessageText: string) => void
}

const mapDispatchToProps = (dispatch: any): DispatchPropsType => {
    return {
        addMessage: (newMessageText: string) => {
            dispatch(actionsMessagesReducer.addMessageActionCreator(newMessageText))
        }
    }
}


export default compose<React.ComponentType>(
    connect<MapStatePropsType,DispatchPropsType,OwnPropsType,AppRootStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Messages)


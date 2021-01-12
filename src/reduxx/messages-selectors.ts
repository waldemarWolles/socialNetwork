import { AppRootStateType } from './redux-store';


export const getDialogs = (state: AppRootStateType) => {
    return state.messagesPage.dialogs
}
export const getMessages = (state: AppRootStateType) => {
    return state.messagesPage.messages
}

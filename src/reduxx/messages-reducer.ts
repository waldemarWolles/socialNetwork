import { DialogsType, MessagesType } from '../types/types'
import { InferActionsTypes } from './redux-store'

let initialState = {
  dialogs: [
    { id: 1, name: 'Jack' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jessy' },
    { id: 4, name: 'Luke' },
    { id: 5, name: 'Will' },
    { id: 6, name: 'Jennifer' },
  ] as Array<DialogsType>,

  messages: [
    { id: 1, message: "Hello it's me!" },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Good! And you?' },
    { id: 4, message: "I'm fine too" },
    { id: 5, message: 'too' },
    { id: 6, message: 'oo' },
  ] as Array<MessagesType>,
}

export type InitialStateType = typeof initialState

const messagesReducer = (
  state = initialState,
  action: MessagesReducerActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'messages/add_message': {
      let newMessage = {
        id: 7,
        message: action.newMessageText,
      }

      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    }

    default:
      return state
  }
}

// Action Creators
type MessagesReducerActionsTypes = InferActionsTypes<
  typeof actionsMessagesReducer
>

export const actionsMessagesReducer = {
  addMessageActionCreator: (newMessageText: string) =>
    ({ type: 'messages/add_message', newMessageText } as const),
}

export default messagesReducer

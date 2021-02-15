import { chatAPI, ChatMessageType } from '../api/chat-api'
import { ResultCodeEnums, ResultCodeCaptchaEnum } from '../api/api'
import { authAPI } from '../api/auth-api'
import { profileAPI } from '../api/profile-api'
import { securityAPI } from '../api/security-api'
import { BasicThunkType, InferActionsTypes } from './redux-store'
import { Dispatch } from 'redux'

type InitialStateType = typeof initialState

let initialState = {
  messages: [] as ChatMessageType[],
}

const chatReducer = (
  state = initialState,
  action: AuthReducerActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'chat/messages_received':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      }
    default: {
      return state
    }
  }
}

// Action creators

export type AuthReducerActionsTypes = InferActionsTypes<
  typeof actionsAuthReducer
>
export const actionsAuthReducer = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'chat/messages_received',
      payload: messages,
    } as const),
}

// Thunk Creators

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      debugger
      dispatch(actionsAuthReducer.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

type ThunkType = BasicThunkType<AuthReducerActionsTypes>

export const startMessagesListening = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
  }
}

export const stopMessagesListening = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
  }
}

export const sendMessage = (message: string): ThunkType => {
  return async (dispatch) => {
    chatAPI.sendMessage(message)
  }
}

export default chatReducer

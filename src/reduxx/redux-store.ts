import { combineReducers, createStore, applyMiddleware, compose, Action } from 'redux'
import profileReducer from './profile-reducer'
import messagesReducer from './messages-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

//export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any} > = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BasicThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.__store__ = store

export default store
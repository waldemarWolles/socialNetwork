import { AppRootStateType } from './redux-store';

export const getAuthUserPhoto = (state: AppRootStateType) => {
    return state.auth.authUserPhoto
}
export const getIsAuth = (state: AppRootStateType) => {
    return state.auth.isAuth
}
export const getLogin = (state: AppRootStateType) => {
    return state.auth.login
}
export const getCaptchaUrl = (state: AppRootStateType) => {
    return state.auth.captchaUrl
}
export const getUserId = (state: AppRootStateType) => {
    return state.auth.userId
}
export const getErrorMessage  = (state: AppRootStateType) => {
    return state.auth.errorMessage
}





import { AppRootStateType } from './redux-store'

export const getProfileSelector = (state: AppRootStateType) => {
    return state.profilePage.profile
}
export const getStatusSelector = (state: AppRootStateType) => {
    return state.profilePage.status
}
export const getAuthorizedUserIdSelector = (state: AppRootStateType) => {
    return state.auth.userId
}
export const getErrorMessageSelector = (state: AppRootStateType) => {
    return state.profilePage.errorMessage
}
export const getPostsSelector = (state: AppRootStateType) => {
    return state.profilePage.posts
}
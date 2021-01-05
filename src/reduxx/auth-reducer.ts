import { ResultCodeEnums, ResultCodeCaptchaEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { profileAPI } from '../api/profile-api';
import { securityAPI } from '../api/security-api';
import { BasicThunkType, InferActionsTypes } from './redux-store';

type InitialStateType = typeof initialState;

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    errorMessage: '' as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    authUserPhoto: null as string | null
}


const authReducer = (state = initialState, action: AuthReducerActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SET_USER_AUTH_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
        case 'SET_AUTH_USER_PHOTO':
        case 'SET_USER_AUTH_ERROR_MESSAGE':
        case 'DELETE_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload,
            }
        default: {
            return state;
        }
    }
}

// Action creators

export type AuthReducerActionsTypes = InferActionsTypes<typeof actionsAuthReducer>
export const actionsAuthReducer = {
    setUserAuthData: (
        userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
            type: 'SET_USER_AUTH_DATA', payload: { userId, email, login, isAuth }
        } as const),

    setUserAuthErrorMessage: (errorMessage: string) => ({
        type: 'SET_USER_AUTH_ERROR_MESSAGE', payload: { errorMessage }
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
    } as const),

    deleteCaptchaUrl: (captchaUrl: string) => ({
        type: 'DELETE_CAPTCHA_URL', payload: { captchaUrl }
    } as const),

   setAuthUserPhoto: (authUserPhoto: string | null) => ({
        type: 'SET_AUTH_USER_PHOTO', payload: { authUserPhoto }
    } as const),
}

// Thunk Creators

type ThunkType = BasicThunkType<AuthReducerActionsTypes>

export const getAuthUserPhotoThunk = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(actionsAuthReducer.setAuthUserPhoto(response.photos.small));
    }
}

export const getAuthThunk = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.getAuth();
        if (response.resultCode === ResultCodeEnums.Success) {
            let { id, email, login } = response.data;
            dispatch(actionsAuthReducer.setUserAuthData(id, email, login, true));
        }
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);
        let error = ''
        if (response.resultCode === ResultCodeEnums.Success) {
            dispatch(getAuthThunk());
            dispatch(actionsAuthReducer.setUserAuthErrorMessage(error));
        } else {
            if (response.resultCode === ResultCodeCaptchaEnum.Captcha) {
                dispatch(getCaptchaUrlThunk());
            }
            let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
            dispatch(actionsAuthReducer.setUserAuthErrorMessage(message));
        }
    }
}

export const getCaptchaUrlThunk = (): ThunkType => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptcha();
        const captchaUrl = response.url;

        dispatch(actionsAuthReducer.getCaptchaUrlSuccess(captchaUrl));
    }
}

export const logoutThunk = (): ThunkType => {
    return async (dispatch) => {
        let captchUrl = ''
        let response = await authAPI.logout();
        if (response.resultCode === ResultCodeEnums.Success) {
            dispatch(actionsAuthReducer.setUserAuthData(null, null, null, false));// after logout we need to reset all data about user
            dispatch(actionsAuthReducer.deleteCaptchaUrl(captchUrl));
        }
    }
}

export default authReducer;
import { authAPI, securityAPI, profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { getProfileThunk } from './profile-reducer';

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
const SET_AUTH_USER_PHOTO = 'SET_AUTH_USER_PHOTO';




let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    authUserPhoto: null


}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_AUTH_DATA:
        case GET_CAPTCHA_URL_SUCCESS: 
        case SET_AUTH_USER_PHOTO: 
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


export const setUserAuthData = (userId, email, login, isAuth) => ({ type: SET_USER_AUTH_DATA, payload: { userId, email, login, isAuth } });
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });
export const setAuthUserPhoto = (authUserPhoto) => ({ type: SET_AUTH_USER_PHOTO, payload: { authUserPhoto } });

export const getAuthUserPhotoThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
        dispatch(setAuthUserPhoto(response.photos.small));
    }


export const getAuthThunk = () => async (dispatch) => {
    debugger;
    let response = await authAPI.getAuth();
    debugger;
    if (response.resultCode === 0) {
        debugger;
        let { id, email, login } = response.data;
        debugger;
        dispatch(setUserAuthData(id, email, login, true));
      
    }
}

export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(getAuthThunk());
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrlThunk());
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const getCaptchaUrlThunk = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logoutThunk = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));// after logout we need to reset all data about user
    }
}



export default authReducer;
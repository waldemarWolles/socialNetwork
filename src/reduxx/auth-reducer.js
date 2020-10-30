import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA';




let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
   
    
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_AUTH_DATA: {
            return {
                ...state,
                ...action.payload,
               
                }
            }
        
        default: {
            return state;
        }

    }
}

// Action creators


export const setUserAuthData = ( userId, email, login, isAuth ) => ({type: SET_USER_AUTH_DATA, payload: { userId, email, login, isAuth }});

export const getAuthThunk = () => async (dispatch) => {
   let response = await authAPI.getAuth();
        if(response.resultCode === 0) {
            let {id,email,login} = response.data;
            dispatch(setUserAuthData(id, email, login, true));
        }
}

export const loginThunk = (email, password, rememberMe) => async (dispatch) => {
    let response = await  authAPI.login(email, password, rememberMe);
        if(response.resultCode === 0) {
            dispatch(getAuthThunk());
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
}

export const logoutThunk = () => async (dispatch) => {
    let response = await  authAPI.logout();
        if(response.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));// after logout we need to reset all data about user
        }
}



export default authReducer;
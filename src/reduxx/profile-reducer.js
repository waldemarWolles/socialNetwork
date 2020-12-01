import { profileAPI } from "../api/api";
import { stopSubmit } from 'redux-form';
import { setAuthUserPhoto } from './auth-reducer';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        { id: 1, message: 'Post 1t', likesCount: 4 },
        { id: 2, message: 'Post 2ntent', likesCount: 14 },
        { id: 3, message: 'Post 3ntentcontent', likesCount: 34 },
        { id: 4, message: 'Post4contentcontentcontent', likesCount: 44 },
    ],
    profile: null,
    status: " "
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }

            return {
                ...state,
                posts: [newPost, ...state.posts],
                
            };
        }


        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
                profileLogin: action.profile
            };
        }

        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        }


        default: {
            return state;
        }

    }
}


export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const updateNewPostText = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });


export const getProfileThunk = (userId) => async (dispatch) => {
   let response = await profileAPI.getProfile(userId);
   debugger;
        dispatch(setUserProfile(response));
        debugger;
        dispatch(setAuthUserPhoto(response.photos.small));
}

export const getStatusThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
        dispatch(setUserStatus(response));
}
export const updateStatusThunk = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
}

export const savePhotoThunk = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
        if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos));
            dispatch(setAuthUserPhoto(response.data.photos.small));
        }
}

export const saveProfileThunk = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;

    let response = await profileAPI.saveProfile(profile);
        if (response.resultCode === 0) {
            dispatch(getProfileThunk(userId));

        } else {
            debugger;
            dispatch(stopSubmit('edit_profile', {_error: response.messages[0]}));
            debugger;
            return Promise.reject(response.messages[0]);
        }
}



export default profileReducer;
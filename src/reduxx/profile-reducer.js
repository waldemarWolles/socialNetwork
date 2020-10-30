import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';


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
                likesCount: 25
            }

            return {
                ...state,
                posts: [newPost, ...state.posts],
                
            };
        }


        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }


        default: {
            return state;
        }

    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });


export const getProfileThunk = (userId) => async (dispatch) => {
   let response = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(response));
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

export default profileReducer;
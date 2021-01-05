import { ResultCodeEnums } from "../api/api"
import { actionsAuthReducer } from './auth-reducer'
import { PhotosType, PostsType, ProfileType } from "../types/types"
import { BasicThunkType, InferActionsTypes } from "./redux-store"
import { profileAPI } from "../api/profile-api"

let initialState = {
    posts: [
        { id: 1, message: 'Post 1t', likesCount: 4 },
        { id: 2, message: 'Post 2ntent', likesCount: 14 },
        { id: 3, message: 'Post 3ntentcontent', likesCount: 34 },
        { id: 4, message: 'Post4contentcontentcontent', likesCount: 44 },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ' ',
    errorMessage: '' as string | null,
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ProfileReducerActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: action.newPostId,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
              posts: state.posts.filter(p => p.id !== action.postID),
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile,
                // profileLogin: action.profile
            }
        }
        case 'SET_USER_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }
        case 'ERROR_PROFILE_MESSAGE': {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default: {
            return state
        }
    }
}
// Action Creators

type ProfileReducerActionsTypes = InferActionsTypes<typeof actionsProfileReducer & typeof actionsAuthReducer>


export const actionsProfileReducer = {
    addPost: (newPostText: string, newPostId: number) => ({ type: 'ADD_POST', newPostText, newPostId } as const),
    deletePost: (postID: number) => ({ type: 'DELETE_POST', postID } as const),
    updateNewPostText: (text: string) => ({ type: 'UPDATE_NEW_POST_TEXT', newText: text } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setUserStatus: (status: string) => ({ type: 'SET_USER_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
    errorProfileMessageActionType: (message: string) => ({ type: 'ERROR_PROFILE_MESSAGE', message } as const),
}



// ThunkCreators

type ThunkType = BasicThunkType<ProfileReducerActionsTypes>

export const getProfileThunk = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(actionsProfileReducer.setUserProfile(response))
        dispatch(actionsAuthReducer.setAuthUserPhoto(response.photos.small))
    }
}

export const getStatusThunk = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(actionsProfileReducer.setUserStatus(response))
    }
}
export const updateStatusThunk = (status: string): ThunkType => {
    return async (dispatch, getState) => {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === ResultCodeEnums.Success) {
            dispatch(actionsProfileReducer.setUserStatus(status))
        }
    }
}

export const savePhotoThunk = (file: File): ThunkType => {
    return async (dispatch, getState) => {
        let response = await profileAPI.savePhoto(file)
        if (response.resultCode === ResultCodeEnums.Success) {
            dispatch(actionsProfileReducer.savePhotoSuccess(response.data.photos))
            dispatch(actionsAuthReducer.setAuthUserPhoto(response.data.photos.small))
        }
    }
}

export const saveProfileThunk = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        let response = await profileAPI.saveProfile(profile)
        if (response.resultCode === ResultCodeEnums.Success) {
            if(userId !== null) {
                dispatch(getProfileThunk(userId))
            } else {
                throw new Error('UserId can`t be null')
            }
        } else {
            dispatch(actionsProfileReducer.errorProfileMessageActionType(response.messages[0]))
            return Promise.reject(response.messages[0])
        }
    }
}



export default profileReducer
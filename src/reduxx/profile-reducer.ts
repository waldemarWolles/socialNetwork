import { ResultCodeEnums } from '../api/api'
import { PhotosType, PostsType, ProfileType } from '../types/types'
import { BasicThunkType, InferActionsTypes } from './redux-store'
import { profileAPI } from '../api/profile-api'
import { actionsAuthReducer } from './auth-reducer'

let initialState = {
  posts: [
    { id: 0, message: 'Post 1t', likesCount: 4 },
    { id: 1, message: 'Post 2ntent', likesCount: 14 },
    { id: 2, message: 'Post 3ntentcontent', likesCount: 34 },
    { id: 3, message: 'Post4contentcontentcontent', likesCount: 44 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: ' ',
  errorMessage: '' as string | null,
}

export type InitialStateType = typeof initialState

const profileReducer = (
  state = initialState,
  action: ProfileReducerActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'profile/add_post': {
      let newPost = {
        id: action.newPostId,
        message: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    }
    case 'profile/delete_post': {
      const deletePosts = state.posts.filter((p) => p.id !== action.postID)

      const afterDeletePosts = deletePosts.map((post, i) => {
        post.id = i
        return post
      })

      return {
        ...state,
        posts: afterDeletePosts,
      }
    }
    case 'profile/liked_post': {
      return {
        ...state,
        posts: state.posts.map((post) => {
          post.id === action.postID && post.likesCount++
          return post
        }),
      }
    }
    case 'profile/set_user_profile': {
      return {
        ...state,
        profile: action.profile,
        // profileLogin: action.profile
      }
    }
    case 'profile/set_user_status': {
      return {
        ...state,
        status: action.status,
      }
    }
    case 'profile/save_photo_success': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    }
    case 'profile/error_profile_message': {
      return {
        ...state,
        errorMessage: action.message,
      }
    }
    default: {
      return state
    }
  }
}
// Action Creators

type ProfileReducerActionsTypes = InferActionsTypes<
  typeof actionsProfileReducer & typeof actionsAuthReducer
>

export const actionsProfileReducer = {
  addPost: (newPostText: string, newPostId: number) =>
    ({ type: 'profile/add_post', newPostText, newPostId } as const),
  deletePost: (postID: number) =>
    ({ type: 'profile/delete_post', postID } as const),
  likedPost: (postID: number) =>
    ({ type: 'profile/liked_post', postID } as const),
  setUserProfile: (profile: ProfileType) =>
    ({ type: 'profile/set_user_profile', profile } as const),
  setUserStatus: (status: string) =>
    ({ type: 'profile/set_user_status', status } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({ type: 'profile/save_photo_success', photos } as const),
  errorProfileMessageActionType: (message: string) =>
    ({ type: 'profile/error_profile_message', message } as const),
}

// ThunkCreators

type ThunkType = BasicThunkType<ProfileReducerActionsTypes>

export const getProfileThunk = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actionsProfileReducer.setUserProfile(response))
    if (getState().auth.userId === userId) {
      dispatch(actionsAuthReducer.setAuthUserPhoto(response.photos.small))
    }
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
      if (getState().auth.userId === getState().profilePage.profile?.userId) {
        dispatch(
          actionsAuthReducer.setAuthUserPhoto(response.data.photos.small)
        )
      }
    }
  }
}

export const saveProfileThunk = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId

    let response = await profileAPI.saveProfile(profile)
    if (response.resultCode === ResultCodeEnums.Success) {
      if (userId !== null) {
        dispatch(getProfileThunk(userId))
      } else {
        throw new Error('UserId can`t be null')
      }
    } else {
      dispatch(
        actionsProfileReducer.errorProfileMessageActionType(
          response.messages[0]
        )
      )
      return Promise.reject(response.messages[0])
    }
  }
}

export default profileReducer

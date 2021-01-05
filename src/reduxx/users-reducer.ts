import { UserType } from './../types/types';
import { ResultCodeEnums} from "../api/api";
import { BasicThunkType, InferActionsTypes } from './redux-store';
import { usersAPI } from '../api/users-api';
import { Dispatch } from 'redux';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    pageSizeFriends: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // Array of users ids
}

type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: UsersReducerActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'TOGGLE_IS_FOLLOWING_IN_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)

            }
        }
        default: {
            return state;
        }

    }
}

// Action creators

type UsersReducerActionsTypes = InferActionsTypes<typeof actionsUsersReducer>

export const actionsUsersReducer = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_IN_PROGRESS', isFetching, userId
    } as const),
}


// Thunk creators



type ThunkType = BasicThunkType<UsersReducerActionsTypes>


export const getUsersThunk = (currentPage: number, pageSize: number): ThunkType => {

    return async (dispatch, getState) => {
        dispatch(actionsUsersReducer.toggleIsFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actionsUsersReducer.toggleIsFetching(false));
        dispatch(actionsUsersReducer.setUsers(response.items));
        dispatch(actionsUsersReducer.setTotalUsersCount(response.totalCount));
    }
}

export const getFriendsThunk = (currentPage: number, pageSizeFriends: number, friend: boolean): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actionsUsersReducer.toggleIsFetching(true));
        let response = await usersAPI.getFriends(currentPage, pageSizeFriends, friend);
        dispatch(actionsUsersReducer.toggleIsFetching(false));
        dispatch(actionsUsersReducer.setUsers(response.items));
        dispatch(actionsUsersReducer.setTotalUsersCount(response.totalCount));
    }
}

const followUnfollowFlow = async (
    dispatch: Dispatch<UsersReducerActionsTypes>, 
    userId: number, 
    apiMethod: any, 
    actionCreator: (userId: number) => UsersReducerActionsTypes) => {

    dispatch(actionsUsersReducer.toggleIsFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodeEnums.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actionsUsersReducer.toggleIsFollowingInProgress(false, userId));

}

export const unfollowThunk = (userId: number) => async (dispatch: Dispatch<UsersReducerActionsTypes>) => {
    followUnfollowFlow(dispatch, userId, usersAPI.deleteUnfollow.bind(usersAPI), actionsUsersReducer.unfollow);
}

export const followThunk = (userId: number) => async (dispatch: Dispatch<UsersReducerActionsTypes>) => {
    followUnfollowFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), actionsUsersReducer.follow);
}



export default usersReducer;
import { APIResponseType } from './../api/api'
import { UserType } from './../types/types'
import { ResultCodeEnums } from '../api/api'
import { BasicThunkType, InferActionsTypes } from './redux-store'
import { usersAPI } from '../api/users-api'
import { Dispatch } from 'redux'

let initialStateUsersReducer = {
  users: [] as Array<UserType>,
  pageSize: 100,
  pageSizeFriends: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, // Array of users ids
  filter: {
    term: '',
    friend: null as null | boolean,
  },
}

export type InitialStateUsersReducerType = typeof initialStateUsersReducer
export type FilterType = typeof initialStateUsersReducer.filter

const usersReducer = (
  state = initialStateUsersReducer,
  action: UsersReducerActionsTypes
): InitialStateUsersReducerType => {
  switch (action.type) {
    case 'users/follow': {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true }
          }
          return u
        }),
      }
    }
    case 'users/unfollow': {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false }
          }
          return u
        }),
      }
    }
    case 'users/set_users': {
      return {
        ...state,
        users: action.users,
      }
    }
    case 'users/set_current_page': {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case 'users/set_total_users_count': {
      return {
        ...state,
        totalUsersCount: action.count,
      }
    }
    case 'users/toggle_is_fetching': {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case 'users/toggle_is_following_in_progress': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      }
    }

    case 'users/set_filter': {
      return {
        ...state,
        filter: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

// Action creators

type UsersReducerActionsTypes = InferActionsTypes<typeof actionsUsersReducer>

export const actionsUsersReducer = {
  follow: (userId: number) => ({ type: 'users/follow', userId } as const),
  unfollow: (userId: number) => ({ type: 'users/unfollow', userId } as const),
  setUsers: (users: Array<UserType>) =>
    ({ type: 'users/set_users', users } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: 'users/set_current_page', currentPage } as const),
  setFilter: (filter: FilterType) =>
    ({ type: 'users/set_filter', payload: filter } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({ type: 'users/set_total_users_count', count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: 'users/toggle_is_fetching', isFetching } as const),
  toggleIsFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'users/toggle_is_following_in_progress',
      isFetching,
      userId,
    } as const),
}

// Thunk creators

type ThunkType = BasicThunkType<UsersReducerActionsTypes>

export const getUsersThunk = (
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actionsUsersReducer.toggleIsFetching(true))
    dispatch(actionsUsersReducer.setFilter(filter))
    let response = await usersAPI.getUsers(
      currentPage,
      pageSize,
      filter.term,
      filter.friend
    )
    dispatch(actionsUsersReducer.toggleIsFetching(false))
    dispatch(actionsUsersReducer.setUsers(response.items))
    dispatch(actionsUsersReducer.setTotalUsersCount(response.totalCount))
  }
}

export const getFriendsThunk = (
  currentPage: number,
  pageSizeFriends: number,
  friend: boolean
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actionsUsersReducer.toggleIsFetching(true))
    let response = await usersAPI.getFriends(
      currentPage,
      pageSizeFriends,
      friend
    )
    dispatch(actionsUsersReducer.toggleIsFetching(false))
    dispatch(actionsUsersReducer.setUsers(response.items))
    dispatch(actionsUsersReducer.setTotalUsersCount(response.totalCount))
  }
}

const _followUnfollowFlow = async (
  dispatch: Dispatch<UsersReducerActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => UsersReducerActionsTypes
) => {
  dispatch(actionsUsersReducer.toggleIsFollowingInProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.resultCode === ResultCodeEnums.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actionsUsersReducer.toggleIsFollowingInProgress(false, userId))
}

export const unfollowThunk = (userId: number) => async (
  dispatch: Dispatch<UsersReducerActionsTypes>
) => {
  await _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.deleteUnfollow.bind(usersAPI),
    actionsUsersReducer.unfollow
  )
}

export const followThunk = (userId: number) => async (
  dispatch: Dispatch<UsersReducerActionsTypes>
) => {
  await _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.postFollow.bind(usersAPI),
    actionsUsersReducer.follow
  )
}

export default usersReducer

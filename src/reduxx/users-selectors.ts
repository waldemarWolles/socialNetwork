import { AppRootStateType } from './redux-store';
import { createSelector } from "reselect";

export const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true);
    });

export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize;
}
export const getPageSizeFriends = (state: AppRootStateType) => {
    return state.usersPage.pageSizeFriends;
}

export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state: AppRootStateType) => {
    return state.usersPage.filter;
}

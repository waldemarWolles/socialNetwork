import { UserType } from '../types/types';
import { instance, APIResponseType } from './api';


type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number 
    error: string 
}


export const usersAPI = {
    getUsers: (currentPage: number = 1, pageSize: number = 10) => {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });

    },

    getFriends: (currentPageFriends: number = 1, pageSizeFriends: number = 10, friend: boolean = true) => {
        return instance.get<GetUsersResponseType>(`users?page=${currentPageFriends}&count=${pageSizeFriends}&friend=${friend}`)
            .then(response => {
                return response.data
            });

    },

    deleteUnfollow: (id: number = 2) => {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => {
                return response.data
            });
    },

    postFollow: (id: number = 2) => {
        return instance.post<APIResponseType>(`follow/${id}`, {})
            .then(response => {
                return response.data
            });
    }
}




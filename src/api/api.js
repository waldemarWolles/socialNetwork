import * as axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '706fad94-0cd0-4565-8db0-3b78dd0a8c25'
    },
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
})


export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10 ) => {
        debugger;
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            debugger;
          return response.data
          
        });
        
    },

    getFriends: (currentPageFriends = 1, pageSizeFriends = 10, friend = true) => {
        debugger;
        return instance.get(`users?page=${currentPageFriends}&count=${pageSizeFriends}&friend=${friend}`)
        .then(response => {
            debugger;
          return response.data
          
        });
        
    },

    deleteUnfollow: (id = 2) => {
        return instance.delete(`follow/${id}`)
        .then(response => {
            return response.data
        });
    },

    postFollow: (id = 2) => {
        return instance.post(`follow/${id}`, {})
        .then(response => {
            return response.data
        });
    }
}



export const authAPI = {
    getAuth:  () => {
        return instance.get(`auth/me`)
        .then(response => {
          return response.data
        });
    },

    login: (email, password, rememberMe = false, captcha = null) => {
        return instance.post(`auth/login`,{
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        })
        .then(response => {
            return response.data
          });
    },

    logout: () => {
        return instance.delete(`auth/login`)
        .then(response => {
            return response.data
          });
    }
}

export const securityAPI = {
    getCaptcha:  () => {
        return instance.get(`security/get-captcha-url`)
        .then(response => {
          return response.data
        });
    },
}


export const profileAPI = {
    getProfile:  (userId) => {
        debugger;
        return instance.get(`profile/${userId}`)
        
        .then(response => {
            debugger;
          return response.data
        });
    },
    getStatus:  (userId) => {
        return instance.get(`profile/status/${userId}`)
        .then(response => {
          return response.data
        });
    },
    updateStatus:  (status) => {
        return instance.put(`profile/status`,{
            status: status
        })
        .then(response => {
          return response.data
        });
    },
    savePhoto:  (photoFile) => {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData)
        .then(response => {
          return response.data
        });
    },

    saveProfile:  (profile) => {
        return instance.put(`profile`, profile)
        .then(response => {
          return response.data
        });
    },

}




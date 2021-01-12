import { ResultCodeCaptchaEnum, instance, APIResponseType, ResultCodeEnums } from './api';


type GetAuthDataResponseType = {
    id: number
    email: string
    login: string
}

type LoginDataResponseType = {
    userId: number
}


export const authAPI = {
    getAuth: () => {
        debugger
        return instance.get<APIResponseType<GetAuthDataResponseType>>(`auth/me`)
            .then(response => {
                debugger
                return response.data
            });
    },

    login: (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) => {
        debugger
        return instance.post<APIResponseType<LoginDataResponseType, ResultCodeEnums | ResultCodeCaptchaEnum>>(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        })
            .then(response => {
                debugger
                return response.data
            });
    },

    logout: async function () {
        debugger;
        const response = await instance.delete<APIResponseType>(`auth/login`);
        debugger;
        return response.data;
    }
}


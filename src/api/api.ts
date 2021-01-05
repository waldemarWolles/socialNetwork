import axios from 'axios';


export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '706fad94-0cd0-4565-8db0-3b78dd0a8c25'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export enum ResultCodeEnums {
    Success = 0,
    Error = 1,
}

export enum ResultCodeCaptchaEnum {
   Captcha = 10
}

export type APIResponseType<D = {}, RC = ResultCodeEnums> = {
    data: D
    resultCode: RC
    messages: Array<string>
}


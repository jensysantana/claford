import apiInterceptor from '../../../interceptor/api-interceptor.js';
const { clafordServer } = process.env.SERVERS;
const { apiBase, servUrl } = clafordServer;

export default {
    SETTINGS: {
        setUserLang: (data) => apiInterceptor({
            // baseURL: servUrl,
            url: `/set-user-lang`,
            data: {},
            method: 'post',
            "Accept-Language": data.code
        }),
        // activateAcc: ({ token, reCaptch }) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/activate-account-from-token`,
        //     data: {
        //         reCaptch
        //     },
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': token
        //     },
        // }),
        // resendEmailActivationFromToken: ({ token, reCaptch }) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/resend-mail-to-activate-account-from-token`,
        //     data: {
        //         reCaptch
        //     },
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': token
        //     },
        // }),
        // signIn: (data) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth`,
        //     data,
        //     method: 'post',
        // }),
        // startAccountRecovery: (data) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/start-recovery-account`,
        //     data,
        //     method: 'post'
        // }),
        // resetPassFromToken: ({ payload: { token, ...rest } }) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/reset-password-from-token`,
        //     data: rest,
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': token
        //     },
        // }),
        // setNewPassFromToken: ({ payload: {isToken, ...rest } }) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/set-password-from-otp`,
        //     data: rest,
        //     method: 'post'
        // }),
        // resetPassFromOTP: ({ payload: {...rest } }) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/get-reset-password-from-otp`,
        //     data: rest,
        //     method: 'post',
        // }),
        // confirmOTPExists: ({ payload: {...rest } }) => apiInterceptor({
        //     baseURL: authServer.servUrl,
        //     url: `${authServer.apiBase}/auth/get-confirm-otp-exists`,
        //     data: rest,
        //     method: 'post',
        // }),

        // accRecoveryPass: (data) => apiInterceptor({
        //     url: `${apiBase}/auth/recovery-password-from-email`,
        //     data,
        //     method: 'post'
        // }),
        // accRecoveryFromPhone: (data) => apiInterceptor({
        //     url: `${apiBase}/auth/recovery-from-phone?uaid=${data}`,
        //     method: 'get'
        // }),
        // getCsrf: () => apiInterceptor({
        //     //https://stackoverflow.com/questions/20504846/why-is-it-common-to-put-csrf-prevention-tokens-in-cookies
        //     url: `/csrf`,
        //     method: 'get'
        // }),
        // getCsrfAuth: () => apiInterceptor({
        //     //https://stackoverflow.com/questions/20504846/why-is-it-common-to-put-csrf-prevention-tokens-in-cookies
        //     url: `/csrf`,
        //     baseURL: authServer.servUrl,
        //     method: 'get'
        // })
        // getCsrf: () => {
        //     return {
        //         jname: 'jensy santana'
        //     }
        // },

    }
}
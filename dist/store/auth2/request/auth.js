import apiInterceptor from '../../../interceptor/api-interceptor';
const { authServer } = process.env.SERVERS;
export default {
    AUTH: {
        getCsrfAuth: () => apiInterceptor({
            //https://stackoverflow.com/questions/20504846/why-is-it-common-to-put-csrf-prevention-tokens-in-cookies
            url: `/csrf`,
            baseURL: authServer.servUrl,
            method: 'get',
            headers: {

            }
        }),
        sendMailToRecoverAccFromEmail: ({ csrf, lang, ...rest }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/resend-mail-to-activate-account-from-email`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        activateAcc: ({ csrf, token, reCaptch, lang, ...rest }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/activate-account-from-token`,
            data: {
                reCaptch
            },
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        resendEmailActivationFromToken: ({ csrf, token, lang, reCaptch }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/resend-mail-to-activate-account-from-token`,
            data: {
                reCaptch
            },
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        signIn: ({ csrf, lang, ...rest }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        signInFromGoogle: ({ csrf, lang, ...rest }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/google`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        signInFromFaceboock: ({ csrf, lang, ...rest }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/facebook`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        startAccountRecovery: ({ csrf, lang, ...rest }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/start-recovery-account`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        resetPassFromToken: ({ payload: { csrf, lang, token, ...rest } }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/reset-password-from-token`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        setNewPassFromOTP: ({ payload: { isToken, csrf, lang, ...rest } }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/set-password-from-otp`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },

        }),
        resetPassFromOTP: ({ payload: { csrf, lang, ...rest } }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/get-otp-account-recovery`, ///get-reset-password-from-otp
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),
        confirmOTPExists: ({ payload: { csrf, lang, ...rest } }) => apiInterceptor({
            baseURL: authServer.servUrl,
            url: `${authServer.apiBase}/auth/confirm-otp-exists`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf,
                "Accept-Language": lang.code
            },
        }),

        // accRecoveryPass: (data) => apiInterceptor({
        //     url: `${apiBase}/auth/recovery-password-from-email`,
        //     data,
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'csrf-token': csrf
        //     },
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

        // getCsrf: () => {
        //     return {
        //         jname: 'jensy santana'
        //     }
        // },

    }
}
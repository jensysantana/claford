import apiInterceptor from '../../../interceptor/api-interceptor';
const { clafordServer: { apiBase } } = process.env.SERVERS;

export default {
    CATEGORY: {
        getCategories: ({ csrf, ...rest }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/category`,
            data: rest,
            method: 'get',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'csrf-token': csrf
            // },
        }),
        activateAcc: ({ csrf, token, reCaptch, ...rest }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/activate-account-from-token`,
            data: {
                reCaptch
            },
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'csrf-token': csrf
            },
        }),
        resendEmailActivationFromToken: ({ csrf, token, reCaptch }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/resend-mail-to-activate-account-from-token`,
            data: {
                reCaptch
            },
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'csrf-token': csrf
            },
        }),
        signIn: ({ csrf, ...rest }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
        }),
        startAccountRecovery: ({ csrf, ...rest }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/start-recovery-account`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
        }),
        resetPassFromToken: ({ payload: { csrf, token, ...rest } }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/reset-password-from-token`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'csrf-token': csrf
            },
        }),
        setNewPassFromOTP: ({ payload: { isToken, csrf, ...rest } }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/set-password-from-otp`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },

        }),
        resetPassFromOTP: ({ payload: { csrf, ...rest } }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/get-reset-password-from-otp`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
        }),
        confirmOTPExists: ({ payload: { csrf, ...rest } }) => apiInterceptor({
            // baseURL: servUrl,
            url: `${apiBase}/auth/get-confirm-otp-exists`,
            data: rest,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
        }),

    }
}




// import apiInterceptor from '../interceptor/api-interceptor'
// const CATEGORIES_API = {

//     categories: {
//         getCategories: () => apiInterceptor({
//             url: '/category',
//             method: 'get',
//             headers: {
//                 "Content-Type": "application/json",
//                 // "AUTH_TOKEN_X": true,
//                 // "AUTH_ROLE":true
//             },
//         }),
//         getTopMonthCategories: (param1, param2) => apiInterceptor({
//             url: `/category/top-categories-of-the-month`,
//             method: 'get',
//             data: null,
//             // headers: {
//             //     "Content-Type": "application/json",
//             //     "AUTH_TOKEN_X": true,
//             //     "AUTH_ROLE":true
//             // },
//         }),

//         getMonthGrayCategories: (param1, param2) => apiInterceptor({
//             url: `/category/gray-categories-of-the-month`,
//             method: 'get',
//             data: null,
//             // headers: {
//             //     "Content-Type": "application/json",
//             //     "AUTH_TOKEN_X": true,
//             //     "AUTH_ROLE":true
//             // },
//         }),
//         patchSetCategory: (param1) => apiInterceptor({
//             url: `/category/set-viewed/${param1}`,
//             method: 'patch',
//             data: null,
//         }),

//     }
// }

// export default CATEGORIES_API;
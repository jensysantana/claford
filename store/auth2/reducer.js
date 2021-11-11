import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

export const signIn = {

    signIn: handleActions({
        [actionTypes.LOGIN_SUCCESS]: (state, { payload: { fields, message, name, status, user, ...action } }) => {
            return {
                hasError: false,
                isLoggedIn: true,
                user: user,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.LOGIN_FAILED]: (state, { response: { status, data } }) => {
            return {
                ...data,
                status,
                user: null,
                hasError: true,
                isLoggedIn: false,
            };
        },
        [actionTypes.LOGIN_CLENER]: (state, payload) => {
            return {
                user: null,
                hasError: true,
                isLoggedIn: false,
            };
        },
    }, {
        user: null,
        isLoggedIn: false,
        hasError: false
    }),
    startRecoveryAcc: handleActions({
        [actionTypes.START_RECOVERY_ACC_SUCCESS]: (state, { payload: { fields, message, name, status, dataDB, ...action } }) => {
            return {
                hasError: false,
                user: dataDB,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.START_RECOVERY_ACC_FAILED]: (state, { status, data }) => {
            return {
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
        [actionTypes.START_RECOVERY_ACC_CLEAN]: (state, payload) => {
            return {
                user: null,
                hasError: true,
                message: ''
            };
        },
    }, {
        hasError: false,
    }),
    resendEmail: handleActions({
        [actionTypes.RESEND_EMAIL_ACC_ACTIVATION_SUCCESS]: (state, { payload: { fields, message, name, status } }) => {
            return {
                hasError: false,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.RESEND_EMAIL_ACC_ACTIVATION_FAILED]: (state, { status, data }) => {
            return {
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
        [actionTypes.RESEND_EMAIL_ACC_ACTIVATION_CLEAN]: (state, payload) => {
            return {
                user: null,
                hasError: false,
                message: ''
            };
        },
    }, {
        hasError: false,
        message: ''
    }),
    resetPassword: handleActions({
        [actionTypes.PASSWORD_RESET_SUCCESS]: (state, payload) => {
            const { fields, message, name, status } = payload;
            return {
                hasError: false,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.PASSWORD_RESET_FAILED]: (state, { status, data }) => {
            return {
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
        // [actionTypes.]: (state, payload) => {
        //     return {
        //         user: null,
        //         hasError: false,
        //         message: ''
        //     };
        // },
    }, {
        hasError: false,
        message: ''
    }),
    resetPasswordFromOTP: handleActions({
        [actionTypes.PASSWORD_RESET_FROM_OTP_SUCCESS]: (state, payload) => {
            const { fields, message, name, status } = payload;
            return {
                hasError: false,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.PASSWORD_RESET_FROM_OTP_FAILED]: (state, { status, data }) => {
            return {
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
        [actionTypes.PASSWORD_RESET_FROM_OTP_RESTART]: (state, payload) => {
            return {
                user: null,
                hasError: false,
                message: ''
            };
        },
    }, {
        hasError: false,
        message: ''
    }),
    confOTPExists: handleActions({
        [actionTypes.CONFIRM_OTP_EXISTS_SUCCESS]: (state, payload) => {
            const { fields, message, name, status } = payload;
            return {
                hasError: false,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.CONFIRM_OTP_EXISTS_FAILED]: (state, { status, data }) => {
            return {
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
    }, {
        hasError: false,
        message: ''
    }),



    // signUp: handleActions({
    //     [SIGNUP]: (state, action) => {
    //         return { ...state, signUp: action };
    //     }
    // }, { signUp: [] }),

    // accountValidate: handleActions({
    //     [ACCOUNTVALIDATEBYTOKEN]: (state, action) => {
    //         return { ...state, accValidate: action };
    //     }
    // }, { accValidate: [] }),
    // accountRecoveryPassword: handleActions({
    //     [ACCOUNTRECOVERYPASSWORD]: (state, action) => {
    //         return { ...state, accRecovery: action };
    //     }
    // }, { accRecovery: [] }),
    // accountRecoveryFromPhone: handleActions({
    //     [ACCOUNTRECOVERYPASSWORDFROMPHONE]: (state, action) => {
    //         return { ...state, recFromPhone: action };
    //     }
    // }, { recFromPhone: [] }),
    // accountResetPassword: handleActions({
    //     [ACCOUNTPASSWORDRESET]: (state, action) => {
    //         return { ...state, accRereset: action };
    //     }
    // }, { accRereset: [] }),
    // isLogedAccount: handleActions({
    //     [ISACCOUNTLOGED]: (state, action) => {
    //         return { ...state, isLoged: action };
    //     }
    // }, { isLoged: false }),
    // getCsrf: handleActions({
    //     [GETCSRF]: (state, action) => {
    //         return { ...state, csrfToken: action };
    //     }
    // }, { csrfToken: '' }),
}


/*
export const reducer = {
    loginSuccess: handleActions({
        [actionTypes.LOGIN_SUCCESS]: (state, action) => {
            return { ...state, isLoggedIn: action };
        }
    }, { isLoggedIn: false }),

    getCsrf: handleActions({
        [GETCSRF]: (state, action) => {
            return { ...state, csrfToken: action };
        }
    }, { csrfToken: '' }),
}
*/
// export default reducer;

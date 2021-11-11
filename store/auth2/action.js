export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGIN_CLENER: 'LOGIN_CLENER',

    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    START_RECOVERY_ACC_REQUEST: 'START_RECOVERY_ACC_REQUEST',
    START_RECOVERY_ACC_FAILED: 'START_RECOVERY_ACC_FAILED',
    START_RECOVERY_ACC_SUCCESS: 'START_RECOVERY_ACC_SUCCESS',
    START_RECOVERY_ACC_CLEAN: 'START_RECOVERY_ACC_CLEAN',

    RESEND_EMAIL_ACC_ACTIVATION_REQUEST: 'RESEND_EMAIL_ACC_ACTIVATION_REQUEST',
    RESEND_EMAIL_ACC_ACTIVATION_SUCCESS: 'RESEND_EMAIL_ACC_ACTIVATION_SUCCESS',
    RESEND_EMAIL_ACC_ACTIVATION_FAILED: 'RESEND_EMAIL_ACC_ACTIVATION_FAILED',
    RESEND_EMAIL_ACC_ACTIVATION_CLEAN: 'RESEND_EMAIL_ACC_ACTIVATION_CLEAN',

    PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
    PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED',
    PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS',

    PASSWORD_RESET_FROM_OTP_REQUEST: 'PASSWORD_RESET_FROM_OTP_REQUEST',
    PASSWORD_RESET_FROM_OTP_FAILED: 'PASSWORD_RESET_FROM_OTP_FAILED',
    PASSWORD_RESET_FROM_OTP_SUCCESS: 'PASSWORD_RESET_FROM_OTP_SUCCESS',
    PASSWORD_RESET_FROM_OTP_RESTART: 'PASSWORD_RESET_FROM_OTP_RESTART',

    CONFIRM_OTP_EXISTS_REQUEST: 'CONFIRM_OTP_EXISTS_REQUEST',
    CONFIRM_OTP_EXISTS_FAILED: 'CONFIRM_OTP_EXISTS_FAILED',
    CONFIRM_OTP_EXISTS_SUCCESS: 'CONFIRM_OTP_EXISTS_SUCCESS',

    // SET_NEW_PASSWORD_REQUEST: 'SET_NEW_PASSWORD_REQUEST',
    // SET_NEW_PASSWORD_FAILED: 'SET_NEW_PASSWORD_FAILED',
    // SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS',
};

//LOGIN
export function login(payload) {
    return { type: actionTypes.LOGIN_REQUEST, payload }
}

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS, payload }
}
export function loginCleaner() {
    return { type: actionTypes.LOGIN_CLENER }
}
// LOGOUT 
export function logOut() {
    return { type: actionTypes.LOGOUT }
}

//CAN SEND NEW EMAIL OR PHONE RECOVERY ACCOUNT
// export function accountExistsAction(payload) {
export function startRecoveryAccountAction(payload) {
    return { type: actionTypes.START_RECOVERY_ACC_REQUEST, payload };
}
export function startRecoveryAccountFailed(payload) {
    return { type: actionTypes.START_RECOVERY_ACC_FAILED, payload };
}

export function startRecoveryAccountSuccess(payload) {
    return { type: actionTypes.START_RECOVERY_ACC_SUCCESS, payload };
}
export function startRecoveryAccountActionReset(payload) {
    return { type: actionTypes.START_RECOVERY_ACC_CLEAN, payload };
}

//RESEND EMAIL 
export function sendMailRecoveryAccountFromEmailAction(payload) {
    return { type: actionTypes.RESEND_EMAIL_ACC_ACTIVATION_REQUEST, payload };
}
export function resendActivationAccountActionFailed(payload) {
    return { type: actionTypes.RESEND_EMAIL_ACC_ACTIVATION_FAILED, payload };
}

export function resendActivationAccountActionSuccess(payload) {
    return { type: actionTypes.RESEND_EMAIL_ACC_ACTIVATION_SUCCESS, payload };
}
export function resendActivationAccountActionClean() {
    return { type: actionTypes.RESEND_EMAIL_ACC_ACTIVATION_CLEAN, payload: {} };
}

//PASSWORD RESET
export function passwordResetAction(payload) {
    return { type: actionTypes.PASSWORD_RESET_REQUEST, payload };
}
export function passwordResetActionFailed(payload) {
    return { type: actionTypes.PASSWORD_RESET_FAILED, payload };
}
export function passwordResetActionSuccess(payload) {
    return { type: actionTypes.PASSWORD_RESET_SUCCESS, ...payload };
}
//->sms password reset
export function passwordResetFromOTPAction(payload) {
    return { type: actionTypes.PASSWORD_RESET_FROM_OTP_REQUEST, payload };
}
export function passwordResetFromOTPActionFailed(payload) {
    return { type: actionTypes.PASSWORD_RESET_FROM_OTP_FAILED, payload };
}
export function passwordResetFromOTPActionSuccess(payload) {
    return { type: actionTypes.PASSWORD_RESET_FROM_OTP_SUCCESS, ...payload };
}
export function passwordResetFromOTPActionRestart() {
    return { type: actionTypes.PASSWORD_RESET_FROM_OTP_RESTART, payload: {} };
}
//-> confirmOTPExists
export function confirmOTPExistsAction(payload) {
    return { type: actionTypes.CONFIRM_OTP_EXISTS_REQUEST, payload };
}
export function confirmOTPExistsActionFailed(payload) {
    return { type: actionTypes.CONFIRM_OTP_EXISTS_FAILED, ...payload };
}
export function confirmOTPExistsActionSuccess(payload) {
    return { type: actionTypes.CONFIRM_OTP_EXISTS_SUCCESS, ...payload };
}
//-> set new password

// export function setNewPasswordAction(payload) {
//     return { type: actionTypes.SET_NEW_PASSWORD_REQUEST, payload };
// }
// export function setNewPasswordActionFailed(payload) {
//     return { type: actionTypes.SET_NEW_PASSWORD_FAILED, payload };
// }
// export function setNewPasswordActionSuccess(payload) {
//     return { type: actionTypes.SET_NEW_PASSWORD_SUCCESS, ...payload };
// }


// export function passwordResetActionReset() {
//     return {type: actionTypes.PASSWORD_RESET_REQUEST, payload:{} };
// }
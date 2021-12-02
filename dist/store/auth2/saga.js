import { all, put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    startRecoveryAccountSuccess,
    actionTypes,
    loginSuccess,
    resendActivationAccountActionSuccess,
    passwordResetActionSuccess,
    passwordResetFromOTPActionSuccess,
    confirmOTPExistsActionSuccess
} from './action';
import Api from './request/auth';

function* loginSaga({ payload }) {

    try {
        const { loginFrom, ...rest } = payload;

        // console.log(' 111111 -----------------22222------loginFrom-------------------------');
        // console.log(loginFrom)
        // console.log(' 2222222 ---------------3333--------loginFrom-------------------------');
        let apiResp;
        if (loginFrom === 'local') {
            apiResp = yield call(Api.AUTH.signIn, rest);
        }
        if (loginFrom === 'google') {
            apiResp = yield call(Api.AUTH.signInFromGoogle, rest);

            console.log(' 111111 --------------sagagGAGAGAGAAG---------apiResp-------------------------');
            console.log(apiResp)
            console.log(' 2222222 ---------------sagagGAGAGAGAAG--------apiResp-------------------------');
        }
        if (loginFrom === 'facebook') {
            apiResp = yield call(Api.AUTH.signInFromFaceboock, rest);

            console.log(' 111111 --------------SAGA RESPONSE signInFromFaceboock---------apiResp-------------------------');
            console.log(apiResp)
            console.log(' 2222222 ---------------SAGA RESPONSE signInFromFaceboock--------apiResp-------------------------');
        }
        const { data, status } = apiResp;
        yield put(loginSuccess({
            ...data,
            status
        }));
    } catch (err) {
        yield put({ type: actionTypes.LOGIN_FAILED, ...err });
    }
}
function* startRecoveryAccountSaga({ payload }) {
    try {
        const apiResp = yield call(Api.AUTH.startAccountRecovery, payload);
        const { data, status } = apiResp;
        yield put(startRecoveryAccountSuccess({
            ...data,
            status
        }));
    } catch (err) {

        yield put({ type: actionTypes.START_RECOVERY_ACC_FAILED, ...err.response });
    }
}

function* setResendEmailToActivateAccSaga({ payload }) {
    try {
        const apiResp = yield call(Api.AUTH.sendMailToRecoverAccFromEmail, payload);
        const { data, status } = apiResp;
        yield put(resendActivationAccountActionSuccess({
            ...data,
            status
        }));
    } catch (err) {
        yield put({ type: actionTypes.RESEND_EMAIL_ACC_ACTIVATION_FAILED, ...err.response });
    }
}

function* passwordResetSaga(payload) {
    try {
        let apiResp;
        if (payload.payload.isToken) {
            apiResp = yield call(Api.AUTH.resetPassFromToken, payload);
        } else {
            apiResp = yield call(Api.AUTH.setNewPassFromOTP, payload);
        }
        const { data, status } = apiResp;
        yield put(passwordResetActionSuccess({
            ...data,
            status
        }));
    } catch (err) {
        yield put({ type: actionTypes.PASSWORD_RESET_FAILED, ...err.response });
    }
}
function* passwordResetFromOTPSaga(payload) {
    try {
        const apiResp = yield call(Api.AUTH.resetPassFromOTP, payload);
        const { data, status } = apiResp;
        yield put(passwordResetFromOTPActionSuccess({
            ...data,
            status
        }));
    } catch (err) {
        yield put({ type: actionTypes.PASSWORD_RESET_FROM_OTP_FAILED, ...err.response });
    }
}
function* confirmExistsOTPSaga(payload) {
    try {
        const apiResp = yield call(Api.AUTH.confirmOTPExists, payload);
        const { data, status } = apiResp;
        yield put(confirmOTPExistsActionSuccess({
            ...data,
            status
        }));
    } catch (err) {
        yield put({ type: actionTypes.CONFIRM_OTP_EXISTS_FAILED, ...err.response });
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.START_RECOVERY_ACC_REQUEST, startRecoveryAccountSaga)]);
    yield all([takeLatest(actionTypes.RESEND_EMAIL_ACC_ACTIVATION_REQUEST, setResendEmailToActivateAccSaga)]);
    yield all([takeLatest(actionTypes.PASSWORD_RESET_REQUEST, passwordResetSaga)]);
    yield all([takeLatest(actionTypes.PASSWORD_RESET_FROM_OTP_REQUEST, passwordResetFromOTPSaga)]);
    yield all([takeLatest(actionTypes.CONFIRM_OTP_EXISTS_REQUEST, confirmExistsOTPSaga)]);
}

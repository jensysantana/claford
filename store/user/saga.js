import { all, put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { actionTypes, userSignUpActionSuccess } from './action.js';
import Api from './request.js';

function* setSignUpSaga({ payload }) {

    try {
        const apiResp = yield call(Api.USER_ACCOUNT.signUp, payload);
        const { data, status } = apiResp;
        yield put(userSignUpActionSuccess({
            ...data,
            status
        }));
    } catch (err) {
        yield put({ type: actionTypes.USER_REQUEST_FAILED, errors: err });
    }
}

// function* logOutSaga() {
//     try {
//         yield put(logOutSuccess());
//         modalWarning('warning');
//     } catch (err) {
//         console.log(err);
//     }
// }

// yield all([takeLatest(actionTypes.LOGIN_SUCCESS, loginSaga)]);
export default function* rootSaga() {
    yield all([takeLatest(actionTypes.USER_REQUEST_SIGNUP, setSignUpSaga)]);
}
// yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
// yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
// yield all([takeLatest(actionTypes.CSRF_REQUEST, csrrftokenSaga)]);
// yield takeEvery(actionTypes.USER_REQUEST_SIGNUP, setSignUpSaga)

import { all, put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import { actionTypes, changeCurrencySuccess, setUserLangSuccess } from './action';
import Api from './request/settings';

function* changeCurrencySaga({ currency }) {
    try {
        yield put(changeCurrencySuccess(currency));
    } catch (err) {
        console.error(err);
    }
}

function* setUserLang(payload) {
    console.log(' 111111 --------------setUserLang---------payload-------------------------');
    console.log(payload)
    console.log(' 2222222 -----------setUserLang------------payload-------------------------');
    try {
        const apiResp = yield call(Api.SETTINGS.setUserLang, payload.lang.code);
        const { data, status } = apiResp;

        yield put(setUserLangSuccess({
            ...data,
            status,
            lang: payload.lang
        }));

    } catch (error) {
        yield put({ type: actionTypes.SET_USER_LANG_FAILED, ...error.response, lang: payload.lang });
    }

}
// function* setUserLang(payload) {
//     // console.log(' 111111 -----------------------setUserLang(payload)-------------------------');
//     // console.log(payload)
//     // console.log(' 2222222 -----------------------setUserLang(payload)-------------------------');
//     try {
//         const apiResp = yield call(Api.SETTINGS.setUserLang, payload.code);
//         const { data, status } = apiResp;
//         yield put(setUserLangSuccess({
//             ...data,
//             status
//         }));

//         // yield put(setUserLangSuccess(payload));

//     } catch (err) {
//         console.log(' 111111 -----------------------error-------------------------');
//         console.log(err)
//         console.log(' 2222222 -----------------------error-------------------------');
//         yield put({ type: actionTypes.SET_USER_LANG_FAILED, ...err });
//     }

// }
export default function* rootSaga() {
    yield all([takeEvery(actionTypes.CHANGE_CURRENCY, changeCurrencySaga)]);
    yield all([takeLatest(actionTypes.SET_USER_LANG_REQUEST, setUserLang)]);
}

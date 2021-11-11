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
function* setUserLang (payload) {

    try {
        const apiResp = yield call(Api.SETTINGS.setUserLang, payload);
        const { data, status } = apiResp;

        yield put(setUserLangSuccess({
            ...data,
            status
        }));
        
    } catch (error) {
        console.log(' 111111 -----------------------error-------------------------');
        console.log(error)
        console.log(' 2222222 -----------------------error-------------------------');
        yield put({ type: actionTypes.SET_USER_LANG_FAILED, ...error.response });
    }
    
}
export default function* rootSaga() {
    yield all([takeEvery(actionTypes.CHANGE_CURRENCY, changeCurrencySaga)]);
    yield all([takeLatest(actionTypes.SET_USER_LANG_REQUEST, setUserLang)]);
}

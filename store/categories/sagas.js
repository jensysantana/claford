import { takeLatest, call, put, all } from 'redux-saga/effects';
import { actionTypes, getCategoriesFailed, getCategoriesSuccess } from './action.js';
import Api from './request/categories.js';

function* getCategories(payload) {

    try {
        const apiResp = yield call(Api.CATEGORY.getCategories, payload);
        const { status, data } = apiResp;
        yield put(getCategoriesSuccess({
            status,
            ...data
        }));
    } catch (err) {
        console.log(' 111111 ----------getCategories-------------error-------------------------');
        console.log(err.response)
        console.log(' 2222222 --------getCategories---------------error-------------------------');
        yield put({
            type: actionTypes.CATEGORIES_FAILED, ...err.response
        })
        // yield put(getCategoriesFailed({
        //     type: actionTypes.CATEGORIES_FAILED, ...err.response
        // }));
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actionTypes.CATEGORIES_REQUEST, getCategories)])
}
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { actionTypes, getCategoriesFailed, getCategoriesSuccess } from './action';
import Api from './request/categories';

function* getCategories(payload) {

    try {
        const apiResp = yield call(Api.CATEGORY.getCategories, payload);
        const { status, data } = apiResp;
        yield put(getCategoriesSuccess({
            status,
            ...data
        }));
    } catch (err) {
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
import { all } from 'redux-saga/effects';
import SettingSaga from './setting/saga.js';
import AuthSaga from './auth2/saga.js';
// import AuthSaga from './auth/saga';
import App from './app/saga.js';
import Ecomerce from './ecomerce/saga.js';
import UserSaga from './user/saga.js';
import CategorySaga from './categories/sagas.js';
export default function* rootSaga() {
    yield all([
        SettingSaga(),
        AuthSaga(),
        App(),
        Ecomerce(),
        UserSaga(),
        CategorySaga()
    ]);
}
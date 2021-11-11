import { all } from 'redux-saga/effects';
import SettingSaga from './setting/saga';
import AuthSaga from './auth2/saga';
// import AuthSaga from './auth/saga';
import App from './app/saga';
import Ecomerce from './ecomerce/saga';
import UserSaga from './user/saga';

export default function* rootSaga() {
    yield all([SettingSaga(), AuthSaga(), App(), Ecomerce(), UserSaga()]);
}
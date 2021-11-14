import { persistReducer, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
// import auth from './auth/reducer';
// import setting from './setting/reducer';
// import app from './app/reducer';
// import ecomerce from './ecomerce/reducer';
// import auth from './auth/reducer';
import { signIn } from './auth2/reducer.js';
import setting, { settings } from './setting/reducer.js';
import app from './app/reducer.js';
import ecomerce from './ecomerce/reducer.js';
import user from './user/reducer.js';
import { CATEGORIES } from './categories/reducer.js';
const isClient = typeof window !== "undefined";
const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'setUserLang',
    ],
    blacklist: ['userSignedIn', 'resendEmail']
}

const rootReducer = combineReducers({
    // auth,
    userSignedIn: signIn.signIn,
    // userAccExists: persistReducer(authPersistConfig, signIn.accountExists),
    startRecoveryAcc: signIn.startRecoveryAcc,
    resendEmail: signIn.resendEmail,
    passwordReset: signIn.resetPassword,
    resetPasswordFromOTP: signIn.resetPasswordFromOTP,
    confOTPExists: signIn.confOTPExists,
    setUserLang: settings.setUserLang,
    category: CATEGORIES.category,
    setting,
    app,
    ecomerce,
    user
});

export default persistReducer(rootPersistConfig, rootReducer);

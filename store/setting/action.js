export const actionTypes = {
    CHANGE_CURRENCY: 'CHANGE_CURRENCY',
    CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',

    SET_USER_LANG_REQUEST:'SET_USER_LANG_REQUEST',
    SET_USER_LANG_FAILED:'SET_USER_LANG_FAILED',
    SET_USER_LANG_SUCCESS:'SET_USER_LANG_SUCCESS',
};

export function changeCurrency(currency) {
    return { type: actionTypes.CHANGE_CURRENCY, currency };
}

export function changeCurrencySuccess(currency) {
    return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}

export function setUserLangRequest(payload) {
    return {type: actionTypes.SET_USER_LANG_REQUEST, ...payload}
}
export function setUserLangFailed(payload) {
    return {type: actionTypes.SET_USER_LANG_FAILED, ...payload}
}
export function setUserLangSuccess(payload) {
    return {type: actionTypes.SET_USER_LANG_SUCCESS, ...payload}
}

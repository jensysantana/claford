import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

export const initialState = {
    currency: {
        symbol: '$',
        text: 'USD',
    },
};
export const initialLang = {
    code: 'en',
    id: 'afsdf103601',
    flagImg: 'en.png',
    name: 'English'
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENCY_SUCCESS:
            return {
                ...state,
                ...{ currency: action.currency },
            };
        default:
            return state;
    }
}

export const settings = {
    setUserLang: handleActions({
        [actionTypes.SET_USER_LANG_SUCCESS]: (state, payload) => {
            console.log(' 111111 -----------SET_USER_LANG_SUCCESS------------payload-------------------------');
            console.log(payload)
            console.log(state)
            console.log(' 2222222 ----------SET_USER_LANG_SUCCESS-------------payload-------------------------');
            const { fields, message, name, status, lang } = payload;
            return {
                ...state,
                lang: lang,
                hasError: false,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.SET_USER_LANG_FAILED]: (state, { status, data, lang }) => {
            return {
                lang: lang,
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
    }, {
        hasError: false,
        message: '',
        lang: initialLang,
    }),

}

export default reducer;

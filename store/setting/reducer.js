import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

export const initialState = {
    currency: {
        symbol: '$',
        text: 'USD',
    },
};

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
            console.log(' 111111 -----------------------payload-------------------------');
            console.log(payload)
            console.log(' 2222222 -----------------------payload-------------------------');
            const { fields, message, name, status } = payload;
            return {
                hasError: false,
                fields,
                message,
                name,
                status,
            }
        },
        [actionTypes.SET_USER_LANG_FAILED]: (state, { status, data }) => {

            console.log(' 111111 ----------------------- { status, data }-------------------------');
            console.log( { status, data })
            console.log(' 2222222 ----------------------- { status, data }-------------------------');
            return {
                ...data,
                status,
                user: null,
                hasError: true,
            };
        },
    }, {
        hasError: false,
        message: ''
    }),

}

export default reducer;

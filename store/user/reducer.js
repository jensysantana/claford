// import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

export const initState = {
    userSignUp: false,
    hasError: false
};

function reducer(state = initState, actions) {
    switch (actions.type) {
        case actionTypes.USER_REQUEST_SIGNUP_SUCCESS:
            // const { data, status } = actions;
            // console.log('actions: USER_REQUEST_SIGNUP_SUCCESS ', actions);
            return {
                // ...state,
                userSignUp: true,
                ...actions.payload,
                hasError: false
                // ...actions.data,
                // status: actions.status,
            };
        case actionTypes.USER_REQUEST_FAILED:
            const {
                type,
                errors: {
                    isAxiosError,
                    response: {
                        data,
                        status
                    }
                }
            } = actions;
            // console.log('actions: USER_REQUEST_FAILED', actions);
            return {
                // ...state,
                userSignUp: false,
                ...data,
                status,
                hasError: true
            };
        default:
            return state;
    }
}
/*
export const reducer = {
    loginSuccess: handleActions({
        [actionTypes.LOGIN_SUCCESS]: (state, action) => {
            return { ...state, isLoggedIn: action };
        }
    }, { isLoggedIn: false }),

    getCsrf: handleActions({
        [GETCSRF]: (state, action) => {
            return { ...state, csrfToken: action };
        }
    }, { csrfToken: '' }),
}
*/
export default reducer;

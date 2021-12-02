export const actionTypes = {
    USER_REQUEST_SIGNUP: 'USER_REQUEST_SIGNUP',
    USER_REQUEST_FAILED: 'USER_REQUEST_FAILED',
    USER_REQUEST_SIGNUP_SUCCESS: 'USER_REQUEST_SIGNUP_SUCCESS',
};
export function userSignUpAction(payload) {
    return { type: actionTypes.USER_REQUEST_SIGNUP, payload };
}
export function userSignUpActionFailed(payload) {
    return { type: actionTypes.USER_REQUEST_FAILED, payload };
}

export function userSignUpActionSuccess(payload) {
    return { type: actionTypes.USER_REQUEST_SIGNUP_SUCCESS, payload };
}

// get csrf token and execute in app.js
// export const GETCSRF = createAction('GETCSRF');
/*
export function getCsrfAction() {
    // export const getCsrfAction = () => async (dispatch) => {
    return { type: actionTypes.GETCSRF };
    try {
        const response = await Api.authentications.getCsrf();
        if (!response?.data) {
            throw new Error('Sorry, we can not process your request.');
        }

        if (response && response?.data) {
            return dispatch({ type: GETCSRF, csrfToken: response });
        }
    } catch (error) {
        throw error;
    }
}
*/
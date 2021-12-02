export const actionTypes = {
    CATEGORIES_REQUEST: 'CATEGORIES_REQUEST',
    CATEGORIES_FAILED: 'CATEGORIES_FAILED',
    CATEGORIES_SUCCESS: 'CATEGORIES_SUCCESS',
}

export function getCategories(payload){
    return {type: actionTypes.CATEGORIES_REQUEST, ...payload};
}
export function getCategoriesFailed(payload){
    return {type: actionTypes.CATEGORIES_FAILED, ...payload};
}
export function getCategoriesSuccess(payload){
    return {type: actionTypes.CATEGORIES_SUCCESS, payload};
}
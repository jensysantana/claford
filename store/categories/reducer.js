import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

export const CATEGORIES = {

    category: handleActions({

        [actionTypes.CATEGORIES_SUCCESS]: (state, { payload: { fields, message, name, status, categories, ...action } }) => {
            return {
                hasError: false,
                message,
                status,
                categories,
                name,
                fields,
            }
        },
        [actionTypes.CATEGORIES_FAILED]: (state, payload) => {
            return {
                hasError: true,
                status: 50000,
                categories: null,
                message: ' ERROR MESSAGE FAILED'
                // ...data,
                // isLoggedIn: false,
            };
        }
    }, {
        categories: null,
        hasError: false,
        message: '',
        fields: null
    }),
}


/*
export const CATEGORYLIST = createAction('CATEGORYLIST');
export const fetchCategoryListAction =(data) =>  async (dispatch)=>{

    try {
        const response = await Api.categories.getCategories()
        if (!response?.data || response?.status !== 200) {
            throw new Error('Sorry, we can not process your request.');
        }

        if (response && response?.data) {
            return dispatch({type: CATEGORYLIST, categoriesData:response?.data});
        }
    } catch (error) {
        throw error;
    }
}


export const SETVIEWEDCATEGORY = createAction('SETVIEWEDCATEGORY');

export const fetchCategorySetViewedAction = (data) =>  async (dispatch)=>{

    try {
        const response = await Api.categories.patchSetCategory(data);
        if (!response?.data || response?.status !== 200) {
            throw new Error('Sorry, we can not process your request.');
        }

        if (response && response?.data) {
            return dispatch({type: SETVIEWEDCATEGORY, categorySetViewed:response?.data});
        }
    } catch (error) {
        throw error;
    }
}

export const categoriesOfTheMonthAction =(param1, param2) =>  async (dispatch)=>{

    try {
        const response = await Api.categories.getTopMonthCategories(param1, param2)
        if (!response?.data || response?.status !== 200) {
            throw new Error('Sorry, we can not process your request.');
        }

        if (response && response?.data) {
            return dispatch({type: CATEGORIESOFTHEMONTH, categoriesOfTheMonth:response?.data});
        }
    } catch (error) {
        throw error;
    }
}


export const CATEGORIESOFTHEMONTHGRAY = createAction('CATEGORIESOFTHEMONTHGRAY');
export const categoriesOfTheMonthGrayAction =(param1, param2) =>  async (dispatch)=>{

    try {
        const response = await Api.categories.getMonthGrayCategories(param1, param2)
        if (!response?.data || response?.status !== 200) {
            throw new Error('Sorry, we can not process your request.');
        }

        if (response && response?.data) {
            return dispatch({type: CATEGORIESOFTHEMONTHGRAY, categoriesGray:response?.data});
        }
    } catch (error) {
        throw error;
    }
}
*/


// export const SETVIEWEDROOTSUBCATEGORY = createAction('SETVIEWEDROOTSUBCATEGORY');

// export const fetchCategorySetViewedAction = (data) =>  async (dispatch)=>{

//     try {
//         const response = await Api.categories.patchSetCategory(data);
//         if (!response?.data || response?.status !== 200) {
//             throw new Error('Sorry, we can not process your request.');
//         }

//         if (response && response?.data) {
//             return dispatch({type: SETVIEWEDROOTSUBCATEGORY, categorySetViewed:response?.data});
//         }
//     } catch (error) {
//         throw error;
//     }
// }
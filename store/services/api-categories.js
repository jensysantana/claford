import apiInterceptor from '../../interceptor/api-interceptor.js';
const CATEGORIES_API = {

    categories: {
        getCategories: () => apiInterceptor({
            url: '/category',
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                // "AUTH_TOKEN_X": true,
                // "AUTH_ROLE":true
            },
        }),
        getTopMonthCategories: (param1, param2) => apiInterceptor({
            url: `/category/top-categories-of-the-month`,
            method: 'get',
            data: null,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":true
            // },
        }),

        getMonthGrayCategories: (param1, param2) => apiInterceptor({
            url: `/category/gray-categories-of-the-month`,
            method: 'get',
            data: null,
            // headers: {
            //     "Content-Type": "application/json",
            //     "AUTH_TOKEN_X": true,
            //     "AUTH_ROLE":true
            // },
        }),
        patchSetCategory: (param1) => apiInterceptor({
            url: `/category/set-viewed/${param1}`,
            method: 'patch',
            data: null,
        }),

    }
}

export default CATEGORIES_API;
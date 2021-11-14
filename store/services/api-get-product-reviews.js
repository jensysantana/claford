import apiInterceptor from '../../interceptor/api-interceptor.js';

const PRODUCT_REVIEW_API = {
    prodReviews: {
        getReviews: (data) => apiInterceptor({
            url: `/reviews/${data}`,
            data: null,
            method: 'get'
        })
    }
}

export default PRODUCT_REVIEW_API;
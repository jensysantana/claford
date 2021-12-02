import apiInterceptor from '../../interceptor/api-interceptor';

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
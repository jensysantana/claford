import apiInterceptor from '../../interceptor/api-interceptor.js'
export default {

    store: {
        post: (data) => apiInterceptor({
            url: '/store',
            method: 'post',
            data: data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": true
            },
        }),
        storeItems: (data) => apiInterceptor({
            url: `/store/items`,
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": true
            },
        }),
        // getById: (id)=>apiInterceptor({
        //     url:`/pricing-plan-table/${id}`,
        //     method:'get',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "AUTH_TOKEN_X": false
        //     },
        // }),

    }

}
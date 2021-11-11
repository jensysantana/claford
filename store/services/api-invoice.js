import apiInterceptor from '../../interceptor/api-interceptor'
export default {

    invoice: {

        post: (data) => apiInterceptor({
            url: '/invoice/user-products',
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": true
            },
        }),
        welcomeUserItems: (data) => apiInterceptor({
            url: '/store/items',
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
import apiInterceptor from '../../interceptor/api-interceptor.js'

const SERCH_API = {

    searchData: {
        itemsGlobal: (search) => apiInterceptor({
            url: `/search/${search}`,
            method: 'get',
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

export default SERCH_API;
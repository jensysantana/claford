import apiInterceptor from '../../interceptor/api-interceptor';

export default {
    basket: {

        post: (data) => {
            apiInterceptor.post({
                url: '/basket',
                data,
                headers: {
                    // "Content-Type": "application/json",
                    "AUTH_TOKEN_X": false
                },
                method: 'post'
            })
        }
    }
}
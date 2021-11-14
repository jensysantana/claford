import apiInterceptor from '../../interceptor/api-interceptor.js';

export default {

    checkout: {
        paypalPost: (data) => apiInterceptor({
            url: '/payments/paypal/express-checkout',
            data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": true
            },
            method: 'post',
        }),
        paypalPaymentSuccessPost: (data) => apiInterceptor({
            url: '/payments/paypal/express-checkout-success',
            data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": true
            },
            method: 'post',
        })
    }
}
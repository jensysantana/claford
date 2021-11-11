import apiInterceptor from '../../../interceptor/api-interceptor';
import { APP_CONFIG } from "../../../config/config";
const { authServer: { apiBase, servUrl } } = APP_CONFIG;

export default {
    USER_ACCOUNT: {
        signUp: ({csrf, ...rest}) => apiInterceptor({
            url: `${apiBase}/account`,
            baseURL: servUrl,
            data: rest,
            headers: {
                // "Content-Type": "application/json",
                "AUTH_TOKEN_X": false,
                // 'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                'csrf-token': csrf
            },
            method: 'post',
        }),
        // get: (data) => apiInterceptor({
        //     url: `/auth/account-validate/${data}`,
        //     data,
        //     headers: {
        //         // "Content-Type": "application/json",
        //         "AUTH_TOKEN_X": false
        //     },
        //     method: 'get',
        // }),
    }
}
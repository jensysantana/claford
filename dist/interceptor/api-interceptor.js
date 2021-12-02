import axios from 'axios'
import { APP_CONFIG } from "../config/config";
import GlobalHelper from "../helpers/global-helper";
// import { CookiesHelper } from '../helpers/helper-classes';
import apiToken from '../store/services/api-refresh-token';
// import apiToken from '../store/services/api-auth';

const gbHelper = new GlobalHelper();
// const xsrfToken = CookiesHelper.getCookie('XSRF-TOKEN');
// console.log('---------xsrfToken---------');
// console.log(xsrfToken);
// console.log('---------xsrfToken---------');
let headers = {
    'Content-Type': 'application/json',
    // 'Referrer-Policy': 'strict-origin-when-cross-origin'
    //'Content-Type':'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
    // origin: 'https://posdaniel.com',
    // origin: APP_CONFIG.authServer.servUrl,
    clientKey: 'a0c9960f15886845a625108d33fa2005',
    clientType: 'WebApp',
    clientName: 'Claford'
};
// if (xsrfToken) headers = { ...headers, 'XSRF-TOKEN': xsrfToken };

// server.url
const { clafordServer: { servUrl } } = process.env.SERVERS;

const apiInterceptor = axios.create({
    baseURL: servUrl,
    headers: headers,
    timeout: 20000,
    withCredentials: true
});
apiInterceptor.defaults.withCredentials = true;

apiInterceptor.interceptors.request.use(async (config) => {
    //================================================================================================
    // if have a token validate token expiration to refresh token or send the old token to the backend
    //================================================================================================
    try {
        const token = await gbHelper.AsyncLocalStorageSetup('__wua', 'get', null, { decode: false });
        if (config.headers.AUTH_TOKEN_X) {
            if (token !== null && token !== undefined) {
                config.headers.Authorization = null;
                config.headers.Authorization = `${token}`;
            }
        }
        const authRlN = await gbHelper.AsyncLocalStorageSetup('BSIN', 'get', null, { decode: true });
        if (config.headers.AUTH_ROLE) {
            if (authRlN !== null && authRlN !== undefined) {
                config.headers.auth_role_x = null;
                config.headers.auth_role_x = `${JSON.parse(authRlN)._id}`;
            }
        }
        return config;
    } catch (error) {
        console.log('config   error error ');
        console.log(error);
        console.log('config   error error ');
    }
}, error => {
    return error;
})

let isRefreshing = 0;
apiInterceptor.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {

    try {
        const { config, response: { status, data } } = error;
        const originalRequest = config;
        if (status === 401 && data.status === 'ErrorToken' && data.message === 'The token is expired.') {
            if (isRefreshing <= 2) {
                isRefreshing++;
                // const gbHelper = new GlobalHelper();
                let requestResp = await apiToken.refreshToken.post({ token: config.headers.Authorization }, false);
                let { status: statusTokenRefreshed, data: dataTokenRefreshed } = requestResp;
                if (statusTokenRefreshed === 200) {
                    if (dataTokenRefreshed.status !== undefined && dataTokenRefreshed.status === 'success') {
                        //=====================================
                        // Start store new token
                        //=====================================
                        if (config.headers.AUTH_TOKEN_X) {
                            config.headers.Authorization = `${dataTokenRefreshed.response}`;
                            isRefreshing = 5;
                            setTimeout(() => isRefreshing = 0, 2000)
                            await gbHelper.AsyncLocalStorageSetup('__wua', 'set', dataTokenRefreshed.response, { setEncode: false });
                            //=====================================
                            // Start resend request to the backend
                            //=====================================
                            return apiInterceptor(originalRequest);
                        }
                        throw new Error();
                    }
                }
            }
        }

    } catch (err) {
        // console.log('try error .............');
        // console.log(err);
        // // console.log(err.response.data);
        // console.log('try error .............');
    }
    return Promise.reject(error)
})


export default apiInterceptor;
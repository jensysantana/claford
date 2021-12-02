

import { DataFormater } from "~/helpers/helper-classes";

// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
const dataFormater = new DataFormater();

export function requireAuthentication(gssp) {

    return async (context) => {
        try {
            const { req, res } = context;
            const accessToken = await dataFormater.getUserToken(req.headers.cookie, '__CSID') // Add logic to extract token from `req.headers.cookie`
            const refreshToken = await dataFormater.getUserToken(req.headers.cookie, '__CRSID') // Add logic to extract token from `req.headers.cookie`

            if (!accessToken) {

                if (refreshToken) {

                }
                // Redirect to login page
                return {
                    redirect: {
                        // destination: '/about',
                        // statusCode: 302,
                        permanent: false,
                        destination: '/account/login'
                    }
                };
            }

            // tryn to refresh token from a request to the backend
            // console.log(req)
            const payloadUserData = await dataFormater.getTokenPayloadAsync(accessToken, 1);
            const refPayloadUserData = await dataFormater.getTokenPayloadAsync(refreshToken, 1);
            const now = new Date();

            // console.log(' 111111 -----------------------context-------------------------');
            // // console.log(payloadUserData.exp * 1000);
            // // console.log(now.getTime());
            // console.log(payloadUserData.exp * 1000 > now.getTime());
            // console.log(' 2222222 -----------------------context-------------------------');

            if (payloadUserData.exp * 1000 > now.getTime() && refPayloadUserData.exp * 1000 > now.getTime()) {
                context.req.userDataToken = {
                    ...payloadUserData,
                    refreshToken: refPayloadUserData,
                    isLoggedIn: true
                }
                return await gssp(context); // Continue on to call `getServerSideProps` logic
            }

            return {
                redirect: {
                    permanent: false,
                    destination: '/account/login'
                }
            }
        } catch (error) {
            // Redirect to login page
            return {
                redirect: {
                    // destination: '/about',
                    // statusCode: 302,
                    permanent: false,
                    destination: '/'
                }
            };

        }
    }
}











// https://www.youtube.com/watch?v=9YW9N2EDMQA&t=235s
// https://github.com/frostzt/weeee/blob/master/frontend/pages/account/dashboard/index.tsx
// export function requireAuthentication(gssp: GetServerSideProps) {


//     return async (ctx: GetServerSidePropsContext) => {

//         console.log('contexttttt .......');
//         console.log(ctx);
//         console.log('contexttttt .......');

//         const { req } = ctx;

//         if (req.headers.cookie) {
//             // __CSID
//             // __CRSID
//             const tokens = req.headers.cookie.split(';');
//             const accessToken = tokens.find(t => t.includes('__CSID'));
//             const tokenRefresh = tokens.find(t => t.includes('__CRSID'));
//             //accessToken

//             if (accessToken && tokenRefresh) {
//                 // check date of token
//             }

//             if (!accessToken && tokenRefresh) {
//                 // get new token

//             }

//             if (!accessToken) {
//                 return {
//                     redirect: {
//                         permanent: false,
//                         destination: '/account/login'
//                     }
//                 }
//             }



//         }
//         return await gssp(ctx);

//     }
// }
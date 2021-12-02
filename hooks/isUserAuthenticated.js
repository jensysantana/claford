import { DataFormater } from "~/helpers/helper-classes";
const dataFormater = new DataFormater();

export function isUserAuthenticated(gssp) {
    return async (context) => {
        try {
            const { req, res } = context;
            const accessToken = await dataFormater.getUserToken(req.headers.cookie, '__CSID') // Add logic to extract token from `req.headers.cookie`
            const refreshToken = await dataFormater.getUserToken(req.headers.cookie, '__CRSID') // Add logic to extract token from `req.headers.cookie`
            // console.log(' 111111 -----------------------refreshToken-------------------------');
            // console.log(accessToken)
            // console.log(refreshToken)

            if (accessToken) {
                alert()
                const payloadUserData = await dataFormater.getTokenPayloadAsync(accessToken, 1);
                const now = new Date();
                if (payloadUserData.exp * 1000 > now.getTime()) {
                    context.req.userDataToken = {
                        ...payloadUserData,
                        isLoggedIn: false
                    }
                }
                return {
                    redirect: {
                        permanent: false,
                        destination: '/'
                    }
                }
            }
            // console.log(' 2222222 ---------------manuel--------refreshToken-------------------------');

            context.req.userDataToken = {
                isLoggedIn: false
            }
            return await gssp(context); // Continue on to call `getServerSideProps` logic
        } catch (error) {
            // console.log(' 111111 ----------Daniel-------------error-------------------------');
            // console.log(error)
            // console.log(' 2222222 -----------------------error-------------------------');
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

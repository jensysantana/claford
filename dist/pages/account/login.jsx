import React, { useEffect } from 'react';

import Login from '~/components/partials/account/Login/Login';
import Head from 'next/head';

/*
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
*/
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isUserAuthenticated } from '../../hooks/isUserAuthenticated';
import { useUserTokenIsValid } from '../../hooks/useUserTokenIsValid';
import { useTranslation } from 'react-i18next';


// export async function getServerSideProps({ locale, query, ...rest }) {
//     // console.log('rest: ', rest);
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['auth'])),
//             navigaTo: query.to || ''
//         },
//     }
// }

export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    // console.log('context  route proooooootectedddd 1111111 ');
    // console.log(req.userDataToken);
    // console.log('context  route proooooootectedddd 222222222 ');

    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth', 'header'])),
            navigaTo: query?.to || '',
            userDataToken: req.userDataToken,
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID
        }
    }

})



const LoginPage = (props) => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Login',
        },
    ];
    const lang = useTranslation();
    const { t, i18n } = lang;


    const router = useRouter();
    const { userSignedIn } = useSelector(st => {
        const { userSignedIn } = st;
        // console.log(st);
        return {
            userSignedIn
        }
    })


    const userTokenIsValid = useUserTokenIsValid(props.userDataToken);
    // useEffect(() => {
    //     // isUserAuthenticated(userSignedIn, false)

    //     if (userSignedIn.isLoggedIn) {
    //         // router.replace('/');

    //         return;
    //     }
    //     return () => {

    //     }
    // }, [])



    // const { signOut, loaded } = useGoogleLogout({
    //     jsSrc,
    //     onFailure,
    //     clientId,
    //     cookiePolicy,
    //     loginHint,
    //     hostedDomain,
    //     fetchBasicProfile,
    //     discoveryDocs,
    //     uxMode,
    //     redirectUri,
    //     scope,
    //     accessType,
    //     onLogoutSuccess
    // });

    // <GoogleLogout
    //     // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    //     clientId={GOOGLE_CLIENT_ID}
    //     buttonText="Logout"
    //     onLogoutSuccess={logout}
    // >
    // </GoogleLogout>




    return (
        <>
            <Head>
                {/* Login */}
                {/* https://developers.google.com/identity/gsi/web/guides/display-button */}
                {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
                <title>{t('header:head.1')}</title>
                {/* <meta
                    name="google-signin-client_id"
                    content={GOOGLE_CLIENT_ID}
                ></meta> */}
            </Head>
            {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
            {/* <Login /> */}
            {/* <PageContainer footer={<FooterDefault />} title="Login"> */}


            <div className="ps-page--my-account">
                {/* <div id="g_id_onload"
                    data-client_id={GOOGLE_CLIENT_ID}
                    // data-login_uri="https://your.domain/your_login_endpoint"
                    data-callback="handleCredentialResponse"
                    data-auto_prompt="false">
                </div>
                <div className="g_id_signin"
                    data-type="standard"
                    data-size="large"
                    data-theme="outline"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div> */}
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                <Login {...props} />

                {/* <p onClick={() => {
                    router.push('/protect')
                }}>
                    jensys got to protect
                </p> */}
            </div>
            {/* <Newletters layout="container" />
            </PageContainer> */}
        </>
    );
}


export default LoginPage;
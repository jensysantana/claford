import React from 'react';
import Head from 'next/head';


import Register from '~/components/partials/account/Register';
// import PageContainer from '~/components/layouts/PageContainer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';
import { useTranslation } from 'react-i18next';

export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    // console.log('context  route proooooootectedddd 1111111 ');
    // console.log(req.userDataToken);
    // console.log('context  route proooooootectedddd 222222222 ');

    return {
        // will be passed to the page component as props
        props: {
            ...(await serverSideTranslations(locale, ['common', 'auth', 'header'])),
            userDataToken: req.userDataToken,
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
        }
    }

})

// export async function getServerSideProps({ locale, ...rest }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['common', 'auth'])),
//             RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
//         }, // will be passed to the page component as props
//     }
// }

export default function RegisterPage(props) {
    const userTokenIsValid = useUserTokenIsValid(props.userDataToken);
    // const breadCrumb = [
    //     {
    //         text: 'Home',
    //         url: '/',
    //     },
    //     {
    //         text: 'Register an account',
    //     },
    // ];
    const lang = useTranslation();
    const { t, i18n } = lang;
    return (
        <>
            <Head>
                {/* Login */}
                <title>{t('header:head.3')}</title>
            </Head>
            {/* <PageContainer footer={<FooterDefault />} title="Register"> */}
            <div className="ps-page--my-account">
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                <Register {...props} />
            </div>
            {/* <Newletters layout="container" /> */}
            {/* </PageContainer> */}
        </>
    );
};

/*
    const changeLanguage = lng => {
        console.log('lng: ', lng);
        i18n.changeLanguage('en');
    }
*/
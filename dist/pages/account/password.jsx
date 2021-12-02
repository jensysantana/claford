import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import Password from '~/components/partials/account/Password';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';


export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    // console.log('context  route proooooootectedddd 1111111 ');
    // console.log(req.userDataToken);
    // console.log('context  route proooooootectedddd 222222222 ');

    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth'])),
            navigaTo: query?.to || '',
            userDataToken: req.userDataToken,
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
        },
    }
})

export default function RegisterPage(props) {
    const userTokenIsValid = useUserTokenIsValid(props.userDataToken);

    const lang = useTranslation();
    const { t, i18n } = lang;
    return (
        <>
            <Head>
                {/* Login */}
                <title>{t('header:head.4')}</title>
            </Head>
            <div className="ps-page--my-account">
                <Password {...props} />
            </div>
        </>
    );
};
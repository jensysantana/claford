import React from 'react';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale, ...rest }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'auth'])),
        }, // will be passed to the page component as props
    }
}

export default function RegisterPage(props) {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register an account',
        },
    ];

    return (
        <>
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
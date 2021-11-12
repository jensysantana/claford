import React from 'react';

import Login from '~/components/partials/account/Login';
/*
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
*/
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// export async function getServerSideProps({ locale, query, ...rest }) {
//     // console.log('rest: ', rest);
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['auth'])),
//             navigaTo: query.to || ''
//         },
//     }
// }

// https://claford-dxhyhtb9b-jensysantana.vercel.app/account/jensy
// https://claford-b4b80ja21-jensysantana.vercel.app/account/jensy
export async function getServerSideProps({ locale, query, ...rest }) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth'])),
            navigaTo: query?.to || ''
        },
    }
}


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
    return (
        <>
            {/* <Login /> */}
            {/* <PageContainer footer={<FooterDefault />} title="Login"> */}
            <div className="ps-page--my-account">
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                <Login {...props} />
            </div>
            {/* <Newletters layout="container" />
            </PageContainer> */}
        </>
    );
}


export default LoginPage;
import React from 'react';
import { useCookies } from 'react-cookie';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';

export default function Posdaniel(props) {
    const userTokenIsValid = useUserTokenIsValid(props.userDataToken);
    const [cookies, setCookie, removeCookie] = useCookies('__UVACC__');
    console.log(cookies.__UVACC__);
    return (
        <div>
            pos daniel deeplinking
        </div>
    )
}

export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    // console.log('context  route proooooootectedddd 1111111 ');
    // console.log(req.userDataToken);
    // console.log('context  route proooooootectedddd 222222222 ');

    return {
        // will be passed to the page component as props
        props: {
            // ...(await serverSideTranslations(locale, ['common', 'auth'])),
            userDataToken: req.userDataToken,
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
        }
    }

})
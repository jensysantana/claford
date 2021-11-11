
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCookies } from 'react-cookie';
import Api from '../../store/auth2/request/auth';
import { DataFormater } from '~/helpers/helper-classes';
import ReCAPTCHA from "react-google-recaptcha";


export default function OutToDate({ token }) {
    const gReRef = useRef();
    const lang = useTranslation();
    const { t, i18n } = lang;
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if (!token) {
            router.replace('/');
            return;
        }
        async function initApp() {
            // create default pack to send to feed back
            let pack = {
                header: t('auth:text.18'),
                headerClass: "",
                showHeaderIcon: true,
                sbfIconClass: '',
                message: '',
                messageClass: 'text-success',
                buttonText: "Sign In",
                tbnClass: "bg-dark",
                showBtnIcon: false,
                redirectTo: '/account/login'
            }
            // set cookie options
            const dataFormater = new DataFormater(),
                cookieOptions = { path: '/', sameSite: 'strict', secure: true, maxAge: 60 * 60 * 1000 };
            try {
                const tokenCap = await gReRef.current.executeAsync();
                gReRef.current.reset();
                // send request to check. and validate user
                const { status, data: { message, name } } = await Api.AUTH.resendEmailActivationFromToken({ token: token, reCaptch: tokenCap });

                pack.message = message;
                pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                pack.messageClass='text-dark';
                // encode pack before set to cookie
                const newMessage = await dataFormater.encodeToBase64(await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(pack), useComponent: true })) || t('auth:text.20');
                // set cookie
                setCookie('__UVACC__', newMessage, cookieOptions);
                //redirect
                router.replace('/account/feed-back');
                return;

            } catch (error) {
                // set error pack
                pack.header = t('auth:text.19');
                pack.messageClass = "text-danger";
                pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                pack.showHeaderIcon = true;
                // get error data
                const { data: { name, message }, status } = error.response;
                // check error name type
                switch (name) {
                    case 'ValidationFeedBackError':
                        pack.message = message
                        // router.replace('/account/feed-back');
                        break;
                    case 'TemporaryUnable':
                        pack.message = message
                        // router.replace('/account/feed-back');
                        break;
                    case 'InvalidToken':
                        pack.message = message
                        // router.replace('/account/feed-back');
                        break;
                    default:
                        pack.message = t('auth:text.20');
                        break;
                    }
                    // encode pack before set to cookie
                    const newMessage = await dataFormater.encodeToBase64(await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(pack), useComponent: true })) || t('auth:text.20');
                    // set cookie
                    setCookie('__UVACC__', newMessage, cookieOptions);
                    router.replace('/account/feed-back');
                // navigate to show feed back
                return;
            }
        }
        if (token) {
            initApp();
            return;
        }
        return () => {
            return false;
        }
    }, []);
    return (
        <>
            <ReCAPTCHA
                size="invisible"
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                // onChange={onChangeCaptch}
                ref={gReRef}
            />

        </>
    )
}

export async function getServerSideProps({ locale, query, ...rest }) {
    // console.log('rest: ', rest);
    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth'])),
            token: query?.token
        }, // will be passed to the page component as props
    }
}
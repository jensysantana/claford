import React, { useEffect, useRef } from 'react'
//http://localhost:3000/account/validate?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiI2MThiNDc3YmJhMWNjNTRmNTY1OTVkYWQiLCJpcHY0IjoiMTAuMC4wLjEiLCJpYXQiOjE2MzY1MTc3NTUsImV4cCI6MTYzNjUyMTM1NSwiYXVkIjoiaHR0cHM6Ly9jbGFmb3JkLmNvbSIsImlzcyI6IkNsYWZvcmQiLCJzdWIiOiI2MThiNDc3YmJhMWNjNTRmNTY1OTVkYTkiLCJqdGkiOiI0ZDdmZmZlYy1hZDU2LTQxMmEtYWUxMy0yYTA0MjZlNDNiYjIifQ.X73Qq4AKx1eeb1mixlR2O6rdjFebCRNHPCEnfgqA1cSMT7wvMbwM-quF6Qt3PdzTTZhnJDx2TJdGlnvS7r39fd8D_N7l4SULovI3HNJUhBGw6ETYDQI6fvpQ4b_TKap1erAFIzvWAkZEFenUHFyHzjJp3FZlbFl2EAEV-Omb1yEMQg_FghXx2UpAhFCo1o3ki-oY8MiPUQDTNLHqvgwOWiFw8Gfo_NtPh4qAwvr9t7JdIAR3l4bAselw2gevfZZTPKtjojjlL_MtU7u7XqgK9MM51tSeCo-szqDiLA1lqb8tyBWQnvOanwFlFx2UCEQzy9s3nTJJ5xgj0iYfC0SG5GTQhWCmXmm7ANYaKYj47MiF-ILGQIAW1M2X5f-SkUGKNDz0a0VEBmAM7vPai_TxLjVokv2HclYPfkipnICrjrg7XDQRMzmXNsVEqsn_aqLsr75u9YxHoFAvwOpyz-UKbninMhIKqA3bGEwMQPorBU0qDt9oTVCA0JY7DU98yecntOGogHayqKeHYDMTlBVSPIjUleWY9vNdoi60BOgTrx0wlI6r8VjDL9wWTFdh-4Egrz8q8RqzK7lLZk6FZW6Jfv5rhYlF6sIrMr68Nchur5VG_SJHglpmX5C3yToRvxloHfoVF1U0mTR67GiRCfALNW50bgD5ngl8gOjBEQsZQhQ&to=posdaniel
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCookies } from 'react-cookie';
import Api from '../../../store/auth2/request/auth';
import { DataFormater } from '~/helpers/helper-classes';
import ReCAPTCHA from "react-google-recaptcha";
export default function Validate({ csrfs, token, toApp }) {
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
                header: t('auth:text.19'),
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
                const { status, data: { message, name } } = await Api.AUTH.activateAcc({
                    token: token,
                    reCaptch: tokenCap,
                    csrf: csrfs
                });

                pack.message = message;
                // encode pack before set to cookie
                const newMessage = await dataFormater.encodeToBase64(await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(pack), useComponent: true })) || t('auth:text.20');
                // set cookie
                setCookie('__UVACC__', newMessage, cookieOptions);
                //redirect

                if (toApp) {
                    // if has app mobile requested
                    router.replace({
                        pathname: `/account/toapp/${toApp}`,
                        query: {
                            toApp
                        }
                    })
                    return;
                }
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
                let isSetCookie = true;
                switch (name) {
                    case 'ValidationFeedBackError':
                        pack.message = message;
                        // router.replace('/account/feed-back');
                        break;
                    case 'TemporaryUnable':
                        pack.message = message;
                        // router.replace('/account/feed-back');
                        break;
                    case 'ExpiredTokenToValidate':
                        isSetCookie = false;
                        break;

                    default:
                        pack.message = t('auth:text.20');
                        break;
                }
                if (isSetCookie) {
                    // encode pack before set to cookie
                    const newMessage = await dataFormater.encodeToBase64(await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(pack), useComponent: true })) || t('auth:text.20');
                    // set cookie
                    setCookie('__UVACC__', newMessage, cookieOptions);
                    // navigate to show feed back
                    if (toApp) {
                        // if has app mobile requested
                        // router.replace({
                        //     pathname: `/account/toapp/${toApp}`,
                        //     query: {
                        //         toApp
                        //     }
                        // })
                        // account/toapp/${toApp}
                        router.replace({
                            pathname: `/account/feed-back`,
                            query: {
                                toApp
                            }
                        });
                        return;
                    }
                    router.replace('/account/feed-back');
                    return;
                }
                if (toApp) {
                    // if has app mobile requested
                    // router.replace({
                    //     pathname: `/account/toapp/${toApp}`,
                    //     query: {
                    //         toApp
                    //     }
                    // })
                    // pathname:`/account/toapp/${toApp}`,
                    router.replace({
                        pathname: `/account/feed-back`,
                        query: {
                            toApp
                        }
                    });
                    return;
                }
                router.push({
                    pathname: '/account/resend-act-mail',
                    query: {
                        token
                    }
                });
                return;
            }
        }
        if (token) {
            initApp()
            return;
        }
        return () => {
            return;
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
    // const cookParsed = cookie.parse(rest.req.cookies);
    console.log('query  111111 ');
    console.log(query);
    console.log('query  2222222 ');
    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth'])),
            token: query?.token,
            toApp: query?.to || null,
            csrfs: rest.req.cookies['XSRF-TOKEN']
        }, // will be passed to the page component as props
    }
}

// export async function getStaticPaths(ctx) {
//     return {
//         paths: [
//             { params: { token: '1' } },
//         ],
//         fallback: false
//     }
// }


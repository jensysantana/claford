import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Head from 'next/head';
// import Link from 'next/link';



import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReCAPTCHA from "react-google-recaptcha";


import Logo from '~/components/elements/common/Logo';
// import PageContainer from '~/components/layouts/PageContainer';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
import CompleteContent from '~/components/partials/account/complete-content';
import { DataFormater } from '~/helpers/helper-classes';
import { resendActivationAccountActionClean, sendMailRecoveryAccountFromEmailAction } from '~/store/auth2/action';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';

function Complete({ csrf, RECAPTCHA_SITE_KEY, appLang, userDataToken }) {
    const userTokenIsValid = useUserTokenIsValid(userDataToken);
    const gReRef = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const lang = useTranslation();
    const { t } = lang;
    const [state, setstate] = useState(() => { });
    const [counter, setCounter] = useState(0);
    const [addClass, setAddClass] = useState(() => '');
    const [dBMessage, setDBMessage] = useState(() => {
        return {
            message: '',
            hasError: false
        }
    })
    const [cookies, setCookie, removeCookie] = useCookies('__UAC_CMP');
    const selectUser = useSelector(st => {
        const { resendEmail } = st;
        return {
            resendEmail,
        }
    })

    useEffect(() => {
        async function initApp() {
            const dataFormater = new DataFormater();
            if (!cookies.__UAC_CMP) return router.replace('/account/login');
            const getStr = await dataFormater.decodeBase64(cookies.__UAC_CMP);
            const newMessage = JSON.parse(await dataFormater.decodeURIEscapeCharacters({ data: getStr, useComponent: true }));
            setstate(() => newMessage);
        }
        initApp();
        // setstate(() => JSON.parse(localStorage.getItem('__UBV')));
        return () => {
            return true;
        }
    }, [])

    useEffect(() => {

        if (selectUser.resendEmail.name) {
            switch (selectUser.resendEmail.name) {
                case 'success':
                    setAddClass(() => 'text-success');
                    setDBMessage(() => {
                        return {
                            message: selectUser.resendEmail.message,
                            hasError: false
                        }
                    })
                    break;
                case 'ValidationFeedBackError':
                    setDBMessage(() => {
                        return {
                            message: selectUser.resendEmail.message,
                            hasError: selectUser.resendEmail.hasError
                        }
                    })
                    break;
                case 'ValidationError':
                    setDBMessage(() => {
                        return {
                            message: selectUser.resendEmail.message,
                            hasError: selectUser.resendEmail.hasError
                        }
                    });
                    break;
                case 'TemporaryUnable':
                    setDBMessage(() => {
                        return {
                            message: selectUser.resendEmail.message,
                            hasError: selectUser.resendEmail.hasError
                        }
                    });
                    break;

                default:
                    setDBMessage(() => {
                        return {
                            message: selectUser.resendEmail.message,
                            hasError: selectUser.resendEmail.hasError
                        }
                    });
                    break;
            }
        }

        return () => {
            return;
        }
    }, [selectUser.resendEmail.name]);


    // const [state, dispatch] = useReducer(reducer, initialState, init)
    // useEffect(() => {
    //     const handleRouteChanged = (url, { shallow }) => {
    //         console.log(
    //             `App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`
    //         )
    //     }
    //     router.events.on('routeChangeComplete', handleRouteChanged);
    //     return () => {
    //         router.events.off('routeChangeStart', handleRouteChanged);
    //     }
    // }, [state])

    async function resendEmailActivationAcc(e) {
        e.preventDefault();

        if (counter >= 1) {

            const pack = {
                // email: state.email,
                header: DataFormater.capitalizeWordsSync({ textData: state.sbfTextResendEmail, words: false }),
                buttonSubmit: DataFormater.capitalizeWordsSync({ textData: state.sbfTextResendEmail, words: true }),
                // showFbsIcon: false,
                // sbfIcon: '',
                sbfTextDidNotREmail: state.sbfTextDidNotREmail,
                sbfTextResendEmail: state.sbfTextResendEmail,
                message: dBMessage.message
            }

            const cookieOptions = {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 15 * 60 * 1000
            };// 15 days

            // set cookie and options
            const dataFormater = new DataFormater();
            const respUrlEnc = await dataFormater.encodeURIUnEscapeCharacters(
                {
                    data: JSON.stringify(pack),
                    useComponent: true
                }
            )
            const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
            setAddClass(() => '');
            setCookie('__RECOVERY__', newMessage, cookieOptions);
            // removeCookie('__UAC_CMP');
            dispatch(resendActivationAccountActionClean());
            router.replace('/account/recovery');
            return;
        }
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();
        dispatch(sendMailRecoveryAccountFromEmailAction({
            email: state.email,
            reCaptch: token,
            csrf,
            lang: appLang.lang
        }));
        setCounter(counter + 1);
    }

    return (
        <>
            <Head>
                {/* Login */}
                <title>{t('header:head.8')}</title>
            </Head>
            <div className="ps-page--my-account">
                <div className="responsive-auth-page">
                    <div className="row container-public">
                        <div className="col-12">
                            <div className="logo-container pl-4">
                                <Logo />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="wrapper-v2-auth-left d-flex justify-content-center align-items-center">
                                <div className="pr-5">
                                    <div className="promotion-section">
                                        {/*  */}
                                        <div style={{ paddingTop: 10 }} className="wrapper-v2-auth-title mb4">{t('common:1', { name: process.env.title })}</div>
                                        <h3 className="mb-4">
                                            {/* <i className="fa fa-check-circle-o d-inline-block" aria-hidden="true"></i> */}
                                            <i className="fa fa-check-circle-o d-inline-block" aria-hidden="true"></i>
                                            <span className="p2 heading">{t('auth:text.7')}</span>
                                            <div className="p3 heading-detail panel-breader">
                                                {t('auth:text.8')}
                                            </div>
                                        </h3>
                                        <h3 className="mb-4">
                                            <i className="fa fa-check-circle-o d-inline-block" aria-hidden="true"></i>
                                            <span className="p2 heading">{t('auth:text.9')}</span>
                                            <div className="p3 heading-detail panel-breader">
                                                {t('auth:text.10')}
                                            </div>
                                        </h3>
                                        <h3 className="mb-4">
                                            <i className="fa fa-check-circle-o d-inline-block" aria-hidden="true"></i>
                                            <span className="p2 heading">{t('auth:text.102')}</span>
                                            <div className="p3 heading-detail panel-breader">
                                                {t('auth:text.17')}
                                            </div>
                                        </h3>
                                        <h3>
                                            <i className="fa fa-check-circle-o d-inline-block" aria-hidden="true"></i>
                                            <span className="p2 heading">{t('auth:text.11')}</span>
                                            <div className="p3 heading-detail panel-breader">
                                                {t('auth:text.12')}
                                            </div>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 right-auth-pane">
                            {/* className="wrapper-v2-auth-right pt-5 pb-5" */}
                            <div className="px-4">
                                <CompleteContent
                                    {...state}
                                    hasError={dBMessage.hasError}
                                    onClickFN={resendEmailActivationAcc}
                                    addClass={addClass}
                                >
                                </CompleteContent>
                                <ReCAPTCHA
                                    size="invisible"
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    // onChange={onChangeCaptch}
                                    ref={gReRef}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <style jsx>{`
                .h3{
                    font-size:25px;
                }
                h3.heading-detail{
                    font-size:16px !important;
                }
                .container-public {
                    -ms-flex-align: center;
                    align-items: center;
                    height: 90vh;
                }

                .responsive-auth-page .right-auth-pane .logo-container {
                    display: block;
                    width: 94%;
                    max-width: 520px;
                    margin: 0 auto 40px;
                }

                .wrapper-v2-auth-left{
                    padding-left: 20px;
                }

                .wrapper-v2-auth-title {
                    font-size: 24px;
                    line-height: 1.2;
                    margin-bottom: 25px;
                }

                img {
                    vertical-align: middle;
                    border-style: none;
                }

                .d-inline-block {
                    display: inline-block!important;
                }
                @media only screen and (min-width: 468px){
                    .logo-container{
                        margin-top: 3rem;
                    }
                }
                
            `}</style>
        </>
    )
}
export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    return {
        // will be passed to the page component as props
        props: {
            ...(await serverSideTranslations(locale, ['common', 'auth'])),
            userDataToken: req.userDataToken,
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
        }
    }

})
export default Complete;


{/* <main id="main" className="onboarding" role="main">
    <div className="container-fluid">
        <div className="row">
            <div id="content">
                <div className="tab-content jcf-scrollable">
                    <div className="tab-pane fade in active" id="tab-1" role="tabpanel">
                        <div className="account-box text-center d-flex justify-content-center pt-4 pb-4 mt-4 mb-4">
                            <div className="col-sm-10 text-center p-0">
                                <i className="fa fa-paper-plane d-inline-block logo mr-1" aria-hidden="true"></i>
                                <h2 className="standard-onboarding-heading">Account Activation Mail Sent</h2>
                                <p className="text-sizing-14 text-color-secondary mt-4 mb-4">We have emailed you the instructions to activate your account.
                                    If you do not receive the email within the next 15 mins,
                                    please check your spam folder.</p>
                                <span className="small-text">Did not receive the activation mail?  <a href="/accounts/resendactivation/" className="text-primary">Resend Activation Mail</a></span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</main> */}
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import Head from 'next/head';


import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { FieldValidations } from '~/validations/authValidationFields';
import Forassistance from '~/components/shared/forassistance/forassistance';
import Logo from '~/components/elements/common/Logo';
import ButtonWithLoadding from '~/components/elements/Button';
import { DataFormater } from '~/helpers/helper-classes';
import {
    passwordResetFromOTPAction,
    resendActivationAccountActionClean,
    sendMailRecoveryAccountFromEmailAction,
    passwordResetFromOTPActionRestart
} from '~/store/auth2/action';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';

async function validationFields(lang) {
    const fields = [
        {
            path: 'securityCode'
        }
    ];
    const fieldValidations = new FieldValidations();
    return await fieldValidations.validationGenerator(fields, lang);
}

function Unafsb({ csrf, RECAPTCHA_SITE_KEY, appLang, userDataToken }) {
    const userTokenIsValid = useUserTokenIsValid(userDataToken);
    const gReRef = useRef();
    const [cookies, setCookie, removeCookie] = useCookies(['__recoveryUnafsb']);
    const router = useRouter();
    const lang = useTranslation();
    const { t, i18n } = lang;
    const dispatch = useDispatch();
    const [showLoadding, setShowLoadding] = useState(() => false);
    const [dBMessage, setDBMessage] = useState(() => {
        return {
            message: '',
            hasError: false
        }
    })
    const selectUser = useSelector(st => {
        const { resendEmail, resetPasswordFromOTP } = st;
        return {
            resendEmail,
            resetPassFromOTP: resetPasswordFromOTP,
        }
    })

    const [recoveryWith, setRecoveryWith] = useState(() => false);
    const [state, setState] = useState(() => []);
    const [userEmail, setUserEmail] = useState(() => '');
    const [isLoadding, setIsLoadding] = useState(() => false);
    const [showError, setShowError] = useState(() => {
        return {
            text: '',
            hasError: true
        }
    });


    useEffect(() => {
        if (!cookies.__recoveryUnafsb) return router.replace('/account/login');
        async function initApp() {
            const dataFormater = new DataFormater();
            const getStr = await dataFormater.decodeBase64(cookies.__recoveryUnafsb),
                newMessage = JSON.parse(await dataFormater.decodeURIEscapeCharacters({ data: getStr, useComponent: true }));

            const { user, email } = newMessage;
            setUserEmail(() => email)
            setState(() => [
                ...user
            ]);
        }

        initApp();
        return () => {
            return;
        }
    }, []);

    async function handleSendEmailClick(e) {
        e.preventDefault();
        setShowLoadding(() => true);
        setDBMessage(() => {
            return {
                message: '',
                hasError: false
            }
        })
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();
        dispatch(sendMailRecoveryAccountFromEmailAction({
            email: userEmail,
            reCaptch: token,
            csrf,
            lang: appLang.lang
        }));
    }
    useEffect(() => {
        async function sendEmail() {
            if (selectUser.resendEmail.name) {

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

                switch (selectUser.resendEmail.name) {
                    case 'success':
                        pack.message = selectUser.resendEmail.message;
                        setDBMessage(() => {
                            return {
                                message: '',
                                hasError: false
                            }
                        })
                        break;
                    case 'ValidationFeedBackError':
                        pack.message = selectUser.resendEmail.message;
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        setShowLoadding(() => false);
                        break;
                    case 'ValidationError':
                        pack.message = t('auth:text.20');
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        setShowLoadding(() => false);
                        break;
                    case 'TemporaryUnable':
                        pack.message = selectUser.resendEmail.message;
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        setShowLoadding(() => false);
                        break;

                    default:
                        pack.message = t('auth:text.20');
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        setShowLoadding(() => false);
                        break;
                }

                const cookieOptions = {
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    maxAge: 15 * 60 * 1000
                }// 15 days

                // set cookie and options
                const dataFormater = new DataFormater();
                const respUrlEnc = await dataFormater.encodeURIUnEscapeCharacters(
                    {
                        data: JSON.stringify(pack),
                        useComponent: true
                    }
                )
                const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
                setCookie('__UVACC__', newMessage, cookieOptions);
                dispatch(resendActivationAccountActionClean());
                removeCookie('__recoveryUnafsb');
                router.replace('/account/feed-back');
                return;
            }
        }
        sendEmail();

        return () => {
            return true;
        }
    }, [selectUser.resendEmail?.name]);

    async function handleSendSms(e) {
        //send sms to the user
        e.preventDefault();
        setRecoveryWith(() => true);
        // setShowLoadding(() => true);
        setDBMessage(() => {
            return {
                message: '',
                hasError: false
            }
        })
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();
        dispatch(passwordResetFromOTPAction({
            email: userEmail,
            reCaptch: token,
            csrf,
            lang: appLang.lang
        }));
    }

    useEffect(() => {
        async function sendOTP() {
            if (selectUser.resetPassFromOTP.name) {
                const cookieOptions = {
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    maxAge: 15 * 60 * 1000
                }// 15 days

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
                let navigateNext = true;

                const { name, message } = selectUser.resetPassFromOTP;
                switch (name) {
                    case 'success':
                        // set cookie and options
                        navigateNext = false;
                        const myPac = {
                            email: userEmail,
                            message
                        }
                        const dataFormater = new DataFormater();
                        const respUrlEnc = await dataFormater.encodeURIUnEscapeCharacters(
                            {
                                data: JSON.stringify(myPac),
                                useComponent: true
                            }
                        )
                        const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
                        setCookie('__SECCODE__', newMessage, cookieOptions);
                        removeCookie('__recoveryUnafsb');
                        router.replace('/account/recovery/sec-code');
                        break;
                    case 'ValidationFeedBackError':
                        pack.message = message;
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;
                    case 'ValidationError':
                        pack.message = t('auth:text.20');
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;
                    case 'TemporaryUnable':
                        pack.message = message;
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;

                    default:
                        pack.message = t('auth:text.20');
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;
                }

                if (navigateNext) {

                    // set cookie and options
                    const dataFormater = new DataFormater();
                    const respUrlEnc = await dataFormater.encodeURIUnEscapeCharacters(
                        {
                            data: JSON.stringify(pack),
                            useComponent: true
                        }
                    )
                    const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
                    setCookie('__UVACC__', newMessage, cookieOptions);
                    removeCookie('__recoveryUnafsb');
                    router.replace('/account/feed-back');
                    return;
                }
            }
        }
        sendOTP();
        return () => {
            return;
        }
    }, [selectUser.resetPassFromOTP.name])

    async function handleHaveIssueClick(e) {
        e.preventDefault();
        setRecoveryWith(() => !recoveryWith);
        setShowLoadding(() => false);
    }
    return (
        <>
            <div className="ps-page--my-account">
                <div className="ps-my-account-2">
                    <div className="container">
                        <h2 className="text-center title">
                            <Logo />
                        </h2>
                        <div className="row justify-content-center">
                            <div className="accrc-msg">
                                <h3 className="subtitle">{t('auth:text.30')}</h3>
                                <p className="">{t('auth:text.31')}</p>
                                <div id="htmlEmailPass"></div>
                                {state.map(item => {

                                    console.log('///////////------- 111111111 ');
                                    console.log(item);
                                    console.log('///////////------- 22222222222 ');
                                    if (item.field === 'Email') {
                                        return (
                                            <Fragment key={item.id}>
                                                {!recoveryWith &&
                                                    <div>
                                                        <div className="contact-type">
                                                            {/* <h2 className="subtitle">{t('auth:text.4')}</h2> */}
                                                            <h2 className="subtitle">{item.field}</h2>
                                                            <p className="text-success">{t('auth:text.32', { EMAIL: item.value })}</p>
                                                        </div>
                                                        <div className="form-group submtit mt-4 submtit-btn">
                                                            {/* <a className="ps-btn ps-btn--fullwidth" id="btn-navigate-">{t('auth:text.33')}</a> */}
                                                            {/* <Link href="/"

                                                                onClick={async e => {
                                                                    e.preventDefault();
                                                                    // window.location.href = `/account/recovery-get-email/${btoa(JSON.stringify({ email: item.email }))}`;
                                                                }}
                                                            >
                                                            </Link> */}
                                                            <ButtonWithLoadding showLoadding={showLoadding} showBtnIcon={true} onClick={handleSendEmailClick}>
                                                                {t('auth:buttons.25')}
                                                            </ButtonWithLoadding>
                                                        </div>
                                                        {state.length > 1 && (
                                                            <p>{t('auth:text.34')}
                                                                <Link
                                                                    href="/"

                                                                >
                                                                    <a
                                                                        onClick={(e) => handleHaveIssueClick(e)}
                                                                        className="text-primary"
                                                                        id="have-isseue"

                                                                    >
                                                                        {t('auth:text.35')}
                                                                    </a>
                                                                </Link>
                                                            </p>
                                                        )}
                                                        {/* {state.map(st => {
                                                            if (st.hasOwnProperty('phone') && st?.phone) {
                                                                return (
                                                                    <p key={st._id} >{t('auth:text.34')}
                                                                        <Link
                                                                            href="/"

                                                                        >
                                                                            <a
                                                                                onClick={(e) => handleHaveIssueClick(e)}
                                                                                className="text-primary"
                                                                                id="have-isseue"

                                                                            >
                                                                                {t('auth:text.35')}
                                                                            </a>
                                                                        </Link>
                                                                    </p>
                                                                )
                                                            }
                                                            return null;
                                                        })} */}
                                                    </div>
                                                }
                                            </Fragment>
                                        );

                                        // /auth/recovery-mobile?uaid=${decodedUserData}
                                        // /auth/recovery - check - email ? uaid = $ { queryParams.get('uaid') }
                                    } else if (item.field === 'Phone') {
                                        // Well, send recovery text message at
                                        return (
                                            <Fragment key={item.id}>
                                                {recoveryWith && <div>
                                                    <div className="contact-type notShow">
                                                        <h2 className="subtitle">{item.field}</h2>
                                                        {/* <h2 className="subtitle">{t('auth:text.36')}</h2> */}
                                                        <p className="text-success">{t('auth:text.37', { PHONE: item.value })}</p>
                                                    </div>
                                                    <div className="form-group submtit mt-4 submtit-btn notShow">
                                                        <ButtonWithLoadding showLoadding={showLoadding} showBtnIcon={false} onClick={handleSendSms}>
                                                            {t('auth:text.38')}
                                                        </ButtonWithLoadding>
                                                        {showError.hasError && <p className="text-danger mt-3">{showError.text}</p>}
                                                    </div>
                                                    <p>
                                                        {t('auth:text.39')}
                                                        <Link
                                                            href="/"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                setRecoveryWith(() => false);
                                                            }}
                                                        >
                                                            <a
                                                                onClick={(e) => handleHaveIssueClick(e)}
                                                                className="text-primary"
                                                                id="have-isseue">
                                                                {t('auth:text.40')}
                                                            </a>
                                                        </Link>
                                                    </p>
                                                </div>
                                                }
                                            </Fragment>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                                }

                            </div>
                            <ReCAPTCHA
                                size="invisible"
                                sitekey={RECAPTCHA_SITE_KEY}
                                // onChange={onChangeCaptch}
                                ref={gReRef}
                            />
                        </div>
                        <Forassistance />
                    </div>
                </div>
            </div>
            <style>{`
                
                .accrc-msg {
                    margin-bottom: 1.5rem;
                    text-align: left;
                    max-width: 100%;
                    padding: 0 10px 0 10px;
                }
                .title{
                    margin: 0rem 0 4rem 0;
                    font-weight: 900;
                }
                .subtitle, .title{
                    font-weight: 500;
                    letter-spacing: 0.8px;
                }
                .contact-type{
                    margin-top: 3rem;
                }

                .form-control.ant-input, .form-control {
                    height: 40px !important;
                }

                .ant-form-vertical .ant-form-item-label, .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label {
                    padding: 0 0 0px;
                }
                .ps-form--account .ps-form__content {
                    padding: 30px 30px 30px 30px !important;
                }
                @media only screen and (min-width: 768px){ 
                    .accrc-msg {
                        margin-bottom: 1.5rem;
                        text-align: center;
                        width: 425px;
                    }
                }
        `}</style>
        </>
    )
}

export const getStaticProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    return {
        // will be passed to the page component as props
        props: {
            ...(await serverSideTranslations(locale, ['auth'])),
            userDataToken: req.userDataToken,
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
        }
    }

})

export default Unafsb;

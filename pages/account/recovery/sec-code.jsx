import React, { useState, useEffect, useRef } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import Head from 'next/head';


import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { Form, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { FieldValidations } from '~/validations/authValidationFields';
import TypografyText from '~/components/elements/errors/TypografyText';
import Forassistance from '~/components/shared/forassistance/forassistance';
import Logo from '~/components/elements/common/Logo';
import ButtonWithLoadding from '~/components/elements/Button';
import { DataFormater } from '~/helpers/helper-classes';
import {
    confirmOTPExistsAction,
    passwordResetFromOTPAction,
    passwordResetFromOTPActionRestart,
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
    const [showLoaddingRec, setShowLoaddingRec] = useState(() => false);
    const [counter, setCounter] = useState(() => 0);
    const [dBMessage, setDBMessage] = useState(() => {
        return {
            message: '',
            hasError: false
        }
    })
    const selectUser = useSelector(st => {
        const { resetPasswordFromOTP, confOTPExists } = st;
        return {
            resetPassFromOTP: resetPasswordFromOTP,
            confOTPExists: confOTPExists
        }
    })

    // const queryParams = useGetUrlParams();
    const [antdFields, setantdFields] = useState({
        securityCode: {
            hasFeedback: false,
        }
    })
    const [form] = Form.useForm();
    const [vFields, setValidations] = useState({});

    const [recoveryWith, setRecoveryWith] = useState(() => false);
    const [state, setState] = useState(() => []);
    const [userEmail, setUserEmail] = useState(() => '');
    const [showSendOTP, setShowSendOTP] = useState(() => false);
    const [secCode, setSecCode] = useState();
    const [showError, setShowError] = useState(() => {
        return {
            text: '',
            hasError: true
        }
    });

    useEffect(() => {
        validationFields(lang).then(data => {
            setValidations(data);
        })

        if (!cookies.__SECCODE__) return router.replace('/account/login');
        async function initApp() {
            const dataFormater = new DataFormater();
            const getStr = await dataFormater.decodeBase64(cookies.__SECCODE__),
                newMessage = JSON.parse(await dataFormater.decodeURIEscapeCharacters({ data: getStr, useComponent: true }));
            const { email, message } = newMessage;
            setUserEmail(() => email);
            setDBMessage((st) => {
                return {
                    ...st,
                    message
                }
            })
        }

        initApp();
        return () => {
            return;
        }
    }, []);

    async function handleSendSms(e) {
        //send sms to the user
        e.preventDefault();
        setShowLoaddingRec(() => true);
        setRecoveryWith(() => true);
        setShowLoadding(() => false);
        // setDBMessage(() => {
        //     return {
        //         message: '',
        //         hasError: false
        //     }
        // })
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
                        navigateNext = false;
                        pack.message = message;
                        setDBMessage(() => {
                            return {
                                message: message,
                                hasError: false
                            }
                        })
                        dispatch(passwordResetFromOTPActionRestart());
                        break;
                    case 'ValidationFeedBackError':
                        pack.message = message;
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        setDBMessage(() => {
                            return {
                                message: message,
                                hasError: true
                            }
                        })
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
                setShowLoadding(() => false);
                setShowLoaddingRec(() => false);

                // if (navigateNext) {
                //     const cookieOptions = {
                //         path: '/',
                //         sameSite: 'strict',
                //         secure: true,
                //         maxAge: 15 * 60 * 1000
                //     }// 15 days

                //     // set cookie and options
                //     const dataFormater = new DataFormater();
                //     const respUrlEnc = await dataFormater.encodeURIUnEscapeCharacters(
                //         {
                //             data: JSON.stringify(pack),
                //             useComponent: true
                //         }
                //     )
                //     const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
                //     setCookie('__UVACC__', newMessage, cookieOptions);
                //     removeCookie('__recoveryUnafsb');
                //     router.replace('/account/feed-back');
                //     return;
                // }
            }
        }
        sendOTP();
        return () => {
            return;
        }
    }, [selectUser.resetPassFromOTP.name])

    async function handleSubmitOTP(values) {

        // start validate the sms user has receive
        setSecCode(() => {
            return {
                ...values
            }
        })
        setShowLoadding(() => true);
        setCounter((st) => st + 1);
        if (counter > 0) {
            setTimeout(() => {
                setShowLoadding(() => false);
            }, 10000);
            clearTimeout();
        }
        const tokenReCap = await gReRef.current.executeAsync();
        gReRef.current.reset();
        dispatch(confirmOTPExistsAction({
            ...values,
            email: userEmail,
            reCaptch: tokenReCap,
            csrf,
            lang: appLang.lang,
            phoneCode: values.securityCode
        }))
    }


    useEffect(() => {

        async function confOTP() {

            if (selectUser.confOTPExists.name) {
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

                const { name, message, status } = selectUser.confOTPExists;
                switch (name) {
                    case 'success':
                        navigateNext = false;
                        pack.message = message;

                        const myPac = {
                            email: userEmail,
                            ...secCode
                        }
                        const dataFormater = new DataFormater();
                        const respUrlEnc = await dataFormater.encodeURIUnEscapeCharacters(
                            {
                                data: JSON.stringify(myPac),
                                useComponent: true
                            }
                        )
                        const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
                        window.location.href = `/account/password-reset?otp=${newMessage}`
                        break;
                    case 'ValidationFeedBackError':

                        if (status !== 500) {
                            navigateNext = false;
                            // setShowSendOTP(() => true);
                            setShowLoadding(() => false);
                            setDBMessage(() => {
                                return {
                                    message: message,
                                    hasError: true
                                }
                            })
                            return;
                        }

                        pack.message = message;
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;
                    case 'EXPIREDOTP':
                        navigateNext = false;
                        setShowSendOTP(() => true);
                        setShowLoadding(() => false);
                        setDBMessage(() => {
                            return {
                                message: message,
                                hasError: true
                            }
                        })
                        break;
                    case 'ValidationError':
                        pack.message = t('auth:text.20');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;
                    case 'TemporaryUnable':
                        pack.message = message;
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;

                    default:
                        pack.message = t('auth:text.20');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        break;
                }
                setShowLoadding(() => false);
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
                    removeCookie('__SECCODE__');
                    router.replace('/account/feed-back');
                    return;
                }
            }
        }
        confOTP();
        return () => {
            return;
        }
    }, [selectUser.confOTPExists.name])
    // validate otp

    const validateTrigger = ["onBlur", "onSubmit"];
    function inputChange(e) {
        const { id, value, type } = e.target;
        if (type === 'blur') {
            setantdFields(st => {
                return {
                    ...st,
                    [id]: {
                        hasFeedback: true,
                    }
                }
            });
        }
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

                            <Form
                                form={form}
                                noValidate
                                className="ps-form--account"
                                onFinish={handleSubmitOTP}
                                onFinishFailed={() => { }}
                                // onFieldsChange={getValidationsFields}
                                layout="vertical"
                                scrollToFirstError={true}
                                size="small"
                            >

                                {/* {dBMessage.message && dBMessage.hasError && <div className="my-5">
                                        <TypografyText className="" level="2" type="danger">
                                            {dBMessage.message}
                                        </TypografyText>
                                    </div>} */}

                                <div className="ps-tab active" id="register">
                                    <div className="ps-form__content">
                                        <div className="text-center mb-5">
                                            <h5 style={{ fontSize: '20px' }}>
                                                {DataFormater.capitalizeWordsSync({
                                                    textData: t('auth:text.43'),
                                                    words: true
                                                })}
                                            </h5>

                                            <TypografyText className={dBMessage.hasError ? "text-danger" : "text-dark"} level="2" type="danger" shoIcon={false}>
                                                {dBMessage.message}
                                            </TypografyText>
                                        </div>

                                        <div className="form-group form-forgot">
                                            <Form.Item
                                                name="securityCode"
                                                initialValue=""
                                                hasFeedback={antdFields.securityCode.hasFeedback}
                                                validateFirst
                                                validateTrigger={validateTrigger}
                                                rules={
                                                    vFields.securityCode
                                                }>
                                                <Input
                                                    autoComplete="off"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder={t('auth:text.44')}
                                                    onBlur={inputChange}
                                                    name="securityCode"
                                                />
                                            </Form.Item>
                                            {showSendOTP && <Link href="/">
                                                <a onClick={(e) => handleSendSms(e)} className="text-primary">
                                                    {!showLoaddingRec && t('auth:buttons.14')}
                                                    {showLoaddingRec && <LoadingOutlined className="ml-2" />}
                                                </a>
                                            </Link>}
                                        </div>
                                        <div className="form-group submit">
                                            <ButtonWithLoadding showLoadding={showLoadding} showBtnIcon={false}>
                                                {t('auth:buttons.3')}
                                            </ButtonWithLoadding>
                                        </div>
                                    </div>

                                </div>
                            </Form>

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
                
                .ps-form--account {
                    padding-top: 28px;
                    padding-bottom: 45px;
                    border: 0px !important;
                }
                .ps-form__content{
                    border: 1px solid #d7e1ec;
                    border-radius:7px;
                    box-shadow: 0 0 14px 0 #dee5eb;
                }
                .ps-my-account-2{
                    min-height: 100vh;
                }
                .ps-my-account, .ps-my-account-2 {
                    display:flex;
                    justify-content:center;
                    align-items: center;
                }
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


export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
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

import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCookies } from 'react-cookie';
import Head from 'next/head';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";


import Forassistance from '~/components/shared/forassistance/forassistance';
import { FieldValidations } from '~/validations/authValidationFields';
import TypografyText from '~/components/elements/errors/TypografyText';

// import Api from '../../../store/services/auth';
import { DataFormater } from '~/helpers/helper-classes';
import ButtonWithLoadding from '~/components/elements/Button';
import Logo from '~/components/elements/common/Logo';
import { passwordResetAction } from '~/store/auth2/action';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';


async function validationFields(lang) {
    const fields = [
        {
            path: 'password'
        },
        {
            path: 'cpassword'
        },
    ];
    const fieldValidations = new FieldValidations();
    return await fieldValidations.validationGenerator(fields, lang);
}

export default function PasswordReset({ csrf, token, otp, RECAPTCHA_SITE_KEY, appLang, userDataToken }) {
    const userTokenIsValid = useUserTokenIsValid(userDataToken);
    const gReRef = useRef();
    const lang = useTranslation();
    const { t, i18n } = lang;
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [form] = Form.useForm();
    const [showLoadding, setShowLoadding] = useState(() => false);
    const [showLoaddingRec, setShowLoaddingRec] = useState(() => false);
    const dispatch = useDispatch();
    const [antdFields, setantdFields] = useState({
        password: {
            hasFeedback: false,
        },
        cpassword: {
            hasFeedback: false,
        },
    });
    const [vFields, setValidations] = useState({});
    const [wayToRest, setWayToRest] = useState({});
    const [dBMessage, setDBMessage] = useState(() => {
        return {
            message: '',
            hasError: false
        }
    })

    const selecStore = useSelector(st => {
        const { passwordReset } = st;
        return {
            passwordReset
        };
    });

    useEffect(() => {

        if (token && otp || !token && !otp) {
            router.replace('/');
            return;
        }
        validationFields(lang).then(data => {
            setValidations(data);
        });
        return () => {

        }
    }, [])

    async function handleSubmit(values) {
        // e.preventDefault();
        /*
            form.setFields([
                {
                    name: 'email',
                    value: 'jensy sanganal........',
                    errors: ['errorMsg']
                }
            ]);
            form.setFieldsValue({
                email: 'angel@gmail.com'
            });
        */
        setShowLoadding(() => true);
        setTimeout(() => {
            setShowLoadding(() => false);
        }, 20000);
        const tokenReCap = await gReRef.current.executeAsync();
        gReRef.current.reset();
        if (token) {
            dispatch(passwordResetAction({
                ...values,
                reCaptch: tokenReCap,
                token: token,
                isToken: true,
                csrf,
                lang: appLang.lang
            }));

        }
        if (otp) {
            const dataFormater = new DataFormater();
            const getStr = await dataFormater.decodeBase64(otp);
            const newMessage = JSON.parse(await dataFormater.decodeURIEscapeCharacters({ data: getStr, useComponent: true }));
            const { email, securityCode } = newMessage;
            dispatch(passwordResetAction({
                ...values,
                phoneCode: securityCode,
                reCaptch: tokenReCap,
                email,
                isToken: false,
                csrf,
                lang: appLang.lang
            }));

        }
    }
    useEffect(() => {
        async function initApp() {

            if (selecStore.passwordReset?.name) {
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
                    cookieOptions = { path: '/', sameSite: 'strict', secure: true, maxAge: 15 * 60 * 1000 };

                let navigateNext = false;
                const { message, hasError, fields } = selecStore.passwordReset;
                switch (selecStore.passwordReset.name) {
                    case 'success':
                        pack.header = t('auth:text.19');
                        pack.message = message;
                        navigateNext = true;
                        break;
                    case 'ValidationFeedBackError':
                        navigateNext = false;
                        setShowLoadding(() => false);
                        setDBMessage(() => {
                            return {
                                message: message,
                                hasError: hasError
                            }
                        });
                        break;
                    case 'TemporaryUnable':
                        navigateNext = true;
                        // pack.header = t('auth:text.19');
                        pack.message = message;
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';

                        break;
                    case 'ExpiredTokenToValidate':
                        navigateNext = true;
                        pack.message = t('auth:text.42');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';

                        break;
                    case 'UNPROCESSABLEREQUEST':
                        navigateNext = false;
                        pack.message = message;
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';

                        break;
                    case 'EXPIREDOTP':
                        navigateNext = false;
                        setShowLoadding(() => false);
                        setDBMessage(() => {
                            return {
                                message: message,
                                hasError: true
                            }
                        })
                        break;

                    case 'ValidationError':
                        setShowLoaddingRec(() => false);
                        let newObj = [];
                        newObj = DataFormater.transFormValidationErrorMessage(fields);
                        form.setFields(newObj);
                        break;

                    default:
                        navigateNext = true;
                        pack.header = t('auth:text.19');
                        pack.message = t('auth:text.20');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';

                        break;
                }

                if (navigateNext) {
                    // encode pack before set to cookie
                    const newMessage = await dataFormater.encodeToBase64(await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(pack), useComponent: true })) || t('auth:text.20');
                    // set cookie
                    setCookie('__UVACC__', newMessage, cookieOptions);
                    // navigate to show feed back
                    setShowLoadding(() => false);
                    router.replace('/account/feed-back');
                    return;
                }
                setShowLoadding(() => false);
            } else {
                setShowLoadding(() => false);
            }
        }
        initApp();
        return () => {

        }
    }, [selecStore.passwordReset.name]);


    async function onFinishFailed(errorInfo) {
    }

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

        // form.setFieldsValue({
        //     email: 'angel@gmail.com'
        // })
    }
    return (
        <>
            <Head>
                {/* Login */}
                <title>{t('header:head.5')}</title>
            </Head>

            <div className="ps-my-account">
                <div className="container">
                    {/*onChange check if is not empty hide icon*/}
                    <Form
                        form={form}
                        noValidate
                        className="ps-form--account"
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        // onFieldsChange={getValidationsFields}
                        layout="vertical"
                        scrollToFirstError={true}
                        size="small"
                    >
                        <div className="col-12 mb-5">
                            <div className="logo-container text-center">
                                <Logo />
                            </div>
                        </div>
                        {dBMessage.message && dBMessage.hasError && <div className="my-5">
                            <TypografyText className="" level="2" type="danger">
                                {dBMessage.message}
                            </TypografyText>
                        </div>}

                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>{DataFormater.capitalizeWordsSync({ textData: t('auth:text.41'), words: true })}</h5>

                                <div className="form-group form-forgot">
                                    <Form.Item
                                        label={t('auth:text.5')}
                                        name="password"
                                        initialValue=""
                                        hasFeedback={antdFields.password.hasFeedback}
                                        validateFirst
                                        validateTrigger={validateTrigger}
                                        rules={
                                            vFields.password
                                        }>
                                        <Input.Password
                                            autoComplete="off"
                                            className="form-control"
                                            type="password"
                                            placeholder=""
                                            onBlur={inputChange}
                                            name="password"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group">
                                    <Form.Item
                                        name="cpassword"
                                        initialValue=""
                                        label={t('auth:text.6')}
                                        hasFeedback={antdFields.cpassword.hasFeedback}
                                        validateFirst
                                        validateTrigger={validateTrigger}
                                        dependencies={['password']}
                                        rules={
                                            vFields.cpassword
                                        }>
                                        <Input.Password
                                            autoComplete="off"
                                            className="form-control"
                                            type="password"
                                            placeholder=""
                                            onBlur={inputChange}
                                            name="cpassword"
                                        />
                                    </Form.Item>
                                </div>
                                <ReCAPTCHA
                                    size="invisible"
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    // onChange={onChangeCaptch}
                                    ref={gReRef}
                                />
                                <div className="form-group submit">
                                    <ButtonWithLoadding showLoadding={showLoadding} component={<LockOutlined />}>
                                        {t('auth:text.41')}
                                    </ButtonWithLoadding>
                                </div>
                            </div>

                        </div>
                    </Form>

                    <Forassistance />
                </div>

                <style jsx global>
                    {`
                    .ps-form--account {
                        padding-top: 28px;
                        padding-bottom: 45px;
                    }
                    .ps-form__content{
                        border: 1px solid #d7e1ec;
                        border-radius:7px;
                        box-shadow: 0 0 14px 0 #dee5eb;
                    }
                    .ps-my-account {
                        min-height: 100vh;
                        background-color: rgb(255, 255, 255);
                        display:flex;
                        justify-content:center;
                        align-items: center;
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
                `}
                </style>
            </div>
        </>
    );
}


export const getServerSideProps = isUserAuthenticated(async ({ req, locale, appLang, query, ...rest }) => {
    return {
        props: {
            userDataToken: req.userDataToken,
            ...(await serverSideTranslations(locale, ['auth'])),
            token: query?.token || null,
            otp: query?.otp || null,
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
        }
    }

})

// export async function getServerSideProps({ locale, appLang, query, ...rest }) {
//     // console.log('rest: ', rest);
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['auth'])),
//             token: query?.token || null,
//             otp: query?.otp || null,
//             RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
//         }, // will be passed to the page component as props
//     }
// }
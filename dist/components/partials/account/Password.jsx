import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';


import { startRecoveryAccountAction, login, startRecoveryAccountActionReset, loginCleaner } from '../../../store/auth2/action';
import { FieldValidations } from '~/validations/authValidationFields';
import TypografyText from '../../elements/errors/TypografyText';
import { DataFormater } from '~/helpers/helper-classes';
import Logo from '~/components/elements/common/Logo';
import ButtonWithLoadding from '~/components/elements/Button';
async function validationFields(lang) {
    const fields = [
        {
            path: 'password'
        }
    ];
    const fieldValidations = new FieldValidations();
    return await fieldValidations.validationGenerator(fields, lang);
}

/*
<h2>Password assistance</h2>
<h5>Recover your password and get in board for more discounts, coupons and best prices.</h5>
<p className="mt-3">Enter the email address associated with your {value.client.appName} account.</p>
*/

export default function Password({ csrf, navigaTo, RECAPTCHA_SITE_KEY, appLang }) {

    const router = useRouter();
    const lang = useTranslation();
    const { t } = lang;
    const dispatch = useDispatch();
    const gReRef = useRef();
    const [form] = Form.useForm();
    const [cookies, setCookie, removeCookie] = useCookies(['signin_email']);
    const [showLoadding, setShowLoadding] = useState(() => false);
    const [showLoaddingRec, setShowLoaddingRec] = useState(() => false);
    const selecStore = useSelector(state => {
        const { userSignedIn, startRecoveryAcc } = state;
        return {
            userSignedIn,
            startRecoveryAcc
        };
    });

    const [vFields, setValidations] = useState({});
    const [dBMessage, setDBMessage] = useState(() => {
        return {
            message: '',
            hasError: false
        }
    })

    const [userData, setUserData] = useState({
        email: '',
        staySignedIn: false
    });
    const [antdFields, setantdFields] = useState({
        password: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        },
    })
    useEffect(() => {
        // set langs to validate fields
        if (!cookies.signin_email) return router.replace('/account/login');

        validationFields(lang).then(data => {
            setValidations(data);
        });

        setUserData(st => {
            return {
                ...st,
                ...cookies.signin_email
            }
        })

        return () => {
            return;
        }
    }, [])

    useEffect(() => {
        async function afterInit() {
            if (selecStore.userSignedIn.name) {
                const fieldSDbValidate = selecStore.userSignedIn.fields;

                switch (selecStore.userSignedIn.name) {
                    case 'success':
                        setShowLoadding(() => false);
                        const dataFormater = new DataFormater();
                        const newMessage = await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(selecStore.userSignedIn), useComponent: true });
                        //CUAI OR USER AUTH ID
                        localStorage.setItem('__CUAI', newMessage);
                        if (navigaTo) {
                            // router(navigaTo);
                            window.location.pathname = navigaTo;
                            return;
                        }
                        window.location.pathname = '/';
                        break;

                    case 'ValidationFeedBackError':
                        setShowLoadding(() => false);
                        setDBMessage(() => {
                            return {
                                message: selecStore.userSignedIn.message,
                                hasError: selecStore.userSignedIn?.hasError
                            }
                        })
                        break;
                    case 'ValidationError':
                        setShowLoadding(() => false);
                        let newObj = [];
                        newObj = DataFormater.transFormValidationErrorMessage(fieldSDbValidate);
                        form.setFields(newObj);
                        // form.setFields([
                        //     {
                        //         name: 'email',
                        //         value: email,
                        //         errors: ['errorMsg']
                        //     }
                        // ]);
                        break;
                    case 'TemporaryUnable':
                        setShowLoadding(() => false);
                        setDBMessage(() => {
                            return {
                                message: selecStore.userSignedIn.message,
                                hasError: selecStore.userSignedIn?.hasError
                            }
                        })
                        break;

                    default:
                        setShowLoadding(() => false);
                        if (selecStore.userSignedIn.hasError) {
                            setDBMessage(() => {
                                return {
                                    message: t('auth:text.20'),
                                    hasError: true
                                }
                            })
                        }
                        break;
                }
            }
        }
        afterInit();

        return () => {
            return;
        }
    }, [selecStore?.userSignedIn]);

    async function handleSubmit(values) {
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();
        setShowLoadding(() => true);
        dispatch(login({
            ...userData,
            ...values,
            reCaptch: token,
            csrf,
            lang: appLang.lang,
            loginFrom: 'local'
        }));
    }

    const onFinishFailed = (errorInfo) => {
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

    async function goToRecovery(e) {
        setShowLoaddingRec(() => true);
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();
        dispatch(startRecoveryAccountAction({
            email: userData.email,
            reCaptch: token,
            csrf,
            lang: appLang.lang
        }));
    }
    useEffect(() => {
        // recovery account
        async function initApp() {
            if (selecStore.startRecoveryAcc?.name) {
                switch (selecStore.startRecoveryAcc.name) {
                    case 'success':
                        setShowLoaddingRec(() => false);
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
                                data: JSON.stringify({ ...selecStore.startRecoveryAcc, email: userData.email }),
                                useComponent: true
                            }
                        )
                        const newMessage = await dataFormater.encodeToBase64(respUrlEnc);
                        setCookie('__recoveryUnafsb', newMessage, cookieOptions);
                        removeCookie('signin_email');
                        dispatch(startRecoveryAccountActionReset());
                        window.location.pathname = '/account/recovery/unafsb';// user authorized feed back
                        break;
                    case 'ValidationFeedBackError':
                        setShowLoaddingRec(() => false);
                        setDBMessage(() => {
                            return {
                                message: selecStore.startRecoveryAcc.message,
                                hasError: selecStore.startRecoveryAcc.hasError
                            }
                        })
                        break;
                    case 'ValidationError':
                        setShowLoaddingRec(() => false);

                        setDBMessage(() => {
                            return {
                                message: selecStore.startRecoveryAcc.message,
                                hasError: selecStore.startRecoveryAcc.hasError
                            }
                        })
                        break;

                    default:
                        setShowLoaddingRec(() => false);
                        setShowLoadding(() => false);
                        if (selecStore.startRecoveryAcc.hasError) {
                            setDBMessage(() => {
                                return {
                                    message: t('auth:text.20'),
                                    hasError: true
                                }
                            })
                        }
                        break;
                }
            }
        }
        initApp();
        return () => {
            return;
        }
    }, [selecStore.startRecoveryAcc?.name])

    return (
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
                    <div className="col-12 mb-5 mt-4">
                        <div className="logo-container text-center">
                            <Logo />
                        </div>
                    </div>
                    {dBMessage.message && dBMessage.hasError && <div className="my-5">
                        {/* <ExclamationCircleOutlined /> */}
                        <TypografyText text={dBMessage.message} className="" level="2" type="danger" >
                        </TypografyText>
                    </div>}

                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5 className="mb-5">{t('auth:text.21')}</h5>
                            <p className="mb-0">{userData.email}</p>
                            <p className="mt-0 mb-5">
                                {t('auth:text.24')}
                                <Link href="/account/login">
                                    <a className="text-primary" onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(loginCleaner());
                                        router.replace('/account/login')
                                    }}> {t('auth:text.25')}</a>
                                </Link>
                            </p>

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
                                <p className="mt-0 mb-5" onClick={goToRecovery}>
                                    {t('auth:text.26')}
                                    <span className="text-primary cursor-pointer"> {t('auth:buttons.23')}
                                        {/* <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>  */}
                                        {showLoaddingRec && <LoadingOutlined className="ml-2" />}
                                    </span>
                                </p>
                            </div>
                            <ReCAPTCHA
                                size="invisible"
                                sitekey={RECAPTCHA_SITE_KEY}
                                // onChange={onChangeCaptch}
                                ref={gReRef}
                            />
                            <div className="form-group submit">
                                <ButtonWithLoadding showLoadding={showLoadding}>
                                    {t('auth:buttons.1')}
                                </ButtonWithLoadding>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
            {/* margin: 0 auto !important; */}
            <style jsx global>
                {`
                    .cursor-pointer{
                        cursor:pointer;
                    }
                    .ps-my-account {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .ps-my-account #register{
                        position       : relative;
                        background     : #fff !important;
                        border-radius  : 2px;
                        box-shadow     : 0 0 14px 0 #dee5eb;
                        border         : solid 1px #d7e1ec;
                    }
                
                    .ps-form--account {
                        padding-top: 28px;
                        padding-bottom: 45px;
                    }
                    .form-control.ant-input, .form-control {
                        height: 40px !important;
                    }

                    .ant-form-vertical .ant-form-item-label, .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label {
                        padding: 0 0 0px;
                    }
                `}
            </style>
        </div>

    );
}

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import ReCAPTCHA from "react-google-recaptcha";
import { userSignUpAction } from '~/store/user/action';
import { FieldValidations } from '~/validations/authValidationFields';
import TypografyText from '../../elements/errors/TypografyText';
import { DataFormater } from '~/helpers/helper-classes';
import ButtonWithLoadding from '~/components/elements/Button';
import Logo from '~/components/elements/common/Logo';

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'next-i18next';
async function validationFields(lang) {
    const fields = [
        {
            path: 'fname',
            /*
            replacer: [
                {
                    required: {
                        required: false,
                        message: 'Jensy santana new message'
                    }
                }
            ]
            */
        },
        {
            path: 'lname',
        },
        {
            path: 'email'
        },
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

export default function Register({ csrf, appLang, RECAPTCHA_SITE_KEY, ...props }) {
    const gReRef = useRef();
    const router = useRouter();
    const lang = useTranslation();
    const { t, i18n } = lang;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const selecStore = useSelector(state => {
        const { user } = state;
        return {
            user
        };
    });

    const [showLoadding, setShowLoadding] = useState(() => false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [vFields, setValidations] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [antdFields, setantdFields] = useState({
        fname: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        },
        lname: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        },
        email: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        },
        password: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        },
        cpassword: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        },
    });

    const [dBMessage, setDBMessage] = useState(() => {
        return {
            message: '',
            hasError: false
        }
    })

    useEffect(() => {
        async function iniAppS() {
            const pack = {
                email: userEmail,
                header: DataFormater.capitalizeWordsSync({ textData: t('auth:text.13', { ACT: t('auth:text.14') }), words: true }),
                showFbsIcon: true,
                sbfIcon: '',
                message: selecStore.user.message,
                // sbfText1: t('auth:text.14'),
                // sbfText2: t('auth:text.15'),
                sbfTextDidNotREmail: t('auth:text.16', { ACT: t('auth:text.14') }),
                sbfTextResendEmail: t('auth:buttons.21', { ACT: t('auth:text.14') }),

            }
            const cookieOptions = {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 20 * 60 * 1000
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
            setCookie('__UAC_CMP', newMessage, cookieOptions);
            // removeCookie('signin_email');
            setShowLoadding(() => false);
            setDBMessage(() => {
                return {
                    message: '',
                    hasError: false
                }
            });
            router.push('/account/complete');
        }
        const userSignUp = selecStore.user.fields;
        switch (selecStore.user.name) {
            case 'success':
                setShowLoadding(() => false);
                iniAppS();
                break;

            case 'ValidationFeedBackError':
                setShowLoadding(() => false);
                setDBMessage(() => {
                    return {
                        message: selecStore.user.message,
                        hasError: selecStore.user.hasError
                    }
                });
                break;
            case 'ValidationError':
                if (userSignUp) {
                    let newObj = [];
                    newObj = DataFormater.transFormValidationErrorMessage(userSignUp);
                    form.setFields(newObj);
                    // form.setFields([
                    //     {
                    //         name: 'email',
                    //         value: email,
                    //         errors: ['errorMsg']
                    //     }
                    // ]);
                }
                setShowLoadding(() => false);
                setDBMessage(() => {
                    return {
                        message: selecStore.user.message,
                        hasError: selecStore.user.hasError
                    }
                });
                break;
            case 'TemporaryUnable':

                setShowLoadding(() => false);
                setDBMessage(() => {
                    return {
                        message: selecStore.user.message,
                        hasError: selecStore.user.hasError
                    }
                });
                break;

            default:
                setShowLoadding(() => false);
                setDBMessage(() => {
                    return {
                        message: t('auth:text.20'),
                        hasError: selecStore.user.hasError
                    }
                });
                break;
        }
        return () => {
            return;
        }
    }, [selecStore.user]);

    useEffect(() => {
        validationFields(lang).then(data => {
            setValidations(data);
        });
        return () => {
            return;
        }
    }, [])

    const handleSubmit = async (values) => {
        // console.log('values: ', values);
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
        }, 15000);
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();

        dispatch(userSignUpAction({
            ...values,
            reCaptch: token,
            csrf,
            lang: appLang.lang
        }));
        setUserEmail(values.email);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    <div className="col-12 mb-5 mt-2">
                        <div className="logo-container text-center">
                            <Logo />
                        </div>
                    </div>
                    {selecStore.user.message && selecStore.user.hasError && <div className="my-5">
                        {/* <ExclamationCircleOutlined /> */}
                        <TypografyText className="" level="2" type="danger">
                            {selecStore.user.message}
                        </TypografyText>
                    </div>}

                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>{t('auth:text.1')}</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="fname"
                                    label={t('auth:text.2')}
                                    initialValue=""
                                    hasFeedback={antdFields.fname.hasFeedback}
                                    validateFirst
                                    validateTrigger={validateTrigger}
                                    rules={
                                        vFields.fname
                                    }>
                                    <Input
                                        autoComplete="off"
                                        className="form-control"
                                        type="text"
                                        onBlur={inputChange}
                                        placeholder=""
                                        name="fname"
                                    />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <Form.Item
                                    name="lname"
                                    label={t('auth:text.3')}
                                    initialValue=""
                                    hasFeedback={antdFields.lname.hasFeedback}
                                    validateFirst
                                    validateTrigger={validateTrigger}
                                    rules={
                                        vFields.lname
                                    }>
                                    <Input
                                        autoComplete="off"
                                        className="form-control"
                                        type="text"
                                        placeholder=""
                                        onBlur={inputChange}
                                        name="lname"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <Form.Item
                                    name="email"
                                    label={t('auth:text.4')}
                                    initialValue=""
                                    validateFirst
                                    validateTrigger={[...validateTrigger,]}// 'onChange'
                                    hasFeedback={antdFields.email.hasFeedback}
                                    //logica de validation 
                                    // validar en {Blur or Focus Out, para la salida del field}
                                    // limpiar el field error en {Focus In or Click, Focus Enter}
                                    rules={
                                        vFields.email
                                    }>
                                    <Input
                                        onBlur={inputChange}
                                        autoComplete="off"
                                        className="form-control"
                                        type="email"
                                        placeholder=""
                                    />
                                </Form.Item>
                            </div>
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
                                <ButtonWithLoadding showLoadding={showLoadding}>
                                    {t('auth:buttons.2')}
                                </ButtonWithLoadding>
                                <p className="mt-3">
                                    {t('auth:text.46')} <Link href="/account/login">
                                        <a className="text-primary">{t('auth:buttons.1')}</a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a className="facebook" href="#">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="google" href="#">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="twitter" href="#">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="instagram" href="#">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
            {/* margin: 0 auto !important; */}
            <style jsx global>
                {`
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
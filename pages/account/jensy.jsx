// import Login from '~/components/partials/account/Login';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FieldValidations } from '~/validations/authValidationFields';
import { DataFormater } from '~/helpers/helper-classes';
import Logo from '~/components/elements/common/Logo';
import ButtonWithLoadding from '~/components/elements/Button';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale, query, ...rest }) {
    return {
        props: {
            // ...(await serverSideTranslations(locale, ['auth'])),
            navigaTo: query?.to || ''
        },
    }
}




// sdkfiuskjdkls

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

    async function validationFields(lang) {
        const fields = [
            {
                path: 'email'
            }
        ];
        const fieldValidations = new FieldValidations();
        return await fieldValidations.validationGenerator(fields, lang);
    }

    const lang = useTranslation();
    const { t, i18n } = lang;
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [form] = Form.useForm();
    const [showLoadding, setShowLoadding] = useState(() => false);
    const [staySignedIn, setStaySignedIn] = useState(() => false);
    const [vFields, setValidations] = useState({});
    const [btnMoreOrLess, setBtnMoreOrLess] = useState(() => true);
    const [antdFields, setantdFields] = useState({
        email: {
            validateStatus: 'success',
            hasFeedback: false,
            flag: false
        }
    });

    useEffect(() => {
        validationFields(lang).then(data => {
            setValidations(data);
        });
        removeCookie('__UVACC__');
        removeCookie('__SECCODE__');
        removeCookie('__recoveryUnafsb');
        return () => {
            return;
        }
    }, [])

    async function handleSubmit(values) {
        // setUserEmail(values.email);
        const dataFormater = new DataFormater(),
            cookieOptions = { path: '/', sameSite: 'strict', secure: true, maxAge: 60 * 60 * 1000 }; // 15 days
        // encode pack before set to cookie
        const newMessage = await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify({ email: values.email, staySignedIn }), useComponent: true });
        // set cookie
        setCookie('signin_email', newMessage, cookieOptions);
        if (navigaTo) {
            router.push({
                pathname: '/account/password',
                query: {
                    to: navigaTo
                }
            });
            return;
        }
        router.push('/account/password');
        return;
    }

    async function onFinishFailed(errorInfo) {
    }

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
    function onCheckboxChange(e) {
        setStaySignedIn(e.target.checked);
    };
    const formTailLayout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 12, offset: 0 },
    }
    return (
        <>
            <div className="ps-page--my-account">

                <div className="ps-my-account">
                    <div className="container">
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
                            <div className="ps-tab active" id="register">
                                <div className="ps-form__content">
                                    <h5 className="mb-5">
                                        {/* {t('auth:text.21')} */}
                                        jensy ii
                                    </h5>
                                    <div className="form-group">
                                        <Form.Item
                                            name="email"
                                            // label={t('auth:text.4')}
                                            label="email"
                                            initialValue=""
                                            // hasFeedback
                                            validateFirst
                                            validateTrigger={["onBlur", "onSubmit"]}// 'onChange'
                                            // validateStatus="warning"
                                            hasFeedback={antdFields.email.hasFeedback}
                                            // validateStatus={antdFields.email.validateStatus}
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
                                    <div className="form-group">
                                        <Form.Item>
                                            <Checkbox checked={staySignedIn} onChange={onCheckboxChange}>
                                                {/* {t('auth:text.23')} */}
                                                nameememememeee
                                                <p>
                                                    {/* {t('auth:text.22')}  */}
                                                    beffoooooooooree
                                                    <Link href="/" className="text-primary">

                                                        <a className="text-primary" onClick={function (e) {
                                                            e.preventDefault();
                                                            setBtnMoreOrLess(() => !btnMoreOrLess);
                                                        }}>
                                                            {t(btnMoreOrLess ? 'auth:buttons.22' : 'auth:buttons.24')}
                                                        </a>
                                                    </Link>
                                                </p>

                                            </Checkbox>
                                            {!btnMoreOrLess && <section
                                                className="alert-stay-sign-in alert-stay-sign-in--information my-3">
                                                <div className="learn-info">
                                                    <p id="learn-more-msg">
                                                        {/* {t('auth:text.28', { APP_NAME: proccess.env.title })} */}
                                                        PPPPWPEPEPEPEPEEPEPEPE
                                                    </p>
                                                </div>
                                            </section>}

                                        </Form.Item>
                                    </div>

                                    <div className="form-group submit">
                                        <ButtonWithLoadding
                                            showLoadding={showLoadding}
                                            component={
                                                <i className="fa fa-sign-in fa-1x mr-2"></i>
                                            }
                                        >
                                            {/* {t('auth:buttons.3')} */}
                                            BUTTONNNN
                                        </ButtonWithLoadding>
                                        <p className="mt-3">
                                            {/* {t('auth:text.45')}  */}
                                            PPPPPPP TEXT 45
                                            <Link href="/account/register">
                                                <a className="text-primary">
                                                    {/* {t('auth:buttons.7')} */}

                                                    LINK BUTTON 77777777777777
                                                </a>
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
                </div>
            </div>
        </>
    );
}


export default LoginPage;
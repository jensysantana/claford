import React, { useEffect, useRef, useState } from 'react'
import CardShadow from '~/components/elements/card/CardShadow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import {
     resendActivationAccountActionClean,
     sendMailRecoveryAccountFromEmailAction 
} from '~/store/auth2/action';
import { FieldValidations } from '~/validations/authValidationFields';
import { DataFormater } from '~/helpers/helper-classes';
import TypografyText from '~/components/elements/errors/TypografyText';
import ButtonWithLoadding from '~/components/elements/Button';
import { useCookies } from 'react-cookie';
import ReCAPTCHA from "react-google-recaptcha";

// DataFormater.capitalizeWordsSync(t('auth:buttons.21'))
async function validationFields(lang) {
    const fields = [
        {
            path: 'email'
        },
    ];
    const fieldValidations = new FieldValidations();
    return await fieldValidations.validationGenerator(fields, lang);
}
function Recovery({csrf, ...props}) {
    const gReRef = useRef();
    const router = useRouter();
    const lang = useTranslation();
    const { t, i18n } = lang;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const selectUser = useSelector(st => {
        const { resendEmail } = st;
        return {
            resendEmail,
        }
    })

    const [cookies, setCookie] = useCookies(['__RECOVERY__']);
    const [showLoadding, setShowLoadding] = useState(() => false);
    const [state, setstate] = useState({});
    const [vFields, setValidations] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [antdFields, setantdFields] = useState({
        email: {
            validateStatus: 'success',
            hasFeedback: false,
        },
    });

    useEffect(() => {
        async function initApp() {
            const dataFormater = new DataFormater();
            if (!cookies.__RECOVERY__) return router.replace('/account/login');
            const getStr = await dataFormater.decodeBase64(cookies.__RECOVERY__);
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

        async function appReqSent() {
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
                // set cookie options
                const dataFormater = new DataFormater(),
                    cookieOptions = { path: '/', sameSite: 'strict', secure: true, maxAge: 60 * 60 * 1000 };
                let goNext = true;
                switch (selectUser.resendEmail.name) {
                    case 'success':
                        pack.message = selectUser.resendEmail.message;
                        setShowLoadding(() => false);
                        dispatch(resendActivationAccountActionClean())
                        break;

                    case 'ValidationFeedBackError':
                        pack.message = selectUser.resendEmail.message;
                        pack.header = t('auth:text.19');
                        pack.messageClass = "text-danger";
                        pack.sbfIconClass = 'fa fa-exclamation-circle text-warning fa-5x d-block';
                        setShowLoadding(() => false);
                        break;
                    case 'ValidationError':
                        goNext = false;
                        pack.message = null;
                        const fields = resendEmail.fields;
                        let newObj = [];
                        newObj = DataFormater.transFormValidationErrorMessage(fields);
                        form.setFields(newObj);
                        // if (fields) {
                        //     // form.setFields([
                        //     //     {
                        //     //         name: 'email',
                        //     //         value: email,
                        //     //         errors: ['errorMsg']
                        //     //     }
                        //     // ]);
                        // }
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
                        setShowLoadding(() => false);
                        break;
                }


                if (goNext) {
                    // encode pack before set to cookie
                    const newMessage = await dataFormater.encodeToBase64(await dataFormater.encodeURIUnEscapeCharacters({ data: JSON.stringify(pack), useComponent: true })) || t('auth:text.20');
                    // set cookie
                    setCookie('__UVACC__', newMessage, cookieOptions);
                    //redirect
                    router.replace('/account/feed-back');
                }

            }
        }
        appReqSent();
        return () => {
            return ;
        }
    }, [selectUser.resendEmail?.name]);

    useEffect(() => {
        validationFields(lang).then(data => {
            setValidations(data);
        });

        return () => {
            return;
        }
    }, [])


    const handleSubmit = async (values) => {
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
        const token = await gReRef.current.executeAsync();
        gReRef.current.reset();
        setShowLoadding(() => true);
        setUserEmail(values.email);
        dispatch(sendMailRecoveryAccountFromEmailAction({ email: values.email, reCaptch: token, csrf }));
        return;

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

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <CardShadow>
                    {/*onChange check if is not empty hide icon*/}
                    <Form
                        form={form}
                        noValidate
                        className="w-100"
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        // onFieldsChange={getValidationsFields}
                        layout="vertical"
                        scrollToFirstError={true}
                        size="small"
                    >
                        <h2 className="text-left mb-5">{state?.header}</h2>
                        {selectUser?.resendEmail.message && selectUser?.resendEmail.hasError && <div className="my-5">
                            <TypografyText className="" level="2" type="danger">
                                {selectUser?.resendEmail.message}
                            </TypografyText>
                        </div>}

                        <div className="form-group ">
                            <Form.Item
                                name="email"
                                label={<span style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: 1.5,
                                    color: '#212933'
                                }}>{t('auth:valid.email.4')}</span>}

                                initialValue=""
                                validateFirst
                                validateTrigger={[...validateTrigger,]}// 'onChange'
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

                        <ReCAPTCHA
                            size="invisible"
                            sitekey={process.env.RECAPTCHA_SITE_KEY}
                            // onChange={onChangeCaptch}
                            ref={gReRef}
                        />

                        <div className="form-group submit">
                            <ButtonWithLoadding showLoadding={showLoadding}>
                                {state?.buttonSubmit}
                            </ButtonWithLoadding>
                        </div>
                        {/* <div className="ps-form__footer">
                                    <p>Connect with:</p>
                                </div> */}
                    </Form>

                </CardShadow>

                {/* margin: 0 auto !important; */}
                <style jsx global>
                    {`
                        .container{
                            height: 90vh;
                            width: 100% !important;
                        }
                        .form-group{
                            width:100%;
                        }
                        .text-left{
                            font-weight:300;
                        }
                    `}
                </style>
            </div>

        </>

    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'auth']))
        }, // will be passed to the page component as props
    }
}
export default Recovery;

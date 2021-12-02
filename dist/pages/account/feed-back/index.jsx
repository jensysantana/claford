

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Head from 'next/head';



import { DataFormater } from '~/helpers/helper-classes';
import Logo from '~/components/elements/common/Logo';
import ButtonWithLoadding from '~/components/elements/Button';
import Forassistance from '~/components/shared/forassistance/forassistance';
import { isUserAuthenticated } from '~/hooks/isUserAuthenticated';
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';

function FeedBack({ toApp, userDataToken }) {
    const userTokenIsValid = useUserTokenIsValid(userDataToken);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['__UVACC__']);
    const [state, setState] = useState({});
    const [showLoadding, setShowLoadding] = useState(() => false);
    useEffect(() => {
        // access cookie with the info needed
        async function initApp() {
            const dataFormater = new DataFormater();
            const getStr = await dataFormater.decodeBase64(cookies.__UVACC__),
                newMessage = JSON.parse(await dataFormater.decodeURIEscapeCharacters({ data: getStr, useComponent: true }));

            if (toApp) {
                // if has app mobile requested
                router.replace(`/account/toapp/${toApp}`);
                return;
            }

            setState(() => {
                return newMessage;
            })
        }
        initApp();
        return () => {

        }

    }, [cookies.__UVACC__]);

    async function onHandleSubmit(e) {
        e.preventDefault();
        setShowLoadding(() => true);
        router.replace(state.redirectTo);
    }
    return (
        <>
            <Head>
                <title>{t('header:head.9')}</title>
            </Head>
            <div className="container-fluid">
                <h1 className="mt-1 mb-5 ml-3">
                    <div className="logo-container pl-4">
                        <Logo />
                    </div>
                </h1>
                <div className="row justify-content-center align-items-center">
                    <div className="col-10 container-width text-center">
                        <div className="">
                            {state?.showHeaderIcon &&
                                <i
                                    className={state?.sbfIconClass ||
                                        "fa fa-check-circle text-success fa-5x d-block"}
                                />
                                // <i
                                //     className={"fa fa-exclamation-circle text-warning fa-5x d-block"}
                                // />
                            }
                            <h2 className="h1 mb-3 web-page">{state?.header}</h2>
                            <div className="">
                                <span
                                    className={state?.messageClass}
                                    dangerouslySetInnerHTML={{ __html: state?.message }}
                                >
                                </span>
                            </div>

                            {/* <div className={addClassToMessage}>
                                <span>
                                    {newIfYCantFindEmail}
                                </span>
                            </div> */}
                        </div>
                        <div className="mt-5">
                            <i className="fas fa-kiwi-bird"></i>
                            <div className="form-group submtit mt-4 submtit-btn">
                                <ButtonWithLoadding
                                    showLoadding={showLoadding}
                                    onClick={onHandleSubmit} type="button"
                                    btnIconClass=""
                                    showBtnIcon={state?.showBtnIcon}
                                >
                                    {state?.buttonText}
                                </ButtonWithLoadding>
                            </div>
                            {/* <ButtonWithLoadding
                                    {showLoadding}
                                    on:click={getNewEmailValidation}
                                    btnText={!showLoadding ? btnResend : btnPleaseW}
                                /> */}
                        </div>
                        {/* <AssistanceTime /> */}
                    </div>
                </div>
                <Forassistance />
            </div>

            <style jsx>{`
                .container-fluid{
                    padding: 50px 0px 50px 0px;
                }
              .web-page{
                  margin: 1.5rem 0 3rem 0 !important;
              }
                .container-width{
                    max-width: 440px;
                }

                @media only screen and (max-width: 576px) {
                    .container-width{
                        width: 100% !important;
                        padding-right: 0px;
                         padding-left: 0px;
                    }
                }

                @media only screen and (max-width: 390px) {
                    .container-width{
                        max-width: 100%;
                    }
                }
            `}
            </style>
        </>
    )
}


export const getServerSideProps = isUserAuthenticated(async ({ req, locale, query, ...rest }) => {
    // const cookParsed = cookie.parse(rest.req.cookies);
    // console.log('query  111111 ');
    // console.log(query);
    // console.log('query  2222222 ');
    return {
        // will be passed to the page component as props
        props: {
            toApp: query?.toApp || null,
            userDataToken: req.userDataToken,
        }
    }

})
export default FeedBack;

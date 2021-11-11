import Link from 'next/link'
import React from 'react'
import CardShadow from '~/components/elements/card/CardShadow'
import TypografyText from '~/components/elements/errors/TypografyText'

function CompleteContent({
    showFbsIcon,
    header,
    sbfTextDidNotREmail,
    sbfTextResendEmail,
    onClickFN,
    hasError,
    message,
    children,
    addClass = '',
    messageClass = '',
}) {

    return (
        <>
            <CardShadow >
                {/* <div className=""> */}
                <div className="wrapper-v2-auth-title mt-4 mb-3">
                    {showFbsIcon && <i className="fa fa-paper-plane d-inline-block logo mr-1" aria-hidden="true"></i>}
                    <span className="d-inline-block">{header}</span>
                </div>

                {message && !hasError && <p className={messageClass ? messageClass : `mb-3 ${addClass}`}>{message}</p>}
                {children}
                <p className="mt-4">{sbfTextDidNotREmail}
                    {/* text-nowrap */}
                    <Link href="/account/resendactivation">
                        {/* /account/resendactivation/ */}
                        <a
                            onClick={e => {
                                e.preventDefault();
                                return onClickFN(e)
                            }}
                            className="text-primary">
                            {sbfTextResendEmail}
                        </a>
                    </Link>
                </p>
                {
                    hasError && message && <div className="mb-5">
                        <TypografyText className="" level="2" type="danger">
                            {message}
                        </TypografyText>
                    </div>
                }
                {/* </div> */}
                <div className="auth-status">
                    <div className="auth-status-marker active" />
                    <div className="auth-status-marker" />
                </div>
                {/* </div> */}
            </CardShadow>
            <style jsx>{`
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
            `}</style>
        </>
    )
}

export default CompleteContent;

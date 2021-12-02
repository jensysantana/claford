import React from 'react'
import { GoogleLogin } from 'react-google-login';
import GoogleSignIn from '~/components/partials/account/Login/GoogleSignIn';
import { useExternalSignIn } from '~/hooks/useExternalSignIn';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default function FaceboockSignInButton({
    clientId,
    csrf,
    staySignedIn,
    lang
}) {

    const {
        handleCredentialResponseFaceboock
    } = useExternalSignIn();

    function responseFacebook(response) {
        console.log(response);



    }


    return (
        <>
            <FacebookLogin
                // appId="1059496111259761"
                appId={clientId}
                autoLoad={false}
                // fields="name,email,picture"
                // onClick={}
                callback={handleCredentialResponseFaceboock({
                    csrf,
                    staySignedIn,
                    lang,
                })}
                render={renderProps => (
                    <GoogleSignIn
                        className="mt-4"
                        text="Continue with Facebook"
                        backGround='#0C92F3'
                        textColor="#fff"
                        iconColor='#fff'
                        icon="facebook"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    />
                    // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                )}
            // render={renderProps => (
            //     <button onClick={renderProps.onClick}>This is my custom FB button</button>
            // )}

            />
            {/* <GoogleLogin
                // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                clientId={clientId}
                render={renderProps => (
                    <GoogleSignIn
                        className="mt-4"
                        text="Continue with Facebook"
                        backGround='#0C92F3'
                        textColor="#fff"
                        iconColor='#fff'
                        icon="facebook"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    />
                    // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                )}
                buttonText="facebook"
                isSignedIn={staySignedIn}
                onSuccess={handleCredentialResponseFaceboock({
                    csrf,
                    staySignedIn,
                    lang,
                })}
                // onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> */}
        </>
    )
}

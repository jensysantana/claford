import React from 'react'
import { GoogleLogin } from 'react-google-login';
import GoogleSignIn from '~/components/partials/account/Login/GoogleSignIn';
import { useExternalSignIn } from '~/hooks/useExternalSignIn';

//https://www.npmjs.com/package/react-google-login
export default function GoogleSignInButton({
    clientId,
    csrf,
    staySignedIn,
    lang
}) {

    const {
        handleCredentialResponseGoogle,
    } = useExternalSignIn();
    return (
        <>
            <GoogleLogin
                // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                clientId={clientId}
                render={renderProps => (
                    <GoogleSignIn
                        className="mt-4"
                        text="Continue with Google"
                        backGround='#DD4B39'
                        textColor="#fff"
                        iconColor='#fff'
                        icon="google"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    />
                    // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                )}
                buttonText="Login"
                isSignedIn={staySignedIn}
                onSuccess={handleCredentialResponseGoogle({
                    csrf,
                    staySignedIn,
                    lang,

                })}
                // onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}

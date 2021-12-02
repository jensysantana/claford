import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth2/action';

export function useExternalSignIn() {


    function handleCredentialResponse({
        csrf,
        staySignedIn,
        lang,
    }) {
        const dispatch = useDispatch();
        return function (response) {
            // GOOGLE SIGN IN...
            // decodeJwtResponse() is a custom function defined by you
            // to decode the credential response.
            // const responsePayload = decodeJwtResponse(response.credential);
            // console.log("ID: " + responsePayload.sub);
            // console.log('Full Name: ' + responsePayload.name);
            // console.log('Given Name: ' + responsePayload.given_name);
            // console.log('Family Name: ' + responsePayload.family_name);
            // console.log("Image URL: " + responsePayload.picture);
            // console.log("Email: " + responsePayload.email);

            // google token : ID_TOKEN
            const { tokenId } = response;
            // console.log(response);
            console.log('ID_TOKEN:: ', staySignedIn);
            dispatch(login({
                // ...userData,
                // ...values,
                // reCaptch: token,
                id_token: tokenId,
                staySignedIn,
                csrf,
                lang: lang,
                loginFrom: 'google'
            }));
        }
    }
    function onFailureResponseGoogle() {

    }

    function handleCredentialResponseFaceboock({
        csrf,
        staySignedIn,
        lang,
    }) {
        const dispatch = useDispatch();
        return function (response) {
            // FACEBOOOK SIGN IN...
            // decodeJwtResponse() is a custom function defined by you
            // to decode the credential response.
            // const responsePayload = decodeJwtResponse(response.credential);
            // console.log("ID: " + responsePayload.sub);
            // console.log('Full Name: ' + responsePayload.name);
            // console.log('Given Name: ' + responsePayload.given_name);
            // console.log('Family Name: ' + responsePayload.family_name);
            // console.log("Image URL: " + responsePayload.picture);
            // console.log("Email: " + responsePayload.email);

            // google token : ID_TOKEN
            // const { tokenId } = response;
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);

            if (response.status === "unknown") {

            }


            // console.log('ID_TOKEN:: ', staySignedIn);
            // dispatch(login({
            //     // ...userData,
            //     // ...values,
            //     // reCaptch: token,
            //     id_token: tokenId,
            //     staySignedIn,
            //     csrf,
            //     lang: lang,
            //     loginFrom: 'facebook'
            // }));

            // try {
            //     const { accessToken, userID } = response
            //     const res = await axios.post('/user/facebook_login', { accessToken, userID })

            //     setUser({ ...user, error: '', success: res.data.msg })
            //     localStorage.setItem('firstLogin', true)

            //     dispatch(dispatchLogin())
            //     history.push('/')
            // } catch (err) {
            //     err.response.data.msg &&
            //         setUser({ ...user, err: err.response.data.msg, success: '' })
            // }
        }
    }
    function onFailureResponseFaceboock() {

    }
    return {
        handleCredentialResponseGoogle: handleCredentialResponse,
        onFailureResponseGoogle,
        handleCredentialResponseFaceboock,
        onFailureResponseFaceboock
    }
}

// default useExternalSignIn;

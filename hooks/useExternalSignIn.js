import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth2/action';

export function useExternalSignIn() {
    const dispatch = useDispatch();

    function handleCredentialResponse({
        csrf,
        staySignedIn,
        lang,
    }) {
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
        return function (response) {

            // accessToken: "EAAO1L0lkORUBAMsGUHyXwyorbKARXMlZCoX1oH00mNjRose1HFCOS1Y8691EVrKXsFJ4OBQicXHaAZA4UBT8tuavK85TcUAQ1MjuZB6fUjLs1DeZCxuVkulUJpXyldGUDXEKWBxekUqrKUZB4HzxmZBiq8VTlWUtcOyQkZBj3sIWGM0wj1ovAM9pd9EZBL3QYhXaCL7Gi24yBSHwrelc2H1j"
            // data_access_expiration_time: 1646197440
            // expiresIn: 6960
            // graphDomain: "facebook"
            // id: "110571448127398"
            // name: "Jack Zulma"
            // signedRequest: "gh30rcoox_h-fTByqqP_9ak4b7UTkSmoVsLeWuDlb3U.eyJ1c2VyX2lkIjoiMTEwNTcxNDQ4MTI3Mzk4IiwiY29kZSI6IkFRQmZ1WnhNV1NiSDRndXFlODU1MkJ2SXZPdnJDdEhsenk4SUtzaVVnT2QxeGJKNlZKdEF6czhTazBZdXg2dnNKbC1FRDdiaGNPNWNMMi1QUlV4d21meE5yLVV5bTdHc2pVWFVSYzFLNk9PTG1ob0pmSkhJWWFXa0tqcUxhd0pRYTRvcmdDcktEeklSd01HTkUxX1pwVkdUQS1SZ2l0N283VHgwTEpOMzRXNWtnNlltaU5pbVNveHBpMU1RUGdHRnZOMWdaZVRYODYxb19qS3JBM21IOGtOOVVSVWVQQ2tGTGg4SGlxZnhZQU1JM0RRLVVQNS16Tk1UVXhMSUpxN3haRnJ0dTAtVXlJZ24wdFZBMFN4T19mZDN1WEt6cG9oc0t3VlphVE5kOHNrMTd1NEZ1NTV4YzhQS3RIdzBILUNSOFNINTlWR3Z3ZTV1RTBuOUFmaER1UDlrY0hBUTBYTG1xZ2pnbjlZSGM4bXd0NldKQmt0SFY1VVktQlMyTF9pQktJZyIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjM4NDIxNDQwfQ"
            // userID: "110571448127398"

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
            console.log("response 1111111");
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log(response);
            console.log('response 22222');

            if (response.status === "unknown") {

                return;
            }


            // console.log('ID_TOKEN:: ', staySignedIn);
            const { accessToken, userID } = response
            dispatch(login({
                // ...userData,
                // ...values,
                // reCaptch: token,
                // id_token: tokenId,
                staySignedIn,
                csrf,
                lang: lang,
                accessToken,
                userID,
                loginFrom: 'facebook'
            }));

            // try {
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

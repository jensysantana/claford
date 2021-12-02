import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataFormater } from "~/helpers/helper-classes";
import { loginCleaner } from "~/store/auth2/action";
const dataFormater = new DataFormater();

export function useUserTokenIsValid(payloadUserData) {
    // userDataToken

    const dispatch = useDispatch()
    const { userSignedIn } = useSelector(st => {
        const { userSignedIn } = st;
        // console.log(st);
        return {
            userSignedIn
        }
    })

    useEffect(() => {

        async function initAppToken() {

            console.log(' 111111 -----------------------payloadUserData-------------------------');
            console.log(payloadUserData)
            console.log(' 2222222 -----------------------payloadUserData-------------------------');
            try {

                if (payloadUserData.isLoggedIn) {

                    const now = new Date();
                    console.log(' 111111 --------------------useUserTokenIsValid-------------------');
                    // // console.log(payloadUserData.exp * 1000);
                    // // console.log(now.getTime());
                    console.log(payloadUserData.exp * 1000 > now.getTime());
                    console.log(' 2222222 ---------------useUserTokenIsValid-------------------');

                    if (payloadUserData.exp * 1000 > now.getTime()) {
                        console.log('SI SI SIS SIS IS SI SI SI SSI SII SIS I S S II S IS');

                        // context.req.userData = {
                        //     ...payloadUserData,
                        //     isLoggedIn: false
                        // }

                        return;
                    }
                    // get new token with refresh token OR clean user data
                    // dispatch(loginCleaner());


                    console.log(' 111111 -----REFRESH TOKEN USEUSERTOKEN HOOK------------------JENSY 11111-------------------------');
                    return;

                }
                // dispatch reduxer
                dispatch(loginCleaner());
                console.log(11111)
                console.log(' 2222222 -----------------------JENSY santana aqui-------------------------');
            } catch (error) {
                dispatch(loginCleaner());
                // console.log(' 111111 -----------------------error-------------------------');
                // console.log(error)
                // console.log(' 2222222 -----------------------error-------------------------');
            }

        }
        initAppToken();
        return () => {

        }
    }, [])

    return {

    }

}

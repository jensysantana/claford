import React from 'react';
import { useCookies } from 'react-cookie';

export default function Posdaniel() {
    const [cookies, setCookie, removeCookie] = useCookies('__UVACC__');
    console.log(cookies.__UVACC__);
    return (
        <div>
            pos daniel deeplinking
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { storePersistor, wrapper } from '~/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import Api from '../store/auth2/request/auth';


import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/home-default.scss';
import '~/scss/market-place-1.scss';
import '~/scss/market-place-2.scss';
import '~/scss/market-place-3.scss';
import '~/scss/market-place-4.scss';
import '~/scss/electronic.scss';
import '~/scss/furniture.scss';
import '~/scss/organic.scss';
import '~/scss/technology.scss';
import '~/scss/autopart.scss';
import '~/scss/electronic.scss';

import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }) {
    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
    });
    const [state, setstate] = useState(() => '');

    useEffect(() => {
        async function getCsrf() {
            const resp = await Api.AUTH.getCsrfAuth();
            setstate(() => resp.data.token);
            // setstate(() => '');
        }
        getCsrf();

        return () => {
            return false;
        }
    }, []);

    return (
        <CookiesProvider>
            <MasterLayout>
                {/* <Component {...pageProps} /> */}
                <PersistGate loading={<p>INDEX ____APPPP .......................LOADDING</p>} persistor={storePersistor.persistor}>
                    <Component {...pageProps} csrf={state} />
                </PersistGate>
            </MasterLayout>
        </CookiesProvider>
    );
}
export default wrapper.withRedux(appWithTranslation(App));
// export default wrapper.withRedux(App);

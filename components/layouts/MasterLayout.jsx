import React, { useEffect } from 'react';
import { BackTop } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
    setCartItems,
    setCompareItems,
    setWishlistTtems,
} from '~/store/ecomerce/action';
import PageLoader from '~/components/elements/common/PageLoader';
import NavigationList from '~/components/shared/navigation/NavigationList';
import MainHead from '~/components/layouts/modules/MainHead';
import { getCategories } from '~/store/categories/action';
import { useRouter } from 'next/router';
import { DataFormater } from '~/helpers/helper-classes';
import langers from '../../data/langs';
import { setUserLangRequest } from '~/store/setting/action';

const MasterLayout = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [cookies] = useCookies(['cart', 'compare', 'wishlist']);
    const { setUserLang } = useSelector(st => {
        return {
            setUserLang: st.setUserLang,
        }
    })
    // console.log('setUserLang::::', setUserLang.lang.code);
    // console.log('ROUTERRRRRRRRRRRR::::', router.locale);
    useEffect(() => {
        console.log('MasterLayout ((((((((((');
        console.log(window.location);
        console.log('MasterLayout ((((((((((');
        // let org = 'https://www.claford.com';
        // alert(org.replace('www.', ''));
        if (window.location.origin.includes('www.') || window.location.href.includes('www.')) {
            window.location.href = window.location.href.replace('www.', '');
        }
        return () => {

        }

    }, [])
    useEffect(() => {

        async function localeManageInit() {
            if (router.locale && setUserLang.lang.code !== router.locale) {
                const gHelpers = new DataFormater();
                const respLocal = await gHelpers.langProccessAsync(langers, [router.locale]);
                dispatch(setUserLangRequest({ lang: respLocal }));
            }
        }

        localeManageInit();
        return () => {

        }

    }, [])
    function initEcomerceValues() {
        if (cookies) {
            if (cookies.cart) {
                dispatch(setCartItems(cookies.cart));
            }
            if (cookies.wishlist) {
                dispatch(setWishlistTtems(cookies.wishlist));
            }
            if (cookies.compare) {
                dispatch(setCompareItems(cookies.compare));
            }
        }
    }

    useEffect(() => {
        initEcomerceValues();
    }, []);

    useEffect(() => {
        function initer() {
            dispatch(getCategories({
                // category:'Electronic',
                // subCategory:'Laptop',
                // subItem: 'Del'
                reCaptch: 'capToken',
                csrf: null,
                lang: setUserLang.lang
            }));
        }
        initer();
    }, []);

    return (
        <>
            <MainHead />
            {children}
            <PageLoader />
            <NavigationList />
            <BackTop>
                <button className="ps-btn--backtop">
                    <i className="icon-arrow-up"></i>
                </button>
            </BackTop>
        </>
    );
};

export default MasterLayout;
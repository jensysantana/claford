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

const MasterLayout = ({ children }) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['cart', 'compare', 'wishlist']);
    const { setUserLang } = useSelector(st => {
        return {
            setUserLang: st.setUserLang,
        }
    })
    console.log('setUserLang::::', setUserLang);
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

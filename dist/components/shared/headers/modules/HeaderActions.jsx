import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import { useSelector } from 'react-redux'
const HeaderActions = ({ ecomerce, auth }) => {
    const { isLoggedIn } = useSelector(state => {
        const { userSignedIn } = state;
        return {
            ...userSignedIn
        };
    });
    const { compareItems, wishlistItems } = ecomerce;
    // views
    let headerAuthView;
    if (isLoggedIn && Boolean(isLoggedIn) === true) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }
    return (
        <div className="header__actions">
            <Link href="/account/compare">
                <a className="header__extra">
                    <i className="icon-chart-bars"></i>
                    <span>
                        <i>{compareItems ? compareItems.length : 0}</i>
                    </span>
                </a>
            </Link>
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlistItems ? wishlistItems.length : 0}</i>
                    </span>
                </a>
            </Link>
            <MiniCart />
            {headerAuthView}
        </div>
    );
};

export default connect((state) => state)(HeaderActions);

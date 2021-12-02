import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';

const ElectronicHeaderActions = ({ auth, ecomerce }) => {




    // const { userSignedIn } = useSelector(st => {
    //     // console.log('useSelector 11111111 ----');
    //     // console.log(st);
    //     // console.log('useSelector 22222222 ----');
    //     return {
    //         ...st
    //     }
    // });


    // console.log('ElectronicHeaderActions 1111 ');

    // console.log(userSignedIn);
    // console.log('ElectronicHeaderActions 222 ');
    return (
        <div className="header__actions">
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{ecomerce.wishlistItems.length}</i>
                    </span>
                </a>
            </Link>
            <MiniCart />
            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default connect((state) => state)(ElectronicHeaderActions);

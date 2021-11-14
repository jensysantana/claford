import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';

class HeaderMobile extends Component {
    constructor({ props }) {
        super(props);
    }

    render() {
        return (
            <header className="header header--mobile">
                <div className="header__top">
                    <div className="header__left">
                        <p>Welcome to Martfury Online Shopping Store !</p>
                    </div>
                    <div className="header__right">
                        <ul className="navigation__extra">
                            <li className="sellonApp">
                                <Link href="/vendor/become-a-vendor">
                                    <a>Sell on Martfury</a>
                                </Link>
                            </li>
                            <li className="trackYour">
                                <Link href="/account/order-tracking">
                                    <a>Tract your order</a>
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navigation--mobile">
                    <div className="navigation__left">
                        <Link href="/">
                            <a className="ps-logo">
                                <img
                                    src="/static/img/logo_light.png"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                    </div>
                    <MobileHeaderActions />
                </div>
                <div className="ps-search--mobile">
                    <form
                        className="ps-form--search-mobile"
                        action="/"
                        method="get">
                        <div className="form-group--nest">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search something..."
                            />
                            <button>
                                <i className="icon-magnifier"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <style jsx global>
                    {
                        `
                        @media (max-width: 767px){
                            .header--mobile .navigation__extra li.sellonApp, li.trackYour{
                                display:none;
                            }
                            .header--mobile .navigation__extra li > a {
                             display: initial; 
                            }
                            .header--mobile .navigation__extra  {
                                display: initial !important; 
                            }
                        }

                        @media (max-width: 479px){
                            .header--mobile .header__top {
                                display: inherit;
                            }
                            
                        }
                        
                        `
                    }
                </style>
            </header>
        );
    }
}

export default HeaderMobile;

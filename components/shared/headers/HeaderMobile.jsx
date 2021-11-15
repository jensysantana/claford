import React from 'react';
import Link from 'next/link';
import CurrencyDropdown from './modules/CurrencyDropdown';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import Logo from '~/components/elements/common/Logo';
import { useTranslation } from 'react-i18next';
import SearchForm from '~/components/elements/search/SearchForm';

// class HeaderMobile extends Component {
//     constructor({ props }) {
//         super(props);
//     }

//     render() {

//     }
// }



export default function HeaderMobile({ }) {
    const { t } = useTranslation();
    return (
        <header className="header header--mobile">
            {/* HEADER TOP */}
            <div className="header__top">
                <div className="header__left">
                    {/* <p>Welcome to claford Online Shopping Store !</p> */}
                    <p>{t('header:defaultHeaderPage.2', { APPNAME: process.env.title })}</p>
                </div>
                <div className="header__right">
                    <ul className="navigation__extra">
                        <li className="sellonApp">
                            <Link href="/vendor/become-a-vendor">
                                {/* <a>Sell on claford</a> */}
                                <a>{t('header:defaultHeaderPage.3', { APPNAME: process.env.title })}</a>
                            </Link>
                        </li>
                        <li className="trackYour">
                            <Link href="/account/order-tracking">
                                {/* <a>Tract your order</a> */}
                                <a>{t('header:defaultHeaderPage.4')}</a>
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
                    <Logo />
                </div>

                <div className="ps-search--mobile-costume bg-danger">
                    <SearchForm placeHolder={t('common:inputs.1')} />
                </div>

                <MobileHeaderActions />
            </div>

            <div className="ps-search--mobile">
                <SearchForm placeHolder={t('common:inputs.1')} />
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


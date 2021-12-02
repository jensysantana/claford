import React, { useEffect } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import { useDispatch, useSelector } from 'react-redux';


export default function NavigationDefault() {
    const dispatch = useDispatch();
    const state = useSelector(state => {
        // console.log(state);
        return {
            state
        }
    })

    function handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    useEffect(() => {
    }, []);

    return (
        <nav className="navigation">
            <div className="ps-container">
                <div className="navigation__left">
                    <MenuCategoriesDropdown />
                </div>
                <div className="navigation__right">
                    <Menu
                        source={menuData.menuPrimary.menu_1}
                        className="menu"
                    />
                    <ul className="navigation__extra">
                        <li>
                            <Link href="/vendor/become-a-vendor">
                                <a>Sell on {process.env.title}</a>
                            </Link>
                        </li>
                        <li>
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
        </nav>
    );
}

// class NavigationDefault extends Component {
//     constructor(props) {
//         super(props);
//     }

//     handleFeatureWillUpdate(e) {
//         e.preventDefault();
//         notification.open({
//             message: 'Opp! Something went wrong.',
//             description: 'This feature has been updated later!',
//             duration: 500,
//         });
//     }

//     render() {
//         return (
//             <nav className="navigation">
//                 <div className="ps-container">
//                     <div className="navigation__left">
//                         <MenuCategoriesDropdown />
//                     </div>
//                     <div className="navigation__right">
//                         <Menu
//                             source={menuData.menuPrimary.menu_1}
//                             className="menu"
//                         />
//                         <ul className="navigation__extra">
//                             <li>
//                                 <Link href="/vendor/become-a-vendor">
//                                     <a>Sell on Martfury</a>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/account/order-tracking">
//                                     <a>Tract your order</a>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <CurrencyDropdown />
//                             </li>
//                             <li>
//                                 <LanguageSwicher />
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         );
//     }
// }

// export default NavigationDefault;

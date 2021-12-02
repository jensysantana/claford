import React from 'react';
import Link from 'next/link';
import MegaMenu from '~/components/elements/menu/MegaMenu';

// const Menu = ({ source, className }) => {
//     // Views
//     let menuView;
//     if (source) {
//         menuView = source.map((item) => {
//             if (item.subMenu) {
//                 return <MenuDropdown source={item} key={item.text} />;
//             } else if (item.megaContent) {
//                 return <MegaMenu source={item} key={item.text} />;
//             } else {
//                 return (
//                     <li key={item.text}>
//                         <Link href={item.url}>
//                             <a>
//                                 {item.icon && <i className={item.icon}></i>}
//                                 {item.text}
//                             </a>
//                         </Link>
//                     </li>
//                 );
//             }
//         });
//     } else {
//         menuView = (
//             <li>
//                 <a href="#" onClick={(e) => e.preventDefault()}>
//                     No menu item.
//                 </a>
//             </li>
//         );
//     }
//     return <ul className={className}>{menuView}</ul>;
// };

const Menu = ({ source, className }) => {
    // Views
    let menuView;
    if (source) {
        menuView = source.map((item, i) => {
            // console.log('ITEM 1111111 ');
            // console.log(item);
            // console.log('ITEM 2222222222 ');
            if (item?.subMenu) {
                // return <MenuDropdown source={item} key={item.title} />;
            } else if (item.megaContent) {
                //sub categories
                return <MegaMenu source={item} key={i} />;
            } else {
                // categories
                // console.log('DIMEMMMMMMM');
                // alert(888)
                // console.log(item);
                // console.log('2222222 DIMEMMMMMMM');
                return (
                    <li key={item._id}>
                        <Link href={item.url}>
                            <a>
                                {item.icon && <i className={item.icon}></i>}
                                {item.title}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
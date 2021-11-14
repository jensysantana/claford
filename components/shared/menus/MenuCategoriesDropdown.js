import React from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const MenuCategoriesDropdown = () => {
    const { t } = useTranslation();

    const catSelect = useSelector(st => {
        const { category } = st;
        return {
            categories: category.categories,
            // ...st
        }
    });

    // console.log(' 111111 ----useSelector-------------------st-------------------------');
    // console.log(st)
    // console.log(' 2222222 ----useSelector-------------------st-------------------------');
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                {/* <span>Shop by Department</span> */}
                <span>{t('header:defaultHeaderPage.1')}</span>
            </div>
            <div className="menu__content">
                <Menu
                    // source={menuData.product_categories}
                    source={catSelect.categories}
                    className="menu--dropdown"
                />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;

import React, { Component, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import Image from 'next/image'
import langers from '../../../../data/langs';
import { setUserLangRequest } from '~/store/setting/action';
import { useTranslation } from 'react-i18next';


function langProccess(langs, getLangs) {
    let newLangsArray = [];
    for (const iter of getLangs) {
        const resp = langs.find(lg => lg.code === iter);
        newLangsArray.push(resp);
    }
    return newLangsArray;
}
const langsApp = langProccess(langers, ['en', 'es', 'fr']);

function LanguageSwicher() {
    const lang = useTranslation();
    const { t, i18n } = lang;
    // const changeLanguage = lng => {
    //     console.log('lng: ', lng);
    //     i18n.changeLanguage('en');
    // }
    const dispatch = useDispatch();

    const [state, setState] = useState([...langsApp])
    // 18n.changeLanguage('en')
    function handleFeatureWillUpdated(e, data) {
        e.preventDefault();
        console.log('////AAAA...', data);
        // notification.open({
        //     message: 'Opp! Something went wrong.',
        //     description: 'This feature has been updated later!',
        //     duration: 500,
        // })
        // dispatch(setUserLangRequest({ lang: data.code }));
        // i18n.changeLanguage(data.code, function (params) {
        //     console.log(params);
        // });
        i18n.changeLanguage('en');


    }

    return (
        <div className="ps-dropdown language">
            <a href="#"
            // onClick={handleFeatureWillUpdated}
            >
                <img src="/static/img/flag/en.png" alt="martfury" />
                English
            </a>
            <ul className="ps-dropdown-menu">
                {
                    state.map(lg => (
                        <li key={lg.id}>
                            <a
                                href="#"
                                onClick={(e) => handleFeatureWillUpdated(e, lg)}>
                                <img src={`/static/img/flag/${lg.flagImg}`} alt={lg.name} />
                                {lg.name}
                            </a>
                        </li>
                    ))
                }

                {/* <li>
                    <a
                        href="#"
                        onClick={handleFeatureWillUpdated.bind(this)}>
                        <img src="/static/img/flag/germany.png" alt="martfury" />
                        Germany
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={handleFeatureWillUpdated.bind(this)}>
                        <img src="/static/img/flag/fr.png" alt="martfury" />
                        France
                    </a>
                </li> */}
            </ul>
        </div>
    );
}

export default LanguageSwicher;

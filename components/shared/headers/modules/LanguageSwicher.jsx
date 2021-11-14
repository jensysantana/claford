import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import langers from '../../../../data/langs';
import { setUserLangRequest } from '~/store/setting/action';
import { useRouter } from 'next/router';
import Link from 'next/link';

function langProccess(langs, getLangs, getArray = false) {
    let newLangsArray = [], newObj = {};
    for (const iter of getLangs) {
        const resp = langs.find(lg => lg.code === iter);

        if (getArray) {
            newLangsArray.push(resp);
        } else {
            Object.assign(newObj, resp);
            break;
        }
    }
    if (getArray) {
        return newLangsArray;
    } else {
        return newObj;
    }
}
// const langsApp = langProccess(langers, ['en', 'es', 'fr']);

// const savedLang = JSON.parse(localStorage.getItem('lang')) || null;
function LanguageSwicher() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { setUserLang } = useSelector(st => {
        return {
            setUserLang: st.setUserLang,
        }
    })

    function handleFeatureWillUpdated(e, data) {
        // e.preventDefault();
        dispatch(setUserLangRequest({ lang: data }));
    }

    return (
        <div className="ps-dropdown language">

            <a href="#"
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <img style={{ height: 12, width: 18 }} src={`/static/img/flag/${setUserLang.lang.flagImg}`} alt={setUserLang.lang.name} />
                {setUserLang.lang.name}
            </a>

            <ul className="ps-dropdown-menu">

                {
                    router.locales.map((locale) => {
                        const respLocal = langProccess(langers, [locale]);
                        return (
                            <li key={locale}>
                                <Link href={router.asPath} locale={locale}>
                                    <a
                                        onClick={(e) => handleFeatureWillUpdated(e, respLocal)}
                                    >
                                        <img style={{ height: 12, width: 18 }} src={`/static/img/flag/${respLocal.flagImg}`} alt={respLocal.name} />
                                        {respLocal.name}
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default LanguageSwicher;

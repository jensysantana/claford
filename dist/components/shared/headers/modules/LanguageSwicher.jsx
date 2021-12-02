import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import langers from '../../../../data/langs';
import { setUserLangRequest } from '~/store/setting/action';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DataFormater } from '~/helpers/helper-classes';
const gHelpers = new DataFormater();

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
                        const respLocal = gHelpers.langProccess(langers, [locale]);
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

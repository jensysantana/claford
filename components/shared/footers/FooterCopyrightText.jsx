import React from 'react'
import { useTranslation } from 'react-i18next'
import SanitizerData from '~/components/securities/SanitizerData';

export default function footerCopyrightText({ className }) {
    const { t } = useTranslation();
    return (
        <>
            <p className={className}>
                <SanitizerData text={t('footer:1', { ICON: '&copy;', YEAR: `2018-${new Date().getFullYear()}`, APPNAME: process.env.title },)} shoIcon={false} />
            </p>
            {/* <p>{t('footer:1', { ICON: '&copy;', YEAR: '2018-2021', APPNAME: process.env.title })}</p> */}
        </>
    )
}

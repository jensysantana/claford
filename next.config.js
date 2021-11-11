// const { initReactI18next } = require("react-i18next");
/*
* Martfury - Multipurpose Marketplace React Ecommerce Template v2.2.0
* Author: nouthemes
* Homepage: https://themeforest.net/user/nouthemes/portfolio
* Created at: 2019-11-15T08:00:00+07:00
* Update at: 2021-07-13T00:11:04+07:00
* */
// initReactI18next

const { i18n } = require('./next-i18next.config');
// import en from './locales/en/translation.json';
// import es from './locales/es/translation.json';

const apiUrl = process.env.NODE_ENV === 'development' ? `http://localhost:4300` : 'https://sidetransactions.claford.com';
const nextSettings = {
    optimizeFonts: false,
    // disable eslint
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Change your site title here
    env: {
        title: 'Claford',
        titleDescription: 'Claford market-place, is an online and offline shop multi purpose.',
        keyWords: 'claford, market, marketplace, store, sales, buy, purchace, raffle, auction, phone, laptop, tablet',
        contactEmail: 'jensysantana@gmail.com',
        RECAPTCHA_SITE_KEY: "6LedekgcAAAAAErpI_VI8xw59BFvcUe-Te0KluML",
        apiServer: {
            url: apiUrl,
            assetsUrl: `${apiUrl}/assets`
        },
        SERVERS: {
            frontApp: {
                url: process.env.NODE_ENV === 'development' ? `http://localhost:3005` : 'https://claford.com',
            },
            authServer: {
                servUrl: process.env.NODE_ENV === 'development' ? `http://10.0.0.64:43284` : 'https://authside.claford.com',
                apiBase: '/api/v1',
                headers: {

                }
            }
        }
        // apiImgUrlBase: process.env.NODE_ENV === 'development' ? ''
    },
    i18n,
    // i18n: {
    //     // These are all the locales you want to support in
    //     // your application
    //     locales: ['en', 'es', 'fr'],
    //     // initReactI18next: initReactI18next,
    //     // locales:Languages,
    //     // This is the default locale you want to be used when visiting
    //     // a non-locale prefixed path e.g. `/hello`
    //     defaultLocale: 'en',
    //     // This is a list of locale domains and the default locale they
    //     // should handle (these are only required when setting up domain routing)
    //     // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    //     // domains: [
    //     //     {
    //     //         domain: 'localhost.com',
    //     //         defaultLocale: 'en-US',
    //     //     },
    //     //     {
    //     //         domain: 'localhost.nl',
    //     //         defaultLocale: 'nl-NL',
    //     //     },
    //     //     {
    //     //         domain: 'localhost.fr',
    //     //         defaultLocale: 'fr',
    //     //         // an optional http field can also be used to test
    //     //         // locale domains locally with http instead of https
    //     //         http: true,
    //     //     },
    //     // ],
    // },

};

module.exports = nextSettings;
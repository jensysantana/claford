const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next"
        }
    },
    fr: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next"
        }
    }
};

const Languages = [
    // 'default',
    'es',
    'en',
    'fr'
];
const internatinalized = {
    i18n: {
        // resources,
        locales: Languages,
        defaultLocale: 'en',
        localeDetection: false,
    },
    // fallbackLng: 'en',
    // debug: false,
    // react: {
    //     wait: true
    // },
    trailingSlash: true,
};
module.exports = internatinalized


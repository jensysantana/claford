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
    'es',
    'en',
    'fr'
];
module.exports = {
    i18n: {
        // resources,
        locales: Languages,
        defaultLocale: 'en',
    },
};


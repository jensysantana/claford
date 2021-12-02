// console.log('---------host name---------');
// // const hostName = window.location.hostname;
// console.log(process.env.NODE_ENV);
// console.log(window.location);
// // console.log(window.location.host);
// // console.log(window.location.hash);
// // console.log(window.location.protocol);
// // console.log(window.location.origin);
// // console.log(window.location.port);
// // console.log(window.location.ancestorOrigins);
// console.log('---------host name---------');
// const originUrl = window.location.origin; // `http://localhost:3000/`,
// console.log('---------env---------');
// console.log(process.env);
// console.log('---------env---------');


// export const ConfigFront = {
//     url: process.env.NODE_ENV === 'development' ? `http://localhost:3000` : 'https://claford.com',
//     appName: 'Claford',
//     logoApp: '',
//     publicAssets: `${process.env.PUBLIC_URL}/assets/`
//     // publicAssets: '/assets/'
// }
// export const ConfigBackend = {
//     backendBaseUrl: `http://localhost:4300`,
//     apiBase: '/api/v1',
// }

export const APP_CONFIG = {
    client: {
        url: process.env.NODE_ENV === 'development' ? `http://localhost:3000` : 'https://claford.com',
        appName: 'Claford',
        logoApp: '',
        publicAssets: `${process.env.PUBLIC_URL}/assets/`
    },
    server: {
        url: process.env.NODE_ENV === 'development' ? `http://localhost:43285` : 'https://transactions.claford.com',
        apiBase: '/api/v1'
    },
    authServer: {
        // servUrl: process.env.NODE_ENV === 'development' ? `http://localhost:43284` : 'http://198.199.72.219',
        servUrl: process.env.NODE_ENV === 'development' ? `http://localhost:43284` : 'https://authserver.claford.com',
        apiBase: '/api/v1'
    }
}
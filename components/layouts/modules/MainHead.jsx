import React from 'react';
import Head from 'next/head';

const MainHead = () => (
    <Head>
        <title>{process.env.title}</title>
        <link rel="shortcut icon" href="/static/img/favi.png" />
        <link rel="icon" href="/static/img/favi.png" sizes="32x32" />
        <link rel="icon" href="/static/img/favi.png" sizes="192x192" />
        <link rel="apple-touch-icon-precomposed" href="/static/img/favi.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="author" content="nouthemes" />
        <meta name="keywords" content={process.env.keyWords} />
        <meta
            name="description"
            content={process.env.titleDescription}
        />
        <link
            href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
            rel="stylesheet"
        />
    </Head>
);

export default MainHead;

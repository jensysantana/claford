import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ type, maxWidth = 156, maxHeight = 42, ...rest }) => {
    let data;
    if (type === 'autopart') {
        data = {
            url: '/home/autopart',
            img: 'img/logo-autopart.png',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/logo-technology.png',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/logo-technology.png',
        };
    }
    else if (type === 'electronic') {
        data = {
            url: '/home/electronic',
            img: 'static/img/logo-electronic.png',
        };
    }
    else if (type === 'furniture') {
        data = {
            url: '/home/furniture',
            img: 'static/img/logo-furniture.png',
        };
    }
    else if (type === 'organic') {
        data = {
            url: '/home/organic',
            img: 'static/img/logo-organic.png',
        };
    }
    else {
        data = {
            url: process.env.SERVERS.frontApp.url,
            img: '/static/img/logo_light.png',
            // img: '/static/img/jensysantanar3.png',
        };
    }
    return (
        <Link href={data.url}>
            {/* <a className="ps-logo">
                <img
                    src={data.img} alt="Claford"
                />
            </a> */}
            <a className="ps-logo" style={{ maxWidth, maxHeight }}>
                <Image
                    alt={process.env.title}
                    src={data.img}
                    width={156}
                    height={42}
                    objectFit
                    {...rest}
                />
            </a>
        </Link>
    );
};

export default Logo;

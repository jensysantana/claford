import React from 'react'
import Link from 'next/link';

function Forassistance(props) {
    console.log('props: ', props);
    return (
        <>
            <p className="text-center mt-5">
                For assistance accessing your account,&nbsp;
                <Link href="/contacts">
                    <a className="text-primary">please contact us&nbsp;24/7.</a>
                </Link>
            </p>
        </>
    )
}

export default Forassistance;

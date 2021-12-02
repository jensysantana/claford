import { useRouter } from 'next/router'
import React from 'react'
import { useUserTokenIsValid } from '~/hooks/useUserTokenIsValid';
import { requireAuthentication } from '../hooks/requireAuthentication'

export default function Protect({ userDataToken }) {
    const userTokenIsValid = useUserTokenIsValid(userDataToken);
    const router = useRouter();
    return (
        <div>
            Hellot protecteddddddd touteee

            <h2 onClick={() => router.push('/account/login')}>Herereeeee</h2>
        </div>
    )
}


export const getServerSideProps = requireAuthentication(async (ctx) => {

    // ctx => {
    // }
    // Your normal `getServerSideProps` code here

    // console.log('context  route proooooootectedddd 1111111 ');
    // console.log(ctx.req);
    // console.log('context  route proooooootectedddd 222222222 ');

    return {
        props: {
            userDataToken: ctx.req.userDataToken,
            //ctx.params
        },
        // revalidate:100, //seconds = 100
    }

})

// https://www.youtube.com/watch?v=MFuwkrseXVE&t=798s
// minute: 2:03

// export async function getStaticPath() {
//     return {
    // fallback: false,
//         paths:[
//             {
//                 params: {
//                     meetupId: 'm1'
//                 }
//             }
//         ]
//     }
// }

// const resp = await fetch('/api/new', {
//     body: JSON.stringify({ name: 'jensySantana' }),
//     method: 'POST',
//     headers: {
//         "Content-type": "application/json"
//     }
// })

// const data = await resp.json();
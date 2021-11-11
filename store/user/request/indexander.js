import axios from 'axios';
export function requestSignUp(data) {
    return axios.request({
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json',
        },
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Accept': 'application/json'
        // },
        url: `localhost:4300/api/v1/account`,
        withCredentials: true
    })
}
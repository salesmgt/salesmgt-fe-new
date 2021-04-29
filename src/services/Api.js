import axios from 'axios'
import * as Cookies from '../utils/Cookies'
import { cookieNames } from '../constants/Generals'

const instance = axios.create({
    baseURL:
        'http://majorsalesmanagement-env.eba-t3fgyvme.ap-southeast-1.elasticbeanstalk.com',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
})

// if (accessToken) {
//     instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
// } else {
//     delete instance.defaults.headers.common['Authorization']
// }

instance.interceptors.request.use(
    (req) => {
        const accessToken = Cookies.getCookie(cookieNames.accessToken)
        if (accessToken) {
            if (!req.url.includes('access-tokens')) {
                req.headers['Authorization'] = `Bearer ${accessToken}`
            }
        }
        return req
    },
    (error) => {
        return Promise.reject(error)
    },
    { synchronous: true }
)

export default instance

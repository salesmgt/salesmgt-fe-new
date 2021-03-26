import axios from 'axios'
import * as Cookies from '../utils/Cookies'

// const getTokens = async () => {
//     const response = await axios.post(
//         'http://192.168.3.132:8081/access-tokens',
//         {
//             username: 'haptnn',
//             password: '12345678',
//         }
//     )
//     const data = await response.data.token

//     return data
// }

// const AUTH_TOKEN = `${getTokens()}`

const instance = axios.create({
    // baseURL: 'http://192.168.1.8:8080',
    baseURL: 'http://majorsalesmanagement-env.eba-t3fgyvme.ap-southeast-1.elasticbeanstalk.com',
    headers: {
        // Authorization: `${authToken}`,
        'Content-type': 'application/json',
    },
    // withCredentials: true,
})

// if (accessToken) {
//     instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
// } else {
//     delete instance.defaults.headers.common['Authorization']
// }

instance.interceptors.request.use(
    (req) => {
        const accessToken = Cookies.getCookie('accessToken')
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

// instance.interceptors.response.use((respone) => {
//     respone.headers['Access-Control-Allow-Origin'] = '*'
//     respone.headers['Access-Control-Allow-Headers'] =
//         'Origin, X-Requested-With, Content-Type, Accept'
//     return respone
// })

export default instance

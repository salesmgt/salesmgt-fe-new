import axios from 'axios'

axios.defaults.baseURL = 'https://api.example.com'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/json'

const getTokens = async () => {
    const response = await axios.post(
        'http://192.168.3.132:8081/access-tokens',
        {
            username: 'haptnn',
            password: '12345678',
        }
    )
    const data = await response.data.token

    return data
    // axios
    //     .post('http://192.168.3.132:8081/access-tokens', {
    //         username: 'haptnn',
    //         password: '12345678',
    //     })
    //     .then((respone) => {
    //         console.log(respone.data.token)
    //         return respone.data.token
    //     })
    //     .catch((error) => console.log(error.message))
}

const AUTH_TOKEN = `${getTokens()}`

const instance = axios.create({
    // baseURL: 'http://192.168.3.132:8081',
    headers: {
        Authorization: `${AUTH_TOKEN}`,
    },
})

export default instance

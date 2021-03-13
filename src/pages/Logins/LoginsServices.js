import axios from 'axios'

export async function getUser(usr, pwd) {
    const response = await axios.post(
        'http://192.168.3.132:8081/access-tokens',
        {
            username: usr,
            password: pwd,
        }
    )
    const data = await response.data

    return data
}

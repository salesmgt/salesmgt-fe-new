// import axios from 'axios'
import Api from '../../services/Api'

export async function checkUser(usr, pwd) {
    // const response = await axios.post(
    //     'http://192.168.3.132:8081/access-tokens',
    //     {
    //         username: usr,
    //         password: pwd,
    //     }
    // )
    const response = await Api.post(
        '/access-tokens',
        {
            username: usr,
            password: pwd,
        },
    )

    const data = await response.data

    return data
}

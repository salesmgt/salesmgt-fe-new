import Api from '../../services/Api'

export async function checkUser(usr, pwd) {
    const response = await Api.post('/access-tokens', {
        username: usr,
        password: pwd,
    })

    const data = await response.data

    return data
}

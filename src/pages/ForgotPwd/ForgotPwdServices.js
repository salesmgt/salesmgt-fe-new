import Api from '../../services/Api'

export async function checkUser(username) {
    const response = await Api.get(`/recover-password?username=${username}`)
    // const data = await response.data

    return response
}

export async function verifyCode(code) {
    const response = await Api.post(`/recover-password`, code)
    // const data = await response.data

    return response
}

export async function resetPwd(username, password) {
    const response = await Api.patch(`/recover-password/${username}`, password)
    // const data = await response.data

    return response
}

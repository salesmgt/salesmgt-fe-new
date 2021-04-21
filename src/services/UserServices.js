import Api from './Api'

export async function getProfile(username) {
    const response = await Api.get(`/users/${username}`)
    const data = await response.data

    return data
}

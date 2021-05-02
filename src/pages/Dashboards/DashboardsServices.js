import Api from '../../services/Api'

export async function getUser(username) {
    const response = await Api.get(`/users/${username}`)
    const data = await response.data

    return data
}

export async function getDashboards() {
    const response = await Api.get('/dashboard')
    const data = await response.data

    return data
}



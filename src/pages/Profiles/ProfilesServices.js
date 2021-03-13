import Api from '../../services/Api'

export async function getProfile() {
    const response = await Api.get('/profiles')
    const data = await response.data

    return data
}

export async function updateAvatar(avatar) {
    const response = await Api.put('/profiles/avatar', { avatar })
    const data = await response.data

    return data
}

export async function updateProfile(profile) {
    const response = await Api.put('/profiles', { profile })
    const data = await response.data

    return data
}

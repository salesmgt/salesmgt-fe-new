import Api from '../../services/Api'

export async function getProfile(username) {
    const response = await Api.get(`/users/${username}`)
    const data = await response.data

    return data
}

export async function updateGeneral(username, value) {
    const response = await Api.patch(`/users/${username}`, value)
    const data = await response.data

    return data
}
// export async function updateGeneral(username, attribute, value) {
//     const response = await Api.patch(`/users/${username}`, {
//         attribute: attribute,
//         value: value,
//     })
//     const data = await response.data

//     return data
// }

export async function updateAccount(username, newPassword, oldPassword) {
    const response = await Api.post(`/users/${username}`, {
        newPassword: newPassword,
        oldPassword: oldPassword,
    })
    const data = await response.data

    return data
}

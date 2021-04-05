import Api from '../../services/Api'

export async function getAccounts() {
    const response = await Api.get('/users')
    const data = await response.data

    return data
}

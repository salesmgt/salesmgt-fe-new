import Api from '../../services/Api'

export async function getDashboards() {
    const response = await Api.get('/dashbords')
    const data = await response.data

    return data
}

export async function getDashboardsByKeys(...keys) {
    const response = await Api.get('/dashbords', { ...keys })
    const data = await response.data

    return data
}

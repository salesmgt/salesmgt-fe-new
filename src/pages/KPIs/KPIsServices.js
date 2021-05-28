import Api from '../../services/Api'

export async function getKPISheets(
    page = 0,
    limit = 10,
    column = 'id',
    direction = 'desc',
    searchKey = undefined,
    filters = undefined,
    username
) {
    let url = `/kpis?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

    url = username ? url.concat(`&username=${username}`) : url

    if (filters) {
        url = filters['status'].filterValue
            ? url.concat(`&status=${filters['status'].filterValue}`)
            : url
        url = filters['schoolYear'].filterValue
            ? url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`)
            : url
    }

    const response = await Api.get(url)
    return response
}

export async function getKPIGroup(id) {
    const response = await Api.get(`/kpis/${id}`)
    const data = await response.data
    return data
}

export async function createKPIGroup(id, kpi) {
    const response = await Api.post(`/kpis/${id}`, kpi)
    return response
}

export async function updateKPIGroup(id, kpi) {
    const response = await Api.put(`/kpis/${id}`, kpi)
    return response
}

//========================KPI's criteria========================
export async function getKPICriteria() {
    const response = await Api.get('/criteria')
    const data = await response.data
    return data
}

//================List Salesmen to apply KPI group===============
export async function getAllSalesmen() {
    const response = await Api.get('/user/get-all')
    const data = await response.data
    return data
}
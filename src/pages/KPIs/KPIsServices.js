import Api from '../../services/Api'
import queryString from 'query-string'

export async function getKPIGroups(
    column = 'id',
    direction = 'desc',
    searchKey = undefined,
    filters = undefined,
    // username
) {
    let url = `/kpi-groups?column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

    // url = username ? url.concat(`&username=${username}`) : url

    if (filters) {
        url = filters['status'].filterValue
            ? url.concat(`&status=${filters['status'].filterValue}`)
            : url
        // url = filters['schoolYear'].filterValue
        //     ? url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`)
        //     : url
    }

    const response = await Api.get(url)
    return response
}

export async function getKPIGroup(groupId) {
    const response = await Api.get(`/kpi-groups/${groupId}`)
    const data = await response.data
    return data
}

export async function createKPIGroup(request) {
    const response = await Api.post('/kpis', request)
    return response
}

export async function disableKPIGroup(groupId) {
    const response = await Api.delete(`/kpi-groups/${groupId}`)
    return response
}

export async function getKPIDetails(kpiId) {
    const response = await Api.get(`/kpis/${kpiId}`)
    const data = await response.data
    return data
}

// Update manual KPIs
export async function updateKPIManual(kpiDetailId, kpiDetail) {
    const response = await Api.put(`/kpis/${kpiDetailId}`, kpiDetail)
    return response
}

//========================KPI's criteria========================
export async function getKPICriteria() {
    const response = await Api.get('/criteria')
    const data = await response.data
    return data
}

//================List Salesmen to apply KPI group===============
export async function getAllSalesmen(searchKey) {
    const key = queryString.stringify(searchKey)
    const response = await Api.get(`/users/get-all?${key}`)
    const data = await response.data
    return data
}

// Cách viết cũ
// export async function createKPIGroup(id, kpi) {
//     const response = await Api.post(`/kpis/${id}`, kpi)
//     return response
// }
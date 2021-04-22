import Api from '../../services/Api'
import queryString from 'query-string'

export async function getReports(
    page = 0,
    limit = 10,
    column = 'id',
    direction = 'asc',
    searchKey = undefined,
    filters = undefined
) {
    let url = `/reports?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

    // Tiền xử lý 7 filters
    if (filters) {
        url = filters['schoolYear'].filterValue
            ? url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`)
            : url
        url = filters['district'].filterValue
            ? url.concat(`&district=${filters['district'].filterValue}`)
            : url
        url = filters['PIC'].filterValue
            ? url.concat(`&fullName=${filters['PIC'].filterValue.fullName}`)
            : url
        url = filters['purpose'].filterValue
            ? url.concat(`&purpose=${filters['purpose'].filterValue}`)
            : url
        url = filters['dateRange'].filterValue[0]
            ? url.concat(`&fromDate=${filters['dateRange'].filterValue[0]}`)
            : url
        url = filters['dateRange'].filterValue[1]
            ? url.concat(`&toDate=${filters['dateRange'].filterValue[1]}`)
            : url
    }

    const response = await Api.get(url)
    const data = await response.data

    return data
}

export async function updateReport(reportId, report) {
    const response = await Api.put(`/reports/${reportId}`, report)
    // const data = await response.data

    return response
}

export async function getTargetSchools(params) {
    const paramString = queryString.stringify(params);
    const response = await Api.get(`/targets?${paramString}`)
    const data = await response.data
    return data.list
}

// export async function getReports() {
//     const response = await Api.get('/reports')
//     const data = await response.data

//     return data
// }

// export async function getReportsByKeys(...keys) {
//     const response = await Api.get('/reports', { ...keys })
//     const data = await response.data

//     return data
// }

export async function addReport(newReports) {
    const response = await Api.post('/reports', newReports)
    const data = await response.data

    return data
}

export async function removeReport(reportId) {
    const response = await Api.delete(`/reports/${reportId}`, { reportId })
    const data = await response.data

    return data
}

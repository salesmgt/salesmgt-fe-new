import Api from '../../services/Api'

export async function getReport(reportId) {
    const response = await Api.get(`/reports/${reportId}`)
    const data = await response.data

    return data
}

export async function updateReport(reportId, report) {
    const response = await Api.put(`/reports/${reportId}`, report)
    // const data = await response.data

    return response
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

// export async function addReport(newReport) {
//     const response = await Api.post('/reports', { newReport })
//     const data = await response.data

//     return data
// }

// export async function removeReport(reportId) {
//     const response = await Api.delete('/reports', { reportId })
//     const data = await response.data

//     return data
// }

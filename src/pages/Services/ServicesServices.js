import Api from '../../services/Api'

export async function getServices(
    page = 0,
    limit = 10,
    column = 'submitDate',
    direction = 'desc',
    searchKey = undefined,
    filters = undefined,
    picUsername
) {
    let url = `/services?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

    url = picUsername ? url.concat(`&username=${picUsername}`) : url

    if (filters) {
        url = filters['serviceStatus'].filterValue
            ? url.concat(`&status=${filters['serviceStatus'].filterValue}`)
            : url
        url = filters['serviceType'].filterValue
            ? url.concat(`&serviceType=${filters['serviceType'].filterValue}`)
            : url
        url = filters['schoolYear'].filterValue
            ? url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`)
            : url
        // url = filters[''].filterValue
        //     ? url.concat(`&username=${filters[''].filterValue}`)
        //     : url
    }

    const response = await Api.get(url)
    return response
}

export async function getService(serviceId) {
    const response = await Api.get(`/services/${serviceId}`)
    const data = await response.data
    return data
}

// Salesman updates note
export async function updateService(id, service) {
    const response = await Api.put(`/services/${id}`, service)
    // const data = await response.data
    return response
}

export async function getServiceTypes() {
    const response = await Api.get('/serviceTypes')
    const data = await response.data
    return data
}

export async function approveServices(serviceId) {
    const response = await Api.patch(`/services/approved/${serviceId}`)
    // const data = await response.data
    return response
}

export async function rejectServices(serviceId, rejectReason) {
    const response = await Api.patch(`/services/rejected/${serviceId}?reason=${rejectReason}`)
    // const data = await response.data
    return response
}

// export async function getTimeline(serviceId) {
//     const response = await Api.get(`/services/timeline/${serviceId}`)
//     const data = await response.data
//     return data
// }

// Đã viết bên TasksServices
// export async function submitService(service) {
//     const response = await Api.post('/services', service)
//     // const data = await response.data
//     return response
// }
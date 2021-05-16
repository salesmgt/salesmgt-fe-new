import Api from '../../services/Api'

export async function getServices(
    page = 0,
    limit = 10,
    column = 'id',
    direction = 'asc',
    searchKey = undefined,
    filters = undefined
) {
    let url = `/services?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

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
    }

    const response = await Api.get(url)
    return response
}

export async function getService(serviceId) {
    const response = await Api.get(`/services/${serviceId}`)
    const data = await response.data
    return data
}

export async function insertService(service) {
    const response = await Api.post('/services/', service)
    // const data = await response.data
    return response
}

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

// export async function getTimeline(serviceId) {
//     const response = await Api.get(`/services/timeline/${serviceId}`)
//     const data = await response.data
//     return data
// }
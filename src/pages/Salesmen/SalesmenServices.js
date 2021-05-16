import Api from '../../services/Api'

export async function getSalesmen(
    page = 0,
    limit = 10,
    column = 'username',
    direction = 'asc',
    searchKey = undefined,
    filters = undefined
) {
    let url = `/users?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

    if (filters) {
        // url = filters['isActive'].filterValue ? url.concat('&active=true') : url.concat('&active=false');
        // url = url.concat(`&active=${filters['isActive'].filterValue.isActive}`)
        url = filters['isActive'].filterValue !== null
            ? url.concat(`&active=${filters['isActive'].filterValue}`)
            : url
        url = filters['role'].filterValue
            ? url.concat(`&role=${filters['role'].filterValue}`)
            : url
    }

    const response = await Api.get(url)
    const data = await response.data
    return response
}

export async function getSalesman(username) {
    const response = await Api.get(`/users/${username}`)
    const data = await response.data
    return data
}

export async function evaluateSalesman(username, salesman) {
    const response = await Api.put(`/users/${username}`, salesman)
    // const data = await response.data

    return response
}

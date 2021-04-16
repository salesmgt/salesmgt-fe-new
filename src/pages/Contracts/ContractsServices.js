import Api from '../../services/Api'

export async function getAccounts(
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
        url = url.concat(`&active=${filters['isActive'].filterValue}`)
        url = filters['role'].filterValue
            ? url.concat(`&role=${filters['role'].filterValue}`)
            : url
    }

    // const response = await Api.get(url)
    // const data = await response.data

    return await Api.get(url)
}

export async function getAccount(username) {
    return await Api.get(`/users/${username}`)
}

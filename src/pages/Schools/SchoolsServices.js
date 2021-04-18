import Api from '../../services/Api'

export async function getSchools(
    page = 0,
    limit = 10,
    column = 'id',
    direction = 'asc',
    searchKey = undefined,
    filters = undefined
) {
    let url = `/schools?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url

    if (filters) {
        url = filters['district'].filterValue
            ? url.concat(`&district=${filters['district'].filterValue}`)
            : url
        url = filters['type'].filterValue
            ? url.concat(`&type=${filters['type'].filterValue}`)
            : url
        url = filters['level'].filterValue
            ? url.concat(`&level=${filters['level'].filterValue}`)
            : url
        url = filters['scale'].filterValue
            ? url.concat(`&scale=${filters['scale'].filterValue}`)
            : url
        url = filters['status'].filterValue
            ? url.concat(`&status=${filters['status'].filterValue}`)
            : url
    }

    // const response = await Api.get(url)
    // const data = await response.data
    // console.log('url = ', url);
    return await Api.get(url)
}

// export async function getSchoolsByKeys(...keys) {
//     const response = await Api.get('/schools', { ...keys })
//     const data = await response.data

//     return data
// }

export async function createSchool(school) {
    const response = await Api.post('/schools', school)
    const data = await response.data

    return data
}

export async function updateSchool(id, school) {
    const response = await Api.put(`/schools/${id}`, school)
    const data = await response.data

    return data
}

// export async function addSchoolsByFile(newSchools) {
//     const response = await Api.post('/schools', { newSchools })
//     const data = await response.data

//     return data
// }

// export async function removeSchool(schoolId) {
//     const response = await Api.delete('/schools', { schoolId })
//     const data = await response.data

//     return data
// }

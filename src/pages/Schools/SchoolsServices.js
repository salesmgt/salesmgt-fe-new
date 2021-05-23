import { roleNames } from '../../constants/Generals'
import Api from '../../services/Api'

export async function getSchools(
    page = 0,
    limit = 10,
    column = 'schoolId',
    direction = 'asc',
    searchKey = undefined,
    filters = undefined,
    userRole
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
        // url = filters['scale'].filterValue
        //     ? url.concat(`&scale=${filters['scale'].filterValue}`)
        //     : url
        url = filters['status'].filterValue
            ? url.concat(`&status=${filters['status'].filterValue}`)
            : url
        if (userRole === roleNames.admin) {
            url =
                filters['isActive'].filterValue !== null
                    ? url.concat(`&active=${filters['isActive'].filterValue}`)
                    : url
        } else {
            url = url.concat('&active=true')
        }
    }

    // console.log('url = ', url)
    const response = await Api.get(url)

    return response
}

// export async function getSchoolsByKeys(...keys) {
//     const response = await Api.get('/schools', { ...keys })
//     const data = await response.data
//     return data
// }

export async function getSchool(schoolId) {
    const response = await Api.get(`/schools/${schoolId}`)
    const data = await response.data
    return data
}

export async function createSchool(school) {
    const response = await Api.post('/schools/', school)
    // const data = await response.data
    return response
}

export async function importSchool(schools) {
    const response = await Api.post('/schools/import', schools)
    // const data = await response.data
    return response
}

export async function updateSchool(id, school) {
    const response = await Api.put(`/schools/${id}`, school)
    // const data = await response.data
    return response
}

export async function getTimeline(schoolId) {
    const response = await Api.get(`/schools/timeline/${schoolId}`)
    const data = await response.data
    return data
}
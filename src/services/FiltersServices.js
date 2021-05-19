import Api from './Api'
import queryString from 'query-string'

export async function getSchoolYears() {
    const response = await Api.get('/school-years')
    const data = await response.data
    return data
}

export async function getDistricts() {
    const response = await Api.get('/districts')
    const data = await response.data
    return data
}

export async function getEducationalLevels() {
    const response = await Api.get('/levels')
    const data = await response.data
    return data
}

// export async function getSchoolScales() {
//     const response = await Api.get('/scales')
//     const data = await response.data
//     return data
// }

export async function getSchoolTypes() {
    const response = await Api.get('/types')
    const data = await response.data
    return data
}

export async function getSchoolStatus() {
    const response = await Api.get('/school-status')
    const data = await response.data
    return data
}

export async function getPICs(params) {
    const paramString = queryString.stringify(params)
    const response = await Api.get(`/users?${paramString}`)
    const data = await response.data
    return data.list
}

export async function getPurposes() {
    const response = await Api.get('/purposes')
    const data = await response.data
    return data
}

export async function getRoles() {
    const response = await Api.get('/roles')
    const data = await response.data
    return data
}

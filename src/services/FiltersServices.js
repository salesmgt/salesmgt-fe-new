import Api from './Api'

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

export async function getSchoolStatuses() {
    const response = await Api.get('/school-status')
    const data = await response.data
    return data
}

export async function getSchoolTypes() {
    const response = await Api.get('/school-type')
    const data = await response.data
    return data
}

export async function getPurposes() {
    const response = await Api.get('/purposes')
    const data = await response.data
    return data
}
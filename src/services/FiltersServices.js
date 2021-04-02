import Api from './Api'

//===========Schools & Target Schools===========
export async function getSchoolYears() {
    return await Api.get('/school-years')
}

export async function getDistricts() {
    return await Api.get('/districts')
}

export async function getSchoolTypes() {
    return await Api.get('/types')
}

export async function getEducationalLevels() {
    return await Api.get('/levels')
}

export async function getSchoolScales() {
    return await Api.get('/scales')
}

export async function getPICs() {
    return await Api.get('/users?active=true')
}

export async function getSchoolStatuses() {
    return await Api.get('/school-status')
}

// export async function getPurposes() {
//     return await Api.get('/purposes')
// }

//================Users & Salesmen================
export async function getRoles() {
    return await Api.get('/roles')
}
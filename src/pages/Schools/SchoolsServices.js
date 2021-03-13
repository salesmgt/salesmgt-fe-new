import Api from '../../services/Api'

export async function getSchools() {
    const response = await Api.get('/schools')
    const data = await response.data

    return data
}

export async function getSchoolsByKeys(...keys) {
    const response = await Api.get('/schools', { ...keys })
    const data = await response.data

    return data
}

export async function addSchool(newSchool) {
    const response = await Api.post('/schools', { newSchool })
    const data = await response.data

    return data
}

export async function addSchoolsByFile(newSchools) {
    const response = await Api.post('/schools', { newSchools })
    const data = await response.data

    return data
}

export async function updateSchool(school) {
    const response = await Api.put('/schools', { school })
    const data = await response.data

    return data
}

export async function removeSchool(schoolId) {
    const response = await Api.delete('/schools', { schoolId })
    const data = await response.data

    return data
}

import Api from '../../services/Api'

export async function getTargetSchools() {
    try {
        const response = await Api.get('/target-schools')
        const data = await response.data

        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getTargetSchoolsByKeys(...keys) {
    try {
        const response = await Api.get('/target-schools', { ...keys })
        const data = await response.data

        return data
    } catch (error) {
        console.error(error)
    }
}

export async function addTargetSchools(newTargetSchools) {
    try {
        const response = await Api.post('/target-schools', { newTargetSchools })
        const data = await response.data

        return data
    } catch (error) {
        console.error(error)
    }
}

export async function updateTargetSchool(targetSchool) {
    const response = await Api.put('/target-schools', { targetSchool })
    const data = await response.data

    return data
}

export async function removeTargetSchool(targetSchoolId) {
    const response = await Api.delete('/target-schools', { targetSchoolId })
    const data = await response.data

    return data
}

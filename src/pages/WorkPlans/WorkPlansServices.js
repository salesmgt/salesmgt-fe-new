import Api from '../../services/Api'

export async function getEvents() {
    const response = await Api.get('/work-plans')
    const data = await response.data

    return data
}

export async function addEvent(newEvent) {
    const response = await Api.post('/work-plans', { newEvent })
    const data = await response.data

    return data
}

export async function updateEvent(event) {
    const response = await Api.put('/work-plans', { event })
    const data = await response.data

    return data
}

export async function removeEvent(eventId) {
    const response = await Api.delete('/work-plans', { eventId })
    const data = await response.data

    return data
}

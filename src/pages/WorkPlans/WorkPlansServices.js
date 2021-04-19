import Api from '../../services/Api'
import queryString from 'query-string'

export async function save(convert) {
    const response = await Api.post('/activity', convert);
    // const data = await response.data;
    return response;
}

export async function updateSave(occurrenceObj) {
    const response = await Api.put(`/activity/${occurrenceObj.recurrenceId}`, occurrenceObj);
    const data = await response.data;
    return data;
}

export async function remove(items) {
    const response = await Api.delete('/activity', { data: { items } });
    const data = await response.data;
    return data;
}

export async function removeUpdate(id, item) {
    const response = await Api.put(`/activity/${id}`, item);
    const data = await response.data;
    return data;
}

export async function update(item) {
    const response = await Api.put(`/activity/${item.id}`, item);
    const data = await response.data;
    return data;
}

// Get all activities
export async function callAPI(convert) {
    const paramString = queryString.stringify(convert);
    const response = await Api.get(`/activity?${paramString}`);
    // const data = await response.data;
    // return data;
    return response;
}

// Get all locations
export async function callAPITree(convert) {
    const paramString = queryString.stringify(convert);

    const response = await Api.get(`/locations?${paramString}`);
    const data = await response.data;
    return data;
}

//=========================================================================================================================================================

// export async function getEvents() {
//     const response = await Api.get('/work-plans')
//     const data = await response.data

//     return data
// }

// export async function addEvent(newEvent) {
//     const response = await Api.post('/work-plans', { newEvent })
//     const data = await response.data

//     return data
// }

// export async function updateEvent(event) {
//     const response = await Api.put('/work-plans', { event })
//     const data = await response.data

//     return data
// }

// export async function removeEvent(eventId) {
//     const response = await Api.delete('/work-plans', { eventId })
//     const data = await response.data

//     return data
// }

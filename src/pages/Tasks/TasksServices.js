// import { pick } from 'query-string'
import { ApiConfig as Api } from '../../services'

export async function getTasks(
    page = 0,
    limit = 10,
    column = 'assignDate',
    direction = 'desc',
    searchKey = undefined,
    filters = undefined,
    picUsername
) {
    let url = `/tasks?page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    url = searchKey ? url.concat(`&key=${searchKey}`) : url
    url = picUsername ? url.concat(`&username=${picUsername}`) : url

    // Tiền xử lý 9 filters
    if (filters) {
        url = filters['schoolYear'].filterValue
            ? url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`)
            : url
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
        url = filters['PIC'].filterValue
            ? url.concat(`&fullName=${filters['PIC'].filterValue.fullName}`)
            : url
        url = filters['purpose'].filterValue
            ? url.concat(`&purpose=${filters['purpose'].filterValue}`)
            : url
        url = filters['status'].filterValue
            ? url.concat(`&status=${filters['status'].filterValue}`)
            : url
        url =
            filters['isAssigned'].filterValue !== null
                ? url.concat(`&isAssigned=${filters['isAssigned'].filterValue}`)
                : url
        url = filters['taskStatus'].filterValue
            ? url.concat(`&result=${filters['taskStatus'].filterValue}`)
            : url
    }

    const response = await Api.get(url)
    const data = await response.data

    return data
}

export async function getTask(taskId) {
    const response = await Api.get(`/tasks/${taskId}`)
    const data = await response.data
    return data
}

export async function updateStatus(schoolId, schoolStatus) {
    const response = await Api.patch(`/schools/${schoolId}`, schoolStatus)
    // const data = await response.data
    return response
}

export async function updatePrinciple(schoolId, task) {
    const response = await Api.patch(`/schools/principal/${schoolId}`, task)
    // const data = await response.data
    return response
}

export async function updateTask(taskId, task) {
    const response = await Api.patch(`/tasks/${taskId}`, task)
    // const data = await response.data
    return response
}

// export async function updateSchool(id, school) {
//     const response = await Api.put(`/schools/${id}`, school)
//     // const data = await response.data

//     return response
// }

export async function removeTask(taskId) {
    const response = await Api.delete(`/tasks/${taskId}`, { taskId })
    const data = await response.data
    return data
}

export async function getDashboardsByKeys(...keys) {
    const response = await Api.get('/dashboards', { ...keys })
    const data = await response.data
    return data
}

export async function getSchoolsForTasks(
    schoolYear,
    page,
    limit,
    column,
    direction,
    searchKey,
    filters
) {
    // Đây là url đúng nhưng chưa có. Để đây sau này dùng, DO NOT REMOVE!!!
    let url = `/schools/targets-creating?active=true&schoolYear=${schoolYear}&page=${page}&limit=${limit}&column=${column}&direction=${direction}`

    // let url = `/schools?page=${page}&limit=${limit}&column=${column}&direction=${direction}&active=true`
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
    }

    // console.log('url getSchools for tasks: ', url);

    const response = await Api.get(url)
    const data = await response.data
    return data
}

export async function createTasks(listTasks) {
    const response = await Api.post('/tasks', listTasks)
    const data = await response.data
    return data
}

export async function completeTasks(taskId) {
    const response = await Api.put(`/tasks/completed/${taskId}`)
    // const data = await response.data
    return response
}

export async function incompleteTasks(taskId) {
    const response = await Api.put(`/tasks/failed/${taskId}`)
    // const data = await response.data
    return response
}

//===================== Assign Salesmen to Tasks =====================
// Get list suggested Salesman in feature assign
export async function suggestSalesmen(listSchoolId) {
    const response = await Api.post('/schools/suggestion', listSchoolId)
    const data = await response.data
    return data
}

export async function assignMulti(list) {
    const response = await Api.put(`/tasks/mutiple-assign`, list)
    const data = await response.data
    return data
}

export async function unassign(id) {
    const response = await Api.put(`/tasks/unassign/${id}`)
    const data = await response.data
    return data
}

// Get timeline of a task
export async function getTimeline(tasklId) {
    const response = await Api.get(`/tasks/timeline/${tasklId}`)
    const data = await response.data
    return data
}

//===================== Services of a task =====================
export async function getServiceTypes() {   // Tự hỏi viết cái này ở đây có đúng và cần thiết ko nhỉ???
    const response = await Api.get('/serviceTypes')
    const data = await response.data
    return data
}

export async function createServices(service) {
    const response = await Api.post('/services', service)
    // const data = await response.data
    return response
}

export async function updateService(serviceId, service) {
    const response = await Api.put(`/services/${serviceId}`, service)
    // const data = await response.data
    return response
}

// Get list managers to send notifications after a Salesman submit task's services
export async function getListManagers() {
    // Làm sao để load all Managers trong hth mà ko phân trang?
    const response = await Api.get('/users?active=true&role=SALES MANAGER')
    const data = await response.data
    return data
}
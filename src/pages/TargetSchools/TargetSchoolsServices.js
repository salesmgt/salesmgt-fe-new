import { ApiConfig as Api } from '../../services'

export async function getTargetSchools(
    page = 0, limit = 10, column = "id", direction = "asc", searchKey = undefined, filters = undefined
    // schoolYear = undefined, district = undefined, fullName = undefined,
    // purpose = undefined, type = undefined, level = undefined, scale = undefined
) {
    let url = `/targets?page=${page}&limit=${limit}&column=${column}&direction=${direction}`;
    // console.log('url 1 = ', url)

    // url = searchKey && url.concat(`&key=${searchKey}`);
    url = searchKey ? url.concat(`&key=${searchKey}`) : url;

    // Tiền xử lý 7 filters
    if (filters) {
        // url = filters['schoolYear'].filterValue && url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`);
        // url = filters['district'].filterValue && url.concat(`&district=${filters['district'].filterValue}`);
        // url = filters['type'].filterValue && url.concat(`&type=${filters['type'].filterValue}`);
        // url = filters['level'].filterValue && url.concat(`&level=${filters['level'].filterValue}`);
        // url = filters['scale'].filterValue && url.concat(`&scale=${filters['scale'].filterValue}`);
        // url = filters['PIC'].filterValue && url.concat(`&fullName=${filters['PIC'].filterValue}`);
        // url = filters['purpose'].filterValue && url.concat(`&purpose=${filters['purpose'].filterValue}`);

        url = filters['schoolYear'].filterValue ? url.concat(`&schoolYear=${filters['schoolYear'].filterValue}`) : url;
        url = filters['district'].filterValue ? url.concat(`&district=${filters['district'].filterValue}`) : url;
        url = filters['type'].filterValue ? url.concat(`&type=${filters['type'].filterValue}`) : url;
        url = filters['level'].filterValue ? url.concat(`&level=${filters['level'].filterValue}`) : url;
        url = filters['scale'].filterValue ? url.concat(`&scale=${filters['scale'].filterValue}`) : url;
        url = filters['PIC'].filterValue ? url.concat(`&fullName=${filters['PIC'].filterValue.fullName}`) : url;
        url = filters['purpose'].filterValue ? url.concat(`&purpose=${filters['purpose'].filterValue}`) : url;
    }

    // console.log('url = ', url)
    const response = await Api.get(url)
    // const response = await Api.get(`/targets?page=${page}&limit=${limit}&column=${column}&direction=${direction}`)

    return response;

    // return await Api.get(`/targets?page=${page}&limit=${limit}&column=${column}&direction=${direction}` +
    //     (searchKey ? `&key=${searchKey}` : "") + (schoolYear ? `&schoolYear=${schoolYear}` : "") +
    //     (district ? `&district=${district}` : "") + (fullName ? `&fullName=${fullName}` : "") +
    //     (purpose ? `&purpose=${purpose}` : "") + (type ? `&type=${type}` : "") +
    //     (level ? `&level=${level}` : "") + (scale ? `&scale=${scale}` : ""));
}

// export async function getTargetSchoolsByParams(params) {
//     let url = '/targets?'
//     // if (!searchKey)
//     //     url = url.concat(`key=${searchKey}&`)
//     console.log("params.sorting", params.sorting)
//     if (params.sorting !== undefined) {
//         if (!params.sorting.column === undefined) {
//             url = url.concat(`column=${params.sorting.column}&`)
//         }
//     }
//     if (params) {
//         if (params.limit) {
//             url = url.concat(`limit=${params.limit}&`)
//             console.log('params.limit', params.limit)
//         }
//     }
//     console.log('url', url)
//     // const response = await Api.get(`/targets?page=${page}&limit=${limit}&column=${columnName}&direction=${direction}&schoolYear=${schoolYear}&district=${district}&   key=${searchKey}`)
//     // const response = await Api.get(`/targets?page=${page}&limit=${limit}&column=${column}&direction=${direction}&schoolYear=&district=&key=`)

//     return Api.get(url)
// }

//============================Chưa dùng tới============================
// export async function getTargetSchools() {
//     return await Api.get('/targets')
// }

// export async function addTargetSchools(newTargetSchools) {
//     return await Api.post('/targets', { newTargetSchools })
// }

// export async function updateTargetSchool(targetSchool) {
//     return await Api.put('/targets', { targetSchool })
// }

// export async function removeTargetSchool(targetSchoolId) {
//     return await Api.delete('/targets', { targetSchoolId })
// }


export async function getDashboardsByKeys(...keys) {
    const response = await Api.get('/dashbords', { ...keys })
    const data = await response.data

    return data
}

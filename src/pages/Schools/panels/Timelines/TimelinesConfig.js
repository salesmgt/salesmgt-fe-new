export const Consts = {
    headers: {
        child1: 'Timeline',
    },
    labels: {
        schoolYear: 'School year:',
        startDate: 'Start date:',
        endDate: 'End date:',
        services: 'Services:',
        result: 'Result:',
    },
}

// Cách tổ chức data mới
export const timeline = [
    // {
    //     taskId: 50,
    //     startDate: '10-05-2019',
    //     endDate: '01-09-2019',
    //     schoolYear: '2019-2020',
    //     purpose: 'Sales mới',
    //     fullName: 'Nguyễn Hoàng Anh',
    //     avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354',
    //     services: null
    // },
    {
        taskId: 50,
        startDate: '30-06-2019',
        endDate: '01-09-2019',
        schoolYear: '2019-2020',
        purpose: 'Sales mới',
        fullName: 'Trần Diễm Nhi',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e',
        services: ['ESL', 'STEM']
    },
    {
        taskId: 51,
        startDate: '10-11-2019',
        endDate: '25-11-2019',
        schoolYear: '2019-2020',
        purpose: 'Chăm sóc',
        fullName: 'Đỗ Thị Ái Xuân',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F01-366x445.jpg?alt=media&token=f4dc75eb-112c-4de1-a0fa-651467d1a3a5',
        services: null
    },
    {
        taskId: 51,
        startDate: '01-12-2019',
        endDate: '15-12-2019',
        schoolYear: '2019-2020',
        purpose: 'Chăm sóc',    // có cái note thành lập trường bên task
        fullName: 'Trần Diễm Nhi',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e',
        services: null
    },
    {
        taskId: 51,
        startDate: '10-05-2020',
        endDate: '01-09-2021',
        schoolYear: '2020-2021',
        purpose: 'Tái ký hợp đồng',
        fullName: 'Trần Diễm Nhi',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e',
        services: ['ESL']
    },
    {
        taskId: 51,
        startDate: '10-11-2020',
        endDate: '25-11-2020',
        schoolYear: '2020-2021',
        purpose: 'Chăm sóc',
        fullName: 'Đỗ Thị Ái Xuân',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F01-366x445.jpg?alt=media&token=f4dc75eb-112c-4de1-a0fa-651467d1a3a5',
        services: null
    },
]

// Cách tổ chức data cũ, gây khó khăn trong việc lồng ghép timeline vì có 2-3 mảng object đan xen cần xử lý
// export const data = {
//     listReports: [
//         {
//             id: 7,
//             date: '12-12-2020',
//             result: true,
//             description: 'Cô rất hài lòng khi nhận quà',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Chăm sóc',    // có cái note thành lập trường bên task
//             fullName: 'Trần Diễm Nhi', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e', // PIC's avatar
//             schoolYear: '2020-2021',
//         },
//         {
//             id: 6,
//             date: '20-11-2020',
//             result: false,
//             description: 'Trường làm lễ, bảo vệ không cho vào',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Chăm sóc',
//             fullName: 'Đỗ Thị Ái Xuân', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F01-366x445.jpg?alt=media&token=f4dc75eb-112c-4de1-a0fa-651467d1a3a5', // PIC's avatar
//             schoolYear: '2020-2021',
//         },
//         {
//             id: 5,
//             date: '15-07-2019',
//             result: true,
//             description: 'Ký thành công ESL 1 năm',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Sales mới',
//             fullName: 'Nguyễn Hoàng Anh', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354', // PIC's avatar
//             schoolYear: '2019-2020',
//         },
//         {
//             id: 4,
//             date: '02-07-2019',
//             result: true,
//             description: 'Đã gặp HP Chuyên môn, cô đồng ý điều khoản Hợp đồng',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Sales mới',
//             fullName: 'Nguyễn Hoàng Anh', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354', // PIC's avatar
//             schoolYear: '2019-2020',
//         },
//         {
//             id: 3,
//             date: '27-06-2019',
//             result: true,
//             description: 'Đã giới thiệu và báo giá ESL',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Sales mới',
//             fullName: 'Nguyễn Hoàng Anh', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354', // PIC's avatar
//             schoolYear: '2019-2020',
//         },
//         {
//             id: 2,
//             date: '25-06-2019',
//             result: false,
//             description: 'Cô bận họp, 2 ngày sau quay lại',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Sales mới',
//             fullName: 'Nguyễn Hoàng Anh', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354', // PIC's avatar
//             schoolYear: '2019-2020',
//         },
//         {
//             id: 1,
//             date: '17-06-2019',
//             result: true,
//             description: 'Giới thiệu thành công Major',
//             schoolId: '2',
//             level: 'THCS',
//             schoolName: 'Văn Lang',
//             purpose: 'Sales mới',
//             fullName: 'Nguyễn Hoàng Anh', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354', // PIC's avatar
//             schoolYear: '2019-2020',
//         },
//     ],
//     listAssigns: [
//         {
//             assignDate: '01-12-2020',
//             fullName: 'Trần Diễm Nhi', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e', // PIC's avatar
//             schoolYear: '2020-2021',
//         },
//         {
//             assignDate: '10-11-2020',
//             fullName: 'Đỗ Thị Ái Xuân', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F01-366x445.jpg?alt=media&token=f4dc75eb-112c-4de1-a0fa-651467d1a3a5', // PIC's avatar
//             schoolYear: '2020-2021',
//         },
//         {
//             assignDate: '01-06-2019',
//             fullName: 'Nguyễn Hoàng Anh', // PIC's name
//             avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354', // PIC's avatar
//             schoolYear: '2019-2020',
//         },
//     ],
// }
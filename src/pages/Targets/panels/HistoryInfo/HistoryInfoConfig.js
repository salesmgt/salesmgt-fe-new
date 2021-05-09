export const Consts = {
    headers: {
        child1: 'History',
    },
    labels: {
        schoolYear: 'School year:',
        reason: 'Reason:',
        services: 'Successfully collaborated on ',
        duration: 'Duration:',
    },
}

// Cách tổ chức data mới
export const timeline = [
    {   // Object 'Assign'
        date: '01-06-2019',
        type: 'assign',
        schoolYear: '2019-2020',
        purpose: 'Sales mới',
        fullName: 'Nguyễn Hoàng Anh', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354',
    },
    {   // Object 'Report'
        date: '17-06-2019',
        type: 'report',
        schoolYear: '2019-2020',
        reportId: 1,
        result: true,
        description: 'Giới thiệu thành công Major',
        schoolId: '2',
        purpose: 'Sales mới',
        fullName: 'Nguyễn Hoàng Anh', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354',
    },
    {   // Object 'Report'
        date: '25-06-2019',
        type: 'report',
        schoolYear: '2019-2020',
        reportId: 2,
        result: false,
        description: 'Cô bận họp, 2 ngày sau quay lại',
        schoolId: '2',
        purpose: 'Sales mới',
        fullName: 'Nguyễn Hoàng Anh', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354',
    },
    {   // Object 'Report'
        date: '27-06-2019',
        type: 'report',
        schoolYear: '2019-2020',
        reportId: 3,
        result: true,
        description: 'Đã giới thiệu và báo giá ESL',
        schoolId: '2',
        purpose: 'Sales mới',
        fullName: 'Nguyễn Hoàng Anh', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354',
    },
    // DB chưa có chỗ để lưu vụ unassign
    // {   // Object 'Unassign'
    //     date: '30-06-2019',
    //     type: 'unassign',
    //     schoolYear: '2019-2020',
    //     reason: 'Bận công việc riêng',
    //     fullName: 'Nguyễn Hoàng Anh', // PIC's name
    //     avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2FZe6axJ1.jpg?alt=media&token=3d31ba01-f18f-4c8b-a456-b051fc190354',
    // },
    {   // Object 'Assign'
        date: '30-06-2019',
        type: 'assign',
        schoolYear: '2019-2020',
        purpose: 'Sales mới',
        fullName: 'Trần Diễm Nhi', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e',
    },
    {   // Object 'Report'
        date: '02-07-2019',
        type: 'report',
        schoolYear: '2019-2020',
        reportId: 4,
        result: true,
        description: 'Đã gặp HP Chuyên môn, cô đồng ý điều khoản Hợp đồng',
        schoolId: '2',
        purpose: 'Sales mới',
        fullName: 'Trần Diễm Nhi', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e',
    },
    {   // Object 'Report'
        date: '15-07-2019',
        type: 'report',
        schoolYear: '2019-2020',
        reportId: 5,
        result: true,
        description: 'Ký thành công ESL 1 năm',
        schoolId: '2',
        purpose: 'Sales mới',
        fullName: 'Trần Diễm Nhi', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e',
    },
    {   // Object 'Services'
        date: '15-07-2019',
        type: 'service',
        schoolYear: '2019-2020',
        services: ['ESL', 'STEM'],
        duration: '12 months',
        // revenue_criteria: 'Tiết',
        // note: '1 tiết/tuần'
    },
    {   // Object 'Assign'
        date: '10-11-2020',
        type: 'assign',
        schoolYear: '2020-2021',
        purpose: 'Chăm sóc',
        fullName: 'Đỗ Thị Ái Xuân', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F01-366x445.jpg?alt=media&token=f4dc75eb-112c-4de1-a0fa-651467d1a3a5', // PIC's avatar
    },
    {   // Object 'Report'
        date: '28-12-2020',
        type: 'report',
        schoolYear: '2020-2021',
        reportId: 6,
        result: false,
        description: 'Trường làm lễ, bảo vệ không cho vào',
        schoolId: '2',
        purpose: 'Chăm sóc',
        fullName: 'Đỗ Thị Ái Xuân', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F01-366x445.jpg?alt=media&token=f4dc75eb-112c-4de1-a0fa-651467d1a3a5', // PIC's avatar
    },
    {   // Object 'Assign'
        date: '01-12-2020',
        type: 'assign',
        schoolYear: '2020-2021',
        purpose: 'Chăm sóc',
        fullName: 'Trần Diễm Nhi', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e', // PIC's avatar
    },
    {   // Object 'Report'
        date: '12-12-2020',
        type: 'report',
        schoolYear: '2020-2021',
        reportId: 7,
        result: true,
        description: 'Cô rất hài lòng khi nhận quà',
        schoolId: '2',
        // level: 'THCS',           // level và schoolName có cần thiết ko ta???
        // schoolName: 'Văn Lang',
        purpose: 'Chăm sóc',    // có cái note thành lập trường bên target/task
        fullName: 'Trần Diễm Nhi', // PIC's name
        avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Favatars%2F0d68523b0481d68304da70f4dad00980.jpg?alt=media&token=6e5fc707-5cd4-4a62-8988-16486e89813e', // PIC's avatar
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
//             purpose: 'Chăm sóc',    // có cái note thành lập trường bên target/task
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
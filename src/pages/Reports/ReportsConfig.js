export const columns = [
    // { key: "checkbox", name: '', sortable: false },
    // { key: "no", name: 'No', sortable: false },
    { key: "date", name: 'Date', sortable: true },
    { key: "schoolName", name: 'School Name', sortable: true }, // SchoolName - primary, District - secondary
    { key: "fullName", name: 'PIC', sortable: true },
    { key: "targetPurposeName", name: 'Purpose', sortable: true },  // Purpose - primary
    { key: "result", name: 'Result', sortable: false },
    { key: "description", name: 'Description', sortable: false }, // truncate 30 kí tự thôi
    // { key: "comment", name: 'Comment', sortable: false }, // truncate 30 kí tự thôi
    { key: '', name: '', sortable: false },
]

export const data = {
    list: [
        {
            id: 1,
            date: '25/12/2020',
            fullName: 'Phan Văn Thái',
            username: 'thaipv',
            avatar:
                'https://galileoenrichment.com/wp-content/uploads/2020/03/man.png',
            schoolName: 'Trần Quang Khải',
            level: 'THPT',
            district: 'Quận 1',
            address: '12 Trần Quang Khải, P7',
            reprName: 'Hồ Quang Tuấn',
            reprIsMale: true,
            status: 'Chưa hợp tác',
            purpose: 'Sales mới',
            result: 'OK',
            description: 'Đã giới thiệu về Major Education',
            positivity: 'Thầy rất thiện chí',
            difficulty: '',
            futurePlan: 'Giới thiệu thêm chương trình Toán Khoa cho Thầy',
            comment: [],
            schoolYear: '2020-2021',
        },
        {
            id: 2,
            date: '25/12/2020',
            fullName: 'Lê Thị Nhi',
            username: 'nhile',
            avatar:
                'https://www.richmondhillpestcontrol.ca/wp-content/uploads/2019/10/7-512.png',
            schoolName: 'Trần Xuân Soạn',
            level: 'THCS',
            district: 'Quận 7',
            address: '12 Trần Xuân Soạn, P12',
            reprName: 'Nguyễn Trung Hậu',
            reprIsMale: true,
            status: 'Đang hợp tác',
            purpose: 'Chăm sóc',
            result: 'Không gặp được HT',
            description: 'Thầy đi công tác. Đã gửi quà cho Thầy Hiệu phó.',
            positivity: '',
            difficulty: '',
            futurePlan: '',
            comment: {
                fullName: 'Phạm Duy Tiến',
                content: 'OK',
            },
            // comment: '[Phạm Duy Tiến] OK',
            // comments: [{
            //     fullName: 'Phạm Duy Tiến',
            //     username: 'duytien01',
            //     avatar: 'https://arawal.files.wordpress.com/2015/07/flat-faces-icons-circle-3.png',
            //     date: '26/12/2020',
            //     content: 'OK'
            // }],
            schoolYear: '2020-2021',
        },
        {
            id: 3,
            date: '25/12/2020',
            fullName: 'Trần Thị Xuân Tuyền',
            username: 'tuyentran',
            avatar:
                'https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png',
            schoolName: 'Nguyễn Văn Trỗi',
            level: 'TH',
            district: 'Quận 12',
            address: '90 Nguyễn Văn Trỗi, P7',
            reprName: 'Trịnh Thị Thanh Thư',
            reprIsMale: false,
            status: 'Đang hợp tác',
            purpose: 'Tái ký hợp đồng',
            result: 'Đã gặp HT',
            description: 'Đã trao đổi với Cô về các chương trình của Major',
            positivity: '',
            difficulty: 'Cô đang cân nhắc',
            futurePlan: '',
            comment: {
                fullName: 'Lê Quý Mai Huyên',
                content: 'Xúc tiến chăm sóc',
            },
            // comments: [{
            //     fullName: 'Phạm Duy Tiến',
            //     username: 'duytien01',
            //     avatar: 'https://arawal.files.wordpress.com/2015/07/flat-faces-icons-circle-3.png',
            //     date: '26/12/2020',
            //     content: 'Xúc tiến chăm sóc'
            // },
            // {
            //     fullName: 'Lê Quý Mai Huyên',
            //     username: 'huyenle01',
            //     avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
            //     date: '27/12/2020',
            //     content: 'Tặng quà Tết cho cô'
            // }],
            schoolYear: '2020-2021',
        },
    ],
    totalPage: 1,
    totalElements: 3,
}

// {
//   "schoolName": "string",
//   "address": "string",
//   "district": "string",
//   "level": "string",
//   "reprName": "string",
//   "reprIsMale": true,

//   "id": 0,
//   "date": "2021-04-19T09:46:49.916Z",
//   "result": "string",
//   "description": "string",
//   "positivity": "string",
//   "difficulty": "string",
//   "futurePlan": "string",
//   "commentedPerson": "string",
//   "contextComments": "string",

//   "targetId": 0,
//   "schoolYear": "string",
//   "purpose": "string",

//   "avatar": "string",
//   "username": "string"
//   "fullName": "string",
// }

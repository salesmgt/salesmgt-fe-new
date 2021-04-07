export const columns = [
    // { key: "checkbox", name: '', sortable: false },
    { key: "no", name: 'No', sortable: false },
    { key: "date", name: 'Date', sortable: true },
    { key: "schoolName", name: 'School Name', sortable: true }, // SchoolName - primary, District - secondary
    { key: "user.fullName", name: 'PIC', sortable: true },
    { key: "targetPurposeName", name: 'Purpose', sortable: true },  // Purpose - primary
    { key: "result", name: 'Result', sortable: false },
    { key: "description", name: 'Description', sortable: false }, // truncate ... kí tự thôi
    { key: "", name: '', sortable: false }
]

export const data = {
    list: [
        {
            id: 1,
            date: '25/12/2020',
            fullName: 'Phan Văn Thái',
            username: 'thaipv',
            avatar: 'https://galileoenrichment.com/wp-content/uploads/2020/03/man.png',
            schoolName: 'Trần Quang Khải',
            educationalLevel: 'THPT',
            district: 'Quận 1',
            address: '12 Trần Quang Khải, P7',
            reprName: 'Hồ Quang Tuấn',
            reprGender: true,
            status: 'Chưa hợp tác',
            purpose: 'Sales mới',
            result: 'OK',
            description: 'Đã giới thiệu về Major Education',
            positivity: 'Thầy rất thiện chí',
            difficulty: '',
            futurePlan: 'Giới thiệu thêm chương trình Toán Khoa cho Thầy',
            comments: [],
            schoolYear: '2020-2021'
        },
        {
            id: 2,
            date: '25/12/2020',
            fullName: 'Lê Thị Nhi',
            username: 'nhile',
            avatar: 'https://www.richmondhillpestcontrol.ca/wp-content/uploads/2019/10/7-512.png',
            schoolName: 'Trần Xuân Soạn',
            educationalLevel: 'THCS',
            district: 'Quận 7',
            address: '12 Trần Xuân Soạn, P12',
            reprName: 'Nguyễn Trung Hậu',
            reprGender: true,
            status: 'Đang hợp tác',
            purpose: 'Chăm sóc',
            result: 'Không gặp được HT',
            description: 'Thầy đi công tác. Đã gửi quà cho Thầy Hiệu phó.',
            positivity: '',
            difficulty: '',
            futurePlan: '',
            comments: [{
                fullName: 'Phạm Duy Tiến',
                username: 'duytien01',
                avatar: 'https://arawal.files.wordpress.com/2015/07/flat-faces-icons-circle-3.png',
                date: '26/12/2020',
                content: 'OK'
            }],
            schoolYear: '2020-2021'
        },
        {
            id: 3,
            date: '25/12/2020',
            fullName: 'Trần Thị Xuân Tuyền',
            username: 'tuyentran',
            avatar: 'https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png',
            schoolName: 'Nguyễn Văn Trỗi',
            educationalLevel: 'TH',
            district: 'Quận 12',
            address: '90 Nguyễn Văn Trỗi, P7',
            reprName: 'Trịnh Thị Thanh Thư',
            reprGender: false,
            status: 'Đang hợp tác',
            purpose: 'Tái ký hợp đồng',
            result: 'Đã gặp HT',
            description: 'Đã trao đổi với Cô về các chương trình của Major',
            positivity: '',
            difficulty: 'Cô đang cân nhắc',
            futurePlan: '',
            comments: [{
                fullName: 'Phạm Duy Tiến',
                username: 'duytien01',
                avatar: 'https://arawal.files.wordpress.com/2015/07/flat-faces-icons-circle-3.png',
                date: '26/12/2020',
                content: 'Xúc tiến chăm sóc'
            },
            {
                fullName: 'Lê Quý Mai Huyên',
                username: 'huyenle01',
                avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
                date: '27/12/2020',
                content: 'Xúc tiến chăm sóc'
            }],
            schoolYear: '2020-2021'
        },
    ],
    totalPage: 1,
    totalElements: 3,
}

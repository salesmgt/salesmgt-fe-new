import { Smile } from '../../assets/images'

export const cardData = {
    manager: {
        targetLeadSum: {
            ranges: [2016, 2017, 2018, 2019, 2020, 2021],
            datasets: {
                2016: [{ leads: 25 }],
                2017: [{ leads: 30 }],
                2018: [{ leads: 40 }],
                2019: [{ leads: 35 }],
                2020: [{ leads: 32 }],
                2021: [{ leads: 29 }],
            },
        },
        potLeadsum: {
            ranges: [2016, 2017, 2018, 2019, 2020, 2021],
            datasets: {
                2016: [{ leads: 14 }],
                2017: [{ leads: 15 }],
                2018: [{ leads: 27 }],
                2019: [{ leads: 25 }],
                2020: [{ leads: 16 }],
                2021: [{ leads: 19 }],
            },
        },
        newLeadSum: {
            ranges: [2016, 2017, 2018, 2019, 2020, 2021],
            datasets: {
                2016: [{ leads: 11 }],
                2017: [{ leads: 15 }],
                2018: [{ leads: 13 }],
                2019: [{ leads: 10 }],
                2020: [{ leads: 16 }],
                2021: [{ leads: 10 }],
            },
        },
    },
    salesman: {
        targetLeadSum: {
            ranges: [2021],
            datasets: {
                2021: [{ leads: 29 }],
            },
        },
        potLeadsum: {
            ranges: [2021],
            datasets: {
                2021: [{ leads: 19 }],
            },
        },
        newLeadSum: {
            ranges: [2021],
            datasets: {
                2021: [{ leads: 10 }],
            },
        },
    },
}

export const rankData = {
    rows: [
        { rank: 1, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 2, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 3, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 4, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 5, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 6, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 7, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 8, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 9, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
        { rank: 10, personName: 'Phạm Thị Ngọc Hà', personAvatar: Smile },
    ],
}

export const chartData = {
    labels: [
        'Hà',
        'Gia',
        'Lợi',
        'Hiếu',
        'Nguyên',
        'Quân',
        'Lâm',
        'Tiến',
        'Tuyền',
    ],

    datasets: [
        {
            name: 'weekly',
            data: [7, 6, 17, 9, 13, 11, 8, 15, 7],
            averageData: [15, 15, 15, 15, 15, 15, 15, 15, 15],
        },
        {
            name: 'monthly',
            data: [15, 25, 20, 17, 18, 23, 31, 15, 26],
            averageData: [15, 15, 15, 15, 15, 15, 15, 15, 15],
        },
    ],
}

export const Consts = {
    cardsConsts: {
        // gray
        card1: {
            title: 'Chưa hợp tác',
            color: 'rgba(33, 150, 243, 1)',
            des: 'Trường',
        },
        // 
        card2: {
            title: 'Sales mới',
            color: 'rgba(255, 152, 0, 1)',
            des: 'Trường',
        },
        // yellow
        card3: {
            title: 'Theo dõi',
            color: 'rgba(76, 175, 80, 1)',
            des: 'Trường',
        },
        // green
        card4: {
            title: 'Tiềm năng',
            color: '',
            des: 'Trường',
        },
        // 
        card5: {
            title: 'Đang hợp tác',
            color: '',
            des: 'Trường',
        },
        // 
        card6: {
            title: 'Tái ký hợp đồng',
            color: '',
            des: 'Trường',
        },
        // 
        card7: {
            title: 'Ký mới hợp đồng',
            color: '',
            des: 'Trường',
        },
        // 
        card8: {
            title: 'Chăm sóc',
            color: '',
            des: 'Trường',
        },
    },
    chartsConsts: {
        chart1: {
            title: 'Kết quả đi trường',
        },
    },
}

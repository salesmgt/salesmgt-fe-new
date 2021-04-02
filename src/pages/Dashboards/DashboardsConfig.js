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
            name: 'week',
            data: [7, 6, 17, 9, 13, 11, 8, 15, 7],
            averageData: [15, 15, 15, 15, 15, 15, 15, 15, 15],
        },
        {
            name: 'month',
            data: [15, 25, 20, 17, 18, 23, 31, 15, 26],
            averageData: [15, 15, 15, 15, 15, 15, 15, 15, 15],
        },
    ],
}

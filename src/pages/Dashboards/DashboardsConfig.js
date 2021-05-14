import { Smile } from '../../assets/images'
import { MdFiberNew, MdTrendingUp, MdLoop, MdLoyalty } from 'react-icons/md'
import { FaSearchDollar } from 'react-icons/fa'
import { GiProfit } from 'react-icons/gi'

export const cardData = {
    manager: {
        taskLeadSum: {
            // ranges: [2016, 2017, 2018, 2019, 2020, 2021],
            // datasets: {
            //     2016: [{ leads: 25 }],
            //     2017: [{ leads: 30 }],
            //     2018: [{ leads: 40 }],
            //     2019: [{ leads: 35 }],
            //     2020: [{ leads: 32 }],
            //     2021: [{ leads: 29 }],
            // },
            ranges: [
                '2015-2016',
                '2016-2017',
                '2017-2018',
                '2018-2019',
                '2019-2020',
                '2020-2021',
            ],
            datasets: {
                '2015-2016': [{ leads: 25 }],
                '2016-2017': [{ leads: 30 }],
                '2017-2018': [{ leads: 40 }],
                '2018-2019': [{ leads: 35 }],
                '2019-2020': [{ leads: 32 }],
                '2020-2021': [{ leads: 29 }],
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
        taskLeadSum: {
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
    header: {
        child1: 'Leads',
        child2: 'Customers',
    },
    cardsConsts: {
        // card: {
        //     title: 'Chưa hợp tác',
        //     color: 'rgba(33, 150, 243, 1)',
        //     des: 'Trường',
        // },
        // card: {
        //     title: 'Đang hợp tác',
        //     color: '',
        //     des: 'Trường',
        // },
        //

        // green
        card1: {
            title: 'Sales mới',
            color: 'rgba(75, 192, 192, 0.2)',
            // color: 'rgba(0, 0, 0, 0.87)',
            icon: <MdFiberNew />,
            des: 'school(s)',
        },
        // yellow
        card2: {
            title: 'Theo dõi',
            color: 'rgba(255, 206, 86, 0.2)',
            // color: 'rgba(0, 0, 0, 0.87)',
            icon: <FaSearchDollar />,
            des: 'school(s)',
        },
        // blue
        card3: {
            title: 'Tiềm năng',
            color: 'rgba(54, 162, 235, 0.2)',
            // color: 'rgba(0, 0, 0, 0.87)',
            icon: <MdTrendingUp />,
            des: 'school(s)',
        },

        // purple
        card4: {
            title: 'Ký mới hợp đồng',
            color: 'rgba(153, 102, 255, 0.2)',
            // color: 'rgba(0, 0, 0, 0.87)',
            icon: <GiProfit />,
            des: 'school(s)',
        },
        // orange
        card5: {
            title: 'Tái ký hợp đồng',
            color: 'rgba(255, 159, 64, 0.2)',
            // color: 'rgba(0, 0, 0, 0.87)',
            icon: <MdLoop />,
            des: 'school(s)',
        },
        // pink
        card6: {
            title: 'Chăm sóc',
            color: 'rgba(255, 99, 132, 0.2)',
            // color: 'rgba(0, 0, 0, 0.87)',
            icon: <MdLoyalty />,
            des: 'school(s)',
        },
    },
    chartsConsts: {
        chart1: {
            title: 'Kết quả đi trường',
        },
    },
}

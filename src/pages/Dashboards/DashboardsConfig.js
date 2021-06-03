import { MdFiberNew, MdTrendingUp, MdLoop, MdLoyalty } from 'react-icons/md'
import { FaSearchDollar } from 'react-icons/fa'
import { GiProfit } from 'react-icons/gi'

export const Consts = {
    header: {
        child1: 'Leads',
        child2: 'Customers',
    },
    toggleButtonOptions: {
        serviceBarChart: {
            // type: 'service types',
            // year: 'school years'
            ds: 'Sales',
            sl: 'Quantity'
        },
    },
    cardsConsts: {
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



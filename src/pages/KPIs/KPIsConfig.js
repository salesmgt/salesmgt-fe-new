import { roleNames } from "../../constants/Generals";

export const columns = [
    { key: 'no', name: '#', sortable: false, width: '1%' },
    { key: 'name', name: 'Group Name', sortable: true, width: '32%', },
    { key: 'salesmen', name: 'Apply for', sortable: false, width: '20%', },   // Này có cần thiết ko nhỉ?
    { key: 'startDate', name: 'Start Date', sortable: true, width: '17%' },
    { key: 'endDate', name: 'End Date', sortable: true, width: '17%' },
    // { key: 'duration', name: 'Duration', sortable: false, width: '25%' },
    { key: 'status', name: 'Status', sortable: true, width: '15%' },    // active, disable
    { key: '', name: '', sortable: false, width: '1%' },
]

// export const getColumns = (role) => {
//     const [no, serviceType, schoolName, pic, status, actions] = columns     // duration,

//     switch (role) {
//         case roleNames.manager:
//             return [no, serviceType, schoolName, pic, status, actions]      // duration,
//         case roleNames.salesman:
//             return [no, serviceType, schoolName, status, actions]       // duration,
//         default:
//             break;
//     }
// }

//=========================================================================================================

export const detailPageConsts = {
    linkNames: {
        back: 'KPIs',
    },
    tabNames: {
        tab1: 'KPIs Group Details',
        // tab2: 'Criteria Info',
    },
    operations: {
        notFound: 'KPI Group Not Found',
    },
}

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
        create: 'Create',
    },
    filters: {
        status: {
            title: 'KPI Group Statuses',
        },
    },
    messages: {
        notFound: 'No records found.',
    },
    menuItems: {
        details: {
            title: 'View details',
        },
        disable: {
            title: 'Disable'
        }
    },
}

import { roleNames } from "../../constants/Generals";

const columns = [
    { key: 'no', name: '#', sortable: false, width1: '1%', width2: '1%' },
    { key: 'name', name: 'Group Name', sortable: true, width1: '32%', width2: '34%' },
    { key: 'salesmen', name: 'Apply for', sortable: false, width1: '20%', width2: '0%' },   // Này có cần thiết ko nhỉ?
    { key: 'startDate', name: 'Start Date', sortable: true, width1: '17%', width2: '22%' },
    { key: 'endDate', name: 'End Date', sortable: true, width1: '17%', width2: '22%' },
    // { key: 'duration', name: 'Duration', sortable: false, width1: '25%' },
    { key: 'status', name: 'Status', sortable: true, width1: '15%', width2: '20%' },    // active, disable
    { key: '', name: '', sortable: false, width1: '1%', width2: '1%' },
]

export function getColumns(role) {
    const [no, groupName, pic, startDate, endDate, status, actions] = columns     // assignDate, endDate, 

    switch (role) {
        case roleNames.manager:
            return [no, groupName, pic, startDate, endDate, status, actions]
        // case roleNames.supervisor:
        case roleNames.salesman:
            return [no, groupName, startDate, endDate, status, actions]
        default:
            break
    }
}

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
        tab2: 'My KPIs Details',
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

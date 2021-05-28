import { roleNames } from "../../constants/Generals";

export const columns = [
    { key: 'no', name: 'No', sortable: false, width: '1%' },
    { key: 'name', name: 'Service Type', sortable: true, width: '13%', },
    { key: 'startDate', name: 'School Name', sortable: true, width: '20%' },
    { key: 'endDate', name: 'PIC', sortable: true, width: '23%' },
    // { key: 'duration', name: 'Duration', sortable: false, width: '25%' },
    { key: 'status', name: 'Status', sortable: true, width: '12%' },    // active, disable
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
        tab1: 'KPI Info',
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
        serviceType: {
            title: 'Service Types',
        },
        serviceStatus: {
            title: 'Service Statuses',
        },
        schoolYear: {
            title: 'School Years',
        },
        expiredStatus: {
            title: 'Expired Statuses',
            options: {
                all: 'All',
                expired: 'Expired',
                valid: 'Valid / Effective',
            },
        },
        // duration: {
        //     title: 'Duration (from/to)',
        // },
        pic: {
            title: 'PICs',
        },
    },
    messages: {
        notFound: 'No records found.',
    },
    menuItems: {
        details: {
            title: 'View details',
        },
    },
}

import { roleNames } from "../../constants/Generals";

const columns = [
    { key: 'no', name: 'No', sortable: false, width1: '1%', width2: '5%' },
    { key: 'serviceType', name: 'Service Type', sortable: true, width1: '13%', width2: '18%' },
    { key: 'task.school.schoolId', name: 'School Name', sortable: true, width1: '20%', width2: '25%' },
    { key: 'task.user.username', name: 'PIC', sortable: true, width1: '23%', width2: '0%' },
    // { key: 'duration', name: 'Duration', sortable: false, width1: '25%', width2: '28%' },
    { key: 'status', name: 'Status', sortable: true, width1: '12%', width2: '15%' },    // Pending, Approved, Rejected
    // { key: 'approveDate', name: 'Approved Date', sortable: true, width1: '17%', width2: '1%' },
    { key: '', name: '', sortable: false, width1: '1%', width2: '1%' },
]

export const getColumns = (role) => {
    const [no, serviceType, schoolName, pic, status, actions] = columns     // duration,

    switch (role) {
        case roleNames.manager:
            return [no, serviceType, schoolName, pic, status, actions]      // duration,
        case roleNames.salesman:
            return [no, serviceType, schoolName, status, actions]       // duration,
        default:
            break;
    }
}

//=========================================================================================================

export const detailPageConsts = {
    linkNames: {
        back: 'Services',
    },
    tabNames: {
        tab1: 'Service Info',
    },
    operations: {
        notFound: 'Service Not Found',
    },
}

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
        create: 'Insert',
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

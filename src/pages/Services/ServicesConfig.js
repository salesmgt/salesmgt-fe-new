export const columns = [
    { key: 'no', name: 'No', sortable: false, width: '1%' },
    { key: 'serviceType', name: 'Service Type', sortable: true, width: '18%' },
    { key: 'name', name: 'School Name', sortable: false, width: '23%' },
    { key: 'duration', name: 'Duration', sortable: false, width: '25%' },
    { key: 'status', name: 'Status', sortable: true, width: '15%' },    // Pending, Approved, Rejected
    { key: 'approveDate', name: 'Approved Date', sortable: true, width: '17%' },
    { key: '', name: '', sortable: false, width: '1%' },
]

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
        serviceStatus: {
            title: 'Service Statuses',
        },
        serviceType: {
            title: 'Service Types',
        },
        schoolYear: {
            title: 'School Years',
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

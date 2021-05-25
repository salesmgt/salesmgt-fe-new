export const columns = [
    { key: 'no', name: 'No', sortable: false, width: '0%' },
    { key: 'date', name: 'Date', sortable: true, width: '10%' },
    { key: 'task.school.name', name: 'School Name', sortable: true, width: '20%' }, // SchoolName - primary, District - secondary
    { key: 'task.user.fullName', name: 'PIC', sortable: true, width: '20%' },
    { key: 'task.purpose.name', name: 'Purpose', sortable: true, width: '12%' }, // Purpose - primary
    { key: 'isSuccess', name: 'Result', sortable: true, width: '13%' },
    { key: 'description', name: 'Description', sortable: true, width: '25%' }, // truncate 30 kí tự thôi
    // { key: "comment", name: 'Comment', sortable: false }, // truncate 30 kí tự thôi
    { key: '', name: '', sortable: false, width: '0%' },
]

export const rpConsts = {
    linkNames: {
        back: 'Reports',
    },
    tabNames: {
        tab1: 'Report Info',
        tab2: 'Assign Info',
    },
    operations: {
        notFound: 'Report Not Found',
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
        pic: {
            title: 'PICs',
            placeholder: "PIC's name",
        },
        purpose: {
            title: 'Purposes',
            options: { all: 'All' },
        },
        district: {
            title: 'Districts',
            options: { all: 'All' },
        },
        schoolYear: {
            title: 'School Years',
            options: { all: 'All' },
        },
        dateRange: {
            titleFrom: 'From date',
            titleTo: 'To date',
        },
        result: {
            title: 'Result',
            options: {
                all: 'All',
                success: 'Đã gặp HT/HP',
                failed: 'Chưa gặp HT/HP',
            },
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

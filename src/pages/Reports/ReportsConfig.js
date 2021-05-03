export const columns = [
    { key: 'no', name: 'No', sortable: false },
    { key: 'date', name: 'Date', sortable: true },
    { key: 'targetSchool.school.name', name: 'School Name', sortable: true }, // SchoolName - primary, District - secondary
    { key: 'targetSchool.user.fullName', name: 'PIC', sortable: true },
    { key: 'targetSchool.targetPurpose.name', name: 'Purpose', sortable: true }, // Purpose - primary
    { key: 'result', name: 'Result', sortable: true },
    { key: 'description', name: 'Description', sortable: true }, // truncate 30 kí tự thôi
    // { key: "comment", name: 'Comment', sortable: false }, // truncate 30 kí tự thôi
    { key: '', name: '', sortable: false },
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

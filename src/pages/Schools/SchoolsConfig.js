export const columns = [
    { key: 'no', name: 'No', sortable: false, width: '2%' },
    { key: 'name', name: 'School Name', sortable: true, width: '29%' },
    // { key: "district.name", name: 'District', sortable: true },
    { key: 'address', name: 'Address', sortable: false, width: '29%' },
    { key: 'reprName', name: 'Principal', sortable: true, width: '20%' },
    // { key: 'schoolStatus.name', name: 'Status', sortable: true, width: '18%' },
    { key: '', name: '', sortable: false, width: '2%' },
]

export const schConsts = {
    linkNames: {
        back: 'Schools',
    },
    tabNames: {
        tab1: 'General Info',
        tab2: 'Principal Info',
        tab3: 'Timeline',
    },
    operations: {
        notFound: 'School Not Found',
    },
}

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
        create: 'Create',
        import: 'Import',
    },
    filters: {
        district: {
            title: 'Districts',
        },
        schoolStatus: {
            title: 'School Status',
        },
        schoolType: {
            title: 'School Types',
        },
        schoolLevel: {
            title: 'School Levels',
        },
        // schoolScale: {
        //     title: 'School Scales',
        // },
        workingStatus: {
            title: 'Working Status',
            options: {
                all: 'All',
                active: 'Active',
                inactive: 'Inactive',
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

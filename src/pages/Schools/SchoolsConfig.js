export const columns = [
    { key: "no", name: 'No', sortable: false },
    { key: "name", name: 'School Name', sortable: true },
    // { key: "district.name", name: 'District', sortable: true },
    { key: "address", name: 'Address', sortable: false },
    { key: "reprName", name: 'Principal', sortable: true },
    { key: "schoolStatus.name", name: 'Status', sortable: true },
    { key: "", name: '', sortable: false }
]

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...'
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
        schoolScale: {
            title: 'School Scales',
        },
        workingStatus: {
            title: 'Working Status',
            options: {
                all: 'All',
                active: 'Active',
                inactive: 'Inactive'
            }
        },
    },
    messages: {
        notFound: 'No records found.'
    },
    menuItems: {
        details: {
            title: 'View details'
        }
    }
}
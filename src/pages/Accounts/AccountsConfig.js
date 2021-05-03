export const columns = [
    { key: 'no', name: 'No', sortable: false },
    { key: 'username', name: 'Username', sortable: true },
    { key: 'fullName', name: 'Full Name', sortable: true },
    { key: 'phone', name: 'Phone', sortable: false },
    { key: 'email', name: 'Email', sortable: false },
    { key: 'role', name: 'Role', sortable: true },
    { key: '', name: '', sortable: false },
]

export const acctConsts = {
    linkNames: {
        back: 'Accounts',
    },
    tabNames: {
        tab1: 'General Info',
    },
    operations: {
        notFound: 'Account Not Found',
    },
}

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
        create: 'Create',
        notFound: 'Account Not Found',
    },
    filters: {
        workingStatus: {
            title: 'Working Status',
            options: {
                all: 'All',
                active: 'Active',
                inactive: 'Inactive',
            },
        },
        role: {
            title: 'Roles',
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

export const Consts = {
    headers: {
        child1: 'Salesman Detail',
        child2: 'Contact Detail',
    },
    fields: {
        username: {
            title: 'Username',
        },
        gender: {
            title: 'Gender',
        },
        dob: {
            title: 'Birthday',
        },
        email: {
            title: 'Email',
        },
        phone: {
            title: 'Phone Number',
        },
        addr: {
            title: 'Address',
        },
    },
    charts: {
        mixed: {
            title: 'Sales Targets Result',
            lables: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            dataLbs: { bar: 'Sales Targets', line: 'Average Target' },
            datasets: {
                data: [2, 3, 2, 2, 1],
                averageData: [15, 15, 15, 15, 15],
            },
        },
    },
}

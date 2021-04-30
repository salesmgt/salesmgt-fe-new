export const Consts = {
    headers: {
        child1: 'Account Info',
        child2: 'General Info',
    },
    operations: {
        logout: 'Log Out',
        cancel: 'Clear',
        save: 'Save',
        empty: 'User not found!',
    },
    fields: {
        username: {
            title: 'Username',
        },
        password: {
            title: 'Password',
            defaultValue: '12345678',
            labels: {
                old: 'Old Password',
                new: 'New Password',
                confirm: 'Confirm Password',
            },
        },
        fullName: {
            title: 'Full Name',
        },
        dob: {
            title: 'Birthday',
        },
        isMale: {
            title: 'Gender',
            male: {
                lb: 'Male',
                value: 'true',
            },
            female: {
                lb: 'Female',
                value: 'false',
            },
        },
        email: {
            title: 'Email',
            label: 'New Email',
        },
        phone: {
            title: 'Phone Number',
            label: 'New Number',
        },
        address: {
            title: 'Address',
            label: 'New Address',
        },
    },
}

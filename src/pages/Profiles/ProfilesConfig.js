// export const data = {
//     username: 'haptnn',
//     password: '12345678',
//     avatar: '../../img/ha-avatar.jpg',
//     fullName: 'Ha Pham',
//     email: 'haptn@gmail.com',
//     phone: '0946753053',
//     address: '37/14 Dang Thuy Tram',
//     gender: 'Female',
//     dob: '07-01-1999',
// }

export const Consts = {
    headers: {
        account: 'Account Information',
        general: 'General Information',
    },
    operations: {
        logout: 'Log Out',
        cancel: 'Cancel',
        save: 'Save',
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
            title: 'Birth Date',
        },
        gender: {
            title: 'Gender',
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

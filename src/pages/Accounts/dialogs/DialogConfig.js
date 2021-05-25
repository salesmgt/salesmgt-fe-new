export const Consts = {
    headers: {
        child1: 'Create Account',
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
    },
    messages: {
        info: '',
        success: 'Created Successfully',
        error: 'Created Failed',
        warning: '',
    },
    fields: {
        username: {
            title: 'Username',
        },
        fullName: {
            title: 'Full Name',
        },
        isMale: {
            title: 'Gender *',
            male: {
                lb: 'Male',
                value: 'true',
            },
            female: {
                lb: 'Female',
                value: 'false',
            },
        },
        birthDate: {
            title: 'Birthday',
            format: 'dd/MM/yyyy',
        },
        email: {
            title: 'Email',
            helper: 'This email will be used to confirm account',
        },
        phone: {
            title: 'Phone Number',
        },
        addr: {
            title: 'Address',
        },
        status: {
            title: 'Account Active *',
        },
        roles: {
            title: 'Roles',
        },
    },
}

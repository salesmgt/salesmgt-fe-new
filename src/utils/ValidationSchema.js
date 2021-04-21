import * as yup from 'yup'

const usernameSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(8, 'Username must be at least 8 characters')
        .max(30, 'Username must be at most 30 characters')
        .required('Username is required'),
})

const fullNameSchema = yup.object().shape({
    fullName: yup
        .string()
        .trim()
        .min(4, 'Full Name must be at least 4 characters')
        .max(30, 'Full name must be at most 30 characters')
        .required('Full Name is required'),
})

const pwdSchema = yup.object().shape({
    oldPassword: yup.string().required('Password is required'),
    newPassword: yup
        .string()
        .notOneOf(
            [yup.ref('oldPassword'), null],
            'The new password you entered is the same as your old password. Enter a different password'
        )
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One special case Character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], "Password's not match")
        .required('Confirm is required'),
})

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .trim()
        .required('Email is required'),
})

const phoneSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone is required')
        .max(10, 'Phone must be at most 10 characters')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
})

const addrSchema = yup.object().shape({
    address: yup.string().trim(),
})

const schNameSchema = yup.object().shape({
    username: yup.string().trim().required('School name is required'),
})

const shTelSchema = yup.object().shape({
    tel: yup
        .string()
        .max(11, 'Tel must be at most 10 characters')
        .matches(/(02)+([0-9]{9})\b/g, 'Incorrect entry'),
})

const desSchema = yup.object().shape({
    des: yup.string().trim(),
})

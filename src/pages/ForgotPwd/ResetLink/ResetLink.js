import React from 'react'
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Link as MdLink,
} from '@material-ui/core'
import { RiRotateLockFill } from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { USERNAME_RGX } from '../../../utils/Regex'
import { Consts } from '../ForgotPwdConfig'
import * as ForgotPwdServices from '../ForgotPwdServices'
import classes from './ResetLink.module.scss'

const clientSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(8, 'Username must be at least 8 characters')
        .max(30, 'Username must be at most 30 characters')
        .required('Username is required')
        .matches(USERNAME_RGX, 'Incorrect entry'),
})

const serverSchema = [
    {
        type: 'server',
        name: 'username',
        message: 'Username does not exist',
    },
]

function ResetLink() {
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const defaultValues = {
        username: '',
    }

    const {
        control,
        errors,
        setError,
        handleSubmit,
        formState,
        reset,
    } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = (data) => {
        ForgotPwdServices.checkUser(data?.username)
            .then((res) => {
                reset({
                    username: '',
                })
                history.push({
                    pathname: '/password-reset/verify',
                    state: { username: data?.username },
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (
                        error.response.status === 403 ||
                        error.response.status === 500
                    ) {
                        serverSchema.forEach(({ name, type, message }) =>
                            setError(name, { type, message })
                        )
                    } else {
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
                }
            })
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Avatar className={classes.avatar}>
                    <RiRotateLockFill />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {headers.reset}
                </Typography>
                <Typography variant="body2" className={classes.msg}>
                    {headers.msg1}
                </Typography>
            </div>
            <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Controller
                    name="username"
                    control={control}
                    render={({ value, onChange }) => (
                        <TextField
                            label={fields.username}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            value={value}
                            onChange={onChange}
                            error={!!errors.username}
                            helperText={errors?.username?.message}
                        />
                    )}
                />
                <Button
                    className={classes.submit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!formState.isDirty}
                >
                    {operations.submit}
                </Button>
            </form>
            <MdLink
                className={classes.login}
                component={Link}
                to="/"
                variant="body2"
            >
                {operations.link}
            </MdLink>
        </div>
    )
}

export default ResetLink

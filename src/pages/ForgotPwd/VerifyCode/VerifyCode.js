import React from 'react'
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Link as MdLink,
} from '@material-ui/core'
import { RiRotateLockFill } from 'react-icons/ri'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Consts } from '../ForgotPwdConfig'
import { useAuth } from '../../../hooks/AuthContext'
import { VERIFY_CODE_RGX } from '../../../utils/Regex'
import * as ForgotPwdServices from '../ForgotPwdServices'
import classes from './VerifyCode.module.scss'

const clientSchema = yup.object().shape({
    code: yup
        .string()
        .trim()
        .required('Verify code is required')
        .matches(VERIFY_CODE_RGX, 'Invalid code'),
})

const serverSchema = [
    {
        type: 'server',
        name: 'code',
        message: 'Invalid code',
    },
]

function VerifyCode() {
    const { headers, operations, fields } = Consts

    const history = useHistory()
    const location = useLocation()
    const username = location?.state?.username

    const { setVerifyCode } = useAuth()

    const defaultValues = {
        code: '',
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
        const model = {
            privateToken: data?.code,
            username: username,
        }

        ForgotPwdServices.verifyCode(model)
            .then((res) => {
                if (res.data) {
                    setVerifyCode(username)
                    reset({
                        code: '',
                    })
                    history.push({
                        pathname: '/password-reset/change',
                        state: { username: username },
                    })
                } else {
                    serverSchema.forEach(({ name, type, message }) =>
                        setError(name, { type, message })
                    )
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
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
                    {headers.msg2}
                </Typography>
            </div>
            <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Controller
                    name="code"
                    control={control}
                    render={({ value, onChange }) => (
                        <TextField
                            label={fields.code}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            value={value}
                            onChange={onChange}
                            error={!!errors.code}
                            helperText={errors?.code?.message}
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

export default VerifyCode

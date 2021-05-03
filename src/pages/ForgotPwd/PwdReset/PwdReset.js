import React, { useEffect } from 'react'
import { Avatar, Button, TextField, Typography } from '@material-ui/core'
import { RiRotateLockFill } from 'react-icons/ri'
import { useHistory, useLocation, Prompt } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Consts } from '../ForgotPwdConfig'
import { PWD_RGX } from '../../../utils/Regex'
import * as ForgotPwdServices from '../ForgotPwdServices'
import classes from './PwdReset.module.scss'

const clientSchema = yup.object().shape({
    newPwd: yup
        .string()
        .matches(
            PWD_RGX,
            'Password must contain 8 Characters, One Uppercase, One Lowercase, One Number and One special case Character'
        ),
    confirmPwd: yup
        .string()
        .oneOf([yup.ref('newPwd'), null], "Password's not match")
        .required('Confirm is required'),
})

function PwdReset() {
    const { headers, operations, fields, prompts } = Consts

    const history = useHistory()
    const location = useLocation()
    const username = location?.state?.username

    console.log(location?.state)

    const defaultValues = {
        newPwd: '',
        confirmPwd: '',
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    // window.onbeforeunload = (event) => {
    //     // if (formState.isDirty) {
    //     const e = event || window.event
    //     e.preventDefault()
    //     if (e) {
    //         e.returnValue = ''
    //     }
    //     return ''
    //     // }
    // }

    const alertUser = (e) => {
        e.preventDefault()
        e.returnValue = ''
    }

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, [])

    const onSubmit = (data) => {
        const model = {
            ...data,
            username: username,
            password: data?.confirmPwd,
        }

        ForgotPwdServices.resetPwd(username, model)
            .then((res) => {
                reset({
                    newPwd: '',
                    confirmPwd: '',
                })
                history.replace('/')
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    // if (
                    //     error.response.status === 403 ||
                    //     error.response.status === 500
                    // ) {
                    //     serverSchema.forEach(({ name, type, message }) =>
                    //         setError(name, { type, message })
                    //     )
                    // } else {
                    //     history.push({
                    //         pathname: '/errors',
                    //         state: { error: error.response.status },
                    //     })
                    // }
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
            </div>
            <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Controller
                    name="newPwd"
                    control={control}
                    render={({ value, onChange }) => (
                        <TextField
                            label={fields.newPwd}
                            variant="outlined"
                            type="password"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            value={value}
                            onChange={onChange}
                            error={!!errors.newPwd}
                            helperText={errors?.newPwd?.message}
                        />
                    )}
                />
                <Controller
                    name="confirmPwd"
                    control={control}
                    render={({ value, onChange }) => (
                        <TextField
                            label={fields.confirmPwd}
                            variant="outlined"
                            type="password"
                            margin="normal"
                            required
                            fullWidth
                            value={value}
                            onChange={onChange}
                            error={!!errors.confirmPwd}
                            helperText={errors?.confirmPwd?.message}
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
            {/* <Prompt when={formState.isSubmitted} message={prompts.leave} /> */}
            <Prompt
                message={() => {
                    if (formState.isDirty && !formState.isSubmitting) {
                        return prompts.leave
                    }
                }}
            />
        </div>
    )
}

export default PwdReset

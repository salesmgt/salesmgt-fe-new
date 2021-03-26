import React from 'react'
// import clsx from 'clsx'
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Grid,
    // Paper,
    TextField,
    Typography,
} from '@material-ui/core'
// import { Cards, Charts } from './components'
import { useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import classes from '../styles/Dashboards.module.scss'

const pwdSchema = yup.object().shape({
    oldPassword: yup.string().required('Password is required'),
    newPassword: yup.string().required('Incorrect entry').min(8),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], "Password's not match")
        .required('Incorrect entry'),
})

const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
})

function Dashboards() {
    console.log('rerender')

    const [expanded, setExpanded] = React.useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const {
        handleSubmit: pwdSubmit,
        errors: pwdErrors,
        register: pwdRegister,
        reset: pwdReset,
    } = useForm({
        resolver: yupResolver(pwdSchema),
    })

    const {
        handleSubmit: emailSubmit,
        errors: emailErrors,
        register: emailRegister,
        reset: emailReset,
    } = useForm({
        resolver: yupResolver(emailSchema),
    })

    const onPwdSubmit = (data) => {
        pwdReset({ oldPassword: '', newPassword: '', confirmPassword: '' })
        alert(JSON.stringify(data))
    }

    const onEmailSubmit = (data, e) => {
        alert(JSON.stringify(data))
    }

    return (
        <>
            <form onSubmit={pwdSubmit(onPwdSubmit)}>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'password'}
                    onChange={handleChange('password')}
                >
                    <AccordionSummary id="password" expandIcon={<MdEdit />}>
                        <Grid container spacing={2}>
                            <Grid item sm={3} md={3} lg={3}>
                                <Typography>Password</Typography>
                            </Grid>
                            <Grid item sm={6} md={6} lg={6}>
                                <TextField
                                    type="password"
                                    defaultValue="12345678"
                                    disabled
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column">
                            <Grid item sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    name="oldPassword"
                                    label="Old"
                                    variant="outlined"
                                    type="password"
                                    inputRef={pwdRegister}
                                    error={pwdErrors.oldPassword ? true : false}
                                    helperText={pwdErrors.oldPassword?.message}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    name="newPassword"
                                    label="New"
                                    variant="outlined"
                                    type="password"
                                    inputRef={pwdRegister}
                                    error={pwdErrors.newPassword ? true : false}
                                    helperText={pwdErrors.newPassword?.message}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm"
                                    variant="outlined"
                                    type="password"
                                    inputRef={pwdRegister}
                                    error={
                                        pwdErrors.confirmPassword ? true : false
                                    }
                                    helperText={
                                        pwdErrors.confirmPassword?.message
                                    }
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button
                            size="small"
                            onClick={() => pwdReset({ pwdErrors: false })}
                        >
                            Cancel
                        </Button>
                        <Button size="small" type="submit">
                            Save
                        </Button>
                    </AccordionActions>
                </Accordion>
            </form>

            <form onSubmit={emailSubmit(onEmailSubmit)}>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'email'}
                    onChange={handleChange('email')}
                >
                    <AccordionSummary expandIcon={<MdEdit />} id="email">
                        <Grid container spacing={2}>
                            <Grid item sm={3} md={3} lg={3}>
                                <Typography>Email</Typography>
                            </Grid>
                            <Grid item sm={6} md={6} lg={6}>
                                <TextField
                                    type="text"
                                    defaultValue="a@gmail.com"
                                    disabled
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column">
                            <Grid item sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    type="text"
                                    inputRef={emailRegister}
                                    error={emailErrors.email ? true : false}
                                    helperText={emailErrors.email?.message}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button
                            size="small"
                            onClick={() => emailReset({ emailErrors: false })}
                        >
                            Cancel
                        </Button>
                        <Button size="small" type="submit">
                            Save
                        </Button>
                    </AccordionActions>
                </Accordion>
            </form>
        </>
    )
}

export default Dashboards

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    TextField,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Grid,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    makeStyles,
    RadioGroup,
    Radio,
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from 'mui-pickers-v3'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Snackbars } from '../../../components'
import * as AccountsServices from '../AccountsServices'
import { Consts } from '../dialogs/FormConfig'
import { useApp } from '../../../hooks/AppContext'
import classes from './CreateAccount.module.scss'

const clientSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(8, 'Username must be at least 8 characters')
        .max(30, 'Username must be at most 30 characters')
        .required('Username is required'),
    fullName: yup
        .string()
        .trim()
        .min(4, 'Full Name must be at least 4 characters')
        .max(30, 'Full name must be at most 30 characters')
        .required('Full Name is required'),
    phone: yup
        .string()
        .required('Phone is required')
        .max(10, 'Phone must be at most 10 digits')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),

    email: yup
        .string()
        .trim()
        .email('Invalid email')
        .required('Email is required'),
    address: yup.string().trim(),
})

const serverSchema = [
    {
        type: 'server',
        name: 'username',
        message: 'Username already exists',
    },
]

const ITEM_HEIGHT = 120
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT,
        },
    },
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    getContentAnchorEl: null,
}

const useStyles = makeStyles((theme) => ({
    root: {},
    menuItemRoot: {
        '&$menuItemSelected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        '&$menuItemSelected:focus': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
        },
        '&$menuItemSelected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04);',
        },
    },
    menuItemSelected: {},
    formControl: {
        width: 200,
    },
}))

function CreateAccountForm() {
    const styles = useStyles()

    const { roles } = useApp()

    const { operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        username: '',
        fullName: '',
        roleName: roles[3],
        phone: '',
        email: '',
        address: '',
        isMale: String(true),
        birthDate: null,
    }

    const {
        control,
        handleSubmit,
        errors,
        setError,
        formState,
        reset,
    } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = (data) => {
        const model = {
            ...data,
            isMale: data.isMale === 'true' ? true : false,
            birthDate: data.birthDate
                ? moment(data.birthDate).format('YYYY-MM-DD')
                : null,
        }

        AccountsServices.createAccount(model)
            .then((res) => {
                setNotify({
                    isOpen: true,
                    message: 'Created Successfully',
                    type: 'success',
                })
                reset({
                    username: '',
                    fullName: '',
                    roleName: roles[3],
                    phone: '',
                    email: '',
                    address: '',
                    isMale: String(true),
                    birthDate: null,
                })
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    serverSchema.forEach(({ name, type, message }) =>
                        setError(name, { type, message })
                    )
                    setNotify({
                        isOpen: true,
                        message: 'Create Unsuccessful',
                        type: 'error',
                    })
                } else {
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        alert(JSON.stringify(model))
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.dialogCont}>
                    <Grid container spacing={2} className={classes.wrapper}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="username"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.username.title}
                                        variant="outlined"
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
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.fullName.title}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.fullName}
                                        helperText={errors?.fullName?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.phone.title}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.phone}
                                        helperText={errors?.phone?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.email.title}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.email}
                                        helperText={
                                            errors?.email?.message ||
                                            fields.email.helper
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.addr.title}
                                        variant="outlined"
                                        fullWidth
                                        value={value || ''}
                                        onChange={onChange}
                                        error={!!errors.address}
                                        helperText={errors?.address?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <InputLabel>{fields.isMale.title}</InputLabel>
                            <Controller
                                name="isMale"
                                control={control}
                                render={({ value, onChange }) => (
                                    <RadioGroup
                                        value={value}
                                        onChange={onChange}
                                        row
                                    >
                                        <FormControlLabel
                                            label="Male"
                                            value="true"
                                            control={<Radio />}
                                        />
                                        <FormControlLabel
                                            label="Female"
                                            value="false"
                                            control={<Radio />}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Controller
                                    name="birthDate"
                                    control={control}
                                    render={({ ref, ...rest }) => (
                                        <KeyboardDatePicker
                                            label={fields.birthDate.title}
                                            format={fields.birthDate.format}
                                            allowKeyboardControl
                                            disableFuture
                                            {...rest}
                                        />
                                    )}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl
                                className={styles.formControl}
                                required
                            >
                                <InputLabel>{fields.roles.title}</InputLabel>
                                <Controller
                                    name="roleName"
                                    control={control}
                                    render={({ value, onChange }) => (
                                        <Select
                                            value={value}
                                            onChange={onChange}
                                            MenuProps={MenuProps}
                                            disableUnderline
                                        >
                                            {roles.map((data) => (
                                                <MenuItem
                                                    key={data}
                                                    value={data}
                                                    classes={{
                                                        root:
                                                            styles.menuItemRoot,
                                                        selected:
                                                            styles.menuItemSelected,
                                                    }}
                                                >
                                                    {data}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.dialogAct}>
                    {/* <Button
                        variant="contained"
                        onClick={() => {
                            reset({
                                errors: false,
                                username: '',
                                fullName: '',
                                roleName: roles[3],
                                phone: '',
                                email: '',
                                address: '',
                                isMale: String(true),
                                birthDate: null,
                            })
                            onClose()
                        }}
                    >
                        Cancel
                    </Button> */}
                    <Button
                        className={classes.btnSave}
                        variant="contained"
                        type="submit"
                        disabled={!formState.isDirty}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {operations.save}
                    </Button>
                </DialogActions>
            </form>
            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default CreateAccountForm

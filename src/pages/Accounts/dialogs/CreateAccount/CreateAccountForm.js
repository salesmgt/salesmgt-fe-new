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
import * as AccountsServices from '../../AccountsServices'
import { Consts } from '../../dialogs/DialogConfig'
import { useApp } from '../../../../hooks/AppContext'
import { USERNAME_RGX, PHONE_RGX } from '../../../../utils/Regex'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { useAccount } from '../../hooks/AccountContext'
import { app as FirebaseApp } from '../../../../services/firebase'
import { AddressField } from '../../../../components'
import { useSnackbar } from 'notistack'
import classes from './CreateAccount.module.scss'

const clientSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(8, 'Username must be at least 8 characters')
        .max(30, 'Username must be at most 30 characters')
        .required('Username is required')
        .matches(USERNAME_RGX, 'Incorrect entry'),
    fullName: yup
        .string()
        .trim()
        .min(4, 'Full Name must be at least 4 characters')
        .max(30, 'Full Name must be at most 30 characters')
        .required('Full Name is required'),
    phone: yup
        .string()
        .required('Phone is required')
        .max(10, 'Phone must be at most 10 digits and has the correct format')
        .matches(
            PHONE_RGX,
            'Phone number is in wrong format (03|5|7|9xxxxxxxx)'
        ),
    email: yup
        .string()
        .trim()
        .email('Invalid email')
        .required('Email is required'),
    // address: yup.string().trim().required('Address is required'),
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

function CreateAccountForm(props) {
    const { onClose, refreshPage } = props
    const { operations, fields, messages } = Consts
    const styles = useStyles()

    const { enqueueSnackbar } = useSnackbar()

    const { roles } = useApp()
    const bakRoles = roles ? roles : Milk.getMilk(milkNames.roles)

    const history = useHistory()

    const { params } = useAccount()
    const { page, limit, column, direction, searchKey, listFilters } = params

    // let latitude = 0.0, longitude = 0.0
    const [address, setAddress] = useState('')
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)

    const defaultValues = {
        username: '',
        fullName: '',
        roleName: bakRoles[3],
        phone: '',
        email: '',
        address: address,
        // latitude: latitude,
        // longitude: longitude,
        isMale: String(true),
        birthDate: null,
    }

    const createNoti = (user) => {
        new Promise((resolve, reject) => {
            const notiRef = FirebaseApp.database()
                .ref('notify')
                .child(user.username)
                .push({
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/major-sales-management.appspot.com/o/images%2Fcong-ty-co-phan-major-education-59313d53b549b_rs.jpg?alt=media&token=166886c5-e210-443a-b262-675ac8ff836b',
                    actor: 'System',
                    type: 'Welcome',
                    content: 'Welcome to Sales Department of Major Education!',
                    timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    uid: 0,
                    isSeen: false,
                })
        })
    }

    const { control, handleSubmit, errors, setError, formState, reset } =
        useForm({
            resolver: yupResolver(clientSchema),
            defaultValues: defaultValues,
        })

    const onSubmit = (data) => {
        // console.log('---------form nè---------');
        // console.log('address nè: ', address);
        // console.log(`[${latitude}, ${longitude}]`);

        const model = {
            ...data,
            isMale: data?.isMale === 'true' ? true : false,
            birthDate: data?.birthDate
                ? moment(data?.birthDate).format('YYYY-MM-DD')
                : null,
            address: address,
            latitude: latitude,
            longitude: longitude,
        }

        AccountsServices.createAccount(model)
            .then((res) => {
                enqueueSnackbar(messages.success, { variant: 'success' })

                createNoti(model)
                refreshPage(
                    page,
                    limit,
                    column,
                    direction,
                    searchKey,
                    listFilters
                )
                // reset({
                //     username: '',
                //     fullName: '',
                //     roleName: bakRoles[3],
                //     phone: '',
                //     email: '',
                //     address: '',
                //     isMale: String(true),
                //     birthDate: null,
                // })
                onClose()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (
                        error.response.status === 409 ||
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

                    enqueueSnackbar(messages.error, { variant: 'error' })
                }
            })

        // alert(JSON.stringify(model))
    }

    return (
        <>
            <DialogContent className={classes.dialogCont}>
                <form
                    noValidate
                    // onSubmit={handleSubmit(onSubmit)}
                >
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
                            {/* <InputLabel>{fields.addr.title}</InputLabel> */}
                            <AddressField
                                setLatitude={setLatitude}
                                setLongitude={setLongitude}
                                inputValue={address}
                                setInputValue={setAddress}
                            />
                            {/* <Controller
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
                            /> */}
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
                                            label={fields.isMale.male.lb}
                                            value={fields.isMale.male.value}
                                            control={<Radio />}
                                        />
                                        <FormControlLabel
                                            label={fields.isMale.female.lb}
                                            value={fields.isMale.female.value}
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
                                            {bakRoles.map((data) => (
                                                <MenuItem
                                                    key={data}
                                                    value={data}
                                                    classes={{
                                                        root: styles.menuItemRoot,
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
                </form>
            </DialogContent>

            <DialogActions className={classes.dialogAct}>
                <Button
                    className={classes.btnSave}
                    // type="submit"
                    disabled={!formState.isDirty}
                    onClick={handleSubmit(onSubmit)}
                >
                    {operations.save}
                </Button>
                <Button
                    onClick={() => {
                        reset({
                            errors: false,
                            username: '',
                            fullName: '',
                            roleName: bakRoles[3],
                            phone: '',
                            email: '',
                            address: '',
                            isMale: String(true),
                            birthDate: null,
                        })
                        onClose()
                    }}
                >
                    {operations.cancel}
                </Button>
            </DialogActions>
        </>
    )
}

export default CreateAccountForm

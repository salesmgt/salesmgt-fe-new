import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    FormControlLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Switch,
    TextField,
    Typography,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from 'mui-pickers-v3' // '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApp } from '../../../../hooks/AppContext'
import { Snackbars, Loading, AddressField } from '../../../../components'
import { Consts } from './GenInfoConfig'
// import {  } from '../../SalesmenServices'
import { roleNames } from '../../../../constants/Generals'
import { PHONE_RGX } from '../../../../utils/Regex'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import classes from './GenInfo.module.scss'

const clientSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone is required')
        .max(10, 'Phone must be at most 10 digits and has the correct format')
        .matches(PHONE_RGX, 'Phone number is in wrong format (03|5|7|9xxxxxxxx)'),
    // address: yup.string().trim().required('Address is required'),
})

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

    inputRoot: {
        '&$disabled': {
            color: 'black',
        },
    },
    disabled: {},
}))

function GenInfo(props) {
    const { account, refreshPage } = props
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const [isClicked, setIsClicked] = useState(false);

    const { roles } = useApp()
    const bakRoles = roles ? roles : Milk.getMilk(milkNames.roles)

    // const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);

    const defaultValues = {
        username: account?.username,
        email: account?.email,
        phone: account?.phone ? account?.phone : '',
        isMale: String(account?.isMale)
            ? String(account?.isMale)
            : String(true),
        birthDate: account?.birthDate ? account?.birthDate : null,
        roleName: account?.roleName ? account?.roleName : roleNames.salesman,
        active: account?.active,
        address: account?.address,
        latitude: account?.latitude,
        longitude: account?.longitude,
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        reset({
            username: account?.username,
            email: account?.email,
            phone: account?.phone ? account?.phone : '',
            isMale: String(account?.isMale)
                ? String(account?.isMale)
                : String(true),
            birthDate: account?.birthDate ? account?.birthDate : null,
            roleName: account?.roleName
                ? account?.roleName
                : roleNames.salesman,
            active: account?.active,
            address: account?.address,
            latitude: account?.latitude,
            longitude: account?.longitude,
        })
    }, [account])

    if (!roles) {
        return <Loading />
    }

    if (!account) {
        return <Loading />
    }

    const onSubmit = (data) => {
        console.log('---------GenInfo nè---------');
        console.log('address nè: ', data?.address);
        console.log(`[${latitude}, ${longitude}]`);

        const model = {
            ...data,
            fullName: account?.fullName,
            isMale: data?.isMale === 'true' ? true : false,
            birthDate: data?.birthDate
                ? moment(data?.birthDate).format('YYYY-MM-DD')
                : null,
            avatar: account?.avatar,
            passwordHash: account?.passwordHash,
            // address: data?.address,
            latitude: latitude,
            longitude: longitude,
        }

        // updateAccount(data?.username, model)
        //     .then((res) => {
        //         refreshPage(data.username)
        //         setNotify({
        //             isOpen: true,
        //             message: 'Updated Successfully',
        //             type: 'success',
        //         })
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error)
        //             history.push({
        //                 pathname: '/errors',
        //                 state: { error: error.response.status },
        //             })
        //         }
        //         setNotify({
        //             isOpen: true,
        //             message: 'Update Unsuccessful',
        //             type: 'error',
        //         })
        //     })

        // alert(JSON.stringify(model))
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Content Sector */}
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.content}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Account Detail*/}
                        <Grid container spacing={0} className={classes.wrapper}>
                            <Grid item xs={12} sm={12} md={3} lg={3} className={classes.row}>
                                <Typography color="inherit" className={classes.header}>
                                    {headers.child1}
                                </Typography>
                            </Grid>
                            {/* Detail */}
                            <Grid item xs={12} sm={12} md={9} lg={8} className={classes.row}>
                                <Grid container spacing={0}>
                                    {/* Detail */}
                                    <Grid item xs={12} sm={5} md={5} lg={5} className={classes.row}>
                                        <Controller
                                            name="username"
                                            control={control}
                                            render={({ value }) => (
                                                <TextField
                                                    label={
                                                        fields.username.title
                                                    }
                                                    variant="standard"
                                                    // fullWidth
                                                    disabled
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root:
                                                    //             styles.inputRoot,
                                                    //         disabled:
                                                    //             styles.disabled,
                                                    //     },
                                                    // }}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={5} md={5} lg={5} className={classes.row}>
                                        <Controller name="email" control={control}
                                            render={({ value }) => (
                                                <TextField
                                                    label={fields.email.title}
                                                    variant="standard"
                                                    fullWidth
                                                    disabled
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root:
                                                    //             styles.inputRoot,
                                                    //         disabled:
                                                    //             styles.disabled,
                                                    //     },
                                                    // }}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.row}>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <TextField
                                                    label={fields.phone.title}
                                                    variant="outlined"
                                                    required
                                                    // fullWidth
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!errors.phone}
                                                    helperText={
                                                        errors?.phone?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ value, onChange }) => {
                                                if (!isClicked) {
                                                    return (
                                                        <TextField
                                                            label={fields.addr.title}
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onClick={() => setIsClicked(true)}
                                                            error={!!errors.phone}
                                                            helperText={
                                                                errors?.phone?.message
                                                            }
                                                        />
                                                    )
                                                }
                                                if (isClicked) {
                                                    return (
                                                        <AddressField
                                                            setLatitude={setLatitude}
                                                            setLongitude={setLongitude}
                                                            inputValue={value} setInputValue={onChange}
                                                            onBlur={() => setIsClicked(false)}
                                                        // error={!!errors.address}
                                                        // helperText={
                                                        //     errors?.address?.message
                                                        // }
                                                        />
                                                    )
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={5} md={5} lg={5} className={classes.row}>
                                        <InputLabel>
                                            {fields.isMale.title}
                                        </InputLabel>
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
                                                        label={
                                                            fields.isMale.male
                                                                .lb
                                                        }
                                                        value={
                                                            fields.isMale.male
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                    <FormControlLabel
                                                        label={
                                                            fields.isMale.female
                                                                .lb
                                                        }
                                                        value={
                                                            fields.isMale.female
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                </RadioGroup>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.row}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <Controller
                                                name="birthDate"
                                                control={control}
                                                render={({ ref, ...rest }) => (
                                                    <KeyboardDatePicker
                                                        label={
                                                            fields.birthDate
                                                                .title
                                                        }
                                                        format={
                                                            fields.birthDate
                                                                .format
                                                        }
                                                        allowKeyboardControl
                                                        disableFuture
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    <Grid item xs={12} sm={5} md={5} lg={5} className={classes.row}>
                                        <InputLabel>
                                            {fields.roles.title}
                                        </InputLabel>
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
                                                    {bakRoles.map((role) => (
                                                        <MenuItem
                                                            key={role}
                                                            value={role}
                                                            classes={{
                                                                root:
                                                                    styles.menuItemRoot,
                                                                selected:
                                                                    styles.menuItemSelected,
                                                            }}
                                                        >
                                                            {role}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.row}>
                                        <InputLabel>
                                            {fields.status.title}
                                        </InputLabel>
                                        <Controller
                                            name="active"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <Switch
                                                    checked={value}
                                                    onChange={(e) =>
                                                        onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/* Action */}
                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.action}>
                                        <Button
                                            className={classes.submit}
                                            variant="contained"
                                            disabled={!formState.isDirty}
                                            type="submit"
                                        >
                                            {operations.save}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* End Detail */}
                        </Grid>
                    </form>
                </Grid>
                {/* Another Sector */}
            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default React.memo(GenInfo)

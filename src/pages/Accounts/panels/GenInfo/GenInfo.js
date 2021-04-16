import React, { useState } from 'react'
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
import { MuiPickersUtilsProvider, DatePicker } from 'mui-pickers-v3' // '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApp } from '../../../../hooks/AppContext'
import { NotFound, Snackbars } from '../../../../components'
import { Consts } from './GenInfoConfig'
import * as AccountsServices from '../../AccountsServices'
import classes from './GenInfo.module.scss'
import moment from 'moment'

const clientSchema = yup.object().shape({
    phone: yup
        .string()
        .max(11, 'Phone must be at most 10 characters')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    // email: yup.string().email('Invalid email').trim(),
})

// const serverSchema = [
//     {
//         type: 'server',
//         name: 'name',
//         message: null,
//     },
//     {
//         type: 'server',
//         name: 'credential',
//         message: 'Invalid username or password',
//     },
// ]

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
            color: 'red',
        },
    },
    disabled: {},
}))

function GenInfo(props) {
    const styles = useStyles()
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { roles } = useApp()

    const { data } = props

    const defaultValues = {
        username: data?.username,
        phone: data?.phone,
        email: data?.email,
        gender: String(data?.gender),
        birthDate: data?.birthDate,
        roleName: data?.roleName,
        active: data?.active,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    if (!roles) {
        return null
    }

    if (!data) {
        return <NotFound />
    }

    const onSubmit = (data) => {
        const rs = {
            ...data,
            gender: data.gender === 'true' ? true : false,
            birthDate: data.birthDate
                ? moment(data.birthDate).format('YYYY-MM-DD')
                : null,
        }
        console.log(data.username)
        console.log(rs)
        AccountsServices.updateAccount(data.username, rs)
            .then((data) => {
                // refreshPage()
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
                setNotify({
                    isOpen: true,
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })
        alert(JSON.stringify(rs))
        // setNotify({
        //     isOpen: true,
        //     message: 'Updated Successfully',
        //     type: 'success',
        // })
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Content Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={0}>
                            {/* First child - Principal Detail*/}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.child}
                            >
                                <Grid container spacing={0}>
                                    {/* Child header */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={3}
                                        lg={3}
                                        className={classes.titleZone}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {headers.child1}
                                        </Typography>
                                    </Grid>
                                    {/* Child body */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={10}
                                        md={7}
                                        lg={5}
                                        className={classes.detailZone}
                                    >
                                        <Grid container spacing={3}>
                                            {/* Detail */}
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="username"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.username
                                                                    .title
                                                            }
                                                            variant="standard"
                                                            fullWidth
                                                            // inputProps={{
                                                            //     readOnly: true,
                                                            // }}
                                                            disabled
                                                            classes={{
                                                                root:
                                                                    styles.inputRoot,
                                                                disabled:
                                                                    styles.disabled,
                                                            }}
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.username
                                                            }
                                                            helperText={
                                                                errors?.username
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.email
                                                                    .title
                                                            }
                                                            variant="standard"
                                                            fullWidth
                                                            disabled
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.email
                                                            }
                                                            helperText={
                                                                errors?.email
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.phone
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.phone
                                                            }
                                                            helperText={
                                                                errors?.phone
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    {fields.gender.title}
                                                </InputLabel>
                                                <Controller
                                                    name="gender"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <RadioGroup
                                                            value={value}
                                                            onChange={onChange}
                                                            row
                                                        >
                                                            <FormControlLabel
                                                                label="Male"
                                                                value="true"
                                                                control={
                                                                    <Radio />
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                label="Female"
                                                                value="false"
                                                                control={
                                                                    <Radio />
                                                                }
                                                            />
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <Controller
                                                        name="birthDate"
                                                        control={control}
                                                        render={({
                                                            ref,
                                                            ...rest
                                                        }) => (
                                                            <DatePicker
                                                                label={
                                                                    fields
                                                                        .birthDate
                                                                        .title
                                                                }
                                                                format={
                                                                    fields
                                                                        .birthDate
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
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                className={classes.roleZone}
                                            >
                                                <InputLabel>
                                                    {fields.auth.title}
                                                </InputLabel>
                                                <Controller
                                                    name="roleName"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <Select
                                                            value={value}
                                                            onChange={onChange}
                                                            // label={
                                                            //     fields.auth
                                                            //         .title
                                                            // }
                                                            // variant="outlined"
                                                            MenuProps={
                                                                MenuProps
                                                            }
                                                            disableUnderline
                                                        >
                                                            {roles.map(
                                                                (data) => (
                                                                    <MenuItem
                                                                        key={
                                                                            data
                                                                        }
                                                                        value={
                                                                            data
                                                                        }
                                                                        classes={{
                                                                            root:
                                                                                styles.menuItemRoot,
                                                                            selected:
                                                                                styles.menuItemSelected,
                                                                        }}
                                                                    >
                                                                        {data}
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <InputLabel>
                                                    {fields.status.title}
                                                </InputLabel>
                                                <Controller
                                                    name="active"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <Switch
                                                            checked={value}
                                                            onChange={(e) =>
                                                                onChange(
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Action */}
                            <Grid
                                item
                                xs={12}
                                sm={10}
                                md={10}
                                lg={8}
                                className={classes.action}
                            >
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
                    </form>
                </Grid>
                {/* Another Sector */}
            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default GenInfo

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    FormControl,
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
import { NotFound, Snackbars, Loading } from '../../../../components'
import { Consts } from './GenInfoConfig'
import * as AccountsServices from '../../AccountsServices'
import classes from './GenInfo.module.scss'

const clientSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone is required')
        .max(10, 'Phone must be at most 10 digits')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    address: yup.string().trim(),
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
    const { data } = props
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { roles } = useApp()

    const { data, refreshPage } = props

    console.log("GenInfo data: ", data);

    const defaultValues = {
        username: data?.username,
        phone: data?.phone,
        email: data?.email,
        isMale: String(data?.isMale),
        birthDate: data?.birthDate,
        roleName: data?.roleName,
        active: data?.active,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    if (!roles) {
        return <Loading />
    }

    if (!data) {
        return <NotFound />
    }

    const onSubmit = (dto) => {
        const rs = {
            ...dto,
            gender: dto.gender === 'true' ? true : false,
            birthDate: dto.birthDate
                ? moment(dto.birthDate).format('YYYY-MM-DD')
                : null,
        }
        console.log(dto.username)
        console.log(rs)
        AccountsServices.updateAccount(dto.username, rs)
            .then((data) => {
                refreshPage(dto.username)
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })

                console.log("Successfull data: ", data);
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
        alert(JSON.stringify(model))
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
                                                            // autoFocus
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
                                                    {fields.isMale.title}
                                                </InputLabel>
                                                <Controller
                                                    name="isMale"
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
                                                            <KeyboardDatePicker
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
                                                <FormControl required>
                                                    <InputLabel>
                                                        {fields.roles.title}
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
                                                                onChange={
                                                                    onChange
                                                                }
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
                                                                            {
                                                                                data
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                        )}
                                                    />
                                                </FormControl>
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

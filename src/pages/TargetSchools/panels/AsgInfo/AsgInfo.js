import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Grid,
    InputLabel,
    Select,
    TextField,
    Typography,
    MenuItem,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Snackbars } from '../../../../components'
import { Consts } from './AsgInfoConfig'
import { useApp } from '../../../../hooks/AppContext'
import { useAuth } from '../../../../hooks/AuthContext'
import { roleNames } from '../../../../utils/Constants'
import classes from './AsgInfo.module.scss'

const clientSchema = yup.object().shape({
    fullName: yup.string().trim().required('Name is required'),
    phone: yup
        .string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    email: yup.string().email('Invalid email').trim(),
})

const serverSchema = [
    // {
    //     type: 'server',
    //     name: 'name',
    //     message: null,
    // },
    // {
    //     type: 'server',
    //     name: 'credential',
    //     message: 'Invalid username or password',
    // },
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
}))

function AsgInfo(props) {
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { user } = useAuth()

    const {
        pics,
        // purps
    } = useApp()

    const picFullNames = pics.map((pic) => pic.fullName)

    const { data } = props

    const defaultValues = {
        // avatar: data?.avatar,
        fullName: data?.fullName,
        phone: data?.phone,
        email: data?.email,
        purp: data?.purp,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    if (!pics) {
        return null
    }

    const onSubmit = (data) => {
        const rs = { ...data, isMale: data.isMale === 'true' ? true : false }
        alert(JSON.stringify(rs))
        setNotify({
            isOpen: true,
            message: 'Updated Successfully',
            type: 'success',
        })
    }

    return (
        <div className={classes.panel}>
            {user.roles[0] === roleNames.salesman ? (
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
                        <Grid container spacing={0}>
                            {/* Info Child */}
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
                                        md={12}
                                        lg={12}
                                        className={classes.header}
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
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.body}
                                    >
                                        <Grid container spacing={0}>
                                            {/* Detail */}
                                            <Grid
                                                item
                                                xs={12}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                                className={classes.titleZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.asg.fullName.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={7}
                                                md={7}
                                                lg={7}
                                                className={classes.detailZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.detail}
                                                >
                                                    {data.fullName}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                                className={classes.titleZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.asg.phone.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={7}
                                                md={7}
                                                lg={7}
                                                className={classes.detailZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.detail}
                                                >
                                                    {data.phone}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                                className={classes.titleZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.asg.email.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={7}
                                                md={7}
                                                lg={7}
                                                className={classes.detailZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.detail}
                                                >
                                                    {data.email}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                                className={classes.titleZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.asg.purp.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={7}
                                                md={7}
                                                lg={7}
                                                className={classes.detailZone}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.detail}
                                                >
                                                    {data.purp}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Another Sector */}
                </Grid>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                                            sm={12}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Grid container spacing={3}>
                                                {/* Detail */}
                                                {/* <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="fullName"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.asg
                                                                    .fullName
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.name
                                                            }
                                                            helperText={
                                                                errors?.name
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid> */}
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                >
                                                    <InputLabel>
                                                        {
                                                            fields.asg.fullName
                                                                .title
                                                        }
                                                    </InputLabel>
                                                    <Controller
                                                        name="fullName"
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
                                                                {picFullNames.map(
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
                                                                    fields.asg
                                                                        .phone
                                                                        .title
                                                                }
                                                                variant="outlined"
                                                                required
                                                                fullWidth
                                                                disabled
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                error={
                                                                    !!errors.phone
                                                                }
                                                                helperText={
                                                                    errors
                                                                        ?.phone
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
                                                                    fields.asg
                                                                        .email
                                                                        .title
                                                                }
                                                                variant="outlined"
                                                                required
                                                                fullWidth
                                                                disabled
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                error={
                                                                    !!errors.email
                                                                }
                                                                helperText={
                                                                    errors
                                                                        ?.email
                                                                        ?.message
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                {/* <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <InputLabel>
                                                    {fields.asg.purp
                                                                    .title}
                                                </InputLabel>
                                                <Controller
                                                    name="purp"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <Select
                                                            value={value}
                                                            onChange={onChange}
                                                            MenuProps={
                                                                MenuProps
                                                            }
                                                            disableUnderline
                                                        >
                                                            {purps.map(
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
                                            </Grid> */}
                                                {/* Action */}
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    className={classes.action}
                                                >
                                                    <Button
                                                        className={
                                                            classes.submit
                                                        }
                                                        variant="contained"
                                                        disabled={
                                                            !formState.isDirty
                                                        }
                                                        type="submit"
                                                    >
                                                        {operations.save}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Actions Sector */}
                    </Grid>
                </form>
            )}

            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default AsgInfo

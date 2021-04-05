import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Switch,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApp } from '../../../../hooks/AppContext'
import { Notifications } from '../../../../components'
import classes from './GenInfo.module.scss'

const clientSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    addr: yup.string().required('Address is required'),
    email: yup.string().email('Invalid email').trim(),
    tel: yup.string().matches(/(84|02)+([0-9]{9})\b/g, 'Incorrect entry'),
    des: yup.string(),
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

function GenInfo(props) {
    const styles = useStyles()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { dists, schEduLvls, schScales, schTypes, schStatus } = useApp()

    const { data } = props

    const defaultValues = {
        name: data.name,
        active: data.active,
        addr: data.addr,
        tel: data.tel,
        email: data.email,
        dist: data.dist,
        eduLvl: data.eduLvl,
        scale: data.scale,
        type: data.type,
        status: data.status,
        des: data.des,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    if (!dists) {
        return null
    }
    if (!schEduLvls) {
        return null
    }
    if (!schScales) {
        return null
    }
    if (!schTypes) {
        return null
    }
    if (!schStatus) {
        return null
    }

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        setNotify({
            isOpen: true,
            message: 'Updated Successfully',
            type: 'success',
        })
    }

    return (
        <div className={classes.panel}>
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
                            {/* First child - School Detail*/}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.child}
                            >
                                <Grid container spacing={0}>
                                    {/* Child title */}
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
                                            School Detail
                                        </Typography>
                                    </Grid>
                                    {/* Child detail */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                        lg={7}
                                        className={classes.detailZone}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label="Name"
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
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={9}
                                                md={9}
                                                lg={9}
                                            >
                                                <Controller
                                                    name="addr"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label="Address"
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.addr
                                                            }
                                                            helperText={
                                                                errors?.addr
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={9}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                            >
                                                <InputLabel>
                                                    District
                                                </InputLabel>
                                                <Controller
                                                    name="dist"
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
                                                            {dists.map(
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
                                                xs={9}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    Educational Level
                                                </InputLabel>
                                                <Controller
                                                    name="eduLvl"
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
                                                            {schEduLvls.map(
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
                                                xs={9}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    School Scale
                                                </InputLabel>
                                                <Controller
                                                    name="scale"
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
                                                            {schScales.map(
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
                                                xs={9}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    School Type
                                                </InputLabel>
                                                <Controller
                                                    name="type"
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
                                                            {schTypes.map(
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
                                                xs={6}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    School Status
                                                </InputLabel>
                                                <Controller
                                                    name="status"
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
                                                            {schStatus.map(
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
                                                <Controller
                                                    name="des"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label="Description"
                                                            variant="outlined"
                                                            fullWidth
                                                            multiline
                                                            rows={5}
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
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <InputLabel>
                                                    School Active
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
                            {/* Second child - Contact detail*/}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.child}
                            >
                                <Grid container spacing={0}>
                                    {/* Child title */}
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
                                            Contact Detail
                                        </Typography>
                                    </Grid>
                                    {/* Child detail */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                        lg={7}
                                        className={classes.detailZone}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="tel"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label="Tel"
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!errors.tel}
                                                            helperText={
                                                                errors?.tel
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
                                                            label="Email"
                                                            variant="outlined"
                                                            required
                                                            fullWidth
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Actions Sector */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={classes.action}
                    >
                        <Button
                            className={classes.submit}
                            variant="contained"
                            disabled={!formState.isDirty}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Notifications notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default GenInfo

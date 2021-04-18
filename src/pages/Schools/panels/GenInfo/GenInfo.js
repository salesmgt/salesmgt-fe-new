import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
import { Snackbars, Loading } from '../../../../components'
import { Consts } from './GenInfoConfig'
import * as SchoolsServices from '../../SchoolsServices'
import classes from './GenInfo.module.scss'

const clientSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    address: yup.string().trim().required('Address is required'),
    phone: yup
        .string()
        .max(11, 'Tel must be at most 11 digits')
        .matches(/(02)+([0-9]{9})\b/g, 'Incorrect entry'),
})

const serverSchema = [
    // {
    //     type: 'server',
    //     name: 'name',
    //     message: null,
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
    const { schData } = props
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { dists, schEduLvls, schTypes, schScales } = useApp()


    const defaultValues = {
        id: schData?.id,
        name: schData?.name,
        address: schData?.address,
        district: schData?.district,

        educationalLevel: schData?.educationalLevel,
        scale: schData?.scale,
        type: schData?.type,
        phone: schData?.phone,

        active: schData?.active,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    if (!dists) {
        return <Loading />
    }

    if (!schEduLvls) {
        return <Loading />
    }

    if (!schTypes) {
        return <Loading />
    }

    if (!schScales) {
        return <Loading />
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            description: schData?.description,
            status: schData?.status,
            reprName: schData?.reprName,
            reprIsMale: schData?.reprIsMale,
            reprPhone: schData?.reprPhone,
            reprEmail: schData?.reprEmail,
        }

        SchoolsServices.updateSchool(data.id, model)
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
                                                    name="id"
                                                    control={control}
                                                    render={({ value }) => (
                                                        <input
                                                            type="hidden"
                                                            name="id"
                                                            value={value}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.name
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
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={9}
                                                md={9}
                                                lg={9}
                                            >
                                                <Controller
                                                    name="address"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.addr
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.address
                                                            }
                                                            helperText={
                                                                errors?.address
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                            >
                                                <InputLabel>
                                                    {fields.dist.title}
                                                </InputLabel>
                                                <Controller
                                                    name="district"
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
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    {fields.eduLvl.title}
                                                </InputLabel>
                                                <Controller
                                                    name="educationalLevel"
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
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    {fields.type.title}
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
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                            >
                                                <InputLabel>
                                                    {fields.scale.title}
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
                                                                fields.tel.title
                                                            }
                                                            variant="outlined"
                                                            fullWidth
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
                            {/* Second child - Contact detail*/}

                            {/* Action */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
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

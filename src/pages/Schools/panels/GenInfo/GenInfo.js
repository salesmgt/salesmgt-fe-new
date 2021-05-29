import React, { useState, useEffect } from 'react'
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '../../../../hooks/AppContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames, roleNames } from '../../../../constants/Generals'
import { Loading, AddressField } from '../../../../components'
import { Consts } from './GenInfoConfig'
import * as SchoolsServices from '../../SchoolsServices'
import { TEL_RGX } from '../../../../utils/Regex' //SCHOOL_NAME_RGX,
import { useSnackbar } from 'notistack'
import classes from './GenInfo.module.scss'

const clientSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .max(30, 'Name must be at most 30 characters')
        .required('Name is required'),
    // .matches(SCHOOL_NAME_RGX, 'Incorrect entry'),
    address: yup.string().trim().required('Address is required'),
    phone: yup
        .string()
        .max(11, 'Tel must be at most 11 digits and has the correct format')
        .matches(TEL_RGX, {
            message: 'Telephone number is in wrong format (02xxxxxxxxx)',
            excludeEmptyString: true,
        }),
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
}))

function GenInfo(props) {
    const { school, refreshPage, userRole } = props
    const { headers, operations, fields, messages } = Consts
    const styles = useStyles()

    const { enqueueSnackbar } = useSnackbar()

    const history = useHistory()

    const { dists, schEduLvls, schTypes } = useApp() // , schScales
    const bakDists = dists ? dists : Milk.getMilk(milkNames.dists)
    const bakSchEduLvls = schEduLvls
        ? schEduLvls
        : Milk.getMilk(milkNames.eduLvls)
    const bakSchTypes = schTypes ? schTypes : Milk.getMilk(milkNames.types)
    // const bakSchScales = schScales ? schScales : Milk.getMilk(milkNames.scales)

    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)

    // const [addressErr, setAddressErr] = useState('')

    const defaultValues = {
        id: school?.schoolId,
        name: school?.name ? school?.name : '',
        address: school?.address ? school?.address : '',
        district: school?.district ? school?.district : bakDists[0],
        latitude: school?.latitude ? school?.latitude : latitude,
        longitude: school?.longitude ? school?.longitude : longitude,

        educationalLevel: school?.educationalLevel
            ? school?.educationalLevel
            : bakSchEduLvls[0],
        // scale: school?.scale ? school?.scale : bakSchScales[0],
        type: school?.type ? school?.type : bakSchTypes[0],
        phone: school?.phone ? school?.phone : '',

        active: school?.active,
    }

    const { control, errors, setError, handleSubmit, formState, reset } =
        useForm({
            resolver: yupResolver(clientSchema),
            defaultValues: defaultValues,
        })

    useEffect(() => {
        reset({
            id: school?.schoolId,
            name: school?.name ? school?.name : '',
            address: school?.address ? school?.address : '',
            district: school?.district ? school?.district : bakDists[0],
            latitude: school?.latitude ? school?.latitude : latitude,
            longitude: school?.longitude ? school?.longitude : longitude,

            educationalLevel: school?.educationalLevel
                ? school?.educationalLevel
                : bakSchEduLvls[0],
            // scale: school?.scale ? school?.scale : bakSchScales[0],
            type: school?.type ? school?.type : bakSchTypes[0],
            phone: school?.phone ? school?.phone : '',

            active: school?.active,
        })
    }, [school])

    // if (!bakDists || !bakSchEduLvls || !bakSchTypes || !school) {
    //     return <Loading />
    // }

    if (!bakDists) {
        return <Loading />
    }

    if (!bakSchEduLvls) {
        return <Loading />
    }

    if (!bakSchTypes) {
        return <Loading />
    }

    if (!school) {
        return <Loading />
    }

    let district = ''
    const validateAddress = (address) => {
        // setAddressErr('')
        if (address) {
            if (address.includes('Thành phố Hồ Chí Minh')) {
                if (address.includes('Quận')) {
                    const tmp1 = address.substring(address.lastIndexOf('Quận'))
                    district = tmp1.substring(0, tmp1.indexOf(', '))
                    // setAddressErr('')
                    return true
                } else {
                    // Quận/Huyện tên chữ, ko có số
                    const tmp1 = address.substring(
                        0,
                        address.lastIndexOf(', Thành phố Hồ Chí Minh')
                    )
                    // const tmp2 = tmp1.substring(tmp1.lastIndexOf(', '))
                    district = tmp1.substring(tmp1.lastIndexOf(', ') + 1).trim()
                    // district = tmp2.substring(2)

                    // setAddressErr('')
                    if (!district || district.includes('Hồ Chí Minh')) {
                        // setAddressErr('Please input exactly address')
                        setError('address', {
                            type: 'manual',
                            message: 'Please input exactly address',
                        })
                        return false
                    }
                    return true
                }
            } else if (address) {
                // setAddressErr(
                //     'Please choose address locates in Ho Chi Minh City'
                // )
                setError('address', {
                    type: 'manual',
                    message:
                        'Please choose address locates in Ho Chi Minh City',
                })
                return false
            }
        } else {
            setLatitude(0.0)
            setLongitude(0.0)
            // setAddressErr('Address is required')
            return false
        }
    }

    const onSubmit = (data) => {
        if (validateAddress(data?.address)) {
            const model = {
                ...data,
                // description: school?.description,

                district: district,
                latitude: school?.latitude ? school?.latitude : latitude,
                longitude: school?.longitude ? school?.longitude : longitude,

                status: school?.status,
                reprName: school?.reprName,
                reprIsMale: school?.reprIsMale,
                reprPhone: school?.reprPhone,
                reprEmail: school?.reprEmail,
            }

            SchoolsServices.updateSchool(data.id, model)
                .then((res) => {
                    refreshPage(data.id)

                    enqueueSnackbar(messages.success, { variant: 'success' })
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error)
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })

                        enqueueSnackbar(messages.error, {
                            variant: 'error',
                        })
                    }
                })

            // alert(JSON.stringify(model))
        }
    }

    const renderUIRoleAdmin = () => {
        return (
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={classes.content}
            >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* School Detail */}
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            className={classes.row}
                        >
                            <Typography
                                color="inherit"
                                className={classes.header}
                            >
                                {headers.child1}
                            </Typography>
                        </Grid>
                        {/* Detail */}
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={9}
                            lg={8}
                            className={classes.row}
                        >
                            <Grid container spacing={0}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    className={classes.row}
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
                                        render={({ value, onChange }) => (
                                            <TextField
                                                label={fields.name.title}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                autoFocus
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.name}
                                                helperText={
                                                    errors?.name?.message
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
                                    className={classes.row}
                                >
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <AddressField
                                                setLatitude={setLatitude}
                                                setLongitude={setLongitude}
                                                inputValue={value}
                                                setInputValue={onChange}
                                                // onBlur={() => {
                                                //     validateAddress(value)
                                                //     setIsClicked(false)
                                                // }}
                                                // errText={
                                                //     formState.isDirty
                                                //         ? addressErr
                                                //         : ''
                                                // }
                                                error={!!errors.address}
                                                helperText={
                                                    errors?.address?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* <Grid item xs={12} sm={3} md={4} lg={4} className={classes.row}>
                                        <InputLabel>
                                            {fields.dist.title}
                                        </InputLabel>
                                        <Controller
                                            name="district"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    MenuProps={MenuProps}
                                                    disableUnderline
                                                >
                                                    {bakDists.map((data) => (
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
                                    </Grid> */}

                                {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.row}>
                                        <InputLabel>{fields.scale.title}</InputLabel>
                                        <Controller
                                            name="scale"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    MenuProps={MenuProps}
                                                    disableUnderline
                                                >
                                                    {bakSchScales.map(
                                                        (data) => (
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
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Grid> */}

                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.row}
                                >
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <TextField
                                                label={fields.tel.title}
                                                variant="outlined"
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

                                <Grid
                                    item
                                    xs={12}
                                    sm={5}
                                    md={5}
                                    lg={5}
                                    className={classes.row}
                                >
                                    <InputLabel>
                                        {fields.eduLvl.title}
                                    </InputLabel>
                                    <Controller
                                        name="educationalLevel"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <Select
                                                value={value}
                                                onChange={onChange}
                                                MenuProps={MenuProps}
                                                disableUnderline
                                            >
                                                {bakSchEduLvls.map((data) => (
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
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    className={classes.row}
                                >
                                    <InputLabel>{fields.type.title}</InputLabel>
                                    <Controller
                                        name="type"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <Select
                                                value={value}
                                                onChange={onChange}
                                                MenuProps={MenuProps}
                                                disableUnderline
                                            >
                                                {bakSchTypes.map((data) => (
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
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.row}
                                >
                                    <InputLabel required>
                                        {fields.status.title}
                                    </InputLabel>
                                    <Controller
                                        name="active"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <Switch
                                                checked={value}
                                                onChange={(e) =>
                                                    onChange(e.target.checked)
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
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
        )
    }

    const renderUIForRoleManager = () => {
        return (
            <Grid container spacing={0}>
                {/* School detail Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Typography
                                color="inherit"
                                className={classes.header}
                            >
                                {headers.child1}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.name.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.educationalLevel}{' '}
                                        {school?.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.addr.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.dist.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.district}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.type.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.type}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Principal detail Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Typography
                                color="inherit"
                                className={classes.header}
                            >
                                {headers.child2}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.reprName.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.reprName
                                            ? `${
                                                  school?.reprIsMale
                                                      ? 'Mr. '
                                                      : 'Ms. '
                                              } ${school?.reprName}`
                                            : fields.empty.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.reprPhone.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.reprPhone
                                            ? school?.reprPhone
                                            : fields.empty.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.reprEmail.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={9}
                                    lg={8}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {school?.reprEmail
                                            ? school?.reprEmail
                                            : fields.empty.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {userRole === roleNames.admin
                    ? renderUIRoleAdmin()
                    : renderUIForRoleManager()}
            </Grid>
        </div>
    )
}

export default GenInfo

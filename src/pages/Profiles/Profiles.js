import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import {
    Avatar,
    Card,
    CardContent,
    IconButton,
    Typography,
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    TextField,
    Icon,
    Tooltip,
} from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { MdEdit, MdPhotoCamera } from 'react-icons/md'
import { Animation, AnimationGroup, NotFound } from '../../components'
import * as ProfilesServices from './ProfilesServices'
import { Consts } from './ProfilesConfig'
import { CardHeaders } from './components'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
import { useApp } from '../../hooks/AppContext'
import { storage } from '../../services/firebase'
import Resizer from 'react-image-file-resizer'
import moment from 'moment'
import { Loading, AddressField } from '../../components'
import { PWD_RGX, PHONE_RGX } from '../../utils/Regex'
import { useSnackbar } from 'notistack'
import Geocode from 'react-geocode'
import classes from './Profiles.module.scss'

const pwdSchema = yup.object().shape({
    oldPassword: yup.string().required('Password is required'),
    newPassword: yup
        .string()
        .notOneOf(
            [yup.ref('oldPassword'), null],
            'The new password you entered is the same as your old password. Please enter a different password'
        )
        .matches(
            PWD_RGX,
            'Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Confirm password is not match')
        .required('Confirm is required'),
})

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .email('Invalid email')
        .required('Email is required'),
})

const phoneSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone is required')
        .max(
            10,
            'Phone number must be at most 10 digits and has the correct format'
        )
        .matches(
            PHONE_RGX,
            'Phone number is in wrong format (03|5|7|9xxxxxxxx)'
        ),
})

const addrSchema = yup.object().shape({
    address: yup.string().trim().required('Address is required'),
})

const serverSchema = [
    {
        type: 'server',
        name: 'oldPassword',
        message: null,
    },
    {
        type: 'server',
        name: 'credential',
        message: 'Invalid password',
    },
]

function Profiles() {
    const { user } = useAuth()
    const { headers, operations, fields, messages } = Consts

    const { enqueueSnackbar } = useSnackbar()
    const { setUserInfo } = useApp()

    const location = useLocation()
    const history = useHistory()
    const { id } = useParams()

    const [data, setData] = useState(null)

    const [expanded, setExpanded] = useState(false)

    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)

    const pwdValues = { oldPassword: '', newPassword: '', confirmPassword: '' }

    const emailValues = { email: '' }

    const phoneValues = { phone: '' }

    const addrValues = {
        address: '',
        latitude: latitude,
        longitude: longitude,
    }

    const {
        handleSubmit: pwdSubmit,
        errors: pwdErrors,
        register: pwdRegister,
        reset: pwdReset,
        setError: setPwdError,
        formState: pwdState,
    } = useForm({
        resolver: yupResolver(pwdSchema),
        defaultValues: pwdValues,
    })

    const {
        handleSubmit: emailSubmit,
        errors: emailErrors,
        register: emailRegister,
        reset: emailReset,
        formState: emailState,
    } = useForm({
        resolver: yupResolver(emailSchema),
        defaultValues: emailValues,
    })

    const {
        handleSubmit: phoneSubmit,
        errors: phoneErrors,
        register: phoneRegister,
        reset: phoneReset,
        formState: phoneState,
    } = useForm({
        resolver: yupResolver(phoneSchema),
        defaultValues: phoneValues,
    })

    const {
        handleSubmit: addrSubmit,
        errors: addrErrors,
        // register: addrRegister,
        reset: addrReset,
        formState: addrState,
        control: addrControl,
    } = useForm({
        resolver: yupResolver(addrSchema),
        defaultValues: addrValues,
    })

    let isMounted = true
    const refreshPage = () => {
        if (id === user.username) {
            ProfilesServices.getProfile(user.username)
                .then((data) => {
                    if (isMounted) {
                        setData(data)
                        setUserInfo(data)
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error)
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
                })
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage()
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
    }, [location.pathname])

    if (!data) {
        if (id !== user.username) {
            return <NotFound title={operations.empty} />
        }
        return <Loading />
    }

    const {
        username,
        fullName,
        email,
        phone,
        avatar,
        isMale,
        address,
        birthDate,
    } = data

    const handleUploadAvatar = async (event) => {
        const file = event.target.files[0]

        if (!file) {
            enqueueSnackbar(messages.error, { variant: 'error' })
            return false
        }

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            enqueueSnackbar(messages.error, { variant: 'error' })
            return false
        }

        const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                    file,
                    300,
                    300,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        resolve(uri)
                    },
                    'file'
                )
            })
        const finalFile = await resizeFile(file)
        const url = await uploadAvatarToFirebase(finalFile)
        // console.log('url avatar = ', url)
        saveAvatarToDb(url)

        enqueueSnackbar(messages.success, { variant: 'success' })
    }

    const uploadAvatarToFirebase = async (file) => {
        return new Promise((resolve, reject) => {
            const uploadImageTask = storage
                .ref(`images/avatars/${user.username}-${file.name}`)
                .put(file)
            uploadImageTask.on(
                'stage_changed',
                (snapshot) => {},
                (error) => {
                    console.log(error)
                    reject('Upload Image to firebase failed: ' + error)
                },
                () => {
                    storage
                        .ref('images/avatars/')
                        .child(`${user.username}-${file.name}`)
                        .getDownloadURL()
                        .then((url) => {
                            resolve(url)
                        })
                }
            )
        })
    }

    const saveAvatarToDb = (url) => {
        const model = {
            attribute: 'avatar',
            value: url,
        }

        ProfilesServices.updateGeneral(user.username, model)
            .then((data) => {
                refreshPage()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

    const onPwdSubmit = (data) => {
        ProfilesServices.updateAccount(
            user.username,
            data.newPassword,
            data.oldPassword
        )
            .then((data) => {
                refreshPage()

                enqueueSnackbar(messages.success, { variant: 'success' })
                pwdReset({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (error.response.status === 500) {
                        serverSchema.forEach(({ name, type, message }) =>
                            setPwdError(name, { type, message })
                        )
                    } else {
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
                }

                enqueueSnackbar(messages.error, { variant: 'error' })
            })
        // pwdReset({ oldPassword: '', newPassword: '', confirmPassword: '' })
    }

    const onEmailSubmit = (data) => {
        const model = {
            attribute: 'email',
            value: data?.email,
        }

        ProfilesServices.updateGeneral(user.username, model)
            .then((data) => {
                refreshPage()

                enqueueSnackbar(messages.success, { variant: 'success' })
                emailReset({ email: '' })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }

                enqueueSnackbar(messages.error, { variant: 'error' })
            })
        // emailReset({ email: '' })
    }

    const onPhoneSubmit = (data) => {
        const model = {
            attribute: 'phone',
            value: data?.phone,
        }

        ProfilesServices.updateGeneral(user.username, model)
            .then((data) => {
                refreshPage()

                enqueueSnackbar(messages.success, { variant: 'success' })
                phoneReset({ phone: '' })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }

                enqueueSnackbar(messages.error, { variant: 'error' })
            })
        // phoneReset({ phone: '' })
    }

    const onAddrSubmit = (data) => {
        const model = {
            attribute: 'address',
            value: data?.address,
            latitude: latitude,
            longitude: longitude,
        }

        // Geocode.fromLatLng(latitude, longitude).then(
        //     (response) => {
        //         const address = response.results[0].formatted_address
        //         let district, city, country
        //         for (
        //             let i = 0;
        //             i < response.results[0].address_components.length;
        //             i++
        //         ) {
        //             for (
        //                 let j = 0;
        //                 j <
        //                 response.results[0].address_components[i].types.length;
        //                 j++
        //             ) {
        //                 switch (
        //                     response.results[0].address_components[i].types[j]
        //                 ) {
        //                     case 'administrative_area_level_2':
        //                         district =
        //                             response.results[0].address_components[i]
        //                                 .long_name
        //                         break
        //                     case 'administrative_area_level_1':
        //                         city =
        //                             response.results[0].address_components[i]
        //                                 .long_name
        //                         break
        //                     case 'country':
        //                         country =
        //                             response.results[0].address_components[i]
        //                                 .long_name
        //                         break
        //                 }
        //             }
        //         }
        //         console.log(district, city, country)
        //         console.log(address)
        //     },
        //     (error) => {
        //         console.error(error)
        //     }
        // )

        ProfilesServices.updateGeneral(user.username, model)
            .then((data) => {
                refreshPage()

                enqueueSnackbar(messages.success, { variant: 'success' })

                addrReset({ address: '' })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }

                enqueueSnackbar(messages.error, { variant: 'error' })
            })
        // addrReset({ address: '' })
    }

    // const handleLogout = () => {
    //     Cookies.setCookie('accessToken', '', 0)
    //     localStorage.clear()
    //     setUser()
    // }

    // -------------------------------------------Page config-------------------------------------------

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.infoContent}>
                {/* <div className={classes.logout}>
                    <Button
                        startIcon={<MdExitToApp />}
                        className={classes.logoutBtn}
                        onClick={handleLogout}
                    >
                        {operations.logout}
                    </Button>
                </div> */}
                <div className={classes.infoAvatar}>
                    <Animation animation="transition.expandIn" delay={300}>
                        {avatar ? (
                            <Avatar
                                className={classes.avatar}
                                alt="user avatar"
                                src={avatar}
                            />
                        ) : (
                            <Avatar className={classes.avatar}>
                                <Typography className={classes.avatarTxt}>
                                    {fullName.split(' ').pop()[0]}
                                </Typography>
                            </Avatar>
                        )}
                    </Animation>
                    <input
                        id="icon-button-file"
                        className={classes.inputAvatar}
                        accept="image/*"
                        type="file"
                        onChange={(event) => handleUploadAvatar(event)}
                    />
                    <label htmlFor="icon-button-file">
                        <Tooltip title="Upload avatar">
                            <IconButton
                                className={classes.uploadBtn}
                                component="span"
                            >
                                <MdPhotoCamera />
                            </IconButton>
                        </Tooltip>
                    </label>
                </div>
                <Animation animation="transition.slideLeftIn" delay={300}>
                    <Typography className={classes.infoName} variant="h4">
                        {fullName}
                    </Typography>
                </Animation>
            </div>

            <div className={classes.about}>
                <AnimationGroup
                    enter={{
                        animation: 'transition.slideUpBigIn',
                    }}
                >
                    <Card className={classes.account} elevation={1}>
                        <CardHeaders header={headers.child1} />
                        <CardContent className={classes.cardContent}>
                            {/* Username section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.username.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={4}>
                                        <div className={classes.detailZone}>
                                            <Typography
                                                className={classes.details}
                                            >
                                                {username}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            {/* Password section */}
                            <form noValidate onSubmit={pwdSubmit(onPwdSubmit)}>
                                <Accordion
                                    className={classes.accor}
                                    elevation={0}
                                    expanded={expanded === 'password'}
                                    onChange={handleChange('password')}
                                >
                                    <AccordionSummary
                                        className={classes.accorSum}
                                        id="password"
                                        expandIcon={<MdEdit />}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    {fields.password.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={4}>
                                                <TextField
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="password"
                                                    defaultValue={
                                                        fields.password
                                                            .defaultValue
                                                    }
                                                    fullWidth
                                                    disabled
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={classes.accorDetails}
                                    >
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        xs={1}
                                                        sm={3}
                                                        md={3}
                                                        lg={3}
                                                    />
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={6}
                                                        lg={4}
                                                        className={
                                                            classes.inputZone
                                                        }
                                                    >
                                                        {pwdErrors.credential && (
                                                            <Typography color="error">
                                                                {
                                                                    pwdErrors
                                                                        .credential
                                                                        .message
                                                                }
                                                            </Typography>
                                                        )}
                                                        <TextField
                                                            className={
                                                                classes.inputField
                                                            }
                                                            fullWidth
                                                            autoFocus
                                                            required
                                                            name="oldPassword"
                                                            label={
                                                                fields.password
                                                                    .labels.old
                                                            }
                                                            variant="outlined"
                                                            type="password"
                                                            inputRef={
                                                                pwdRegister
                                                            }
                                                            error={
                                                                !!pwdErrors.oldPassword
                                                            }
                                                            helperText={
                                                                pwdErrors
                                                                    ?.oldPassword
                                                                    ?.message
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                >
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={1}
                                                            sm={3}
                                                            md={3}
                                                            lg={3}
                                                        />
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={6}
                                                            md={6}
                                                            lg={4}
                                                            className={
                                                                classes.inputZone
                                                            }
                                                        >
                                                            <TextField
                                                                className={
                                                                    classes.inputField
                                                                }
                                                                fullWidth
                                                                required
                                                                name="newPassword"
                                                                label={
                                                                    fields
                                                                        .password
                                                                        .labels
                                                                        .new
                                                                }
                                                                variant="outlined"
                                                                type="password"
                                                                inputRef={
                                                                    pwdRegister
                                                                }
                                                                error={
                                                                    !!pwdErrors.newPassword
                                                                }
                                                                helperText={
                                                                    pwdErrors
                                                                        ?.newPassword
                                                                        ?.message
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                >
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={1}
                                                            sm={3}
                                                            md={3}
                                                            lg={3}
                                                        />
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={6}
                                                            md={6}
                                                            lg={4}
                                                            className={
                                                                classes.inputZone
                                                            }
                                                        >
                                                            <TextField
                                                                className={
                                                                    classes.inputField
                                                                }
                                                                fullWidth
                                                                required
                                                                name="confirmPassword"
                                                                label={
                                                                    fields
                                                                        .password
                                                                        .labels
                                                                        .confirm
                                                                }
                                                                variant="outlined"
                                                                type="password"
                                                                inputRef={
                                                                    pwdRegister
                                                                }
                                                                error={
                                                                    !!pwdErrors.confirmPassword
                                                                }
                                                                helperText={
                                                                    pwdErrors
                                                                        ?.confirmPassword
                                                                        ?.message
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>

                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.saveBtn}
                                            size="large"
                                            type="submit"
                                            disabled={!pwdState.isDirty}
                                        >
                                            {operations.save}
                                        </Button>
                                        <Button
                                            className={classes.cancelBtn}
                                            size="large"
                                            onClick={() =>
                                                pwdReset({
                                                    pwdErrors: false,
                                                    oldPassword: '',
                                                    newPassword: '',
                                                    confirmPassword: '',
                                                })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>
                        </CardContent>
                    </Card>
                </AnimationGroup>

                <AnimationGroup
                    enter={{ animation: 'transition.slideUpBigIn' }}
                >
                    <Card className={classes.me} elevation={1}>
                        <CardHeaders header={headers.child2} />
                        <CardContent className={classes.cardContent}>
                            {/* Full name section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.fullName.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={4}>
                                        <div className={classes.detailZone}>
                                            <Typography
                                                className={classes.details}
                                            >
                                                {fullName}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            {/* Birth date section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.dob.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={4}>
                                        <div className={classes.detailZone}>
                                            <Typography
                                                className={classes.details}
                                            >
                                                {birthDate ? (
                                                    moment(birthDate).format(
                                                        'DD/MM/YYYY'
                                                    )
                                                ) : (
                                                    <div>
                                                        {fields.dob.empty}
                                                    </div>
                                                )}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            {/* isMale section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.isMale.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={4}>
                                        <div className={classes.detailZone}>
                                            <Typography
                                                className={classes.details}
                                            >
                                                {isMale
                                                    ? fields.isMale.male.lb
                                                    : fields.isMale.female.lb}
                                            </Typography>
                                            <Icon>
                                                {isMale ? (
                                                    <AiOutlineMan color="#005BB5" />
                                                ) : (
                                                    <AiOutlineWoman color="#E26A89" />
                                                )}
                                            </Icon>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            {/* Email section */}
                            <form
                                noValidate
                                onSubmit={emailSubmit(onEmailSubmit)}
                            >
                                <Accordion
                                    className={classes.accor}
                                    elevation={0}
                                    expanded={expanded === 'email'}
                                    onChange={handleChange('email')}
                                >
                                    <AccordionSummary
                                        className={classes.accorSum}
                                        id="email"
                                        expandIcon={<MdEdit />}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    {fields.email.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={4}>
                                                <TextField
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="text"
                                                    value={email}
                                                    fullWidth
                                                    disabled
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        className:
                                                            classes.details,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={classes.accorDetails}
                                    >
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={1}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                            />
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={4}
                                                className={classes.inputZone}
                                            >
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    autoFocus
                                                    required
                                                    name="email"
                                                    label={fields.email.label}
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={emailRegister}
                                                    error={!!emailErrors.email}
                                                    helperText={
                                                        emailErrors?.email
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>

                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.saveBtn}
                                            size="large"
                                            type="submit"
                                            disabled={!emailState.isDirty}
                                        >
                                            {operations.save}
                                        </Button>
                                        <Button
                                            className={classes.cancelBtn}
                                            size="large"
                                            onClick={() =>
                                                emailReset({
                                                    emailErrors: false,
                                                    email: '',
                                                })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>

                            {/* Phone section */}
                            <form
                                noValidate
                                onSubmit={phoneSubmit(onPhoneSubmit)}
                            >
                                <Accordion
                                    className={classes.accor}
                                    elevation={0}
                                    expanded={expanded === 'phone'}
                                    onChange={handleChange('phone')}
                                >
                                    <AccordionSummary
                                        className={classes.accorSum}
                                        id="phone"
                                        expandIcon={<MdEdit />}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    {fields.phone.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={4}>
                                                <TextField
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="text"
                                                    value={phone}
                                                    fullWidth
                                                    disabled
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        className:
                                                            classes.details,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={classes.accorDetails}
                                    >
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={1}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                            />
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={4}
                                                className={classes.inputZone}
                                            >
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    autoFocus
                                                    required
                                                    name="phone"
                                                    label={fields.phone.label}
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={phoneRegister}
                                                    error={!!phoneErrors.phone}
                                                    helperText={
                                                        phoneErrors?.phone
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>

                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.saveBtn}
                                            size="large"
                                            type="submit"
                                            disabled={!phoneState.isDirty}
                                        >
                                            {operations.save}
                                        </Button>
                                        <Button
                                            className={classes.cancelBtn}
                                            size="large"
                                            onClick={() =>
                                                phoneReset({
                                                    phoneErrors: false,
                                                    phone: '',
                                                })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>

                            {/* Address section */}
                            <form
                                noValidate
                                onSubmit={addrSubmit(onAddrSubmit)}
                            >
                                <Accordion
                                    className={classes.accor}
                                    elevation={0}
                                    expanded={expanded === 'address'}
                                    onChange={handleChange('address')}
                                >
                                    <AccordionSummary
                                        className={classes.accorSum}
                                        id="address"
                                        expandIcon={<MdEdit />}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    {fields.address.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={9} md={9} lg={9}>
                                                <TextField
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="text"
                                                    value={address}
                                                    fullWidth
                                                    disabled
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        className:
                                                            classes.details,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={classes.accorDetails}
                                    >
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={1}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                            />
                                            <Grid
                                                item
                                                xs={12}
                                                sm={9}
                                                md={9}
                                                lg={9}
                                                className={classes.inputZone}
                                            >
                                                <Controller
                                                    className={
                                                        classes.inputField
                                                    }
                                                    name="address"
                                                    control={addrControl}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <AddressField
                                                            setLatitude={
                                                                setLatitude
                                                            }
                                                            setLongitude={
                                                                setLongitude
                                                            }
                                                            inputValue={value}
                                                            setInputValue={
                                                                onChange
                                                            }
                                                            error={
                                                                !!addrErrors.address
                                                            }
                                                            helperText={
                                                                addrErrors
                                                                    ?.address
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                                {/* <TextField
                                                    className={ classes.inputField}
                                                    fullWidth
                                                    autoFocus
                                                    name="address"
                                                    label={fields.address.label}
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={addrRegister}
                                                    error={!!addrErrors.address}
                                                    helperText={
                                                        addrErrors?.address
                                                            ?.message
                                                    }
                                                /> */}
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>

                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.saveBtn}
                                            size="large"
                                            type="submit"
                                            disabled={!addrState.isDirty}
                                        >
                                            {operations.save}
                                        </Button>
                                        <Button
                                            className={classes.cancelBtn}
                                            size="large"
                                            onClick={() =>
                                                addrReset({
                                                    // addrErrors: false,
                                                    address: '',
                                                })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>
                        </CardContent>
                    </Card>
                </AnimationGroup>
            </div>
        </div>
    )
}

export default Profiles

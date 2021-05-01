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
} from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { MdEdit, MdPhotoCamera } from 'react-icons/md'
import { Animation, AnimationGroup, NotFound } from '../../components'
import * as ProfilesServices from './ProfilesServices'
import { Consts } from './ProfilesConfig'
import { CardHeaders } from './components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import * as Cookies from '../../utils/Cookies'
import { useAuth } from '../../hooks/AuthContext'
import { storage } from '../../services/firebase'
import Resizer from 'react-image-file-resizer'
import moment from 'moment'
import { Snackbars, Loading } from '../../components'
import { PWD_RGX, PHONE_RGX } from '../../utils/Regex'
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
            'Password must contain 8 Characters, One Uppercase, One Lowercase, One Number and One special case Character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], "Password's not match")
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
        .matches(PHONE_RGX, 'Incorrect entry'),
})

const addrSchema = yup.object().shape({
    address: yup.string().trim(),
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

    const location = useLocation()
    const history = useHistory()
    const { id } = useParams()

    const [data, setData] = useState(null)

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const [expanded, setExpanded] = useState(false)

    const pwdValues = { oldPassword: '', newPassword: '', confirmPassword: '' }

    const emailValues = { email: '' }

    const phoneValues = { phone: '' }

    const addrValues = { address: '' }

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
        register: addrRegister,
        reset: addrReset,
        formState: addrState,
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
            setNotify({
                isOpen: true,
                message: 'Update Unsuccessful',
                type: 'error',
            })
            return false
        }

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            setNotify({
                isOpen: true,
                message: 'Update Unsuccessful',
                type: 'error',
            })
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
        setNotify({
            isOpen: true,
            message: 'Updated Successfully',
            type: 'success',
        })
    }

    const uploadAvatarToFirebase = async (file) => {
        return new Promise((resolve, reject) => {
            const uploadImageTask = storage
                .ref(`images/avatars/${`${user.username}-${file.name}`}`)
                .put(file)
            uploadImageTask.on(
                'stage_changed',
                (snapshot) => {},
                (error) => {
                    console.log(error)
                    reject('Upload Image to firebase failed: ' + error)
                },
                () => {
                    // console.log('file.name = ', file.name);
                    storage
                        .ref('images/avatars/')
                        .child(`${user.username}-${file.name}`)
                        .getDownloadURL()
                        .then((url) => {
                            // console.log('getDownloadURL(): ', url);
                            resolve(url)
                        })
                }
            )
        })
    }

    const saveAvatarToDb = (url) => {
        ProfilesServices.updateGeneral(user.username, 'avatar', url)
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
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })
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
                setNotify({
                    isOpen: true,
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })
        // pwdReset({ oldPassword: '', newPassword: '', confirmPassword: '' })
    }

    const onEmailSubmit = (data) => {
        ProfilesServices.updateGeneral(user.username, 'email', data.email)
            .then((data) => {
                refreshPage()
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })
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
                setNotify({
                    isOpen: true,
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })
        // emailReset({ email: '' })
    }

    const onPhoneSubmit = (data) => {
        ProfilesServices.updateGeneral(user.username, 'phone', data.phone)
            .then((data) => {
                refreshPage()
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })
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
                setNotify({
                    isOpen: true,
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })
        // phoneReset({ phone: '' })
    }

    const onAddrSubmit = (data) => {
        ProfilesServices.updateGeneral(user.username, 'address', data.address)
            .then((data) => {
                refreshPage()
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })
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
                setNotify({
                    isOpen: true,
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })
        // addrReset({ address: '' })
    }

    // const handleLogout = () => {
    //     Cookies.setCookie('accessToken', '', 0)
    //     localStorage.clear()
    //     setUser()
    // }

    // -------------------------------------------Page config-------------------------------------------

    const { headers, operations, fields } = Consts

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
                        <Avatar className={classes.avatar} src={avatar} />
                    </Animation>
                    <input
                        id="icon-button-file"
                        className={classes.inputAvatar}
                        accept="image/*"
                        type="file"
                        onChange={(event) => handleUploadAvatar(event)}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            className={classes.uploadBtn}
                            component="span"
                        >
                            <MdPhotoCamera />
                        </IconButton>
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
                    enter={{
                        animation: 'transition.slideUpBigIn',
                    }}
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
                                                {moment(birthDate).format(
                                                    'DD/MM/YYYY'
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
                                            <Grid item sm={6} md={6} lg={4}>
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
                                            disabled={!addrState.isDirty}
                                        >
                                            {operations.save}
                                        </Button>
                                        <Button
                                            className={classes.cancelBtn}
                                            size="large"
                                            onClick={() =>
                                                addrReset({
                                                    addrErrors: false,
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
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default Profiles

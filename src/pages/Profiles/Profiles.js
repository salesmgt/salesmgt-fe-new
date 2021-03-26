import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
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
    Divider,
    Grid,
    TextField,
    Icon,
} from '@material-ui/core'
import { MdEdit, MdExitToApp, MdPhotoCamera } from 'react-icons/md'
import { Animation, AnimationGroup } from '../../components'
import * as ProfilesServices from './ProfilesServices'
import { Consts } from './ProfilesConfig'
import { CardHeaders } from './components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as Cookies from '../../utils/Cookies'
import { useAuth } from '../../hooks/AuthContext'
import { storage } from '../../services/firebase'
import Resizer from 'react-image-file-resizer'
import classes from './Profiles.module.scss'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'

const pwdSchema = yup.object().shape({
    oldPassword: yup.string().required('Password is required'),
    newPassword: yup
        .string()
        .notOneOf(
            [yup.ref('oldPassword'), null],
            'The new password you entered is the same as your old password. Enter a different password'
        )
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], "Password's not match")
        .required('Confirm is required'),
})

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .trim()
        .required('Email is required'),
})

const phoneSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone is required')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
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
    const { user, setUser } = useAuth()

    const history = useHistory()

    const [data, setData] = useState(null)

    const [expanded, setExpanded] = useState(false)

    const {
        handleSubmit: pwdSubmit,
        errors: pwdErrors,
        register: pwdRegister,
        reset: pwdReset,
        setError: setPwdError,
    } = useForm({
        resolver: yupResolver(pwdSchema),
    })

    const {
        handleSubmit: emailSubmit,
        errors: emailErrors,
        register: emailRegister,
        reset: emailReset,
    } = useForm({
        resolver: yupResolver(emailSchema),
    })

    const {
        handleSubmit: phoneSubmit,
        errors: phoneErrors,
        register: phoneRegister,
        reset: phoneReset,
    } = useForm({
        resolver: yupResolver(phoneSchema),
    })

    const {
        handleSubmit: addrSubmit,
        errors: addrErrors,
        register: addrRegister,
        reset: addrReset,
    } = useForm({
        resolver: yupResolver(addrSchema),
    })

    const refreshPage = () => {
        ProfilesServices.getProfile(user.username)
            .then((data) => {
                setData(data)
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(refreshPage, [])

    if (!data) {
        return null
    }

    const {
        username,
        fullName,
        email,
        phone,
        avatar,
        gender,
        address,
        birthDate,
    } = data

    const handleUploadAvatar = async (event) => {
        const file = event.target.files[0]
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

        // const reader = new FileReader()
        // const url = reader.readAsDataURL(file)
        // reader.readAsDataURL(file)

        const url = await uploadAvatarToFirebase(finalFile)
        saveAvatarToDb(url)
    }

    const uploadAvatarToFirebase = async (file) => {
        return new Promise((resolve, reject) => {
            const uploadImageTask = storage
                .ref(`images/avatars/${file.name}`)
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
                        .child(file.name)
                        .getDownloadURL()
                        .then((url) => {
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
        console.log('new', data.newPassword)
        console.log('old', data.oldPassword)
        ProfilesServices.updateAccount(
            user.username,
            data.newPassword,
            data.oldPassword
        )
            .then((data) => {
                refreshPage()
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
            })

        pwdReset({ oldPassword: '', newPassword: '', confirmPassword: '' })
        alert(JSON.stringify(data))
    }

    const onEmailSubmit = (data) => {
        ProfilesServices.updateGeneral(user.username, 'email', data.email)
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

        emailReset({ email: '' })
    }

    const onPhoneSubmit = (data) => {
        ProfilesServices.updateGeneral(user.username, 'phone', data.phone)
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

        phoneReset({ phone: '' })
    }

    const onAddrSubmit = (data) => {
        ProfilesServices.updateGeneral(user.username, 'address', data.address)
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
        addrReset({ address: '' })
    }

    const handleLogout = () => {
        Cookies.setCookie('accessToken', '', 0)
        localStorage.removeItem('notMe')
        setUser()
    }

    // -------------------------------------------Page config-------------------------------------------

    const { headers, operations, fields } = Consts

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.infoContent}>
                <div className={classes.logout}>
                    <Button
                        startIcon={<MdExitToApp />}
                        className={classes.logoutBtn}
                        onClick={handleLogout}
                    >
                        {operations.logout}
                    </Button>
                </div>
                <div className={classes.infoAvatar}>
                    <Animation animation="transition.expandIn" delay={300}>
                        <Avatar className={classes.avatar} src={avatar} />
                    </Animation>
                    <input
                        className={classes.inputAvatar}
                        accept="image/*"
                        id="icon-button-file"
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
                <AnimationGroup>
                    <Card className={classes.account} elevation={1}>
                        <CardHeaders header={headers.account} />
                        <CardContent className={classes.cardContent}>
                            {/* Username section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.username.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={6}>
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
                            <form onSubmit={pwdSubmit(onPwdSubmit)}>
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
                                            <Grid item sm={6} md={6} lg={6}>
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
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                className={classes.inputZone}
                                            >
                                                {pwdErrors.credential && (
                                                    <Typography color="error">
                                                        {
                                                            pwdErrors.credential
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
                                                    name="oldPassword"
                                                    label={
                                                        fields.password.labels
                                                            .old
                                                    }
                                                    variant="outlined"
                                                    type="password"
                                                    inputRef={pwdRegister}
                                                    error={
                                                        pwdErrors.oldPassword
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        pwdErrors.oldPassword
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                className={classes.inputZone}
                                            >
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    name="newPassword"
                                                    label={
                                                        fields.password.labels
                                                            .new
                                                    }
                                                    variant="outlined"
                                                    type="password"
                                                    inputRef={pwdRegister}
                                                    error={
                                                        pwdErrors.newPassword
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        pwdErrors.newPassword
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                className={classes.inputZone}
                                            >
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    name="confirmPassword"
                                                    label={
                                                        fields.password.labels
                                                            .confirm
                                                    }
                                                    variant="outlined"
                                                    type="password"
                                                    inputRef={pwdRegister}
                                                    error={
                                                        pwdErrors.confirmPassword
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        pwdErrors
                                                            .confirmPassword
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.cancelBtn}
                                            size="small"
                                            onClick={() =>
                                                pwdReset({ pwdErrors: false })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                        <Button
                                            className={classes.saveBtn}
                                            size="small"
                                            type="submit"
                                        >
                                            {operations.save}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>
                        </CardContent>
                    </Card>
                </AnimationGroup>

                <AnimationGroup>
                    <Card className={classes.me} elevation={1}>
                        <CardHeaders header={headers.general} />
                        <CardContent className={classes.cardContent}>
                            {/* Full name section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.fullName.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={6}>
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
                                    <Grid item sm={6} md={6} lg={6}>
                                        <div className={classes.detailZone}>
                                            <Typography
                                                className={classes.details}
                                            >
                                                {new Date(
                                                    birthDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            {/* Gender section */}
                            <div className={classes.cardText}>
                                <Grid container spacing={2}>
                                    <Grid item sm={3} md={3} lg={3}>
                                        <Typography className={classes.titles}>
                                            {fields.gender.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} lg={6}>
                                        <div className={classes.detailZone}>
                                            <Typography
                                                className={classes.details}
                                            >
                                                {gender ? 'Male' : 'Female'}
                                            </Typography>
                                            <Icon>
                                                {gender ? (
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
                            <form onSubmit={emailSubmit(onEmailSubmit)}>
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
                                            <Grid item sm={6} md={6} lg={6}>
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
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                className={classes.inputZone}
                                            >
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    autoFocus
                                                    name="email"
                                                    label={fields.email.label}
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={emailRegister}
                                                    error={
                                                        emailErrors.email
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        emailErrors.email
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.cancelBtn}
                                            size="small"
                                            onClick={() =>
                                                emailReset({
                                                    emailErrors: false,
                                                })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                        <Button
                                            className={classes.saveBtn}
                                            size="small"
                                            type="submit"
                                        >
                                            {operations.save}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>

                            {/* Phone section */}
                            <form onSubmit={phoneSubmit(onPhoneSubmit)}>
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
                                            <Grid item sm={6} md={6} lg={6}>
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
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                className={classes.inputZone}
                                            >
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    autoFocus
                                                    name="phone"
                                                    label={fields.phone.label}
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={phoneRegister}
                                                    error={
                                                        phoneErrors.phone
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        phoneErrors.phone
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.cancelBtn}
                                            size="small"
                                            onClick={() =>
                                                phoneReset({
                                                    phoneErrors: false,
                                                })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                        <Button
                                            className={classes.saveBtn}
                                            size="small"
                                            type="submit"
                                        >
                                            {operations.save}
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            </form>

                            {/* Address section */}
                            <form onSubmit={addrSubmit(onAddrSubmit)}>
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
                                            <Grid item sm={6} md={6} lg={6}>
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
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                sm={6}
                                                md={6}
                                                lg={6}
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
                                                    error={
                                                        addrErrors.address
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        addrErrors.address
                                                            ?.message
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions
                                        className={classes.accorActions}
                                    >
                                        <Button
                                            className={classes.cancelBtn}
                                            size="small"
                                            onClick={() =>
                                                addrReset({ addrErrors: false })
                                            }
                                        >
                                            {operations.cancel}
                                        </Button>
                                        <Button
                                            className={classes.saveBtn}
                                            size="small"
                                            type="submit"
                                        >
                                            {operations.save}
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

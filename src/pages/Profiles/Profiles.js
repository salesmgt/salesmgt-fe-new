import React, { useState } from 'react'
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
    InputBase,
    TextField,
    withStyles,
} from '@material-ui/core'
import { MdEdit, MdExitToApp, MdPhotoCamera } from 'react-icons/md'
import { Animation, AnimationGroup } from '../../components'
import { data } from './ProfilesConfig'
// import * as ProfilesServices from './ProfilesServices'
import { HaAvatar } from '../../img'
import { CardHeaders, ContentCards } from './components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as Cookies from '../../utils/Cookies'
import { useAuth } from '../../hooks/AuthContext'
import classes from './Profiles.module.scss'

const validationSchema = yup.object().shape({
    oldPassword: yup.string().required('Incorrect entry'),
    // .matches(
    //     pwdRegex,
    //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    // ),
    newPassword: yup.string().required('Incorrect entry'),
    // .matches(
    //     pwdRegex,
    //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    // ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], "Password's not match")
        .required('Incorrect entry'),
    email: yup.string().email('Invalid email'),
    phone: yup
        .string()
        .required('Incorrect entry')
        .matches(/^0[0-9]{8}$/),
    address: yup.string(),
})

function Profiles() {
    const { user, setUser } = useAuth()
    // const [data, setData] = useState(null)

    // const refreshPage = () => {
    //     ProfilesServices.getProfile().then((data) => {
    //         setData(data)
    //     })
    // }

    // React.useEffect(refreshPage, [])

    // if (!data) {
    //     return null
    // }

    // const { list } = data

    // const [selectedFile, setSelectedFile] = useState(null)
    // const handleUploadAvatar = (e) => {
    //     const file = e.target.files[0]
    //     const reader = new FileReader()
    //     const url = reader.readAsDataURL(file)

    //     reader.onloadend = function (e) {
    //         setSelectedFile(reader.result)
    //     }
    //     console.log(url)
    // }

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const CustomAccordion = withStyles({
        root: {
            '&:before': {
                display: 'none',
            },
        },
    })(Accordion)

    const { handleSubmit, errors, register } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    console.log('rerender')

    const onLogout = () => {
        // document.cookie =
        //     'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        Cookies.setCookie('accessToken', '', 0)
        localStorage.removeItem('notMe')
        setUser()
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.infoContent}>
                <div className={classes.logout}>
                    <Button
                        startIcon={<MdExitToApp />}
                        className={classes.logoutBtn}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </div>
                <div className={classes.infoAvatar}>
                    <Animation animation="transition.expandIn" delay={300}>
                        <Avatar className={classes.avatar} src={HaAvatar} />
                    </Animation>
                    <input
                        accept="image/*"
                        className={classes.inputAvatar}
                        id="icon-button-file"
                        type="file"
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            // color="primary"
                            component="span"
                            className={classes.uploadBtn}
                        >
                            <MdPhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <Animation animation="transition.slideLeftIn" delay={300}>
                    <Typography className={classes.infoName} variant="h4">
                        {data.fullName}
                    </Typography>
                </Animation>
            </div>

            <div className={classes.about}>
                <AnimationGroup>
                    <Card className={classes.account} elevation={1}>
                        <CardHeaders header="Account Information" />

                        <CardContent className={classes.cardContent}>
                            {/* Username section */}
                            <ContentCards
                                title="Username"
                                detail={data.username}
                            />
                            {/* Password section */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CustomAccordion
                                    elevation={0}
                                    className={classes.accor}
                                    expanded={expanded === 'password'}
                                    onChange={handleChange('password')}
                                >
                                    <AccordionSummary
                                        id="password"
                                        expandIcon={<MdEdit />}
                                        className={classes.accorSum}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    Password
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6}>
                                                <InputBase
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="password"
                                                    defaultValue={data.password}
                                                    disabled
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
                                                    name="oldPassword"
                                                    label="Old Password"
                                                    variant="outlined"
                                                    type="password"
                                                    inputRef={register}
                                                    error={
                                                        errors.oldPassword
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.oldPassword
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
                                                {/* <Controller
                                                    control={control}
                                                    name="newPassword"
                                                    defaultValue=""
                                                    render={(props) => (
                                                        <TextField
                                                            className={
                                                                classes.inputField
                                                            }
                                                            label="New Password"
                                                            variant="outlined"
                                                            type="password"
                                                            // error={
                                                            //     errors.newPassword
                                                            // }
                                                            // helperText={
                                                            //     errors
                                                            //         .newPassword
                                                            //         ?.message
                                                            // }
                                                        />
                                                    )}
                                                /> */}
                                                <TextField
                                                    className={
                                                        classes.inputField
                                                    }
                                                    fullWidth
                                                    name="newPassword"
                                                    label="New Password"
                                                    variant="outlined"
                                                    type="password"
                                                    inputRef={register}
                                                    error={
                                                        errors.newPassword
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.newPassword
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
                                                    label="Confirm Password"
                                                    variant="outlined"
                                                    type="password"
                                                    inputRef={register}
                                                    error={
                                                        errors.confirmPassword
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.confirmPassword
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
                                            size="small"
                                            className={classes.cancelBtn}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="small"
                                            className={classes.saveBtn}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </AccordionActions>
                                </CustomAccordion>
                            </form>

                            {/* <ContentAccordions
                                title={accorData.password.title}
                                detail={data.password}
                                type={accorData.password.type}
                                data={accorData.password.passwordData}
                            /> */}
                        </CardContent>
                    </Card>
                </AnimationGroup>

                <AnimationGroup>
                    <Card className={classes.me} elevation={1}>
                        <CardHeaders header=" General Information" />

                        <CardContent className={classes.cardContent}>
                            {/* Full name section */}
                            <ContentCards
                                title="Full name"
                                detail={data.fullName}
                            />
                            {/* Birth date section */}
                            <ContentCards
                                title="Birth date"
                                detail={data.dob}
                            />
                            {/* Gender section */}
                            <ContentCards
                                title="Gender"
                                icon="inline-block"
                                detail={data.gender}
                            />
                            {/* Email section */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CustomAccordion
                                    elevation={0}
                                    className={classes.accor}
                                    expanded={expanded === 'email'}
                                    onChange={handleChange('email')}
                                >
                                    <AccordionSummary
                                        expandIcon={<MdEdit />}
                                        className={classes.accorSum}
                                        id="email"
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    Email
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6}>
                                                <InputBase
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="text"
                                                    defaultValue={data.email}
                                                    disabled
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
                                                    label="Your email"
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={register}
                                                    error={
                                                        errors.email
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.email?.message
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
                                            size="small"
                                            className={classes.cancelBtn}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="small"
                                            className={classes.saveBtn}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </AccordionActions>
                                </CustomAccordion>
                            </form>
                            {/* Phone section */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CustomAccordion
                                    elevation={0}
                                    className={classes.accor}
                                    expanded={expanded === 'phone'}
                                    onChange={handleChange('phone')}
                                >
                                    <AccordionSummary
                                        expandIcon={<MdEdit />}
                                        className={classes.accorSum}
                                        id="phone"
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    Phone number
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6}>
                                                <InputBase
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="text"
                                                    defaultValue={data.phone}
                                                    disabled
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
                                                    label="Your number"
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={register}
                                                    error={
                                                        errors.phone
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.phone?.message
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
                                            size="small"
                                            className={classes.cancelBtn}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="small"
                                            className={classes.saveBtn}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </AccordionActions>
                                </CustomAccordion>
                            </form>
                            {/* Address section */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CustomAccordion
                                    elevation={0}
                                    className={classes.accor}
                                    expanded={expanded === 'address'}
                                    onChange={handleChange('address')}
                                >
                                    <AccordionSummary
                                        expandIcon={<MdEdit />}
                                        className={classes.accorSum}
                                        id="address"
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Typography
                                                    className={classes.titles}
                                                >
                                                    Address
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6}>
                                                <InputBase
                                                    className={clsx(
                                                        classes.details,
                                                        classes.detailsAccor
                                                    )}
                                                    type="text"
                                                    defaultValue={data.address}
                                                    disabled
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
                                                    label="Your address"
                                                    variant="outlined"
                                                    type="text"
                                                    inputRef={register}
                                                    error={
                                                        errors.address
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.address?.message
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
                                            size="small"
                                            className={classes.cancelBtn}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="small"
                                            className={classes.saveBtn}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </AccordionActions>
                                </CustomAccordion>
                            </form>

                            {/* <ContentAccordions
                                title="Email"
                                detail={data.email}
                                type="text"
                                name={['email']}
                                labels={['Your email']}
                            />
                            <ContentAccordions
                                title="Phone number"
                                detail={data.phone}
                                type="text"
                                name={['phone']}
                                labels={['Your number']}
                            />
                            <ContentAccordions
                                title="Address"
                                detail={data.address}
                                type="text"
                                name={['address']}
                                labels={['Your address']}
                            /> */}
                        </CardContent>
                    </Card>
                </AnimationGroup>
            </div>
        </div>
    )
}

export default Profiles

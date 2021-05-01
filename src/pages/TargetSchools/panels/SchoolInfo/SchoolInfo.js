import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    Grid,
    Icon,
    Select,
    Typography,
    makeStyles,
    MenuItem,
    TextField,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { Snackbars, Loading } from '../../../../components'
import { Consts } from './SchoolInfoConfig'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { roleNames, statusNames } from '../../../../constants/Generals'
import * as TargetSchoolsServices from '../../TargetSchoolsServices'
import { PHONE_RGX } from '../../../../utils/Regex'
import UpdateSchStatus from '../../dialogs/UpdateSchStatus/UpdateSchStatus'
import classes from './SchoolInfo.module.scss'

const reprSchema = yup.object().shape({
    reprName: yup
        .string()
        .trim()
        .min(4, 'Name must be at least 4 characters')
        .max(30, 'Name must be at most 30 characters'),
    reprPhone: yup
        .string()
        .max(10, 'Phone must be at most 10 digits')
        .matches(PHONE_RGX, 'Incorrect entry'),
    reprEmail: yup.string().trim().email('Invalid email'),
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

function SchoolInfo(props) {
    const { target, refreshPage } = props
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const { user } = useAuth()
    const { schStatus } = useApp()
    const bakSchStatus = schStatus ? schStatus : Milk.getMilk(milkNames.status)

    const history = useHistory()

    const [currStatus, setCurrStatus] = useState(target?.schoolStatus)

    const [open, setOpen] = useState(false)

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const reprValues = {
        // id: target?.id,
        reprName: target?.reprName ? target?.reprName : '',
        reprIsMale: String(target?.reprIsMale)
            ? String(target?.reprIsMale)
            : String(true),
        reprPhone: target?.reprPhone ? target?.reprPhone : '',
        reprEmail: target?.reprEmail ? target?.reprEmail : '',
    }

    const statusValues = {
        // id: target?.id,
        schoolStatus: target?.schoolStatus
            ? target?.schoolStatus
            : bakSchStatus[0],
    }

    const {
        control: reprControl,
        errors: reprErrors,
        handleSubmit: reprSubmit,
        formState: reprState,
        reset: reprReset,
    } = useForm({
        resolver: yupResolver(reprSchema),
        defaultValues: reprValues,
    })

    const {
        control: statusControl,
        // errors,
        handleSubmit: statusSubmit,
        // formState,
        reset: statusReset,
        setValue: setStatus,
    } = useForm({
        defaultValues: statusValues,
    })

    useEffect(() => {
        reprReset({
            // id: target?.id,
            reprName: target?.reprName ? target?.reprName : '',
            reprIsMale: String(target?.reprIsMale)
                ? String(target?.reprIsMale)
                : String(true),
            reprPhone: target?.reprPhone ? target?.reprPhone : '',
            reprEmail: target?.reprEmail ? target?.reprEmail : '',
        })
    }, [target])

    useEffect(() => {
        statusReset({
            // id: target?.id,
            schoolStatus: target?.schoolStatus
                ? target?.schoolStatus
                : bakSchStatus[0],
        })
    }, [target])

    if (!schStatus) {
        return <Loading />
    }

    if (!target) {
        return <Loading />
    }

    const onReprSubmit = (data) => {
        const model = {
            ...data,
            reprIsMale: data.reprIsMale === 'true' ? true : false,

            // note: target?.note,
            // purpose: target?.purpose,
            // schoolYear: target?.schoolYear,
        }

        TargetSchoolsServices.updatePrinciple(target?.schoolId, model)
            .then((res) => {
                console.log(res)
                refreshPage(target?.id)
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

        // alert(JSON.stringify(model))
    }

    // const validateStatus = (currStatus, newStatus) => {
    //     let isOK = false

    //     switch (currStatus) {
    //         case statusNames.lead:
    //             // console.log(target?.memorandums)

    //             if (newStatus === statusNames.lead) {
    //                 console.log('lead to lead')
    //                 // return console.log('yes')
    //                 return (isOK = true)
    //             }
    //             if (newStatus === statusNames.customer) {
    //                 console.log('lead to cust')
    //                 if (target?.memorandums) {
    //                     // return console.log('yes')
    //                     return (isOK = true)
    //                 } else {
    //                     // return console.log('no')
    //                     return (isOK = false)
    //                 }
    //             }
    //             if (newStatus === statusNames.pending) {
    //                 console.log('lead to pending')
    //                 // return console.log('yes')
    //                 return (isOK = true)
    //             }

    //             break
    //         case statusNames.customer:
    //             // console.log(target?.memorandums)

    //             if (newStatus === statusNames.lead) {
    //                 console.log('cust to lead')
    //                 // return console.log('no')
    //                 return (isOK = false)
    //             }
    //             if (newStatus === statusNames.customer) {
    //                 console.log('cust to cust')
    //                 // return console.log('yes')
    //                 return (isOK = true)
    //             }
    //             if (newStatus === statusNames.pending) {
    //                 console.log('cust to pending')
    //                 // return console.log('yes')
    //                 return (isOK = true)
    //             }

    //             break
    //         case statusNames.pending:
    //             // console.log(target?.memorandums)
    //             if (user.roles[0] !== roleNames.salesman) {
    //                 if (newStatus === statusNames.lead) {
    //                     console.log('pending to lead')
    //                     if (target?.memorandums) {
    //                         // return console.log('no')
    //                         return (isOK = false)
    //                     } else {
    //                         // return console.log('yes')
    //                         return (isOK = true)
    //                     }
    //                 }
    //                 if (newStatus === statusNames.customer) {
    //                     console.log('pending to cust')
    //                     // return console.log('yes')
    //                     return (isOK = true)
    //                 }
    //                 if (newStatus === statusNames.pending) {
    //                     console.log('pending to pending')
    //                     // return console.log('yes')
    //                     return (isOK = true)
    //                 }
    //             } else {
    //                 if (newStatus === statusNames.lead) {
    //                     console.log('pending to lead')
    //                     // return console.log('no')
    //                     return (isOK = false)
    //                 }
    //                 if (newStatus === statusNames.customer) {
    //                     console.log('pending to cust')
    //                     // return console.log('no')
    //                     return (isOK = false)
    //                 }
    //                 if (newStatus === statusNames.pending) {
    //                     console.log('pending to pending')
    //                     // return console.log('no')
    //                     return (isOK = false)
    //                 }
    //             }
    //             break
    //         default:
    //             break
    //     }
    // }

    const resetStatus = () => {
        statusReset({
            // id: target?.id,
            schoolStatus: target?.schoolStatus
                ? target?.schoolStatus
                : bakSchStatus[0],
        })
    }

    const onStatusSubmit = (data) => {
        const model = {
            ...data,
            // level: target?.level,
            // type: target?.schoolType,
            // scale: target?.schoolScale,
        }
        setCurrStatus(model)
        // const ok = validateStatus(target?.schoolStatus, data.schoolStatus)

        // if (ok) {
        //     TargetSchoolsServices.updateStatus(target?.schoolId, model)
        //         .then((res) => {
        //             refreshPage(target?.id)
        //             setNotify({
        //                 isOpen: true,
        //                 message: 'Updated Successfully',
        //                 type: 'success',
        //             })
        //         })
        //         .catch((error) => {
        //             if (error.response) {
        //                 console.log(error)
        //                 history.push({
        //                     pathname: '/errors',
        //                     state: { error: error.response.status },
        //                 })
        //             }
        //             setNotify({
        //                 isOpen: true,
        //                 message: 'Update Unsuccessful',
        //                 type: 'error',
        //             })
        //         })
        // } else {
        //     statusReset({
        //         // id: target?.id,
        //         schoolStatus: target?.schoolStatus
        //             ? target?.schoolStatus
        //             : bakSchStatus[0],
        //     })
        //     setNotify({
        //         isOpen: true,
        //         // message: `Cannot change ${target?.schoolStatus} to ${data.schoolStatus}`,
        //         message: 'This current status cannot be changed',
        //         type: 'warning',
        //     })
        // }

        const allowUpdate = () => {
            TargetSchoolsServices.updateStatus(target?.schoolId, model)
                .then((res) => {
                    refreshPage(target?.id)
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
        }

        const preventUpdate = () => {
            statusReset({
                // id: target?.id,
                schoolStatus: target?.schoolStatus
                    ? target?.schoolStatus
                    : bakSchStatus[0],
            })
            setNotify({
                isOpen: true,
                // message: `Cannot change ${target?.schoolStatus} to ${data.schoolStatus}`,
                message: 'This current status cannot be changed',
                type: 'warning',
            })
        }

        const confirmUpdate = () => {
            setOpen(true)
        }

        switch (target?.schoolStatus) {
            case statusNames.lead:
                // console.log(target?.memorandums)

                if (data.schoolStatus === statusNames.lead) {
                    console.log('lead to lead')
                    // return console.log('yes')
                    allowUpdate()
                }
                if (data.schoolStatus === statusNames.customer) {
                    console.log('lead to cust')
                    //   need config
                    // if (target?.memorandums) {
                    //     // return console.log('yes')
                    //     allowUpdate()
                    // } else {
                    //     // return console.log('no')
                    //     preventUpdate()
                    // }
                    confirmUpdate()
                }
                if (data.schoolStatus === statusNames.pending) {
                    console.log('lead to pending')
                    // return console.log('yes')
                    allowUpdate()
                }

                break
            case statusNames.customer:
                // console.log(target?.memorandums)

                if (data.schoolStatus === statusNames.lead) {
                    console.log('cust to lead')
                    // return console.log('no')
                    preventUpdate()
                }
                if (data.schoolStatus === statusNames.customer) {
                    console.log('cust to cust')
                    // return console.log('yes')
                    allowUpdate()
                }
                if (data.schoolStatus === statusNames.pending) {
                    console.log('cust to pending')
                    // return console.log('yes')
                    allowUpdate()
                }

                break
            case statusNames.pending:
                // console.log(target?.memorandums)

                if (user.roles[0] !== roleNames.salesman) {
                    if (data.schoolStatus === statusNames.lead) {
                        console.log('pending to lead')
                        if (target?.memorandums) {
                            // return console.log('no')
                            preventUpdate()
                        } else {
                            // return console.log('yes')
                            allowUpdate()
                        }
                    }
                    if (data.schoolStatus === statusNames.customer) {
                        console.log('pending to cust')
                        if (target?.memorandums) {
                            // return console.log('yes')
                            allowUpdate()
                        } else {
                            // return console.log('no')
                            preventUpdate()
                        }
                    }
                    if (data.schoolStatus === statusNames.pending) {
                        console.log('pending to pending')
                        // return console.log('yes')
                        allowUpdate()
                    }
                } else {
                    if (data.schoolStatus === statusNames.lead) {
                        console.log('pending to lead')
                        // return console.log('no')
                        preventUpdate()
                    }
                    if (data.schoolStatus === statusNames.customer) {
                        console.log('pending to cust')
                        // return console.log('no')
                        preventUpdate()
                    }
                    if (data.schoolStatus === statusNames.pending) {
                        console.log('pending to pending')
                        // return console.log('no')
                        preventUpdate()
                    }
                }

                break
            default:
                break
        }

        // alert(JSON.stringify(model))
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
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
                                    md={4}
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
                                    md={7}
                                    lg={5}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.schoolName}
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
                                    md={4}
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
                                    md={7}
                                    lg={5}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.schoolAddress}
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
                                    md={4}
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
                                    md={7}
                                    lg={5}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.district}
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
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.eduLvl.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={5}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.level}
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
                                    md={4}
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
                                    md={7}
                                    lg={5}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.schoolType}
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
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.scale.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={5}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.schoolScale}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Principal detail Sector */}
                {target?.schoolStatus !== statusNames.pending ? (
                    user.roles[0] !== roleNames.salesman ||
                    (user.roles[0] === roleNames.salesman &&
                        user.username !== target?.username) ? (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.content}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.wrapper}
                            >
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
                                        {headers.child3}
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
                                            md={4}
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
                                            md={7}
                                            lg={5}
                                            className={classes.rowx}
                                        >
                                            <Typography color="inherit">
                                                {target?.reprName
                                                    ? target?.reprName
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
                                            md={4}
                                            lg={3}
                                            className={classes.rowx}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.reprIsMale.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={7}
                                            lg={5}
                                            className={classes.rowx}
                                        >
                                            {target?.reprName ? (
                                                <div
                                                    className={
                                                        classes.genderZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.gender
                                                        }
                                                    >
                                                        {target?.reprIsMale
                                                            ? fields.reprIsMale
                                                                  .male.lb
                                                            : fields.reprIsMale
                                                                  .female.lb}
                                                    </Typography>
                                                    <Icon>
                                                        {target?.reprIsMale ? (
                                                            <AiOutlineMan color="#005BB5" />
                                                        ) : (
                                                            <AiOutlineWoman color="#E26A89" />
                                                        )}
                                                    </Icon>
                                                </div>
                                            ) : (
                                                <Typography color="inherit">
                                                    {fields.empty.title}
                                                </Typography>
                                            )}
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
                                            md={4}
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
                                            md={7}
                                            lg={5}
                                            className={classes.rowx}
                                        >
                                            <Typography color="inherit">
                                                {target?.reprPhone
                                                    ? target?.reprPhone
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
                                            md={4}
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
                                            md={7}
                                            lg={5}
                                            className={classes.rowx}
                                        >
                                            <Typography color="inherit">
                                                {target?.reprEmail
                                                    ? target?.reprEmail
                                                    : fields.empty.title}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.content}
                        >
                            <form
                                onSubmit={reprSubmit(onReprSubmit)}
                                noValidate
                            >
                                {/* Principal Detail */}
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.wrapper}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={3}
                                        className={classes.row}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.header}
                                        >
                                            {headers.child3}
                                        </Typography>
                                    </Grid>
                                    {/* Detail */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                        lg={5}
                                        className={classes.row}
                                    >
                                        <Grid container spacing={0}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                className={classes.row}
                                            >
                                                {/* <Controller
                                                name="id"
                                                control={reprControl}
                                                render={({ value }) => (
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={value}
                                                    />
                                                )}
                                            /> */}
                                                <Controller
                                                    name="reprName"
                                                    control={reprControl}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.reprName
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            // autoFocus
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!reprErrors.reprName
                                                            }
                                                            helperText={
                                                                reprErrors
                                                                    ?.reprName
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
                                                className={classes.row}
                                            >
                                                <InputLabel>
                                                    {fields.reprIsMale.title}
                                                </InputLabel>
                                                <Controller
                                                    name="reprIsMale"
                                                    control={reprControl}
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
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                className={classes.row}
                                            >
                                                <Controller
                                                    name="reprPhone"
                                                    control={reprControl}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.reprPhone
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!reprErrors.reprPhone
                                                            }
                                                            helperText={
                                                                reprErrors
                                                                    ?.reprPhone
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
                                                className={classes.row}
                                            >
                                                <Controller
                                                    name="reprEmail"
                                                    control={reprControl}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.reprEmail
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!reprErrors.reprEmail
                                                            }
                                                            helperText={
                                                                reprErrors
                                                                    ?.reprEmail
                                                                    ?.message
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
                                                    disabled={
                                                        !reprState.isDirty
                                                    }
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
                ) : (
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
                                    {headers.child3}
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
                                        md={4}
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
                                        md={7}
                                        lg={5}
                                        className={classes.rowx}
                                    >
                                        <Typography color="inherit">
                                            {target?.reprName
                                                ? target?.reprName
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
                                        md={4}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.reprIsMale.title}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                        lg={5}
                                        className={classes.rowx}
                                    >
                                        {target?.reprName ? (
                                            <div className={classes.genderZone}>
                                                <Typography
                                                    color="inherit"
                                                    className={classes.gender}
                                                >
                                                    {target?.reprIsMale
                                                        ? fields.reprIsMale.male
                                                              .lb
                                                        : fields.reprIsMale
                                                              .female.lb}
                                                </Typography>
                                                <Icon>
                                                    {target?.reprIsMale ? (
                                                        <AiOutlineMan color="#005BB5" />
                                                    ) : (
                                                        <AiOutlineWoman color="#E26A89" />
                                                    )}
                                                </Icon>
                                            </div>
                                        ) : (
                                            <Typography color="inherit">
                                                {fields.empty.title}
                                            </Typography>
                                        )}
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
                                        md={4}
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
                                        md={7}
                                        lg={5}
                                        className={classes.rowx}
                                    >
                                        <Typography color="inherit">
                                            {target?.reprPhone
                                                ? target?.reprPhone
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
                                        md={4}
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
                                        md={7}
                                        lg={5}
                                        className={classes.rowx}
                                    >
                                        <Typography color="inherit">
                                            {target?.reprEmail
                                                ? target?.reprEmail
                                                : fields.empty.title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {/* School status Sector */}
                {user.roles[0] !== roleNames.salesman ||
                (user.roles[0] === roleNames.salesman &&
                    user.username === target?.username) ? (
                    <>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.content}
                        >
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.wrapper}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={3}
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
                                        md={7}
                                        lg={5}
                                        className={classes.statusCbZone}
                                    >
                                        {/* <Grid container spacing={0}>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.rowx}
                                    > */}
                                        {/* <Controller
                                    name="id"
                                    control={statusControl}
                                    render={({ value }) => (
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={value}
                                        />
                                    )}
                                /> */}

                                        <Controller
                                            name="schoolStatus"
                                            control={statusControl}
                                            render={({ value, onChange }) => (
                                                <Select
                                                    value={value}
                                                    onChange={(e) => {
                                                        setStatus(
                                                            'schoolStatus',
                                                            e.target.value
                                                        )
                                                        statusSubmit(
                                                            onStatusSubmit
                                                        )()
                                                    }}
                                                    MenuProps={MenuProps}
                                                    disableUnderline
                                                >
                                                    {bakSchStatus.map(
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
                                    </Grid>
                                    {/* Action */}
                                    {/* <Grid
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
                                        // disabled={!cmtState.isDirty}
                                        type="submit"
                                    >
                                        {operations.save}
                                    </Button>
                                </Grid> */}
                                    {/* End Action */}
                                    {/* </Grid>
                            </Grid> */}
                                </Grid>
                            </form>
                        </Grid>
                        <UpdateSchStatus
                            open={open}
                            onClose={() => {
                                resetStatus()
                                setOpen(false)
                            }}
                            resetStatus={resetStatus}
                            target={target}
                            currStatus={currStatus}
                            refreshPage={refreshPage}
                        />
                    </>
                ) : (
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
                                md={4}
                                lg={3}
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
                                md={7}
                                lg={5}
                                className={classes.statusTxtZone}
                            >
                                <Typography color="inherit">
                                    {target?.schoolStatus}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>

            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default SchoolInfo

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    // Icon,
    // IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { Snackbars, Loading, NotFound } from '../../../../components'
import { Consts, getCriteria, getCriteriaInfo } from './ServiceInfoConfig'
import { approveServices, updateService } from '../../ServicesServices'
import { useAuth } from '../../../../hooks/AuthContext';
import { CheckMark, CrosskMark } from '../../../../assets/icons'
import { parseDateToString, calculateDatesGap } from '../../../../utils/DateTimes'
import { roleNames, serviceStatusNames } from '../../../../constants/Generals'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IoInformationCircleSharp } from 'react-icons/io5'
import RejectService from '../../dialogs/RejectService/RejectService';
import ConfirmApprove from '../../dialogs/ConfirmApprove/ConfirmApprove';
import classes from './ServiceInfo.module.scss'

const serviceSchema = yup.object().shape({
    note: yup.string().trim(),
})
// const reasonSchema = yup.object().shape({
//     rejectedReason: yup.string().trim(),
// })

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        '&$disabled': {
            color: '#616161',   // $text-icon
        },
    },
    disabled: {},
    itemPIC: {
        padding: 0,
        margin: 0,
    },
    itemTextPrimary: {
        fontSize: '0.875rem',
    },
    itemTextSecondary: {
        fontSize: '0.8rem',
    },
    customWidth: {
        maxWidth: 300
    }
}))

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND',
});

function ServiceInfo(props) {
    const styles = useStyles()
    const { service, refreshPage } = props
    const { headers, operations, fields } = Consts

    const history = useHistory()
    const { user } = useAuth()

    // Popover Criteria Info
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [openInfoTooltip, setOpenInfoTooltip] = useState(false);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [openApproveDialog, setOpenApproveDialog] = useState(false);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const criteria = getCriteria(service?.serviceType, service?.educationLevel);

    // const handleOpenCriteriaInfo = (event) => {
    //     setAnchorEl(anchorEl ? null : event.currentTarget)
    // }
    // const openInfoPopover = Boolean(anchorEl);  // <=> !!anchorEl

    const defaultValues = {
        id: service?.id,
        serviceType: service?.serviceType,
        startDate: service?.startDate,
        endDate: service?.endDate,
        pricePerSlot: service?.pricePerSlot,
        classNumber: service?.classNumber,
        studentNumber: service?.studentNumber,
        slotNumber: service?.slotNumber,
        note: service?.note,
    }

    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(serviceSchema),
        defaultValues: defaultValues,
    })

    // const defaultReasonValues = {
    //     id: service?.id,
    //     rejectedReason: service?.rejectedReason,
    // }
    // const { control: reasonControl, handleSubmit: handleReasonSubmit, formState: reasonState } = useForm({
    //     resolver: yupResolver(reasonSchema),
    //     defaultValues: defaultReasonValues,
    // })

    const onSubmit = (data) => {
        const model = {
            // ...data,
            id: service?.id,
            taskId: service?.taskId,
            submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            startDate: service?.startDate ? parseDateToString(service?.startDate, 'YYYY-MM-DD HH:mm:ss') : null,
            endDate: service?.endDate ? parseDateToString(service?.endDate, 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(new Date(new Date().getFullYear(), 8, 30), 'YYYY-MM-DD HH:mm:ss'),
            serviceType: service?.serviceType ? service?.serviceType : '',
            classNumber: parseInt(service?.classNumber ? service?.classNumber : '0', 10),
            slotNumber: parseInt(service?.slotNumber ? service?.slotNumber : '0', 10),
            studentNumber: parseInt(service?.studentNumber ? service?.studentNumber : '0', 10),
            pricePerSlot: parseFloat(service?.pricePerSlot ? service?.pricePerSlot : '0.0'),
            status: service?.status,
            note: data?.note,
        }

        updateService(service?.id, model)
            .then((res) => {
                refreshPage(service?.id)
                setNotify({
                    isOpen: true,
                    message: 'Updated note successfully',
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
                    message: 'Updated note failed',
                    type: 'error',
                })
            })

        alert(JSON.stringify(model))
    }

    // Reject chỉ nhập lý do 1 lần duy nhất ban đầu, ko có thay đổi về sau nữa
    // const onReasonSubmit = (data) => {
    //     console.log('submit service rejectedReason: ', data);

    //     const model = {
    //         // ...data,
    //         id: service?.id,
    //         taskId: service?.taskId,
    //         submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    //         startDate: service?.startDate ? parseDateToString(service?.startDate, 'YYYY-MM-DD HH:mm:ss') : null,
    //         endDate: service?.endDate ? parseDateToString(service?.endDate, 'YYYY-MM-DD HH:mm:ss')
    //             : parseDateToString(new Date(new Date().getFullYear(), 8, 30), 'YYYY-MM-DD HH:mm:ss'),
    //         serviceType: service?.serviceType ? service?.serviceType : '',
    //         classNumber: parseInt(service?.classNumber ? service?.classNumber : '0', 10),
    //         slotNumber: parseInt(service?.slotNumber ? service?.slotNumber : '0', 10),
    //         studentNumber: parseInt(service?.studentNumber ? service?.studentNumber : '0', 10),
    //         pricePerSlot: parseFloat(service?.pricePerSlot ? service?.pricePerSlot : '0.0'),
    //         status: service?.status,
    //         note: service?.note,
    //         rejectedReason: data?.rejectedReason,
    //     }

    //     updateService(service?.id, model)
    //         .then((res) => {
    //             refreshPage(service?.id)
    //             setNotify({
    //                 isOpen: true,
    //                 message: 'Updated rejected reason successfully',
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
    //                 message: 'Updated rejected reason failed',
    //                 type: 'error',
    //             })
    //         })

    //     alert(JSON.stringify(model))
    // }

    const setServiceStatusChipColor = (status) => {
        switch (status) {
            case serviceStatusNames.approved:
                return <Chip label={status} className={classes.chipApproved} />
            case serviceStatusNames.rejected:
                return <Chip label={status} className={classes.chipRejected} />
            case serviceStatusNames.pending:
                return <Chip label={status} className={classes.chipPending} />
            default:
                break;
        }
    }

    if (!service) {
        return <Loading />
    }

    // const handleApprove = () => {
    //     approveServices(service?.id).then((res) => {
    //         refreshPage(service?.id)
    //         setNotify({
    //             isOpen: true,
    //             message: 'Approved service successfully',
    //             type: 'success',
    //         })
    //     }).catch((error) => {
    //         if (error.response) {
    //             console.log(error)
    //             history.push({
    //                 pathname: '/errors',
    //                 state: { error: error.response.status },
    //             })
    //         }
    //         setNotify({
    //             isOpen: true,
    //             message: 'Approved service failed',
    //             type: 'error',
    //         })
    //     })
    // }

    const renderApproveDialog = () => {
        return (
            <ConfirmApprove
                open={openApproveDialog}
                onClose={() => setOpenApproveDialog(false)}
                service={service}
                refreshPage={refreshPage}
                setNotify={setNotify}
            />
        )
    }

    const renderRejectDialog = () => {
        return (
            <RejectService
                open={openRejectDialog}
                onClose={() => setOpenRejectDialog(false)}
                service={service}
                refreshPage={refreshPage}
                setNotify={setNotify}
            />
        )
    }

    const checkCriteria = (criteria, standardValue, service) => {
        const { classNumber, studentNumber, pricePerSlot, startDate, endDate } = service
        const duration = calculateDatesGap(new Date(startDate), new Date(endDate), 'M')

        switch (criteria) {
            case 'price':
                if (pricePerSlot >= standardValue)
                    return true
                else return false
            case 'class':
                if (classNumber >= standardValue)
                    return true
                else return false
            case 'student':
                if (studentNumber >= standardValue)
                    return true
                else return false
            case 'duration':
                if (duration >= standardValue)
                    return true
                else return false
            default:
                break;
        }
    }

    const getTooltipTitle = (criteria, standardValue, service) => {
        const { classNumber, studentNumber, pricePerSlot, startDate, endDate } = service
        const duration = calculateDatesGap(new Date(startDate), new Date(endDate), 'M')

        switch (criteria) {
            case 'price':
                return (
                    <Box display="flex">
                        <Box p={1} flexGrow={1}>
                            <Typography variant='caption'>Standard: </Typography>
                            <Typography variant='body2'>{currencyFormatter.format(standardValue)}/period</Typography>
                        </Box>
                        <Box p={1} className={classes.tooltipRightInfo}>
                            <Typography variant='caption'>Actual: </Typography>
                            <Typography variant='body2'>{currencyFormatter.format(pricePerSlot)}/period</Typography>
                        </Box>
                    </Box>
                )
            case 'class':
                return (
                    <Box display="flex">
                        <Box p={1} flexGrow={1}>
                            <Typography variant='caption'>Standard: </Typography>
                            <Typography variant='body2'>{standardValue} classes</Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant='caption'>Actual: </Typography>
                            {classNumber <= 1 ? (
                                <Typography variant='body2'>{classNumber} class</Typography>
                            ) : (
                                <Typography variant='body2'>{classNumber} classes</Typography>
                            )}
                        </Box>
                    </Box>
                )
            case 'student':
                return (
                    <Box display="flex">
                        <Box p={1} flexGrow={1}>
                            <Typography variant='caption'>Standard: </Typography>
                            <Typography variant='body2'>{standardValue} students/class</Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant='caption'>Actual: </Typography>
                            <Typography variant='body2'>{studentNumber} students/class</Typography>
                        </Box>
                    </Box>
                )
            case 'duration':
                return (
                    <Box display="flex">
                        <Box p={1} flexGrow={1}>
                            <Typography variant='caption'>Standard: </Typography>
                            <Typography variant='body2'>{standardValue} months</Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant='caption'>Actual: </Typography>
                            {duration <= 1 ? (
                                <Typography variant='body2'>{duration} month</Typography>
                            ) : (
                                <Typography variant='body2'>{duration} months</Typography>
                            )}
                        </Box>
                    </Box>
                )
            default:
                break;
        }
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {user.roles[0] === roleNames.salesman && user.username !== service?.username ? (
                    <div className={classes.notFound}>
                        <NotFound title={operations.restriction} />
                    </div>
                ) : (
                    <>
                        {/* Detail Sector */}
                        <Grid item container xs={12} sm={12} md={8} lg={8} className={classes.content}>
                            {/* Service Detail */}
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container spacing={0} className={classes.wrapper}
                            >
                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.row}>
                                    <Typography color="inherit" className={classes.header}>
                                        {headers.child1}
                                    </Typography>
                                </Grid>
                                {user.roles[0] === roleNames.salesman ? (
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                                <Grid container spacing={0} className={classes.rowx}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                        <Typography
                                                            color="inherit"
                                                            className={classes.title}
                                                        >
                                                            {fields.serviceType.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        <Typography color="inherit">
                                                            {service?.serviceType}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                                <Grid container spacing={0} className={classes.rowx}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                        <Typography
                                                            color="inherit"
                                                            className={classes.title}
                                                        >
                                                            {fields.duration.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        <Typography color="inherit">
                                                            {parseDateToString(service?.startDate, 'DD-MM-YYYY')} ➜ &nbsp;
                                                            {parseDateToString(service?.endDate, 'DD-MM-YYYY')}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                                <Grid container spacing={0} className={classes.rowx}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                        <Typography
                                                            color="inherit"
                                                            className={classes.title}
                                                        >
                                                            {fields.classNo.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        <Typography color="inherit">
                                                            {service?.classNumber} {fields.classNo.suffix}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                                <Grid container spacing={0} className={classes.rowx}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                        <Typography
                                                            color="inherit"
                                                            className={classes.title}
                                                        >
                                                            {fields.price.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        <Typography color="inherit">
                                                            {currencyFormatter.format(service?.pricePerSlot)}{fields.price.suffix}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                                <Grid container spacing={0} className={classes.rowx}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                        <Typography color="inherit" className={classes.title}>
                                                            {fields.note.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        <Controller
                                                            name="note"
                                                            control={control}
                                                            render={({ value, onChange }) => (
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    multiline
                                                                    rows={5}
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    // label={fields.note.noNote}
                                                                    placeholder={fields.note.noNote}
                                                                    disabled={service?.status !== serviceStatusNames.pending}
                                                                    InputProps={{
                                                                        classes: {
                                                                            root: styles.inputRoot,
                                                                            disabled: styles.disabled,
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            {service?.status === serviceStatusNames.pending && (
                                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.action}>
                                                    <Button
                                                        type="submit"
                                                        disabled={!formState.isDirty}
                                                        className={classes.btnApprove}
                                                        variant="contained"
                                                    >
                                                        {operations.save}
                                                    </Button>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </form>
                                ) : (
                                    <Grid item container xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid container spacing={0} className={classes.rowx}>
                                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                    <Typography
                                                        color="inherit"
                                                        className={classes.title}
                                                    >
                                                        {fields.serviceType.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <Typography color="inherit">
                                                        {service?.serviceType}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid container spacing={0} className={classes.rowx}>
                                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                    <Typography
                                                        color="inherit"
                                                        className={classes.title}
                                                    >
                                                        {fields.duration.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <Typography color="inherit">
                                                        {parseDateToString(service?.startDate, 'DD-MM-YYYY')} ➜ &nbsp;
                                            {parseDateToString(service?.endDate, 'DD-MM-YYYY')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid container spacing={0} className={classes.rowx}>
                                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                    <Typography
                                                        color="inherit"
                                                        className={classes.title}
                                                    >
                                                        {fields.classNo.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <Typography color="inherit">
                                                        {service?.classNumber} {fields.classNo.suffix}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid container spacing={0} className={classes.rowx}>
                                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                    <Typography
                                                        color="inherit"
                                                        className={classes.title}
                                                    >
                                                        {fields.price.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <Typography color="inherit">
                                                        {currencyFormatter.format(service?.pricePerSlot)}{fields.price.suffix}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid container spacing={0} className={classes.rowx}>
                                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                    <Typography color="inherit" className={classes.title}>
                                                        {fields.note.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={5}
                                                        value={service?.note}
                                                        // readOnly
                                                        disabled
                                                        placeholder={fields.note.noNote}
                                                        InputProps={{
                                                            classes: {
                                                                root: styles.inputRoot,
                                                                disabled: styles.disabled,
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {service?.status === serviceStatusNames.pending && (
                                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.action}>
                                                <Button
                                                    className={classes.btnApprove}
                                                    variant="contained"
                                                    onClick={() => { setOpenApproveDialog(true) }}
                                                >
                                                    {operations.approve}
                                                </Button>
                                                {renderApproveDialog()}
                                                <Button
                                                    className={classes.btnReject}
                                                    variant="contained"
                                                    onClick={() => { setOpenRejectDialog(true) }}
                                                >
                                                    {operations.reject}
                                                </Button>
                                                {renderRejectDialog()}
                                            </Grid>
                                        )}
                                    </Grid>
                                )}
                            </Grid>

                            {/* Submission Detail */}
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container spacing={0} className={classes.wrapper}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                    <Typography color="inherit" className={classes.header}>
                                        {headers.child2}
                                    </Typography>
                                </Grid>
                                <Grid item container xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Grid container spacing={0} className={classes.rowx}>
                                            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.submitedDate.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                <Typography color="inherit">
                                                    {parseDateToString(service?.submitDate, 'DD-MM-YYYY')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Grid container spacing={0} className={classes.rowx}>
                                            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                <Typography color="inherit" className={classes.title}>
                                                    {fields.submitedBy.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                <ListItem className={styles.itemPIC}>
                                                    <ListItemAvatar>
                                                        <Avatar src={service?.avatar} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        className={classes.picName}
                                                        primary={service?.fullName}
                                                        secondary={service?.username}
                                                        classes={{
                                                            primary: styles.itemTextPrimary,
                                                            secondary: styles.itemTextSecondary,
                                                        }}
                                                    />
                                                </ListItem>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Grid container spacing={0} className={classes.rowx}>
                                            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                <Typography color="inherit" className={classes.title}>
                                                    {fields.serviceStatus.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                {setServiceStatusChipColor(service?.status)}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {service?.rejectedReason && (
                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            <Grid container spacing={0} className={classes.rowx}>
                                                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                                                    <Typography color="inherit" className={classes.title}>
                                                        {fields.rejectedReason.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={3}
                                                        value={service?.rejectedReason}
                                                        // readOnly
                                                        disabled
                                                        InputProps={{
                                                            classes: {
                                                                root: styles.inputRoot,
                                                                disabled: styles.disabled,
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                    {/* )} */}
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Criteria Sector */}
                        {user.roles[0] === roleNames.manager && (
                            <Grid item xs={12} sm={12} md={4} lg={4} className={classes.content}>
                                <Grid container spacing={0} className={classes.wrapper}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Box display="flex">
                                            <Box flexGrow={1}>
                                                <Typography color="inherit" className={classes.header}>
                                                    {headers.child3}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                {/*Ko hiểu sao icon này lúc ẩn lúc hiện */}
                                                <ClickAwayListener onClickAway={() => setOpenInfoTooltip(false)}>
                                                    <Tooltip
                                                        interactive
                                                        title={getCriteriaInfo()}
                                                        placement="bottom-end"
                                                        open={openInfoTooltip}
                                                        onClose={() => setOpenInfoTooltip(false)}
                                                        disableFocusListener
                                                        disableHoverListener  // disable cái này thì khi thả chuột ra ko bị close
                                                    // disableTouchListener
                                                    // PopperProps={{ disablePortal: true }}
                                                    >
                                                        {/* <Button onClick={() => setOpenInfoTooltip(true)}> */}
                                                        {/* <IconButton className={classes.iconInfo}
                                                            onClick={() => setOpenInfoTooltip(true)}
                                                        > */}
                                                        <div onClick={() => setOpenInfoTooltip(true)}>
                                                            <IoInformationCircleSharp className={classes.iconInfo} />
                                                        </div>
                                                        {/* </IconButton> */}
                                                        {/* </Button> */}
                                                    </Tooltip>
                                                </ClickAwayListener>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={10} md={12} lg={12} className={classes.row}>
                                        <List>
                                            {criteria.map((cri) => (
                                                <div key={cri.key}>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            {checkCriteria(cri.key, cri.standardValue, service) ? (
                                                                <img className={classes.icon} src={CheckMark} />
                                                            ) : (
                                                                <img className={classes.icon} src={CrosskMark} />
                                                            )}
                                                        </ListItemIcon>
                                                        <Tooltip
                                                            title={getTooltipTitle(cri.key, cri.standardValue, service)}
                                                            // placement='bottom-end'
                                                            arrow
                                                            interactive
                                                            classes={{ tooltip: styles.customWidth }}
                                                        >
                                                            <ListItemText primary={cri.name} classes={{ primary: styles.itemTextPrimary }} />
                                                        </Tooltip>
                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            ))}
                                            <ListItem>
                                                {/* <ListItemText primary={`Estimate Revenue ≈ 30.000.000VND`} />    *${revenue} */}
                                                <Tooltip
                                                    title={<Typography variant='caption'>{fields.revenue.formula}</Typography>}
                                                    arrow
                                                    interactive
                                                    classes={{ tooltip: styles.customWidth }}
                                                >
                                                    <Typography variant='body1'>
                                                        <span className={classes.txtEstimate}>Estimate revenue</span> &nbsp;
                                                <span className={classes.txtRevenue}>
                                                            ≈ {currencyFormatter.format(service?.pricePerSlot * service?.slotNumber)}
                                                        </span>
                                                    </Typography>
                                                </Tooltip>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </>
                )}

            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div >
    )
}

export default ServiceInfo

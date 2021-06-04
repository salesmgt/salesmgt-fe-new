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
    InputAdornment,
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
import { Snackbars, Loading, NotFound, LinearProgressBars } from '../../../../components'
import { Consts, getCriteria, getCriteriaInfo } from './ServiceInfoConfig'
import { updateService } from '../../ServicesServices'
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
import { DateRangePickers } from '../../components';
import { suggestPrice } from '../../../../utils/Suggestions';
import classes from './ServiceInfo.module.scss'

const serviceSchema = yup.object().shape({
    classNumber: yup
        .number('Number of classes must be a number')
        .integer('Number of classes must be an integer')
        .min(1, 'Minimum 1 class')
        .max(100, 'Maximum 100 classes')
        .required('Number of classes is required'),
    studentNumber: yup
        .number('Number of students must be a number')
        .integer('Number of students must be an integer')
        .min(1, 'Minimum 1 student')
        .max(100, 'Maximum 100 students')
        .required('Number of students is required'),
    slotNumber: yup
        .number('Number of periods must be a number')
        .integer('Number of periods must be an integer')
        .min(1, 'Minimum 1 period')
        .max(10, 'Maximum 10 periods')
        .required('Number of periods is required'),
    pricePerSlot: yup
        .number('Price floor must be a number')
        .min(100000, 'Minimum price is 100.000VND')
        .max(2000000, 'Maximum price is 2.000.000VND')
        .required('Price floor is required'),
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

    const [priceSuggestions, setPriceSuggestions] = useState([]);

    const criteria = getCriteria(service?.serviceType, service?.educationLevel);

    // const handleOpenCriteriaInfo = (event) => {
    //     setAnchorEl(anchorEl ? null : event.currentTarget)
    // }
    // const openInfoPopover = Boolean(anchorEl);  // <=> !!anchorEl

    const defaultValues = {
        id: service?.id,
        serviceType: service?.serviceType,
        // startDate: service?.startDate,
        // endDate: service?.endDate,
        duration: [service?.startDate, service?.endDate],
        pricePerSlot: service?.pricePerSlot,
        classNumber: service?.classNumber,
        studentNumber: service?.studentNumber,
        slotNumber: service?.slotNumber,
        note: service?.note,
    }

    const { control, handleSubmit, formState, errors, getValues } = useForm({
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

    // const customiseServiceList = (schoolLevel) => {
    //     const customServiceTypes = [...serviceTypes]

    //     if (schoolLevel !== schoolLevelNames.th) {
    //         customServiceTypes.splice(customServiceTypes.indexOf(serviceNames.svc3), 1)
    //     }
    //     return customServiceTypes;
    // }
    // const customServiceTypes = customiseServiceList(service?.educationLevel)

    // console.log('service: ', service)

    const onSubmit = (data) => {
        const model = {
            // ...data,
            id: service?.id,
            taskId: service?.taskId,
            serviceType: service?.serviceType,
            submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            startDate: data?.duration[0] ? parseDateToString(data?.duration[0], 'YYYY-MM-DD HH:mm:ss')
                : service?.startDate,    // parseDateToString(service?.startDate, 'YYYY-MM-DD HH:mm:ss'),
            endDate: data?.duration[1] ? parseDateToString(data?.duration[1], 'YYYY-MM-DD HH:mm:ss')
                : service?.endDate,     // parseDateToString(service?.endDate, 'YYYY-MM-DD HH:mm:ss'),
            classNumber: data?.classNumber ? parseInt(data?.classNumber, 10) : service?.classNumber,
            slotNumber: data?.slotNumber ? Number(data?.slotNumber) : service?.slotNumber,
            studentNumber: data?.studentNumber ? Number(data?.studentNumber) : service?.studentNumber,
            pricePerSlot: data?.pricePerSlot ? Number(data?.pricePerSlot) : service?.pricePerSlot,
            status: service?.status,
            note: data?.note,    // Này lấy y nguyên từ note, ko thông qua chỉnh sửa thì ko cần phải ghi lại thế này

            /**Do hồi trước không định cho sửa các thông tin khác của Service nên mới có những biến như phía dưới này  */
            // startDate: service?.startDate ? parseDateToString(service?.startDate, 'YYYY-MM-DD HH:mm:ss') : null,
            // endDate: service?.endDate ? parseDateToString(service?.endDate, 'YYYY-MM-DD HH:mm:ss')
            //     : parseDateToString(new Date(new Date().getFullYear(), 8, 30), 'YYYY-MM-DD HH:mm:ss'),
            // serviceType: service?.serviceType ? service?.serviceType : '',
            // classNumber: parseInt(service?.classNumber ? service?.classNumber : '0', 10),
            // slotNumber: parseInt(service?.slotNumber ? service?.slotNumber : '0', 10),
            // studentNumber: parseInt(service?.studentNumber ? service?.studentNumber : '0', 10),
            // pricePerSlot: parseFloat(service?.pricePerSlot ? service?.pricePerSlot : '0.0'),
        }

        updateService(service?.id, model)
            .then((res) => {
                refreshPage(service?.id)
                setNotify({
                    isOpen: true,
                    message: 'Updated service successfully',
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
                    message: 'Updated service failed',
                    type: 'error',
                })
            })

        // alert(JSON.stringify(model))
    }

    // Reject chỉ nhập lý do 1 lần duy nhất ban đầu, ko có thay đổi về sau nữa
    // ===> Bỏ, ko cho sửa luôn
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
            // setNotify={setNotify}
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
        const { pricePerSlot, slotNumber, classNumber, studentNumber, startDate, endDate } = service
        const duration = calculateDatesGap(new Date(startDate), new Date(endDate), 'M')

        switch (criteria) {
            case 'price':
                if (pricePerSlot >= standardValue)
                    return true
                else return false
            case 'period':
                if (slotNumber >= standardValue)
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

    const getTooltipTitle = (criteria, standardValue, service, formValues) => {
        const { pricePerSlot, slotNumber, classNumber, studentNumber, startDate, endDate } = service
        const { priceFloor, slotNo, classNo, studentNo, time } = formValues
        // Sao cái formValues này có lúc nó cập nhật có lúc nó giữ nguyên thế nhỉ???

        // console.log('formValues = ', formValues);

        let duration = 0
        if (formValues && time) {
            // console.log('time[0] = ', time[0]);
            // console.log('time[1] = ', time[1]);
            duration = calculateDatesGap(new Date(time[0]), new Date(time[1]), 'M')
        } else {
            duration = calculateDatesGap(new Date(startDate), new Date(endDate), 'M')
        }
        // const duration = calculateDatesGap(new Date(startDate), new Date(endDate), 'M')

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
                            <Typography variant='body2'>
                                {formValues && priceFloor
                                    ? currencyFormatter.format(priceFloor)
                                    : currencyFormatter.format(pricePerSlot)}/period
                            </Typography>
                        </Box>
                    </Box>
                )
            case 'period':
                return (
                    <Box display="flex">
                        <Box p={1} flexGrow={1}>
                            <Typography variant='caption'>Standard: </Typography>
                            <Typography variant='body2'>{standardValue} periods/week</Typography>
                        </Box>
                        <Box p={1} className={classes.tooltipRightInfo}>
                            <Typography variant='caption'>Actual: </Typography>
                            {(formValues && slotNo) ? (slotNo <= 1 ? (
                                <Typography variant='body2'>{slotNo} period/week</Typography>
                            ) : (
                                <Typography variant='body2'>{slotNo} periods/week</Typography>
                            )) : (
                                slotNumber <= 1 ? (
                                    <Typography variant='body2'>{slotNumber} period/week</Typography>
                                ) : (
                                    <Typography variant='body2'>{slotNumber} periods/week</Typography>
                                )
                            )}
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
                            {(formValues && classNo) ? (classNo <= 1 ? (
                                <Typography variant='body2'>{classNo} class</Typography>
                            ) : (
                                <Typography variant='body2'>{classNo} classes</Typography>
                            )) : (
                                classNumber <= 1 ? (
                                    <Typography variant='body2'>{classNumber} class</Typography>
                                ) : (
                                    <Typography variant='body2'>{classNumber} classes</Typography>
                                )
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
                            <Typography variant='body2'>
                                {(formValues && studentNo) ? studentNo : studentNumber} students/class
                            </Typography>
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

    const calculateEstimateSales = (service, formValues) => {
        const { pricePerSlot, slotNumber, classNumber, startDate, endDate } = service
        const { priceFloor, slotNo, classNo } = formValues
        const duration = calculateDatesGap(new Date(startDate), new Date(endDate), 'M')
        let estimateSales = 0

        if (formValues && priceFloor && slotNo && classNo) {
            estimateSales = currencyFormatter.format(priceFloor * slotNo * classNo * 4 * duration);
        } else {
            estimateSales = currencyFormatter.format(pricePerSlot * slotNumber * classNumber * 4 * duration)
        }

        // Ô này chỉ view thôi mà, có sao hiện vậy chứ ko có validate lại
        // if (estimateSales > 2000000000) {
        //     estimateSales = 2000000000
        // }
        return estimateSales
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
                                {/**Salesman edit Service của mình (khi chưa đc Approve/Reject) */}
                                {user.roles[0] === roleNames.salesman && user.username === service?.username ? (
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
                                                        {service?.status === serviceStatusNames.pending ? (
                                                            <Controller
                                                                name="duration"
                                                                control={control}
                                                                defaultValue={[service?.startDate, service?.endDate]}
                                                                render={({ value, onChange }) => (
                                                                    <DateRangePickers
                                                                        dateRange={value}
                                                                        handleDateRangeChange={onChange}
                                                                    />
                                                                )}
                                                            />
                                                        ) : service?.status === serviceStatusNames.approved ? (

                                                            <LinearProgressBars
                                                                startDate={service?.startDate}
                                                                endDate={service?.endDate}
                                                                marker={new Date()}
                                                                type="service"
                                                            />
                                                        ) : (
                                                            <Typography color="inherit">
                                                                {parseDateToString(service?.startDate, 'DD-MM-YYYY')} ➜ &nbsp;
                                                                {parseDateToString(service?.endDate, 'DD-MM-YYYY')}
                                                            </Typography>
                                                        )}
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
                                                        {service?.status === serviceStatusNames.pending ? (
                                                            <Controller
                                                                name="classNumber"
                                                                control={control}
                                                                render={({ value, onChange }) => (
                                                                    <Grid item xs={8} sm={7} md={4} lg={4}>
                                                                        <TextField
                                                                            // label={fields.classNo.title}
                                                                            variant="outlined"
                                                                            type="number"
                                                                            required
                                                                            fullWidth
                                                                            value={value}
                                                                            onChange={onChange}
                                                                            InputProps={{
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                        {fields.classNo.adornment}
                                                                                    </InputAdornment>
                                                                                ),
                                                                                inputProps: { min: 1, max: 100 },
                                                                            }}
                                                                            error={!!errors?.classNumber}
                                                                            helperText={errors?.classNumber?.message}
                                                                        />
                                                                    </Grid>
                                                                )}
                                                            />
                                                        ) : (
                                                            <Typography color="inherit">
                                                                {service?.classNumber} {fields.classNo.adornment}
                                                            </Typography>
                                                        )}
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
                                                            {fields.studentNumber.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        {service?.status === serviceStatusNames.pending ? (
                                                            <Controller
                                                                name="studentNumber"
                                                                control={control}
                                                                render={({ value, onChange }) => (
                                                                    <Grid item xs={10} sm={7} md={6} lg={6}>
                                                                        <TextField
                                                                            // label={fields.studentNumber.title}
                                                                            variant="outlined"
                                                                            type="number"
                                                                            required
                                                                            fullWidth
                                                                            value={value}
                                                                            onChange={onChange}
                                                                            InputProps={{
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                        {fields.studentNumber.adornment}
                                                                                    </InputAdornment>
                                                                                ),
                                                                                inputProps: { min: 1, max: 100 },
                                                                            }}
                                                                            error={!!errors?.studentNumber}
                                                                            helperText={errors?.studentNumber?.message}
                                                                        />
                                                                    </Grid>
                                                                )}
                                                            />
                                                        ) : (
                                                            <Typography color="inherit">
                                                                {service?.studentNumber} {fields.studentNumber.adornment}
                                                            </Typography>
                                                        )}
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
                                                        {service?.status === serviceStatusNames.pending ? (
                                                            <Controller
                                                                name="pricePerSlot"
                                                                control={control}
                                                                render={({ value, onChange }) => (
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={7} md={8} lg={7}>
                                                                            <TextField
                                                                                // label={fields.price.title}
                                                                                variant="outlined"
                                                                                type="number"
                                                                                required
                                                                                fullWidth
                                                                                // autoFocus
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            {fields.price.adornment}
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                    inputProps: { min: 100000, max: 2000000 },
                                                                                }}
                                                                                value={value}
                                                                                onChange={(e) => {
                                                                                    onChange(e.target.value)
                                                                                    suggestPrice(Number(e.target.value), setPriceSuggestions)
                                                                                }}
                                                                                error={!!errors?.pricePerSlot}
                                                                                helperText={errors?.pricePerSlot?.message}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                            {priceSuggestions.map(suggestion => (
                                                                                <Button variant="outlined" size="small" color="secondary"
                                                                                    onClick={(e) => onChange(suggestion)}
                                                                                    className={classes.suggestions}
                                                                                >
                                                                                    {new Intl.NumberFormat('vi-VN').format(suggestion)}
                                                                                </Button>
                                                                            ))}
                                                                        </Grid>
                                                                    </Grid>
                                                                )}
                                                            />
                                                        ) : (
                                                            <Typography color="inherit">
                                                                {currencyFormatter.format(service?.pricePerSlot)}/period
                                                            </Typography>
                                                        )}
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
                                                            {fields.slotNumber.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                        {service?.status === serviceStatusNames.pending ? (
                                                            <Controller
                                                                name="slotNumber"
                                                                control={control}
                                                                render={({ value, onChange }) => (
                                                                    <Grid container>
                                                                        <Grid item xs={8} sm={7} md={5} lg={5}>
                                                                            <TextField
                                                                                // label={fields.slotNumber.title}
                                                                                variant="outlined"
                                                                                type="number"
                                                                                required
                                                                                fullWidth
                                                                                value={value}
                                                                                onChange={(e) => onChange(e.target.value)}
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            {fields.slotNumber.adornment}
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                    inputProps: { min: 0, max: 10 }
                                                                                }}
                                                                                error={!!errors?.slotNumber}
                                                                                helperText={errors?.slotNumber?.message}
                                                                            />
                                                                        </Grid>
                                                                        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                            <Tooltip
                                                                                title={<Typography variant='caption'>{fields.revenue.formula}</Typography>}
                                                                                arrow interactive
                                                                            >
                                                                                <Typography variant='body1'>
                                                                                    <span className={classes.txtEstimate}>Estimate sales</span> &nbsp;
                                                                                    <span className={classes.txtRevenue}>
                                                                                        ≈ {currencyFormatter.format(getValues('pricePerSlot') * getValues('slotNumber') * 4)}
                                                                                    </span>
                                                                                </Typography>
                                                                            </Tooltip>
                                                                        </Grid> */}
                                                                    </Grid>
                                                                )}
                                                            />
                                                        ) : (
                                                            <Typography color="inherit">
                                                                {service?.slotNumber} {service?.slotNumber === 1 ? 'period/week' : 'periods/week'}
                                                            </Typography>
                                                        )}
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
                                                        onClick={() => {
                                                            // console.log('serviceType = ', getValues('serviceType'));
                                                            // console.log('startDate = ', getValues('duration[0]'));
                                                            // console.log('endDate = ', getValues('duration[1]'));
                                                            // console.log('classNumber = ', getValues('classNumber'));
                                                            // console.log('studentNumber = ', getValues('studentNumber'));
                                                            // console.log('pricePerSlot = ', getValues('pricePerSlot'));
                                                            // console.log('slotNumber = ', getValues('slotNumber'));
                                                            // console.log('note = ', getValues('note'));
                                                        }}
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
                                                    <LinearProgressBars
                                                        startDate={service?.startDate}
                                                        endDate={service?.endDate}
                                                        marker={new Date()}
                                                        type="service"
                                                    />
                                                    {/* <Typography color="inherit">
                                                        {parseDateToString(service?.startDate, 'DD-MM-YYYY')} ➜ &nbsp;
                                                        {parseDateToString(service?.endDate, 'DD-MM-YYYY')}
                                                    </Typography> */}
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
                                                        {service?.classNumber} {fields.classNo.adornment}
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
                                                        {fields.studentNumber.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <Typography color="inherit">
                                                        {service?.studentNumber} {fields.studentNumber.adornment}
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
                                                        {currencyFormatter.format(service?.pricePerSlot)}/period
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
                                                        {fields.slotNumber.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                                                    <Typography color="inherit">
                                                        {service?.slotNumber} {service?.slotNumber === 1 ? 'period/week' : 'periods/week'}
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
                                                {service?.status && setServiceStatusChipColor(service?.status)}
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
                        {(user.roles[0] === roleNames.manager || user.roles[0] === roleNames.salesman) && (
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
                                                            title={user.roles[0] === roleNames.salesman
                                                                ? getTooltipTitle(cri.key, cri.standardValue, service, {
                                                                    priceFloor: getValues('pricePerSlot'),
                                                                    slotNo: getValues('slotNumber'),
                                                                    classNo: getValues('classNumber'),
                                                                    studentNo: getValues('studentNumber'),
                                                                    time: getValues('duration')
                                                                }) : getTooltipTitle(cri.key, cri.standardValue, service, {})
                                                            }
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
                                                {/* <ListItemText primary={`Estimate sales ≈ 30.000.000VND`} />    *${revenue} */}
                                                <Tooltip
                                                    title={<Typography variant='caption'>{fields.revenue.formula}</Typography>}
                                                    arrow
                                                    interactive
                                                    classes={{ tooltip: styles.customWidth }}
                                                >
                                                    <Typography variant='body1'>
                                                        <span className={classes.txtEstimate}>Estimate sales</span> &nbsp;
                                                        <span className={classes.txtRevenue}>≈{' '}
                                                            {user.roles[0] === roleNames.salesman && service?.status === serviceStatusNames.pending
                                                                ? calculateEstimateSales(service, {
                                                                    priceFloor: getValues('pricePerSlot'),
                                                                    slotNo: getValues('slotNumber'),
                                                                    classNo: getValues('classNumber'),

                                                                })
                                                                : calculateEstimateSales(service, {})
                                                            }
                                                            {/* {user.roles[0] === roleNames.salesman
                                                                ? currencyFormatter.format(getValues('pricePerSlot') * getValues('slotNumber') * getValues('classNumber') * 4)
                                                                : currencyFormatter.format(service?.pricePerSlot * service?.slotNumber * service?.classNumber * 4)
                                                            } */}
                                                            {/* {currencyFormatter.format(service?.pricePerSlot * service?.slotNumber * service?.classNumber * 4)} */}
                                                            {/* {getValues('pricePerSlot') && getValues('slotNumber')
                                                                ? `≈ ${currencyFormatter.format(getValues('pricePerSlot') * getValues('slotNumber') * 4)}`
                                                                : `≈ ${currencyFormatter.format(service?.pricePerSlot * service?.slotNumber * 4)}`
                                                            } */}
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

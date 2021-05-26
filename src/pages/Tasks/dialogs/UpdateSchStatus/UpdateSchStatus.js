import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    withStyles,
    Typography,
    IconButton,
    // FormLabel,
    // Checkbox,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    InputAdornment,
    Divider,
    Tooltip,
    ClickAwayListener,
    Box,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { Snackbars } from '../../../../components'
import { useSnackbar } from 'notistack'
import { Consts, confirmTaskCompleteMessage1, getCriteriaInfo } from '../DialogConfig'   // updateStatusMessage,
import * as TasksServices from '../../TasksServices'
import { useTask } from '../../hooks/TaskContext'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import { DateRangePickers } from '../../components'
import { app as FirebaseApp } from '../../../../services/firebase'
import { parseDateToString } from '../../../../utils/DateTimes';
import { suggestPrice } from '../../../../utils/Suggestions';
import { schoolLevelNames, serviceNames } from '../../../../constants/Generals'
import { IoInformationCircleSharp } from 'react-icons/io5'
import classes from './UpdateSchStatus.module.scss'

const clientSchema = yup.object().shape({
    classNumber: yup.number('Number of classes must be a number')
        .integer('Number of classes must be an integer')
        .min(1, 'Minimum 1 class')
        .max(100, 'Maximum 100 classes')
        .required('Number of classes is required'),
    studentNumber: yup.number('Number of students must be a number')
        .integer('Number of students must be an integer')
        .min(1, 'Minimum 1 student')
        .max(100, 'Maximum 100 students')
        .required('Number of students is required'),
    slotNumber: yup.number('Number of periods must be a number')
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

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND',
});

const stylesTitle = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

function UpdateSchStatus(props) {
    const { open, onClose, task, refreshPage } = props
    const { headers, operations, fields, messages } = Consts

    const { enqueueSnackbar } = useSnackbar()

    const { user } = useAuth()
    const { userInfo } = useApp()
    const history = useHistory()
    const { serviceTypes } = useTask()

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false);
    const [priceSuggestions, setPriceSuggestions] = useState([]);

    // const [notify, setNotify] = useState({
    //     isOpen: false,
    //     message: '',
    //     type: '',
    // })

    const defaultValues = {
        // id: memoDets?.id,
        startDate: new Date(),
        endDate: new Date(new Date().getFullYear(new Date().getFullYear() + 1)),
        serviceType: serviceNames.svc1,
        classNumber: 0,
        studentNumber: 0,
        slotNumber: 0,
        pricePerSlot: 100000,
        note: '',
        // showCreate: false,
    }

    const {
        control,
        errors,
        handleSubmit,
        formState,
        reset,
        //watch,    // chưa hiểu sao đó mà Watch nó chặn nên getValue() ko lấy đc defaultValues của form
        getValues
    } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    // const confirmWatch = watch('showCreate')

    const [listManagers, setListManagers] = useState([])
    const getListManagers = () => {
        TasksServices.getListManagers().then((res) =>
            setListManagers(res.list)
        )
    }
    useEffect(getListManagers, []);

    const customiseServiceList = (schoolLevel) => {
        const customServiceTypes = [...serviceTypes]

        if (schoolLevel !== schoolLevelNames.th) {
            customServiceTypes.splice(customServiceTypes.indexOf(serviceNames.svc3), 1)
        }
        return customServiceTypes;
    }
    const customServiceTypes = customiseServiceList(task?.level)

    // const allowUpdate = () => {
    //     // console.log('allow aupdate nè');

    //     TasksServices.updateStatus(task?.schoolId, currStatus)
    //         .then((res) => {
    //             refreshPage(task?.id)
    //             // setNotify({
    //             //     isOpen: true,
    //             //     message: "Updated school's status successfully",
    //             //     type: 'success',
    //             // })

    //             enqueueSnackbar(messages.updatedSuccess, { variant: 'success' })
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //             // setNotify({
    //             //     isOpen: true,
    //             //     message: "Updated school's status failed",
    //             //     type: 'error',
    //             // })
    //             enqueueSnackbar(messages.updatedError, {
    //                 variant: 'error',
    //             })
    //         })
    // }

    // Coi xem chỗ này còn lỗi ko
    // console.log('listManagers: ', listManagers)
    const createNotify = (value) => {
        if (listManagers && listManagers?.length > 0) {
            new Promise((resolve, reject) => {
                // listManagers.map((mng) => {
                FirebaseApp.database()
                    .ref('notify')
                    .child(listManagers[0]?.username)
                    .push({
                        avatar: userInfo?.avatar ? userInfo?.avatar : '',
                        actor: user?.username,
                        type: 'service',
                        timestamp: moment(new Date()).format(
                            'YYYY-MM-DD HH:mm:ss'
                        ),
                        content: 'Salesman has just submitd a service.',
                        uid: task?.id,
                        isSeen: false,
                    })
                // })
            })
        }
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            taskId: task?.id,
            submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            startDate: data?.duration[0] ? parseDateToString(data?.duration[0], 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            endDate: data?.duration[1] ? parseDateToString(data?.duration[1], 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(new Date(new Date().getFullYear(new Date().getFullYear() + 1)), 'YYYY-MM-DD HH:mm:ss'),
            serviceType: data?.serviceType ? data?.serviceType : serviceNames.svc1,
            classNumber: parseInt(data?.classNumber ? data?.classNumber : '0', 10),
            studentNumber: parseInt(data?.studentNumber ? data?.studentNumber : '0', 10),
            slotNumber: parseInt(data?.slotNumber ? data?.slotNumber : '0', 10),
            pricePerSlot: parseFloat(data?.pricePerSlot ? data?.pricePerSlot : '0.0'),
        }
        // delete model.showCreate
        delete model.duration

        // getListManagers()
        // console.log('listManagers: ', listManagers)

        TasksServices.createServices(model)
            .then((res) => {
                TasksServices.completeTasks(task?.id).then(res => {
                    refreshPage(task?.id)
                    enqueueSnackbar("Updated task's status successfully", {
                        variant: 'success',
                    })
                }).catch((error) => {
                    if (error.response) {
                        console.log(error)
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
                    // setNotify({
                    //     isOpen: true,
                    //     message: 'Proposed a service failed',
                    //     type: 'error',
                    // })
                    enqueueSnackbar("Updated task's status failed", {
                        variant: 'error',
                    })
                })


                // setNotify({
                //     isOpen: true,
                //     message: 'Proposed a service successfully',
                //     type: 'success',
                // })

                enqueueSnackbar('Created service successfully', {
                    variant: 'success',
                })

                // Send notification by Firebase
                createNotify(data)

                // reset({ showCreate: false })

                // allowUpdate()
                onClose()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
                // setNotify({
                //     isOpen: true,
                //     message: 'Proposed a service failed',
                //     type: 'error',
                // })
                enqueueSnackbar('Created service failed', {
                    variant: 'error',
                })
            })

        // alert(JSON.stringify(model))
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm">
                <DialogTitleWithIconClose onClose={onClose}>
                    {headers.confirmCompleteTask}
                </DialogTitleWithIconClose>

                <DialogContent className={classes.dialogCont}>
                    <form noValidate>
                        <DialogContentText className={classes.dialogText}>
                            {/* If you want to update this status, please process to create
                    a Memorandum of Contract. */}
                            {/* {updateStatusMessage()} */}
                            {confirmTaskCompleteMessage1()}
                            <Divider style={{ margin: '1.1rem 5rem' }} />

                            {/* <div className={classes.showCreate}>
                                <FormLabel>{operations.showCreate}</FormLabel>
                                <Controller
                                    name="showCreate"
                                    control={control}
                                    render={({ value, onChange }) => (
                                        <Checkbox
                                            onChange={(e) =>
                                                onChange(e.target.checked)
                                            }
                                            checked={value}
                                        />
                                    )}
                                />
                            </div> */}

                            {/* {confirmWatch && (
                                <> */}
                            {/* <Divider style={{ marginBottom: '1.1rem' }} /> */}
                            <Grid container spacing={2} className={classes.wrapper}>
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.rowx}>
                                    <Box display="flex" flexDirection="row">
                                        <Box flexGrow={1} display="flex" flexDirection="row">
                                            <Tooltip title='Service "Toán Khoa" only available for schools which are "Tiểu học"' placement="right-end">
                                                <InputLabel>{fields.service.title}</InputLabel>
                                                {/* <div style={{
                                             marginLeft: '0.7rem' }}><IoInformationCircleSharp className={classes.iconInfo} /></div> */}
                                            </Tooltip>
                                        </Box>
                                        <Box>
                                            <ClickAwayListener onClickAway={() => setOpenInfoTooltip(false)}>
                                                <Tooltip
                                                    interactive
                                                    title={getCriteriaInfo()}
                                                    placement="bottom-end"
                                                    open={openInfoTooltip}
                                                    onClose={() => setOpenInfoTooltip(false)}
                                                    disableFocusListener
                                                    disableHoverListener  // disable cái này thì khi thả chuột ra ko bị close
                                                >
                                                    <div onClick={() => setOpenInfoTooltip(true)}>
                                                        <IoInformationCircleSharp className={classes.iconInfo} />
                                                    </div>
                                                </Tooltip>
                                            </ClickAwayListener>
                                        </Box>
                                    </Box>
                                    <Controller
                                        name="serviceType"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <RadioGroup value={value} onChange={onChange} row>
                                                <Grid container xs={12} sm={12} md={12} lg={12}>
                                                    {customServiceTypes.map(service => (
                                                        <Grid item xs={3} sm={3} md={3} lg={3} key={service}>
                                                            <FormControlLabel
                                                                control={<Radio />}
                                                                label={service}
                                                                value={service}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </RadioGroup>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.rowx}>
                                    <Controller
                                        name="duration"
                                        control={control}
                                        defaultValue={[new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1))]}
                                        render={({ value, onChange }) => (
                                            <DateRangePickers
                                                dateRange={value}
                                                handleDateRangeChange={onChange}
                                                startLabel="Valid from"
                                                endLabel="Valid until"
                                                isFilter={false}
                                            />
                                        )}
                                    />
                                    {/* <InputLabel>Duration *</InputLabel> */}
                                </Grid>

                                <Grid item xs={7} sm={6} md={6} lg={6} className={classes.rowx}>
                                    <Controller
                                        name="classNumber"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <TextField
                                                className={classes.txtNumber}
                                                label={fields.classNo.title}
                                                variant="outlined"
                                                type="number"
                                                required
                                                // fullWidth
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
                                                error={!!errors.classNumber}
                                                helperText={errors?.classNumber ?
                                                    errors?.classNumber?.message
                                                    : fields.classNo.helper
                                                }
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={7} sm={6} md={6} lg={6} className={classes.rowx}>
                                    <Controller
                                        name="studentNumber"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <TextField
                                                className={classes.txtNumber}
                                                label={fields.studentNumber.title}
                                                variant="outlined"
                                                type="number"
                                                required
                                                // fullWidth
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
                                                error={!!errors.studentNumber}
                                                helperText={errors?.studentNumber ?
                                                    errors?.studentNumber?.message
                                                    : fields.studentNumber.helper
                                                }
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={7} sm={6} md={6} lg={6} className={classes.rowx}>
                                    <Controller
                                        name="pricePerSlot"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                                    <TextField
                                                        className={classes.txtPrice}
                                                        label={fields.price.title}
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
                                                        // value={new Intl.NumberFormat('vi-VN').format(value)}
                                                        // onChange={onChange}
                                                        onChange={(e) => {
                                                            onChange(e.target.value)
                                                            suggestPrice(Number(e.target.value), setPriceSuggestions)
                                                        }}
                                                        error={!!errors.pricePerSlot}
                                                        helperText={errors?.pricePerSlot ?
                                                            errors?.pricePerSlot?.message
                                                            : fields.price.helper
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    {priceSuggestions.map(suggestion => (
                                                        <Button variant="outlined" size="small" color="secondary"
                                                            onClick={(e) => {
                                                                // console.log('suggestedPrice = ', suggestion);
                                                                onChange(suggestion)
                                                            }}
                                                            className={classes.suggestions}
                                                        >
                                                            {new Intl.NumberFormat('vi-VN').format(suggestion)}
                                                        </Button>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={7} sm={6} md={6} lg={6} className={classes.rowx}>
                                    <Controller
                                        name="slotNumber"
                                        control={control}
                                        render={({ value, onChange }) => (
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField
                                                        className={classes.txtNumber}
                                                        label={fields.slotNumber.title}
                                                        variant="outlined"
                                                        type="number"
                                                        required
                                                        // fullWidth
                                                        value={value}
                                                        onChange={(e) => onChange(e.target.value)}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {fields.slotNumber.adornment}
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: { min: 1, max: 10 }
                                                        }}
                                                        error={!!errors.slotNumber}
                                                        helperText={errors?.slotNumber ?
                                                            errors?.slotNumber?.message
                                                            : fields.slotNumber.helper
                                                        }
                                                    // error={!!errors.slotNumber}
                                                    // helperText={errors?.slotNumber?.message}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <Tooltip
                                                        title={<Typography variant='caption'>{fields.revenue.formula}</Typography>}
                                                        arrow interactive
                                                    >
                                                        <Typography variant='body1'>
                                                            <span className={classes.txtEstimate}>Estimate revenue</span> &nbsp;
                                                                    <span className={classes.txtRevenue}>
                                                                ≈ {currencyFormatter.format(getValues('pricePerSlot') * getValues('slotNumber') * 4)}
                                                            </span>
                                                        </Typography>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        )}
                                    />
                                </Grid>

                                {/**Giờ bỏ cái này, ko dùng đến nữa */}
                                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputLabel>
                                            {fields.revenue.title}
                                        </InputLabel>
                                        <Controller
                                            name="revenueCriteria"
                                            control={control}
                                            defaultValue={
                                                fields.revenue.rev1.value
                                            }
                                            render={({ value, onChange }) => (
                                                <RadioGroup
                                                    value={value}
                                                    onChange={onChange}
                                                    row
                                                >
                                                    <FormControlLabel
                                                        label={
                                                            fields.revenue.rev1
                                                                .lb
                                                        }
                                                        value={
                                                            fields.revenue.rev1
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                    <FormControlLabel
                                                        label={
                                                            fields.revenue.rev2
                                                                .lb
                                                        }
                                                        value={
                                                            fields.revenue.rev2
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                </RadioGroup>
                                            )}
                                        />
                                    </Grid> */}

                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.rowx}>
                                    <Controller
                                        name="note"
                                        control={control}
                                        defaultValue=""
                                        render={({ value, onChange }) => (
                                            <TextField
                                                label={fields.note.title}
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.note}
                                                helperText={errors?.note?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            {/* </>
                            )} */}
                        </DialogContentText>
                    </form>
                </DialogContent>

                <DialogActions className={classes.dialogAct}>
                    <Button
                        className={classes.btnSave}
                        // type="submit"
                        disabled={!formState.isDirty}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {operations.save}
                    </Button>
                    <Button
                        onClick={() => {
                            reset({
                                errors: false,
                                // showCreate: false,
                            })
                            onClose()
                        }}
                    >
                        {operations.cancel}
                    </Button>
                    {console.log(getValues('pricePerSlot'))}
                    {console.log(getValues('slotNumber'))}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateSchStatus
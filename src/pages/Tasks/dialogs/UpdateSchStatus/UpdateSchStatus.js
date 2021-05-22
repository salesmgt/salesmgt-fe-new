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
    FormLabel,
    Checkbox,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    InputAdornment,
    Divider,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Snackbars } from '../../../../components'
import { Consts, updateStatusMessage } from '../DialogConfig'
import * as TasksServices from '../../TasksServices'
import { useTask } from '../../hooks/TaskContext'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import DateRangePickers from '../../components/DateRangePickers/DateRangePickers'
import { app as FirebaseApp } from '../../../../services/firebase'
import { parseDateToString } from '../../../../utils/DateTimes';
import { suggestPrice } from '../../utils/Suggestions';
import classes from './UpdateSchStatus.module.scss'
import { schoolLevelNames, serviceNames } from '../../../../constants/Generals'

const clientSchema = yup.object().shape({
    // duration: yup
    //     .string()
    //     // .trim()
    //     .required('Duartion is required')
    //     .min(1, 'Duartion must be at least 1 digit')
    //     .max(2, 'Duartion must be at most 2 digits')
    //     .matches(DURATION_RGX, 'Invalid entry'),
    classNumber: yup.number()
        .integer('Number of classes must be an integer')
        .min(1, 'Minimum 1 class')
        .max(100, 'Maximum 100 classes')
        .required('Number of classes is required'),
    studentNumber: yup.number()
        .integer('Number of students must be an integer')
        .min(1, 'Minimum 1 student')
        .max(100, 'Maximum 100 students')
        .required('Number of students is required'),
    slotNumber: yup.number()
        .integer('Number of periods must be an integer')
        .min(1, 'Minimum 1 period')
        .required('Total number of periods is required'),
    pricePerSlot: yup
        .number('Price floor must be a number')
        .min(100000, 'Minimum price is 100.000VND')
        .max(5000000, 'Maximum price is 5.000.000VND')
        .required(),
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
    const { open, onClose, resetStatus, task, currStatus, refreshPage } = props
    const { headers, operations, fields } = Consts

    const { user } = useAuth()
    const { userInfo } = useApp()
    const history = useHistory()
    const { serviceTypes } = useTask()

    const [priceSuggestions, setPriceSuggestions] = useState([]);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        // id: memoDets?.id,
        startDate: new Date(),
        endDate: new Date(new Date().getFullYear(new Date().getFullYear() + 1)),
        serviceType: serviceNames.svc1,
        classNumber: 0,
        studentNumber: 0,
        slotNumber: 0,
        pricePerSlot: 100000.0,
        note: '',
        showCreate: false,
    }

    const { control, errors, handleSubmit, formState, reset, watch } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const confirmWatch = watch('showCreate')

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

    const allowUpdate = () => {
        // console.log('allow aupdate nè');

        TasksServices.updateStatus(task?.schoolId, currStatus)
            .then((res) => {
                refreshPage(task?.id)
                setNotify({
                    isOpen: true,
                    message: "Updated school's status successfully",
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
                    message: "Updated school's status failed",
                    type: 'error',
                })
            })
    }

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
        delete model.showCreate
        delete model.duration

        // getListManagers()
        // console.log('listManagers: ', listManagers)

        TasksServices.createServices(model)
            .then((res) => {
                setNotify({
                    isOpen: true,
                    message: 'Submitd a service successfully',
                    type: 'success',
                })

                // Send notification by Firebase
                createNotify(data)

                reset({ showCreate: false })

                allowUpdate()
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
                setNotify({
                    isOpen: true,
                    message: 'Submitd a service failed',
                    type: 'error',
                })
            })

        // alert(JSON.stringify(model))
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm">
                <DialogTitleWithIconClose onClose={onClose}>
                    {headers.updateStatus}
                </DialogTitleWithIconClose>

                <DialogContent className={classes.dialogCont}>
                    <DialogContentText className={classes.dialogText}>
                        {/* If you want to update this status, please process to create
                    a Memorandum of Contract. */}
                        {updateStatusMessage()}

                        <form noValidate>
                            <div className={classes.showCreate}>
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
                            </div>

                            {confirmWatch && (
                                <>
                                    <Divider style={{ marginBottom: '1.1rem' }} />
                                    <Grid container spacing={2} className={classes.wrapper}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <InputLabel>{fields.service.title}</InputLabel>
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

                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Controller
                                                name="duration"
                                                control={control}
                                                defaultValue={[new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1))]}
                                                render={({ value, onChange }) => (
                                                    <DateRangePickers
                                                        // handleDateRangeChange={handleDurationChange}
                                                        dateRange={value}
                                                        handleDateRangeChange={onChange}
                                                        textFieldVariant="outlined"
                                                    />
                                                )}
                                            />
                                            {/* <InputLabel>Duration *</InputLabel> */}
                                        </Grid>

                                        <Grid item xs={7} sm={6} md={6} lg={6}>
                                            <Controller
                                                name="classNumber"
                                                control={control}
                                                render={({ value, onChange }) => (
                                                    <TextField
                                                        label={fields.classNo.title}
                                                        variant="outlined"
                                                        type="number"
                                                        required
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        InputProps={{
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

                                        <Grid item xs={7} sm={6} md={6} lg={6}>
                                            <Controller
                                                name="studentNumber"
                                                control={control}
                                                render={({ value, onChange }) => (
                                                    <TextField
                                                        label={fields.studentNumber.title}
                                                        variant="outlined"
                                                        type="number"
                                                        required
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        InputProps={{
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

                                        <Grid item xs={7} sm={6} md={6} lg={6}>
                                            <Controller
                                                name="slotNumber"
                                                control={control}
                                                render={({ value, onChange }) => (
                                                    <TextField
                                                        label={fields.slotNumber.title}
                                                        variant="outlined"
                                                        type="number"
                                                        required
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        InputProps={{
                                                            inputProps: { min: 0 },
                                                        }}
                                                    // error={!!errors.slotNumber}
                                                    // helperText={errors?.slotNumber?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={7} sm={6} md={6} lg={6}>
                                            <Controller
                                                name="pricePerSlot"
                                                control={control}
                                                render={({ value, onChange }) => (
                                                    <Grid container>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <TextField
                                                                label={fields.price.title}
                                                                variant="outlined"
                                                                type="number"
                                                                required
                                                                fullWidth
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {fields.price.adornment}
                                                                        </InputAdornment>
                                                                    ),
                                                                    inputProps: { min: 1, max: 5000000 },
                                                                }}
                                                                value={value}
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
                                                                        console.log('suggestedPrice = ', suggestion);
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

                                        <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                                        helperText={
                                                            errors?.note?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </form>
                    </DialogContentText>
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
                                showCreate: false,
                            })
                            onClose()
                            resetStatus()
                        }}
                    >
                        {operations.cancel}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default UpdateSchStatus

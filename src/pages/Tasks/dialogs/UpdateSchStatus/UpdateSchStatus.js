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

import classes from './UpdateSchStatus.module.scss'

const clientSchema = yup.object().shape({
    // duration: yup
    //     .string()
    //     // .trim()
    //     .required('Duartion is required')
    //     .min(1, 'Duartion must be at least 1 digit')
    //     .max(2, 'Duartion must be at most 2 digits')
    //     .matches(DURATION_RGX, 'Invalid entry'),
    note: yup.string().trim(),
})

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

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        // id: memoDets?.id,
        startDate: null,
        endDate: new Date(new Date().getFullYear(), 8, 30),
        serviceType: '',
        note: '',
        classNumber: '',
        showCreate: false,
    }

    const { control, errors, handleSubmit, formState, reset, watch } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const confirmWatch = watch('showCreate')

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

    const [listManagers, setListManagers] = useState([])
    const getListManagers = () => {
        TasksServices.getListManagers().then((res) =>
            setListManagers(res.list)
        )
    }
    useEffect(getListManagers, []);

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
                        content: 'Salesman has just proposed a service.',
                        uid: task?.id,
                        isSeen: false,
                    })
                // })
            })
        }
    }

    const onSubmit = (data) => {
        // console.log('vo ko???');
        const model = {
            ...data,
            taskId: task?.id,
            submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            startDate: data?.duration[0] ? parseDateToString(data?.duration[0], 'YYYY-MM-DD HH:mm:ss') : null,
            endDate: data?.duration[1] ? parseDateToString(data?.duration[1], 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(new Date(new Date().getFullYear(), 8, 30), 'YYYY-MM-DD HH:mm:ss'),
            serviceType: data?.serviceType ? data?.serviceType : '',
            classNumber: parseInt(data?.classNumber ? data?.classNumber : '0', 10),
            pricePerSlot: parseFloat(data?.pricePerSlot ? data?.pricePerSlot : '0.0')
        }
        delete model.showCreate
        delete model.duration

        // getListManagers()
        console.log('listManagers: ', listManagers)

        TasksServices.createServices(model)
            .then((res) => {
                setNotify({
                    isOpen: true,
                    message: 'Proposed a service successfully',
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
                    message: 'Proposed a service failed',
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
                                <Grid container spacing={2} className={classes.wrapper}>
                                    <Grid item xs={5} sm={5} md={5} lg={5}>
                                        <InputLabel>{fields.service.title}</InputLabel>
                                        <Controller
                                            name="serviceType"
                                            control={control}
                                            defaultValue={
                                                fields.service.svc1.value
                                            }
                                            render={({ value, onChange }) => (
                                                <RadioGroup value={value} onChange={onChange}>
                                                    {serviceTypes.map(service => (
                                                        <FormControlLabel
                                                            control={<Radio />}
                                                            label={service}
                                                            value={service}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={7} sm={7} md={7} lg={7}>
                                        <Controller
                                            name="duration"
                                            control={control}
                                            defaultValue={[new Date(), new Date() + 365]}
                                            render={({ value, onChange }) => (
                                                <>
                                                    <InputLabel>Duration *</InputLabel>
                                                    <DateRangePickers
                                                        // handleDateRangeChange={handleDurationChange}
                                                        handleDurationChange={onChange}
                                                    />
                                                </>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={7} sm={6} md={6} lg={6}>
                                        <Controller
                                            name="classNumber"
                                            control={control}
                                            // defaultValue=''
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
                                            name="pricePerSlot"
                                            control={control}
                                            // defaultValue=''
                                            render={({ value, onChange }) => (
                                                <TextField
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
                                                        inputProps: { min: 100000, max: 5000000 },
                                                    }}
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!errors.pricePerSlot}
                                                    helperText={errors?.pricePerSlot ?
                                                        errors?.pricePerSlot?.message
                                                        : fields.price.helper
                                                    }
                                                />
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

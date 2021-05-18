import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
    InputLabel,
} from '@material-ui/core'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Consts } from '../DialogConfig'
import * as TasksServices from '../../TasksServices'
import { DURATION_RGX } from '../../../../utils/Regex'
import { serviceNames, statusNames } from '../../../../constants/Generals'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import { useTask } from '../../hooks/TaskContext';
import { app as FirebaseApp } from '../../../../services/firebase'
import { parseDateToString } from '../../../../utils/DateTimes';
import DateRangePickers from '../../components/DateRangePickers/DateRangePickers';
import classes from './CreateServices.module.scss'

const clientSchema = yup.object().shape({
    // duration: yup
    // .string()
    // .trim()
    // .required('Duartion is required'),
    // .min(1, 'Duartion must be at least 1 digit')
    // .max(2, 'Duartion must be at most 2 digits')
    // .matches(DURATION_RGX, 'Invalid entry'),
    note: yup.string().trim(),
})

function CreateServicesForm(props) {
    const {
        onClose,
        setNotify,
        taskId,
        schoolId,
        // schoolName,
        schoolStatus,
        refreshPage,
    } = props

    const { operations, fields } = Consts

    const { user } = useAuth()
    const { userInfo } = useApp()
    const history = useHistory()
    const { serviceTypes, params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const defaultValues = {
        // id: taskId,
        startDate: null,
        endDate: new Date(new Date().getFullYear(), 8, 30),
        serviceType: '',
        note: '',
        classNumber: ''
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const [listManagers, setListManagers] = useState([])
    const getListManagers = () => {
        TasksServices.getListManagers().then((res) =>
            setListManagers(res.list)
        )
    }
    useEffect(getListManagers, []);

    // useEffect(() => {
    //     TasksServices.getListManagers().then((res) =>
    //         setListManagers(res.list)
    //     )
    //     // return () => setListManagers([])
    // }, [])
    // ko gọi ngoài này nữa vì mỗi lần form này bị re-render, nó sẽ gọi lại API. Chết mất!

    // Coi xem chỗ này còn lỗi ko
    console.log('listManagers: ', listManagers)
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
                        uid: taskId,
                        isSeen: false,
                    })
                // })
            })
        }
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            taskId: taskId,
            submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            startDate: data?.duration[0] ? parseDateToString(data?.duration[0], 'YYYY-MM-DD HH:mm:ss') : null,
            endDate: data?.duration[1] ? parseDateToString(data?.duration[1], 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(new Date(new Date().getFullYear(), 8, 30), 'YYYY-MM-DD HH:mm:ss'),
            serviceType: data?.serviceType ? data?.serviceType : '',
            classNumber: parseInt(data?.classNumber ? data?.classNumber : '0', 10),
            pricePerSlot: parseFloat(data?.pricePerSlot ? data?.pricePerSlot : '0.0')
        }
        delete model.duration

        // getListManagers()
        // TasksServices.getListManagers().then((res) =>
        //     setListManagers(res.list)
        // )

        const updateStatus2Cust = (status) => {
            const statusModel = {
                schoolStatus: statusNames.customer,
            }

            if (status === statusNames.lead) {
                TasksServices.updateStatus(schoolId, statusModel)
                    .then((res) => {
                        setNotify({
                            isOpen: true,
                            message: "Updated School's status successfully",
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
                            message: "Updated School's status failed",
                            type: 'error',
                        })
                    })
            }
        }

        TasksServices.createServices(model)
            .then((res) => {
                updateStatus2Cust(schoolStatus)
                refreshPage(page, limit, column, direction, searchKey, listFilters, user.username)
                // Notify by Snackbars
                setNotify({
                    isOpen: true,
                    message: 'Proposed a service successfully',
                    type: 'success',
                })

                // Send notification by Firebase
                createNotify(data)

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
            <DialogContent className={classes.dialogCont}>
                <form noValidate
                // onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2} className={classes.wrapper}>
                        <Grid item xs={12} sm={10} md={9} lg={9}>
                            <Controller
                                name="duration"
                                control={control}
                                defaultValue={[new Date(), new Date() + 365]}
                                render={({ value, onChange }) => (
                                    <>
                                        <InputLabel>Duration *</InputLabel>
                                        <DateRangePickers
                                            handleDurationChange={onChange}
                                        />
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputLabel>{fields.service.title}</InputLabel>
                            <Controller
                                name="serviceType"
                                control={control}
                                render={({ value, onChange }) => (
                                    <RadioGroup value={value} onChange={onChange} row>
                                        {serviceTypes.map(service => (
                                            <FormControlLabel
                                                key={service}
                                                control={<Radio />}
                                                label={service}
                                                value={service}
                                            />
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={7} md={7} lg={7}>
                            <Controller
                                name="classNumber"
                                control={control}
                                defaultValue={10}
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

                        <Grid item xs={12} sm={7} md={7} lg={7}>
                            <Controller
                                name="pricePerSlot"
                                control={control}
                                defaultValue={100000}
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

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="note"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.note.title}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.note}
                                        helperText={errors?.note?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
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
                        })
                        onClose()
                    }}
                >
                    {operations.cancel}
                </Button>
            </DialogActions>
        </>
    )
}

export default CreateServicesForm

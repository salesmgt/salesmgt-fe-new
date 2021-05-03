import React, { useState, useEffect} from 'react'
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
import * as TargetSchoolsServices from '../../TargetSchoolsServices'
import { DURATION_RGX } from '../../../../utils/Regex'
import { statusNames } from '../../../../constants/Generals'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import { app as FirebaseApp } from '../../../../services/firebase'
import classes from './CreateMOU.module.scss'

const clientSchema = yup.object().shape({
    duration: yup
        .string()
        // .trim()
        .required('Duartion is required')
        .min(1, 'Duartion must be at least 1 digit')
        .max(2, 'Duartion must be at most 2 digits')
        .matches(DURATION_RGX, 'Invalid entry'),
    note: yup.string().trim(),
})

function CreateMOUForm(props) {
    const {
        onClose,
        setNotify,
        targetSchoolId,
        schoolId,
        schoolName,
        schoolStatus,
    } = props

    const { operations, fields } = Consts

    const { user } = useAuth()
    const { userInfo } = useApp()
    const history = useHistory()

    const defaultValues = {
        // id: targetSchoolId,
        duration: '',
        service: fields.service.svc1.value,
        revenueCriteria: fields.revenue.rev1.value,
        note: '',
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })
    
    const [listManagers, setListManagers] = useState([])
    useEffect(() => {
        TargetSchoolsServices.getListManagers().then(res => setListManagers(res.list))
        return () => setListManagers([])
    }, [])

    // Coi xem chỗ này còn lỗi ko
    const createNotify = (value) => {
        console.log('managers: ', targetSchoolId);
        
        if (listManagers && listManagers?.length > 0) {
            new Promise((resolve, reject) => {
                listManagers.map(mng => {
                    console.log('mng: ', mng);

                    const noti = FirebaseApp.database()
                        .ref('notify')
                        .child(mng?.username).push({
                            avatar: userInfo?.avatar ? userInfo?.avatar : '',
                            actor: user?.username,
                            type: 'memorandum',
                            timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            content: 'Salesman has just create MOU.',
                            uid: targetSchoolId,
                            isSeen: false
                        })
                    })
                }
            )
        }
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            targetSchoolId: targetSchoolId,
            date: moment(Date.now()).format('YYYY-MM-DD'),
        }

        const updateStatus2Cust = (status) => {
            const statusModel = {
                schoolStatus: statusNames.customer,
            }

            if (status === statusNames.lead) {
                TargetSchoolsServices.updateStatus(schoolId, statusModel)
                    .then((res) => {
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
        }

        TargetSchoolsServices.createMOU(model)
            .then((res) => {
                updateStatus2Cust(schoolStatus)

                // Notify by Snackbars
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })

                // Send notification by Firebase
                createNotify(data);

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
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })

        // alert(JSON.stringify(model))
    }

    return (
        <>
            <DialogContent className={classes.dialogCont}>
                <form
                    // onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Grid container spacing={2} className={classes.wrapper}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            {/* <Controller
                                    name="id"
                                    control={control}
                                    render={({ value }) => (
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={value}
                                        />
                                    )}
                                /> */}
                            <Controller
                                name="duration"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.duration.title}
                                        variant="outlined"
                                        type="number"
                                        required
                                        fullWidth
                                        autoFocus
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    {fields.duration.adornment}
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                min: 1,
                                                max: 99,
                                            },
                                        }}
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.duration}
                                        helperText={errors?.duration?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputLabel>{fields.service.title}</InputLabel>
                            <Controller
                                name="service"
                                control={control}
                                render={({ value, onChange }) => (
                                    <RadioGroup
                                        value={value}
                                        onChange={onChange}
                                        row
                                    >
                                        <FormControlLabel
                                            label={fields.service.svc1.lb}
                                            value={fields.service.svc1.value}
                                            control={<Radio />}
                                        />
                                        <FormControlLabel
                                            label={fields.service.svc2.lb}
                                            value={fields.service.svc2.value}
                                            control={<Radio />}
                                        />
                                        <FormControlLabel
                                            label={fields.service.svc3.lb}
                                            value={fields.service.svc3.value}
                                            control={<Radio />}
                                        />
                                        <FormControlLabel
                                            label={fields.service.svc4.lb}
                                            value={fields.service.svc4.value}
                                            control={<Radio />}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputLabel>{fields.revenue.title}</InputLabel>
                            <Controller
                                name="revenueCriteria"
                                control={control}
                                render={({ value, onChange }) => (
                                    <RadioGroup
                                        value={value}
                                        onChange={onChange}
                                        row
                                    >
                                        <FormControlLabel
                                            label={fields.revenue.rev1.lb}
                                            value={fields.revenue.rev1.value}
                                            control={<Radio />}
                                        />
                                        <FormControlLabel
                                            label={fields.revenue.rev2.lb}
                                            value={fields.revenue.rev2.value}
                                            control={<Radio />}
                                        />
                                    </RadioGroup>
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
                            duration: '',
                            service: fields.service.svc1.value,
                            revenueCriteria: fields.revenue.rev1.value,
                            note: '',
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

export default CreateMOUForm

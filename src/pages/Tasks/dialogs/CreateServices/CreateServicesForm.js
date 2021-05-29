import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
    InputLabel,
    Typography,
    Tooltip,
    Icon,
    Box,
    OutlinedInput,
    FormHelperText,
    ClickAwayListener,
    FilledInput,
} from '@material-ui/core'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Consts, getCriteriaInfo } from '../DialogConfig'
import * as TasksServices from '../../TasksServices'
import { schoolLevelNames, serviceNames, statusNames } from '../../../../constants/Generals'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import { useTask } from '../../hooks/TaskContext'
import { app as FirebaseApp } from '../../../../services/firebase'
import { parseDateToString } from '../../../../utils/DateTimes';
import { DateRangePickers } from '../../components';
import { suggestPrice } from '../../../../utils/Suggestions';
import { IoInformationCircleSharp } from 'react-icons/io5'
import NumberFormat from 'react-number-format'
import { useSnackbar } from 'notistack'
import classes from './CreateServices.module.scss'

const clientSchema = yup.object().shape({
    // duration: yup
    // .string()
    // .trim()
    // .required('Duartion is required'),
    // .min(1, 'Duartion must be at least 1 digit')
    // .max(2, 'Duartion must be at most 2 digits')
    // .matches(DURATION_RGX, 'Invalid entry'),
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


function CreateServicesForm(props) {
    const {
        onClose,
        // setNotify,
        taskId,
        schoolId,
        schoolLevel,
        schoolStatus,
        refreshPage,
    } = props

    const { operations, fields, messages } = Consts

    const { user } = useAuth()
    const { userInfo } = useApp()

    const { enqueueSnackbar } = useSnackbar()

    const history = useHistory()

    const { serviceTypes, params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [listManagers, setListManagers] = useState([])

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false);
    const [priceSuggestions, setPriceSuggestions] = useState([]);
    const defaultValues = {
        // id: taskId,
        startDate: new Date(),
        endDate: new Date(new Date().getFullYear(new Date().getFullYear() + 1)),
        serviceType: serviceNames.svc1,
        classNumber: 0,
        studentNumber: 0,
        slotNumber: 0,
        pricePerSlot: 100000,
        note: '',
    }
    const { control, errors, handleSubmit, formState, reset, getValues } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const getListManagers = () => {
        TasksServices.getListManagers().then((res) => setListManagers(res.list))
    }
    useEffect(getListManagers, [])

    // useEffect(() => {
    //     TasksServices.getListManagers().then((res) =>
    //         setListManagers(res.list)
    //     )
    //     // return () => setListManagers([])
    // }, [])
    // ko gọi ngoài này nữa vì mỗi lần form này bị re-render, nó sẽ gọi lại API. Chết mất!

    // Coi xem chỗ này còn lỗi ko
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
                        uid: taskId,
                        isSeen: false,
                    })
                // })
            })
        }
    }

    const customiseServiceList = (schoolLevel) => {
        const customServiceTypes = [...serviceTypes]

        if (schoolLevel !== schoolLevelNames.th) {
            customServiceTypes.splice(
                customServiceTypes.indexOf(serviceNames.svc3),
                1
            )
        }
        return customServiceTypes
    }
    const customServiceTypes = customiseServiceList(schoolLevel)

    const onSubmit = (data) => {
        console.log('duration = ', data?.duration);

        const model = {
            ...data,
            taskId: taskId,
            submitDate: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            startDate: data?.duration[0]
                ? parseDateToString(data?.duration[0], 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            endDate: data?.duration[1]
                ? parseDateToString(data?.duration[1], 'YYYY-MM-DD HH:mm:ss')
                : parseDateToString(
                    new Date(new Date().getFullYear(new Date().getFullYear() + 1)),
                    'YYYY-MM-DD HH:mm:ss'
                ),
            serviceType: data?.serviceType ? data?.serviceType : serviceNames.svc1,
            classNumber: parseInt(data?.classNumber ? data?.classNumber : '0', 10),
            studentNumber: parseInt(data?.studentNumber ? data?.studentNumber : '0', 10),
            slotNumber: parseInt(data?.slotNumber ? data?.slotNumber : '0', 10),
            pricePerSlot: parseFloat(data?.pricePerSlot ? data?.pricePerSlot : '0.0'),
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
                        // setNotify({
                        //     isOpen: true,
                        //     message: "Updated School's status successfully",
                        //     type: 'success',
                        // })
                        enqueueSnackbar(messages.updatedSuccess, {
                            variant: 'success',
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
                        // setNotify({
                        //     isOpen: true,
                        //     message: "Updated School's status failed",
                        //     type: 'error',
                        // })
                        enqueueSnackbar(messages.updatedError, {
                            variant: 'error',
                        })
                    })
            }
        }

        TasksServices.createServices(model)
            .then((res) => {
                updateStatus2Cust(schoolStatus)
                refreshPage(
                    page,
                    limit,
                    column,
                    direction,
                    searchKey,
                    listFilters,
                    user.username
                )
                // Notify by Snackbars
                // setNotify({
                //     isOpen: true,
                //     message: 'Proposed a service successfully',
                //     type: 'success',
                // })
                enqueueSnackbar(messages.createdSuccess, {
                    variant: 'success',
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
                // setNotify({
                //     isOpen: true,
                //     message: 'Proposed a service failed',
                //     type: 'error',
                // })
                enqueueSnackbar(messages.createdError, {
                    variant: 'error',
                })
            })

        // alert(JSON.stringify(model))
    }

    const calculateEstimateSales = (pricePerSlot, slotNumber, classNumber) => {
        let estimateSales = currencyFormatter.format(0)

        if ((pricePerSlot * slotNumber * classNumber * 4) > 20000000000) {
            estimateSales = currencyFormatter.format(20000000000);
        } else {
            estimateSales = currencyFormatter.format(pricePerSlot * slotNumber * classNumber * 4)
        }

        return estimateSales
    }

    return (
        <>
            <DialogContent className={classes.dialogCont}>
                <form
                    noValidate
                // onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2} className={classes.wrapper}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
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

                        <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                        helperText={
                                            errors?.classNumber
                                                ? errors?.classNumber?.message
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

                        <Grid item xs={7} sm={6} md={6} lg={6}>
                            <FormControl errors>
                                <Controller
                                    name="pricePerSlot"
                                    control={control}
                                    render={({ value, onChange }) => (<>

                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                {/* <NumberFormat
                                                allowNegative={false}
                                                // suffix="VND/period"
                                                isNumericString={true}
                                                thousandSeparator={true}
                                                value={value}
                                                onValueChange={onChange}
                                                customInput={() => ( */}
                                                {/* <TextField
                                                label={fields.price.title}
                                                variant="outlined"
                                                type="number"
                                                required
                                                // fullWidth
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
                                                error={!!errors.pricePerSlot}
                                                helperText={errors?.pricePerSlot ? */}

                                                <FormControl variant="outlined" required>
                                                    <InputLabel htmlFor="component-disabled">{fields.price.title}</InputLabel>
                                                    <NumberFormat
                                                        {...props}
                                                        id="component-disabled"
                                                        value={value}
                                                        customInput={OutlinedInput}
                                                        // customInput={() => <OutlinedInput {...props} label={fields.price.title} required />}
                                                        // suffix={'₫'}
                                                        isNumericString
                                                        type="text"
                                                        thousandSeparator={'.'}
                                                        decimalSeparator={','}
                                                        onValueChange={({ floatValue: val }) => {
                                                            onChange(val)
                                                            suggestPrice(val, setPriceSuggestions)
                                                        }}
                                                    />
                                                    <FormHelperText className={errors?.pricePerSlot ? classes.helper : classes.normal}>
                                                        {errors?.pricePerSlot ? errors?.pricePerSlot?.message
                                                            : fields.price.helper}
                                                    </FormHelperText>
                                                </FormControl>


                                                {/* <TextField
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
                                            /> */}



                                                {/* <CurrencyInput
                                                decimalsLimit={2}
                                                allowNegativeValue={false}
                                                maxLength={7}
                                                groupSeparator='.'
                                                // intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                                                value={value}
                                                onValueChange={onChange} /> */}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                {priceSuggestions.map((suggestion, index) => (
                                                    <Button variant="outlined" size="small" color="secondary"
                                                        onClick={(e) =>
                                                            onChange(suggestion)
                                                        }
                                                        key={index}
                                                        className={classes.suggestions}
                                                    >
                                                        {new Intl.NumberFormat('vi-VN').format(suggestion)}
                                                    </Button>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </>)}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={7} sm={6} md={6} lg={6}>
                            <Controller
                                name="slotNumber"
                                control={control}
                                render={({ value, onChange }) => (
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField
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
                                                    inputProps: { min: 0, max: 10 }
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
                                                    <span className={classes.txtEstimate}>Estimate sales</span> &nbsp;
                                                <span className={classes.txtRevenue}>
                                                        ≈ {calculateEstimateSales(getValues('pricePerSlot'), getValues('slotNumber'), getValues('classNumber'))}
                                                        {/* ≈ {currencyFormatter.format(getValues('pricePerSlot') * getValues('slotNumber') * getValues('classNumber') * 4)} */}
                                                    </span>
                                                </Typography>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
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

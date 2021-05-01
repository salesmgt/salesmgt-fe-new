import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
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
import { MdClose } from 'react-icons/md'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Snackbars } from '../../../../components'
import { Consts } from '../DialogConfig'
import * as TargetSchoolsServices from '../../TargetSchoolsServices'
import { DURATION_RGX } from '../../../../utils/Regex'
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
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

function MOUForm(props) {
    const { open, onClose, memoDets, setMemoDets, refreshPage } = props
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        id: memoDets?.id,
        duration: memoDets?.duration,
        revenueCriteria: memoDets?.revenueCriteria,
        service: memoDets?.service,
        note: memoDets?.note,
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        reset({
            id: memoDets?.id,
            duration: memoDets?.duration,
            revenueCriteria: memoDets?.revenueCriteria,
            service: memoDets?.service,
            note: memoDets?.note,
        })
    }, [memoDets])

    const onSubmit = (data) => {
        const model = {
            ...data,
            targetSchoolId: memoDets?.targetSchoolId,
            date: moment(Date.now()).format('YYYY-MM-DD'),
        }

        TargetSchoolsServices.createMOU(model)
            .then((res) => {
                // refreshPage(memoDets?.targetSchoolId)
                // setMemoDets(model)
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

        // onClose()
        // alert(JSON.stringify(model))
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs">
                <DialogTitleWithIconClose onClose={onClose}>
                    {headers.createMOU}
                </DialogTitleWithIconClose>

                <DialogContent>
                    <form
                        // onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <Grid container spacing={2} className={classes.wrapper}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                                        {
                                                            fields.duration
                                                                .adornment
                                                        }
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
                                            helperText={
                                                errors?.duration?.message
                                            }
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
                                                value={
                                                    fields.service.svc1.value
                                                }
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label={fields.service.svc2.lb}
                                                value={
                                                    fields.service.svc2.value
                                                }
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label={fields.service.svc3.lb}
                                                value={
                                                    fields.service.svc3.value
                                                }
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label={fields.service.svc4.lb}
                                                value={
                                                    fields.service.svc4.value
                                                }
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
                                                value={
                                                    fields.revenue.rev1.value
                                                }
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label={fields.revenue.rev2.lb}
                                                value={
                                                    fields.revenue.rev2.value
                                                }
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

                <DialogActions>
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
                            // reset({
                            //     errors: false,
                            //     showCreate: false,
                            // })
                            // onClose()
                            // resetStatus()
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

export default MOUForm

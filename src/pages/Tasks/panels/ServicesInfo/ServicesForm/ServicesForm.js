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
    makeStyles,
    InputAdornment,
    InputLabel,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Snackbars } from '../../../../../components'
import { Consts } from '../ServicesInfoConfig'
import * as TasksServices from '../../../TasksServices'
import { useAuth } from '../../../../../hooks/AuthContext'
import { roleNames } from '../../../../../constants/Generals'
import { DURATION_RGX } from '../../../../../utils/Regex'
import classes from './ServicesForm.module.scss'

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

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        '&$disabled': {
            color: 'black',
        },
    },
    disabled: {},
}))

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

function ServicesForm(props) {
    const { open, onClose, memoDets, setMemoDets, refreshPage } = props
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const { user } = useAuth()

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
            // date: moment(memoDets?.date).format('YYYY-MM-DD'),
            date: memoDets?.date,
            taskId: memoDets?.taskId,
        }

        TasksServices.updateMOU(data?.id, model)
            .then((res) => {
                refreshPage(memoDets?.taskId)
                setMemoDets(model)
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

        onClose()
        // alert(JSON.stringify(model))
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs">
                {user.roles[0] === roleNames.salesman ? (
                    <>
                        <DialogTitleWithIconClose onClose={onClose}>
                            {headers.child2}
                        </DialogTitleWithIconClose>

                        <DialogContent className={classes.dialogCont}>
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    className={classes.wrapper}
                                >
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Controller
                                            name="id"
                                            control={control}
                                            render={({ value }) => (
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={value}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="duration"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <TextField
                                                    label={
                                                        fields.duration.title
                                                    }
                                                    variant="outlined"
                                                    type="number"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                {
                                                                    fields
                                                                        .duration
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
                                                        errors?.duration
                                                            ?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputLabel>
                                            {fields.service.title}
                                        </InputLabel>
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
                                                        label={
                                                            fields.service.svc1
                                                                .lb
                                                        }
                                                        value={
                                                            fields.service.svc1
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                    <FormControlLabel
                                                        label={
                                                            fields.service.svc2
                                                                .lb
                                                        }
                                                        value={
                                                            fields.service.svc2
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                    <FormControlLabel
                                                        label={
                                                            fields.service.svc3
                                                                .lb
                                                        }
                                                        value={
                                                            fields.service.svc3
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                    <FormControlLabel
                                                        label={
                                                            fields.service.svc4
                                                                .lb
                                                        }
                                                        value={
                                                            fields.service.svc4
                                                                .value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                </RadioGroup>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputLabel>
                                            {fields.revenue.title}
                                        </InputLabel>
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
                                                    helperText={
                                                        errors?.note?.message
                                                    }
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
                                        id: memoDets?.id,
                                        duration: memoDets?.duration,
                                        revenueCriteria:
                                            memoDets?.revenueCriteria,
                                        service: memoDets?.service,
                                        note: memoDets?.note,
                                    })
                                    onClose()
                                }}
                            >
                                {operations.cancel}
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        <DialogTitleWithIconClose onClose={onClose}>
                            {headers.child2}
                        </DialogTitleWithIconClose>

                        <DialogContent className={classes.dialogCont}>
                            <Grid
                                container
                                spacing={0}
                                className={classes.wrapper}
                            >
                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    className={classes.row}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.duration.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={8}
                                    sm={8}
                                    md={8}
                                    lg={8}
                                    className={classes.row}
                                >
                                    <Typography color="inherit">
                                        {`${memoDets?.duration} ${fields.duration.adornment}`}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    className={classes.row}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.service.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={8}
                                    sm={8}
                                    md={8}
                                    lg={8}
                                    className={classes.row}
                                >
                                    <Typography color="inherit">
                                        {memoDets?.service}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    className={classes.row}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.revenue.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={8}
                                    sm={8}
                                    md={8}
                                    lg={8}
                                    className={classes.row}
                                >
                                    <Typography color="inherit">
                                        {memoDets?.revenueCriteria}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    className={classes.row}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.note.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                // className={classes.rowx}
                                >
                                    <Controller
                                        name="note"
                                        control={control}
                                        render={({ value }) => (
                                            <TextField
                                                // label={fields.note.title}
                                                placeholder={fields.note.noNote}
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={5}
                                                value={value}
                                                disabled
                                                InputProps={{
                                                    classes: {
                                                        root: styles.inputRoot,
                                                        disabled:
                                                            styles.disabled,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </>
                )}
            </Dialog>

            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default ServicesForm

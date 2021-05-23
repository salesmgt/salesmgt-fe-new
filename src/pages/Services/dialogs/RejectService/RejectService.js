import React from 'react'
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
    Grid,
    TextField,
} from '@material-ui/core'
import { rejectServices } from '../../ServicesServices'
import { MdClose } from 'react-icons/md'
import { Consts } from '../DialogConfig'
import classes from './RejectService.module.scss'
import { useHistory } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
});

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

const yupSchema = yup.object().shape({
    reason: yup.string().trim(),
})

function RejectService(props) {
    const { open, onClose, service, refreshPage, setNotify } = props
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const defaultValues = {
        id: service?.id,
        reason: service?.rejectedReason,
    }

    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues: defaultValues,
    })

    const handleReject = (data) => {
        rejectServices(service?.id, data?.reason).then((res) => {
            refreshPage(service?.id)

            setNotify({
                isOpen: true,
                message: 'Rejected service successfully',
                type: 'success',
            })
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
            setNotify({
                isOpen: true,
                message: 'Rejected service failed',
                type: 'error',
            })
        })

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitleWithIconClose onClose={onClose}>{headers.reject}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <form onSubmit={handleSubmit(handleReject)} noValidate >
                <DialogContent>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.rowx}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={4} md={3} lg={3}>
                                    <Typography color="inherit" className={classes.title}>
                                        {fields.serviceType.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8} md={8} lg={8}>
                                    <Typography color="inherit">
                                        {service?.serviceType}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={4} md={3} lg={3}>
                                    <Typography color="inherit" className={classes.title}>
                                        {fields.schoolName.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8} md={8} lg={8}>
                                    <Typography color="inherit">
                                        {service?.educationLevel} {service?.schoolName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                            <Controller
                                name="reason"
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
                                        label={fields.rejectedReason.label}
                                        placeholder={fields.rejectedReason.placeholder}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    {/* </DialogContentText> */}
                </DialogContent>
                {/* <Divider /> */}
                <DialogActions>
                    <Button type="submit" disabled={!formState.isDirty} autoFocus
                        className={classes.btnReject}
                    // onClick={handleReject}
                    >
                        {operations.reject}
                    </Button>
                    <Button onClick={onClose}>
                        {operations.cancel}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default React.memo(RejectService)
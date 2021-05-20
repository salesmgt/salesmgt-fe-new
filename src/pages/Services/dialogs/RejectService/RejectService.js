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
} from '@material-ui/core'
import { rejectServices } from '../../ServicesServices'
import { MdClose } from 'react-icons/md'
import { Consts } from '../DialogConfig'
import classes from './RejectService.module.scss'
import { useHistory } from 'react-router'

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

function RejectService(props) {
    const { open, onClose, service, refreshPage } = props
    const { headers, operations } = Consts

    const history = useHistory()

    const handleReject = (id) => {
        rejectServices(service?.id).then((res) => {
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.confirm}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <form>
                <DialogContent>
                    {/* <DialogContentText className={classes.dialogText}> */}
                    {/* {confirmMessage(service?.educationalLevel, service?.schoolName, service?.date)} */}
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rowx}>
                            <Typography color="inherit" className={classes.title}>
                                {fields.note.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={8} className={classes.rowx}>
                            <Controller
                                name="note"
                                control={noteControl}
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
                    {/* </DialogContentText> */}
                </DialogContent>
                {/* <Divider /> */}
                <DialogActions>
                    <Button type="submit" disabled={!noteState.isDirty} autoFocus
                        className={classes.btnReject}
                        onClick={handleReject}
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
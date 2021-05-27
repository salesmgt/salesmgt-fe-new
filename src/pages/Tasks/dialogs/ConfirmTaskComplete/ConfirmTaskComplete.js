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
import { MdClose } from 'react-icons/md'
import { Consts, confirmTaskCompleteMessage2 } from '../DialogConfig'
import { useHistory } from 'react-router'
import { completeTasks } from '../../TasksServices';
import { useSnackbar } from 'notistack'
import classes from './ConfirmTaskComplete.module.scss'

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

function ConfirmTaskComplete(props) {
    const { open, onClose, refreshPage, taskId } = props
    const { headers, operations } = Consts

    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    const handleCompleteTask = () => {
        completeTasks(taskId).then(res => {
            refreshPage(taskId)
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
            enqueueSnackbar("Updated task's status failed", {
                variant: 'error',
            })
        })

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.confirmCompleteTask}
            </DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmTaskCompleteMessage2()}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnYes} onClick={handleCompleteTask}>
                    {operations.yes}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmTaskComplete)
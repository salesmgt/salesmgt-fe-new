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
import { approveServices } from '../../ServicesServices'
import { MdClose } from 'react-icons/md'
import { Consts, confirmMessage } from '../DialogConfig'
import classes from './ConfirmApprove.module.scss'
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

function ConfirmApprove(props) {
    const { open, onClose, service, refreshPage, setNotify } = props
    const { headers, operations } = Consts

    const history = useHistory()

    const handleApprove = () => {
        approveServices(service?.id).then((res) => {
            refreshPage(service?.id)
            setNotify({
                isOpen: true,
                message: 'Approved service successfully',
                type: 'success',
            })

            // 
            // TasksServices.completeTasks(task?.id).then(res => {
            //     refreshPage(task?.id)

            // }).catch((error) => {
            //     if (error.response) {
            //         console.log(error)
            //         history.push({
            //             pathname: '/errors',
            //             state: { error: error.response.status },
            //         })
            //     }
            //     // setNotify({
            //     //     isOpen: true,
            //     //     message: 'Proposed a service failed',
            //     //     type: 'error',
            //     // })
            //     enqueueSnackbar("Updated task's status failed", {
            //         variant: 'error',
            //     })
            // })
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
                message: 'Approved service failed',
                type: 'error',
            })
        })

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.approve}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmMessage(service?.educationLevel, service?.schoolName, service?.serviceType)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnApprove} onClick={handleApprove} autoFocus>
                    {operations.approve}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmApprove)
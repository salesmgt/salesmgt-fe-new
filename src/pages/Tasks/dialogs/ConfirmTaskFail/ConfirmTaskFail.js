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
import { Consts, confirmTaskFailMessage } from '../DialogConfig'
import { useHistory } from 'react-router'
import classes from './ConfirmTaskFail.module.scss'

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

function ConfirmTaskFail(props) {
    const { open, onClose, refreshPage, setNotify } = props
    const { headers, operations } = Consts

    const history = useHistory()

    const handleUpdateTaskStatus = () => {
        // approveServices(service?.id).then((res) => {
        //     refreshPage(service?.id)
        //     setNotify({
        //         isOpen: true,
        //         message: 'Approved service successfully',
        //         type: 'success',
        //     })
        // }).catch((error) => {
        //     if (error.response) {
        //         console.log(error)
        //         history.push({
        //             pathname: '/errors',
        //             state: { error: error.response.status },
        //         })
        //     }
        //     setNotify({
        //         isOpen: true,
        //         message: 'Approved service failed',
        //         type: 'error',
        //     })
        // })

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.confirmFailTask}
            </DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmTaskFailMessage()}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnYes} onClick={handleUpdateTaskStatus}>
                    {operations.yes}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmTaskFail)
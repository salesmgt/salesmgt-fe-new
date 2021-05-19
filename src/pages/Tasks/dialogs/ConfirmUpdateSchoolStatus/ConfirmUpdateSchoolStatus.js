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
import { MdClose } from 'react-icons/md';
import { Consts, confirmUpdateSchoolStatus } from '../DialogConfig'
import { updateStatus } from '../../TasksServices'
import classes from './ConfirmUpdateSchoolStatus.module.scss'

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

function ConfirmUpdateSchoolStatus(props) {
    const { open, onClose, data, selectedStatus, refreshAPI, setNotify } = props
    const { headers, operations } = Consts

    const allowUpdate = () => {
        updateStatus(data?.schoolId, selectedStatus)
            .then((res) => {
                refreshAPI(data?.id)
                setNotify({
                    isOpen: true,
                    message: "Updated school's status successfully",
                    type: 'success',
                })
                onClose()
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: "Updated school's status failed",
                    type: 'error',
                })
            })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.confirmUpdate}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmUpdateSchoolStatus(data?.level, data?.schoolName, data?.schoolStatus, selectedStatus)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnOK} onClick={allowUpdate} autoFocus>
                    {operations.save}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmUpdateSchoolStatus)
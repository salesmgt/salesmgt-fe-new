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
import { Consts, confirmUnassignMsg } from '../DialogConfig'
import { unassign } from '../../TasksServices'
import { useTask } from '../../hooks/TaskContext'
import classes from './ConfirmUnassign.module.scss'

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

function ConfirmUnassign(props) {
    const { open, onClose, data, refreshAPI, setNotify } = props
    const { headers, operations } = Consts
    const { params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const handleOK = () => {
        unassign(data?.id).then(res => {
            refreshAPI(page, limit, column, direction, searchKey, listFilters);
            setNotify({
                isOpen: true,
                message: 'Unassigned successfully',
                type: 'success'
            })
            onClose();
        }).catch(error => {
            setNotify({
                isOpen: false,
                message: 'Unassigned unsuccessfully',
                type: 'error',
            })
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.confirmUnassign}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmUnassignMsg(data?.fullName, data?.level, data?.schoolName)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnOK} onClick={handleOK} autoFocus>
                    {operations.save}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmUnassign)
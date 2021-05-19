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
import { Consts, confirmMessage } from '../DialogConfig'
import { removeTask } from '../../TasksServices'
import { useTask } from '../../hooks/TaskContext';
import classes from './ConfirmRemove.module.scss'

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

function ConfirmRemove(props) {
    const { open, onClose, data, refreshAPI, setNotify } = props
    const { headers, operations } = Consts
    const { params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const handleRemove = (id) => {
        // Gọi API xóa
        // console.log('Remove task ', id);

        removeTask(id).then((res) => {
            // console.log('res: ', res);
            refreshAPI(page, limit, column, direction, searchKey, listFilters);
            // console.log('xoa thanh cong task ', id);
            setNotify({
                isOpen: true,
                message: 'Removed successfully',
                type: 'success'
            })
            onClose();
        }).catch(error => {
            if (error.response) {
                console.log(error)
                setNotify({
                    isOpen: false,
                    message: 'Removed failed',
                    type: 'error',
                })
            }
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.confirm}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmMessage(data?.level, data?.schoolName, data?.schoolYear)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnRemove} onClick={() => handleRemove(data?.id)} autoFocus>
                    {operations.remove}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmRemove)
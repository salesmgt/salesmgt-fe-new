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
import classes from './NotifyDialog.module.scss'
import { MdClose } from 'react-icons/md';

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

function NotifyDialog(props) {
    const { open, onClose } = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>Notify</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    Please choose schools before creating list of tasks.
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                {/* <Button onClick={onClose}>
                    Cancel
                </Button> */}
                <Button onClick={onClose} autoFocus>
                    OK, I understood
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(NotifyDialog)
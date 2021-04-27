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
import { Consts, cannotMessage } from '../FormConfig'
import classes from './CannotRemove.module.scss'

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

function CannotRemove(props) {
    const { open, onClose, data } = props
    const { headers, operations } = Consts

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.cannot}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {cannotMessage(data?.educationalLevel, data?.schoolName, data?.date, data?.comment?.fullName)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button disableElevation autoFocus onClick={onClose}>
                    {operations.ok}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(CannotRemove)
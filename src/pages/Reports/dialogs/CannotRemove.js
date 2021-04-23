import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Divider,
    withStyles,
    Typography,
    IconButton,
} from '@material-ui/core'
import { parseDateToString } from '../../../utils/DateTimes'
import classes from './CannotRemove.module.scss'
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

function CannotRemove(props) {
    const { open, onClose, data } = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>Cannot Remove</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    <p>
                        You cannot remove the report of school
                        <strong><em> {data?.educationalLevel} {data?.schoolName} </em></strong>
                        on <strong>{parseDateToString(data?.date, 'DD/MM/YYYY')}</strong>.
                    </p>
                    <p>This report is already commented by {data?.comment?.fullName}.</p>
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button variant="contained" disableElevation autoFocus onClick={onClose}>
                    OK, I understood
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(CannotRemove)
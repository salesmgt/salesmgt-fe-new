import React from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Consts } from '../FormConfig'
import AssignMultipleForm from './AssignMultipleForm'
import classes from './AssignMultiple.module.scss'


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

function AssignMultiple(props) {
    const { open, onClose, rows } = props
    const { headers } = Consts

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth component="form" className={classes.dialog}>
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.assignMultiple}
            </DialogTitleWithIconClose>
            <AssignMultipleForm onClose={onClose} rows={rows} />
        </Dialog>
    )
}

export default AssignMultiple
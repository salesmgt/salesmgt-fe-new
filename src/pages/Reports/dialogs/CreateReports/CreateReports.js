import React, { useState} from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Consts } from '../DialogConfig'
import CreateReportsForm from './CreateReportsForm'
import Snackbars from '../../../../components/Snackbars/Snackbars'
import classes from './CreateReports.module.scss'

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
})

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

function CreateReports(props) {
    const { open, onClose, refreshAPI } = props
    const { headers } = Consts

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="lg"
                fullWidth
                // component="form"
                className={classes.dialog}
            >
                <DialogTitleWithIconClose onClose={onClose}>
                    {headers.create}
                </DialogTitleWithIconClose>
                <CreateReportsForm onClose={onClose} refreshAPI={refreshAPI} setNotify={setNotify} />
            </Dialog>

            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default CreateReports

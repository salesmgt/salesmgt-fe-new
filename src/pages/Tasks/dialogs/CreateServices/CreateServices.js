import React from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Consts } from '../DialogConfig'
import CreateServicesForm from './CreateServicesForm'

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
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

function ServicesForm(props) {
    const {
        open,
        onClose,
        refreshPage,
        taskId,
        schoolId,
        schoolName,
        schoolLevel,
        schoolStatus,
        // setNotify,
    } = props
    const { headers } = Consts

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitleWithIconClose onClose={onClose}>
                {`${headers.createServices} ${schoolLevel} ${schoolName}`}
            </DialogTitleWithIconClose>
            <CreateServicesForm
                onClose={onClose}
                // setNotify={setNotify}
                taskId={taskId}
                schoolId={schoolId}
                schoolLevel={schoolLevel}
                schoolStatus={schoolStatus}
                schoolName={schoolName}
                refreshPage={refreshPage}
            />
        </Dialog>
    )
}

export default ServicesForm

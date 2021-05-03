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
import CreateMOUForm from './CreateMOUForm'

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

function MOUForm(props) {
    const {
        open,
        onClose,
        // refreshPage,
        targetSchoolId,
        schoolId,
        schoolName,
        schoolStatus,
        setNotify,
    } = props
    const { headers } = Consts

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs">
            <DialogTitleWithIconClose onClose={onClose}>
                {`${headers.createMOU} ${schoolName}`}
            </DialogTitleWithIconClose>
            <CreateMOUForm
                onClose={onClose}
                setNotify={setNotify}
                targetSchoolId={targetSchoolId}
                schoolId={schoolId}
                schoolStatus={schoolStatus}
                schoolName={schoolName}
            />
        </Dialog>
    )
}

export default MOUForm

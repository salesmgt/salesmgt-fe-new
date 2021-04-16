import React from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Divider,
    Typography,
    withStyles,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { useApp } from '../../../hooks/AppContext'
import CreateAccountForm from '../dialogs/CreateAccountForm'
import { Consts } from '../dialogs/FormConfig'

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

function CreateAccount(props) {
    const { open, onClose } = props

    const { headers } = Consts

    const { roles } = useApp()
    if (!roles) {
        return null
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.child1}
            </DialogTitleWithIconClose>
            <Divider />
            <CreateAccountForm onClose={onClose} roles={roles} />
        </Dialog>
    )
}

export default CreateAccount

import React, { useState } from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Consts } from '../DialogConfig'
import CreateAccountForm from './CreateAccountForm'
import { Snackbars } from '../../../../components'

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
    const { open, onClose, refreshPage } = props

    const { headers } = Consts

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs">
                <DialogTitleWithIconClose onClose={onClose}>
                    {headers.child1}
                </DialogTitleWithIconClose>
                <CreateAccountForm onClose={onClose} setNotify={setNotify} refreshPage={refreshPage} />
            </Dialog>
            
            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default CreateAccount

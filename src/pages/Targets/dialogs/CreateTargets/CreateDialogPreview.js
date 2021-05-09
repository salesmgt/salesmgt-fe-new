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
import CreateReviewDialogForm from './CreateReviewDialogForm';

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
    const { children, classes, onClose, ...other } = props
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

function CreateDialogReview(props) {
    const { open, onClose, rows, setRows, refreshAPI, schoolStatus, schoolYear } = props
    const { headers } = Consts
    const [notify, setNotify] = React.useState({
        isOpen: false,
        message: '',
        type: '',
    })
    return (<>
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth component="form">
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.confirmCreateTarget}
            </DialogTitleWithIconClose>
            <CreateReviewDialogForm 
                onClose={onClose} 
                notify={notify}
                setNotify={setNotify}
                rows={rows} 
                setRows={setRows} 
                refreshAPI={refreshAPI} 
                schoolStatus={schoolStatus}
                schoolYear={schoolYear}
            />
        </Dialog>
       {/* // <Snackbars notify={notify} setNotify={setNotify}/> */}
        </>
    )
}

export default CreateDialogReview
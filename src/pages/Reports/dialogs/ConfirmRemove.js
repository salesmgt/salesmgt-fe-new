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
import { removeReport } from '../ReportsServices'
import { parseDateToString } from '../../../utils/DateTimes'
import classes from './ConfirmRemove.module.scss'
import { useReport } from '../hooks/ReportContext'
import { MdClose } from 'react-icons/md'

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

function ConfirmRemove(props) {
    const { open, onClose, data, refreshAPI } = props
    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const handleRemove = (id) => {
        removeReport(id).then((data) => {
            refreshAPI(page, limit, column, direction, searchKey, listFilters)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                // history.push({
                //     pathname: '/errors',
                //     state: { error: error.response.status },
                // })
            }
        })

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>Confirm Remove</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    <p>
                        Do you really want to remove report of school
                        <strong><em> {data.educationalLevel} {data.schoolName} </em></strong>
                        on <strong>{parseDateToString(data.date, 'DD/MM/YYYY')}</strong>?
                    </p>
                    <p>This process cannot be undone.</p>
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button variant="contained" className={classes.btnRemove} onClick={() => handleRemove(data.id)} autoFocus>
                    Remove
                </Button>
                <Button variant="contained" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmRemove)
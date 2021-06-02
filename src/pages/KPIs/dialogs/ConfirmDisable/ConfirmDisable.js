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
import { disableKPIGroup } from '../../KPIsServices'
import { useKPI } from '../../hooks/KPIContext'
import { MdClose } from 'react-icons/md'
import { Consts, confirmDisableMessage } from '../DialogConfig'
import { useSnackbar } from 'notistack'
import classes from './ConfirmDisable.module.scss'

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

function ConfirmDisable(props) {
    const { open, onClose, kpiGroupId, kpiGroupName, refreshAPI } = props
    const { headers, operations } = Consts
    const { enqueueSnackbar } = useSnackbar()

    const { params } = useKPI()
    const { listFilters, column, direction, searchKey } = params

    const handleDisable = () => {
        disableKPIGroup(kpiGroupId).then((res) => {
            console.log(res);
            enqueueSnackbar('Disable KPI group successfully', { variant: 'success' })

            refreshAPI(column, direction, searchKey, listFilters)
        }).catch((error) => {
            console.log(error)
            if (error.response) {
                // history.push({
                //     pathname: '/errors',
                //     state: { error: error.response.status },
                // })
                enqueueSnackbar('Disable KPI group failed', { variant: 'error' })
            }
        })

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIconClose onClose={onClose}>{headers.disable}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmDisableMessage(kpiGroupName)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnDisable} onClick={handleDisable} autoFocus>
                    {operations.disable}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmDisable)
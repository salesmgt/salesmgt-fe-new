import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Divider,
} from '@material-ui/core'
import classes from './CannotRemove.module.scss'

function CannotRemove(props) {
    const { open, onClose, data } = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Cannot Remove</DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    <p>
                        You cannot remove the report of school
                        <strong><em> {data?.educationalLevel} {data?.schoolName} </em></strong>
                        on <strong>{data?.date}</strong>.
                    </p>
                    <p>This report is already commented by {data?.comment?.fullName}.</p>
                </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant="contained" disableElevation autoFocus onClick={onClose}>
                    OK, I understood
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(CannotRemove)
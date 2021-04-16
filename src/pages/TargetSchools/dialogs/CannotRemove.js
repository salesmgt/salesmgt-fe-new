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
                        You cannot remove
                        <strong><em> {data?.educationalLevel} {data?.schoolName} </em></strong>
                        from list of target schools in <strong>{data?.schoolYear}</strong>.
                    </p>
                    <p>This target school has been assigning to <strong>{data?.fullName}</strong>.</p>
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
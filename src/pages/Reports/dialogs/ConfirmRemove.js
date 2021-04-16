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
import classes from './ConfirmRemove.module.scss'

function ConfirmRemove(props) {
    const { open, onClose, data } = props

    const handleRemove = () => {
        // Gọi API xóa
        console.log('Remove nha');

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Remove</DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    <p>
                        Do you really want to remove report of school
                        <strong><em> {data.educationalLevel} {data.schoolName} </em></strong>
                        on <strong>{data.date}</strong>?
                    </p>
                    <p>This process cannot be undone.</p>
                </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant="contained" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" className={classes.btnRemove} onClick={handleRemove} autoFocus>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmRemove)
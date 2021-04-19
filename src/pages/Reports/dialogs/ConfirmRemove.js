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
import { removeReport, getReports } from '../ReportsServices'
import { parseDateToString } from '../../../utils/ParseDateTime'
import classes from './ConfirmRemove.module.scss'
import { useReport } from '../hooks/ReportContext'

function ConfirmRemove(props) {
    const { open, onClose, data } = props
    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    console.log("Confirm Remove - params: ", params);

    const handleRemove = () => {
        removeReport(data.id).then((data) => {
            console.log('Remove roi nha', data);
            getReports(page, limit, column, direction, searchKey, listFilters)
        })

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
                        on <strong>{parseDateToString(data.date, 'DD/MM/YYYY')}</strong>?
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
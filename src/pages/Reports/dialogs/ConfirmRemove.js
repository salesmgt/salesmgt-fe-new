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
import { removeReport } from '../ReportsServices'
import { parseDateToString } from '../../../utils/DateTimes'
import classes from './ConfirmRemove.module.scss'
import { useReport } from '../hooks/ReportContext'

function ConfirmRemove(props) {
    const { open, onClose, data, refreshAPI } = props
    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    // console.log("Confirm Remove - params: ", params);

    const handleRemove = (id) => {
        // console.log('Vooooooo');
        // console.log('id ne: ', data)
        removeReport(id).then((data) => {
            console.log(`Remove report ${id} roi nha`, data);
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
                <Button variant="contained" className={classes.btnRemove} onClick={() => handleRemove(data.id)} autoFocus>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmRemove)
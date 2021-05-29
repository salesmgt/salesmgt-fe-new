import { Alert } from "@material-ui/lab"

export const Consts = {
    headers: {
        create: 'Create KPI Group',
        confirm: 'Confirm Create KPI Group',
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        yes: 'OK'
    },
    fields: {
        rejectedReason: {
            label: 'Rejected reason',
            placeholder: 'The reason I rejected this service is...?'
        },
    },
}

export const confirmMessage = (groupName) => {
    return (
        <>
            <Alert severity="success">All steps completed.</Alert>
            <br />
            Do you really want to create KPI group <strong><em>{groupName}</em></strong> now?
        </>
    )
}
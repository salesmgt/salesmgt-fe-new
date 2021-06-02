import { Alert } from "@material-ui/lab"

export const Consts = {
    headers: {
        create: 'Create KPI Group',
        confirm: 'Confirm Create KPI Group',
        disable: 'Confirm Disable KPI Group',
        salesmanKPI: "Update Salesman's KPI details",
    },
    operations: {
        disable: 'Disable',
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

export const confirmDisableMessage = (groupName) => {
    return (
        <>
            Do you really want to disable KPI group <strong><em>{groupName}</em></strong> now?
            <br />
            This process cannot be undone.
        </>
    )
}
import { parseDateToString } from "../../../utils/DateTimes"

export const Consts = {
    headers: {
        create: 'Create Target Schools',
        assignMultiple: 'Assign Salesmen to Target Schools',
        assignOne: 'Assign Salesman to Target School',
        confirmUnassign: 'Confirm Unassign',
        confirm: 'Confirm Remove',
        cannot: 'Cannot Remove',
        // child1: 'Preview: '
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        remove: 'Remove',
        ok: 'OK, I understood',
        yes: 'OK'
    },
    fields: {
        pic: {
            name: 'pic',
            label: 'PICs',
        },
        purpose: {
            name: 'purpose',
            label: 'Purposes',
            options: { none: 'None' },
        },
    },
}

export const columns = [
    '#', 'School Name', 'PIC', 'Note', ''
]

export const confirmMessage = (schoolLevel, schoolName, schoolYear) => {
    return (
        <>
            Do you really want to remove
            <strong><em> {schoolLevel} {schoolName} </em></strong>
            from list of target schools in <strong>{schoolYear}</strong>?
            <br />
            This process cannot be undone.
        </>
    )
}

export const confirmUnassignMsg = (PIC, schoolLevel, schoolName) => {
    return (
        <>
            Do you really want to unassign
            <strong> {PIC} </strong> for
            <strong><em> {schoolLevel} {schoolName} </em></strong>?
            <br />
            This process cannot be undone.
        </>
    )
}

export const cannotMessage = (schoolLevel, schoolName, schoolYear, PIC) => {
    return (
        <>
            You cannot remove
            <strong><em> {schoolLevel} {schoolName} </em></strong>
            from list of target schools in <strong>{schoolYear}</strong>.
            <br />
            This target school has been assigning to <strong>{PIC}</strong>.
        </>
    )
}
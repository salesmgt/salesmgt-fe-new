import { parseDateToString } from '../../../utils/DateTimes'

export const Consts = {
    headers: {
        create: 'Create Target Schools',
        assignMultiple: 'Assign Salesmen to Target Schools',
        assignOne: 'Assign Salesman to Target School',
        confirm: 'Confirm Remove',
        cannot: 'Cannot Remove',
        // child1: 'Preview: '
        updateStatus: 'Confirm Update Status',
        createMOU: 'Create MOU',
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        remove: 'Remove',
        ok: 'OK, I understood',
        showCreate: 'Memorandum of Contract',
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

        // For MOU
        duration: {
            title: 'Duaration',
            adornment: 'Month(s)',
        },
        term: {
            title: 'Contract Term',
            titleReq: 'Contract Term *',
        },
        date: {
            tittle: 'Created date:',
        },
        service: {
            title: 'Services',
            svc1: {
                lb: 'ESL',
                value: 'ESL',
            },
            svc2: {
                lb: 'SEL',
                value: 'SEL',
            },
            svc3: {
                lb: 'Toán khoa',
                value: 'Toán khoa',
            },
            svc4: {
                lb: 'Stem',
                value: 'Stem',
            },
        },
        revenue: {
            title: ' Revenue Criteria',
            rev1: {
                lb: 'Học sinh',
                value: 'Học sinh',
            },
            rev2: {
                lb: 'Tiết',
                value: 'Tiết',
            },
        },
        note: {
            title: 'Note',
        },
        // End for MOU
    },
}

export const columns = ['#', 'School Name', 'PIC', 'Purpose', 'Note']

export const confirmMessage = (schoolLevel, schoolName, schoolYear) => {
    return (
        <>
            Do you really want to remove
            <strong>
                <em>
                    {' '}
                    {schoolLevel} {schoolName}{' '}
                </em>
            </strong>
            from list of target schools in <strong>{schoolYear}</strong>?
            <br />
            This process cannot be undone.
        </>
    )
}

export const cannotMessage = (schoolLevel, schoolName, schoolYear, PIC) => {
    return (
        <>
            You cannot remove
            <strong>
                <em>
                    {' '}
                    {schoolLevel} {schoolName}{' '}
                </em>
            </strong>
            from list of target schools in <strong>{schoolYear}</strong>.
            <br />
            This target school has been assigning to <strong>{PIC}</strong>.
        </>
    )
}

export const updateStatusMessage = () => {
    return (
        <>
            If you want to update this status, please process to create a
            <strong>
                {' '}
                <em>Memorandum of Contract</em>
            </strong>
            .
        </>
    )
}

export const Consts = {
    headers: {
        create: 'Create Tasks',
        assign: 'Assign Salesmen to Tasks',
        confirmUnassign: 'Confirm Unassign',
        confirm: 'Confirm Remove',
        cannot: 'Cannot Remove',
        // child1: 'Preview: ',
        updateStatus: 'Confirm Update Status',
        createServices: 'Create Services for',
        confirmCreateTask: 'Confirm Create Tasks'
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        remove: 'Remove',
        ok: 'OK, I understood',
        yes: 'OK',
        showCreate: 'Propose a Service?',
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
    },
    filters: {
        district: {
            title: 'Districts',
        },
        purpose: {
            title: 'Purposes',
        },
        schoolStatus: {
            title: 'School Status',
        },
        schoolType: {
            title: 'School Types',
        },
        schoolLevel: {
            title: 'School Levels',
        },
        // schoolScale: {
        //     title: 'School Scales',
        // },
    },
    fields: {
        purpose: {
            name: 'purpose',
            label: 'Purposes',
            options: { none: 'None' },
        },
        // For Services
        duration: {
            title: 'Duaration',
            // adornment: 'Month(s)',
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
            // svc1: {
            //     lb: 'ESL',
            //     value: 'ESL',
            // },
            // svc2: {
            //     lb: 'SEL',
            //     value: 'SEL',
            // },
            // svc3: {
            //     lb: 'Toán khoa',
            //     value: 'Toán khoa',
            // },
            // svc4: {
            //     lb: 'Stem',
            //     value: 'Stem',
            // },
        },
        // revenue: {
        //     title: ' Revenue Criteria',
        //     rev1: {
        //         lb: 'Học sinh',
        //         value: 'Học sinh',
        //     },
        //     rev2: {
        //         lb: 'Tiết',
        //         value: 'Tiết',
        //     },
        // },
        note: {
            title: 'Note',
        },
        classNo: {
            title: 'No. of applied classes',
            helper: 'The minimum number of classes is 1, maximum is 100'
        },
        price: {
            title: 'Price floor',
            adornment: 'VND/period(s)',
            helper: 'The lowest accepted value is 100.000 VND, maximum is 5.000.000 VND'
        },
        // End for Services
    },
    messages: {
        notFound: 'No records found.',
    }
}

export const columns = ['#', 'School Name', 'PIC', 'Note', '']

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
            from list of tasks in <strong>{schoolYear}</strong>?
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
            <strong>
                <em>
                    {' '}
                    {schoolLevel} {schoolName}{' '}
                </em>
            </strong>
            ?
            <br /><br />
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
            from list of tasks in <strong>{schoolYear}</strong>.
            <br />
            This task has been assigning to <strong>{PIC}</strong>.
        </>
    )
}
export const updateStatusMessage = () => {
    return (
        <>
            If you want to update this status, please propose a
            <strong><em> Service</em></strong> in the form below.
        </>
    )
}
export const schoolYearSubTitle = (schoolYear) => {
    return (
        <>
            <b><i>School Year: </i></b>&nbsp;{schoolYear}
        </>
    )
}
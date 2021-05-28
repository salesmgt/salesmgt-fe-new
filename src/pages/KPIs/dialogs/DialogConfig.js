export const Consts = {
    headers: {
        create: 'Create KPI Group',
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
    },
    fields: {
        rejectedReason: {
            label: 'Rejected reason',
            placeholder: 'The reason I rejected this service is...?'
        },
    },
}

export const confirmMessage = (schoolLevel, schoolName, serviceType) => {
    return (
        <>
            Do you really want to approve service <strong>{serviceType}</strong> of school
            <strong><em> {schoolLevel} {schoolName} </em></strong>?
            <br />
            This process cannot be undone.
        </>
    )
}
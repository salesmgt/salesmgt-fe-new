export const Consts = {
    headers: {
        reject: 'Confirm Reject Service',
        approve: 'Confirm Approve Service',
    },
    operations: {
        cancel: 'Cancel',
        reject: 'Reject',
        approve: 'Approve',
    },
    fields: {
        rejectedReason: {
            label: 'Rejected reason',
            placeholder: 'The reason I rejected this service is...?'
        },
        serviceType: {
            title: 'Service type',
        },
        schoolName: {
            title: 'School name',
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
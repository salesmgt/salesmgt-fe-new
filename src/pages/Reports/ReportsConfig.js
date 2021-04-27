export const columns = [
    // { key: "checkbox", name: '', sortable: false },
    // { key: "no", name: 'No', sortable: false },
    { key: 'date', name: 'Date', sortable: true },
    { key: 'schoolName', name: 'School Name', sortable: true }, // SchoolName - primary, District - secondary
    { key: 'fullName', name: 'PIC', sortable: true },
    { key: 'targetPurposeName', name: 'Purpose', sortable: true }, // Purpose - primary
    { key: 'result', name: 'Result', sortable: false },
    { key: 'description', name: 'Description', sortable: false }, // truncate 30 kí tự thôi
    // { key: "comment", name: 'Comment', sortable: false }, // truncate 30 kí tự thôi
    { key: '', name: '', sortable: false },
]

export const rpConsts = {
    linkNames: {
        back: 'Reports',
    },
    tabNames: {
        tab1: 'Report Info',
        tab2: 'Assign Info',
    },
}

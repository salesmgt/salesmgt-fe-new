import { parseDateToString } from "../../../utils/DateTimes"

export const Consts = {
    headers: {
        create: 'Create Reports',
        comment: 'Comment on Report',
        confirm: 'Confirm Remove',
        cannot: 'Cannot Remove',
        child1: 'Preview:'
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        remove: 'Remove',
        ok: 'OK, I understood',
    },
    fields: {
        schoolName: {
            name: 'targetName',
            label: 'Target School Name',
        },
        level: {
            name: 'level',
        },
        id: {
            name: 'targetId',
        },
        result: {
            name: 'result',
            label: 'Result',
        },
        description: {
            name: 'description',
            label: 'Description',
        },
        positivity: {
            name: 'positivity',
            label: 'Positivity',
        },
        difficulty: {
            name: 'difficulty',
            label: 'Difficulty',
        },
        futurePlan: {
            name: 'futurePlan',
            label: 'Future Plan',
        },
    },
}

export const columns = [
    '#', 'School Name', 'Result', 'Description', ''
]

// Form "Create Reports" keys
export const RESULT = 'result'
export const DESCRIPTION = 'description'
export const POSITIVITY = 'positivity'
export const DIFFICULTY = 'difficulty'
export const FUTURE_PLAN = 'futurePlan'

export const confirmMessage = (schoolLevel, schoolName, date) => {
    return (
        <>
            Do you really want to remove report of school
            <strong><em> {schoolLevel} {schoolName} </em></strong>
            on <strong>{parseDateToString(date, 'DD/MM/YYYY')}</strong>?
            <br />
            This process cannot be undone.
        </>
    )
}

export const cannotMessage = (schoolLevel, schoolName, date, commentedPerson) => {
    return (
        <>
            You cannot remove the report of school
            <strong><em> {schoolLevel} {schoolName} </em></strong>
            on <strong>{parseDateToString(date, 'DD/MM/YYYY')}</strong>.
            <br />
            This report is already commented by <strong>{commentedPerson}</strong>.
        </>
    )
}
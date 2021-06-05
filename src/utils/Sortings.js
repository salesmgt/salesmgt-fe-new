import { statusNames } from '../constants/Generals'

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

export function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy)
}

export function getPurpsByStatus(schStatus, salesPurps) {
    const purps = salesPurps

    switch (schStatus) {
        case statusNames.lead:
            return [purps[0]]
        case statusNames.customer:
            return [purps[1], purps[2], purps[3]]
        case statusNames.pending:
        default:
            return purps
    }
}

export function handleMatchPurps(currPurp, purps) {
    const matchValues = purps.find((purp) => purp === currPurp)

    return !!matchValues
}

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
            return [purps[0], purps[1], purps[2]]
        case statusNames.customer:
            return [purps[3], purps[4], purps[5]]
        case statusNames.pending:
            return purps
        default:
            break
    }
}

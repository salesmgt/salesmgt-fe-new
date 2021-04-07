import * as Actions from './reducer-action-type'

export const ReportReducer = (params, action) => {
    const { type, payload } = action
    const { listFilters } = params
    let newListFilters = {};

    switch (type) {
        case Actions.FILTER_PIC:
            return { ...params, page: 0, listFilters: { ...listFilters, PIC: payload } }
        case Actions.FILTER_DISTRICT:
            return { ...params, page: 0, listFilters: { ...listFilters, district: payload } }
        case Actions.FILTER_SCHOOL_YEAR:
            return { ...params, page: 0, listFilters: { ...listFilters, schoolYear: payload } }
        case Actions.FILTER_SCHOOL_STATUS:
            return { ...params, page: 0, listFilters: { ...listFilters, status: payload } }
        case Actions.FILTER_PURPOSE:
            return { ...params, page: 0, listFilters: { ...listFilters, purpose: payload } }
        case Actions.FILTER_DATE_RANGE:
            return { ...params, page: 0, listFilters: { ...listFilters, dateRange: payload } }
        // case Actions.FILTER_FROM_DATE:
        //     newListFilters = {
        //         ...listFilters,
        //         fromDate: payload.fromDate,
        //         dateRange: payload.dateRange
        //     }
        //     return { ...params, page: 0, listFilters: newListFilters }
        // case Actions.FILTER_TO_DATE:
        //     newListFilters = {
        //         ...listFilters,
        //         toDate: payload.toDate,
        //         dateRange: payload.dateRange
        //     }
        //     return { ...params, page: 0, listFilters: newListFilters }

        case Actions.ENTER_SEARCH_KEYWORD:
            return { ...params, page: 0, searchKey: payload }

        case Actions.SORT_BY:
            return { ...params, column: payload.column, direction: payload.direction }

        case Actions.CHANGE_PAGE:
            return { ...params, page: payload.page, limit: payload.limit }

        default:
            return params
    }
}
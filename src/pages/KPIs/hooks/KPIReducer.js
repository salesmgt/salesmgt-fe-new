import * as Actions from '../../../constants/ActionTypes'

export const KPIReducer = (params, action) => {
    const { type, payload } = action
    const { listFilters } = params

    switch (type) {
        case Actions.FILTER_KPI_STATUS:
            return { ...params, page: 0, listFilters: { ...listFilters, status: payload } }
        // case Actions.FILTER_SCHOOL_YEAR:    // ko chắc là schoolYear hay year
        //     return { ...params, page: 0, listFilters: { ...listFilters, schoolYear: payload } }

        case Actions.ENTER_SEARCH_KEYWORD:
            return { ...params, page: 0, searchKey: payload }

        case Actions.SORT_BY:
            return { ...params, column: payload.column, direction: payload.direction }

        default:
            return params
    }
}
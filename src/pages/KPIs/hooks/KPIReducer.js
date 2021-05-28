import * as Actions from '../../../constants/ActionTypes'

export const KPIReducer = (params, action) => {
    const { type, payload } = action
    const { listFilters } = params

    switch (type) {
        case Actions.FILTER_ACTIVE:
            return { ...params, page: 0, listFilters: { ...listFilters, isActive: payload } }
        case Actions.FILTER_SCHOOL_YEAR:    // ko chắc là schoolYear hay year
            return { ...params, page: 0, listFilters: { ...listFilters, schoolYear: payload } }

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
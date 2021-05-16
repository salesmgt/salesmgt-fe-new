import * as Actions from '../../../constants/ActionTypes'

export const ServiceReducer = (params, action) => {
    const { type, payload } = action
    const { listFilters } = params

    switch (type) {
        case Actions.FILTER_SERVICE_STATUS:
            return { ...params, page: 0, listFilters: { ...listFilters, serviceStatus: payload } }
        case Actions.FILTER_SERVICE_TYPE:
            return { ...params, page: 0, listFilters: { ...listFilters, serviceType: payload } }
        case Actions.FILTER_SCHOOL_YEAR:
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
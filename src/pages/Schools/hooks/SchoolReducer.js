import * as Actions from '../../../hooks/reducer-action-type'

export const SchoolReducer = (params, action) => {
    const { type, payload } = action
    const { listFilters } = params

    switch (type) {
        case Actions.FILTER_DISTRICT:
            return { ...params, page: 0, listFilters: { ...listFilters, district: payload } }
        case Actions.FILTER_SCHOOL_TYPE:
            return { ...params, page: 0, listFilters: { ...listFilters, type: payload } }
        case Actions.FILTER_SCHOOL_LEVEL:
            return { ...params, page: 0, listFilters: { ...listFilters, level: payload } }
        case Actions.FILTER_SCHOOL_SCALE:
            return { ...params, page: 0, listFilters: { ...listFilters, scale: payload } }
        case Actions.FILTER_SCHOOL_STATUS:
            return { ...params, page: 0, listFilters: { ...listFilters, status: payload } }
        case Actions.FILTER_ACTIVE:
            return {
                ...params, page: 0, listFilters: { ...listFilters, isActive: payload }
            }

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
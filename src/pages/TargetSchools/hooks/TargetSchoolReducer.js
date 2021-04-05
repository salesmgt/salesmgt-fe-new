import * as Actions from './reducer-action-type'

export const TargetSchoolReducer = (params, action) => {
    // const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])
    const { type, payload } = action
    const { listFilters } = params    // , searchKey, sorting, paging
    // const { filterType, filterValue } = payload  // paramName, paramValue, columnName, direction, page, limit

    switch (type) {
        case Actions.FILTER_SCHOOL_YEAR:
            // listFilters = { ...listFilters, schoolYear: payload }
            return { ...params, page: 0, listFilters: { ...listFilters, schoolYear: payload } }
        case Actions.FILTER_DISTRICT:
            console.log('district payload: ', payload);
            return { ...params, page: 0, listFilters: { ...listFilters, district: payload } }
        case Actions.FILTER_SCHOOL_TYPE:
            return { ...params, page: 0, listFilters: { ...listFilters, type: payload } }
        case Actions.FILTER_SCHOOL_LEVEL:
            return { ...params, page: 0, listFilters: { ...listFilters, level: payload } }
        case Actions.FILTER_SCHOOL_SCALE:
            return { ...params, page: 0, listFilters: { ...listFilters, scale: payload } }
        case Actions.FILTER_PIC:
            return { ...params, page: 0, listFilters: { ...listFilters, PIC: payload } }
        case Actions.FILTER_PURPOSE:
            return { ...params, page: 0, listFilters: { ...listFilters, purpose: payload } }

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
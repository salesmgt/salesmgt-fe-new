import React, {
    useState,
    useContext,
    createContext,
    useReducer,
} from 'react'
import { SchoolReducer } from './SchoolReducer'
import {
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    SCALE_FILTER,
    STATUS_FILTER,
    ACTIVE_FILTER
} from '../../../constants/Filters'
// import * as FiltersServices from '../../../services/FiltersServices'
// import { useHistory } from 'react-router-dom'

const SchoolContext = createContext()

export function useSchool() {
    return useContext(SchoolContext)
}

let defaultFilters = {
    district: { filterType: DISTRICT_FILTER, filterValue: '' },
    type: { filterType: TYPE_FILTER, filterValue: '' },
    level: { filterType: LEVEL_FILTER, filterValue: '' },
    scale: { filterType: SCALE_FILTER, filterValue: '' },
    status: { filterType: STATUS_FILTER, filterValue: '' },
    isActive: { filterType: ACTIVE_FILTER, filterValue: null },
}

function useSchoolProvider() {
    // const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(SchoolReducer, {
        listFilters: defaultFilters,
        searchKey: '',
        page: 0,
        limit: 10,
        column: 'id',
        direction: 'asc',
    })

    // Paging
    const [page, setPage] = useState(params.page)
    const [limit, setLimit] = useState(params.limit)

    // Sorting
    const [column, setColumn] = useState(params.column)
    const [direction, setDirection] = useState(params.direction)

    //Filters
    const [district, setDistrict] = useState(
        defaultFilters.district.filterValue
            ? defaultFilters.district.filterValue
            : ''
    )
    const [schoolType, setSchoolType] = useState(
        defaultFilters.type.filterValue ? defaultFilters.type.filterValue : ''
    )
    const [schoolLevel, setSchoolLevel] = useState(
        defaultFilters.level.filterValue ? defaultFilters.level.filterValue : ''
    )
    const [schoolScale, setSchoolScale] = useState(
        defaultFilters.scale.filterValue ? defaultFilters.scale.filterValue : ''
    )
    const [schoolStatus, setSchoolStatus] = useState(
        defaultFilters.status.filterValue
            ? defaultFilters.status.filterValue
            : ''
    )
    const [isActive, setIsActive] = useState(
        defaultFilters.isActive.filterValue
            ? defaultFilters.isActive.filterValue
            : null
    )

    const workingStatuses = [null, true, false];

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
            case DISTRICT_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    district: {
                        filterType: DISTRICT_FILTER,
                        filterValue: value,
                    },
                }
                setDistrict(value)
                break
            case TYPE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    type: { filterType: TYPE_FILTER, filterValue: value },
                }
                setSchoolType(value)
                break
            case LEVEL_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    level: { filterType: LEVEL_FILTER, filterValue: value },
                }
                setSchoolLevel(value)
                break
            case SCALE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    scale: { filterType: SCALE_FILTER, filterValue: value },
                }
                setSchoolScale(value)
                break
            case STATUS_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    status: { filterType: STATUS_FILTER, filterValue: value },
                }
                setSchoolStatus(value)
                break
            case ACTIVE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    isActive: { filterType: ACTIVE_FILTER, filterValue: value },
                }
                setIsActive(value)
                break
            default:
                break
        }
    }

    // APIs "get filters' data" moves to AppContext

    // Search field (do not have)

    return {
        params,
        dispatchParams,
        page,
        setPage,
        limit,
        setLimit,
        direction,
        setDirection,
        column,
        setColumn,
        district,
        schoolType,
        schoolLevel,
        schoolScale,
        schoolStatus,
        isActive,
        workingStatuses,
        setFilter,
    }
}

function SchoolProvider(props) {
    const { children } = props
    const school = useSchoolProvider()

    return (
        <SchoolContext.Provider value={school}>
            {children}
        </SchoolContext.Provider>
    )
}

export default SchoolProvider

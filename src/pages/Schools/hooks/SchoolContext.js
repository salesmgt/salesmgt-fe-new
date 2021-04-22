import React, {
    useState,
    useContext,
    createContext,
    // useEffect,
    useReducer,
} from 'react'
import { SchoolReducer } from './SchoolReducer'
import {
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    SCALE_FILTER,
    STATUS_FILTER,
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
}

function useSchoolProvider() {
    // const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(SchoolReducer, {
        // listFilters: {
        //     district: { filterType: 'district', filterValue: '' },
        //     type: { filterType: 'type', filterValue: '' },
        //     level: { filterType: 'level', filterValue: '' },
        //     scale: { filterType: 'scale', filterValue: '' },
        //     status: { filterType: 'status', filterValue: '' },
        // },
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
    // const [district, setDistrict] = useState('')
    // const [schoolType, setSchoolType] = useState('')
    // const [schoolLevel, setSchoolLevel] = useState('')
    // const [schoolScale, setSchoolScale] = useState('')
    // const [schoolStatus, setSchoolStatus] = useState('')

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
            default:
                break
        }
    }

    // // APIs
    // const [districts, setDistricts] = useState([])
    // const [schoolTypes, setSchoolTypes] = useState([])
    // const [schoolLevels, setSchoolLevels] = useState([])
    // const [schoolScales, setSchoolScales] = useState([])
    // const [schoolStatuses, setSchoolStatuses] = useState([])

    // // Search field (do not have)

    // // Get filters' data
    // const getDistrictsFilter = () => {
    //     FiltersServices.getDistricts()
    //         .then((data) => {
    //             setDistricts(data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // const getSchoolTypesFilter = () => {
    //     FiltersServices.getSchoolTypes()
    //         .then((data) => {
    //             setSchoolTypes(data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // const getSchoolLevelsFilter = () => {
    //     FiltersServices.getEducationalLevels()
    //         .then((data) => {
    //             setSchoolLevels(data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // const getSchoolScalesFilter = () => {
    //     FiltersServices.getSchoolScales()
    //         .then((data) => {
    //             setSchoolScales(data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // const getSchoolStatusesFilter = () => {
    //     FiltersServices.getSchoolStatuses()
    //         .then((data) => {
    //             setSchoolStatuses(data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // useEffect(() => {
    //     getDistrictsFilter()
    //     getSchoolTypesFilter()
    //     getSchoolLevelsFilter()
    //     getSchoolScalesFilter()
    //     getSchoolStatusesFilter()
    // }, [])

    return {
        params,
        dispatchParams,
        // districts,
        // schoolTypes,
        // schoolLevels,
        // schoolScales,
        // schoolStatuses,
        page,
        setPage,
        limit,
        setLimit,
        direction,
        setDirection,
        column,
        setColumn,
        district,
        // setDistrict,
        schoolType,
        // setSchoolType,
        schoolLevel,
        // setSchoolLevel,
        schoolScale,
        // setSchoolScale,
        schoolStatus,
        // setSchoolStatus,
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

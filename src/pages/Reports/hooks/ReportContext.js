import React, {
    useState,
    useContext,
    createContext,
    useEffect,
    useReducer,
} from 'react'
import * as FiltersServices from '../../../services/FiltersServices'
import { useHistory } from 'react-router-dom'
import { ReportReducer } from './ReportReducer'
import {
    PIC_FILTER,
    DISTRICT_FILTER,
    SCHOOL_YEAR_FILTER,
    STATUS_FILTER,
    PURPOSE_FILTER,
    DATE_RANGE_FILTER,
} from '../components/Filters/FilterConsts'

const ReportContext = createContext()

export function useReport() {
    return useContext(ReportContext)
}

let defaultFilters = {
    PIC: { filterType: PIC_FILTER, filterValue: null },
    district: { filterType: DISTRICT_FILTER, filterValue: '' },
    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
    status: { filterType: STATUS_FILTER, filterValue: '' },
    purpose: { filterType: PURPOSE_FILTER, filterValue: '' },
    dateRange: { filterType: DATE_RANGE_FILTER, filterValue: [null, null] },
}

function useReportProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(ReportReducer, {
        // listFilters: {
        //     PIC: { filterType: 'PIC', filterValue: null },
        //     district: { filterType: 'district', filterValue: '' },
        //     schoolYear: { filterType: 'schoolYear', filterValue: '' },
        //     status: { filterType: 'status', filterValue: '' },
        //     purpose: { filterType: 'purpose', filterValue: '' },
        //     // fromDate: { filterType: 'fromDate', filterValue: null },
        //     // toDate: { filterType: 'toDate', filterValue: null },
        // dateRange: { filterType: 'dateRange', filterValue: [null, null] },
        // },
        listFilters: defaultFilters,
        searchKey: '',
        page: 0,
        limit: 25,
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
    // const [PIC, setPIC] = useState(null)
    // const [district, setDistrict] = useState('')
    // const [schoolYear, setSchoolYear] = useState('')
    // const [purpose, setPurpose] = useState('')
    // const [schoolStatus, setSchoolStatus] = useState('')
    const [dateRange, setDateRange] = useState([null, null])
    // const [fromDate, setFromDate] = useState((new Date()).getDate() - 7);
    // const [toDate, setToDate] = useState((new Date()).getDate());

    const [PIC, setPIC] = useState(
        defaultFilters.PIC.filterValue ? defaultFilters.PIC.filterValue : null
    )
    const [district, setDistrict] = useState(
        defaultFilters.district.filterValue
            ? defaultFilters.district.filterValue
            : ''
    )
    const [schoolYear, setSchoolYear] = useState(
        defaultFilters.schoolYear.filterValue
            ? defaultFilters.schoolYear.filterValue
            : ''
    )
    const [purpose, setPurpose] = useState(
        defaultFilters.purpose.filterValue
            ? defaultFilters.purpose.filterValue
            : ''
    )
    const [schoolStatus, setSchoolStatus] = useState(
        defaultFilters.status.filterValue
            ? defaultFilters.status.filterValue
            : ''
    )
    // const [dateRange, setDateRange] = useState(
    //     defaultFilters.dateRange.filterValue
    //         ? defaultFilters.dateRange.filterValue
    //         : [null, null]
    // )

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
            case PIC_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    district: {
                        filterType: PIC_FILTER,
                        filterValue: value,
                    },
                }
                setPIC(value)
                break
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
            case SCHOOL_YEAR_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    level: {
                        filterType: SCHOOL_YEAR_FILTER,
                        filterValue: value,
                    },
                }
                setSchoolYear(value)
                break
            case PURPOSE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    scale: { filterType: PURPOSE_FILTER, filterValue: value },
                }
                setPurpose(value)
                break
            case STATUS_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    status: { filterType: STATUS_FILTER, filterValue: value },
                }
                setSchoolStatus(value)
                break
            // case DATE_RANGE_FILTER:
            //     defaultFilters = {
            //         ...defaultFilters,
            //         status: {
            //             filterType: DATE_RANGE_FILTER,
            //             filterValue: value,
            //         },
            //     }
            //     setDateRange(value)
            //     break
            default:
                throw new Error()
        }
    }

    // APIs
    const [PICs, setPICs] = useState([])
    // const [districts, setDistricts] = useState([])
    const [schoolYears, setSchoolYears] = useState([])
    // const [schoolStatuses, setSchoolStatuses] = useState([])

    // Search field (do not have)

    // Get filters' data
    const getPICsFilter = () => {
        FiltersServices.getPICs()
            .then((data) => {
                setPICs(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

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

    const getSchoolYearsFilter = () => {
        FiltersServices.getSchoolYears()
            .then((data) => {
                setSchoolYears(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

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

    useEffect(() => {
        getPICsFilter()
        // getDistrictsFilter()
        getSchoolYearsFilter()
        // getSchoolStatusesFilter()
    }, [])

    return {
        params,
        dispatchParams,
        PICs,
        // districts,
        schoolYears,
        // schoolStatuses,
        page,
        setPage,
        limit,
        setLimit,
        direction,
        setDirection,
        column,
        setColumn,
        PIC,
        // setPIC,
        district,
        // setDistrict,
        schoolYear,
        // setSchoolYear,
        purpose,
        // setPurpose,
        schoolStatus,
        // setSchoolStatus,
        dateRange,
        setDateRange,
        setFilter,
        // fromDate, setFromDate, toDate, setToDate
    }
}

function ReportProvider(props) {
    const { children } = props
    const report = useReportProvider()

    return (
        <ReportContext.Provider value={report}>
            {children}
        </ReportContext.Provider>
    )
}

export default ReportProvider

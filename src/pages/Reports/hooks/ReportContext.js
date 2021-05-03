import React, {
    useState,
    useContext,
    createContext,
    useEffect,
    useReducer,
} from 'react'
import { getPICs } from '../../../services/FiltersServices'
import { useHistory } from 'react-router-dom'
import { ReportReducer } from './ReportReducer'
import {
    PIC_FILTER,
    DISTRICT_FILTER,
    SCHOOL_YEAR_FILTER,
    // STATUS_FILTER,
    PURPOSE_FILTER,
    DATE_RANGE_FILTER,
} from '../../../constants/Filters'
import { roleNames } from '../../../constants/Generals'

const ReportContext = createContext()

export function useReport() {
    return useContext(ReportContext)
}

let defaultFilters = {
    PIC: { filterType: PIC_FILTER, filterValue: null },
    district: { filterType: DISTRICT_FILTER, filterValue: '' },
    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
    // status: { filterType: STATUS_FILTER, filterValue: '' },
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
        limit: 10,
        column: 'date',
        direction: 'desc',
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
    // const [dateRange, setDateRange] = useState([null, null])
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
    // const [schoolStatus, setSchoolStatus] = useState(
    //     defaultFilters.status.filterValue
    //         ? defaultFilters.status.filterValue
    //         : ''
    // )
    const [dateRange, setDateRange] = useState(
        defaultFilters.dateRange.filterValue[0]
            ? defaultFilters.dateRange.filterValue
            : [null, null]
    )

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
            case PIC_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    PIC: {
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
                    schoolYear: {
                        filterType: SCHOOL_YEAR_FILTER,
                        filterValue: value,
                    },
                }
                setSchoolYear(value)
                break
            case PURPOSE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    purpose: {
                        filterType: PURPOSE_FILTER,
                        filterValue: value,
                    },
                }
                setPurpose(value)
                break
            // case STATUS_FILTER:
            //     defaultFilters = {
            //         ...defaultFilters,
            //         status: { filterType: STATUS_FILTER, filterValue: value },
            //     }
            //     setSchoolStatus(value)
            //     break
            case DATE_RANGE_FILTER:
                // console.log('DATE_RANGE_FILTER - value = ', value);
                defaultFilters = {
                    ...defaultFilters,
                    dateRange: {
                        filterType: DATE_RANGE_FILTER,
                        filterValue: value,
                    },
                }
                setDateRange(value)
                break
            default:
                break
        }
    }

    // APIs
    const [PICs, setPICs] = useState([])
    // const [districts, setDistricts] = useState([])
    // const [schoolYears, setSchoolYears] = useState([])
    // const [schoolStatuses, setSchoolStatuses] = useState([])

    // Search field (do not have)

    // Get filters' data
    
    const getListPICs = (fullName) => {
        getPICs({active: true, fullName: fullName, role: roleNames.salesman}).then((data) => {
            // console.log('list PICs: ', data)
            setPICs(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }
    useEffect(() => {
        getListPICs()
        return () => setPICs([])
    }, [])

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

    // const getSchoolYearsFilter = () => {
    //     FiltersServices.getSchoolYears()
    //         .then((data) => {
    //             setSchoolYears(data)
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
    //     getPICsFilter()
        // getDistrictsFilter()
        // getSchoolYearsFilter()
        // getSchoolStatusesFilter()
    // }, [])

    return {
        params,
        dispatchParams,
        PICs,
        // districts,
        // schoolYears,
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
        // schoolStatus,
        // setSchoolStatus,
        dateRange,
        // setDateRange,
        setFilter,
        getListPICs,
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

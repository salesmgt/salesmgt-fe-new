import React, {
    useState,
    useContext,
    createContext,
    useReducer,
    useEffect,
} from 'react'
import { ServiceReducer } from './ServiceReducer'
import {
    SERVICE_STATUS_FILTER,
    SERVICE_TYPE_FILTER,
    PIC_FILTER,
    SCHOOL_YEAR_FILTER,
    EXPIRED_FILTER,
    DATE_RANGE_FILTER
} from '../../../constants/Filters'
import { useHistory } from 'react-router-dom'
import { getServiceTypes } from '../ServicesServices'
import { getPICs } from '../../../services/FiltersServices'
import { roleNames } from '../../../constants/Generals'

const ServiceContext = createContext()

export function useService() {
    return useContext(ServiceContext)
}

let defaultFilters = {
    serviceStatus: { filterType: SERVICE_STATUS_FILTER, filterValue: '' },  // pending, approved, rejected
    serviceType: { filterType: SERVICE_TYPE_FILTER, filterValue: '' },
    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
    isExpired: { filterType: EXPIRED_FILTER, filterValue: null },
    dateRange: { filterType: DATE_RANGE_FILTER, filterValue: [null, null] },
    PIC: { filterType: PIC_FILTER, filterValue: null },
}

function useServiceProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(ServiceReducer, {
        listFilters: defaultFilters,
        searchKey: '',
        page: 0,
        limit: 10,
        column: 'submitDate',
        direction: 'desc',
    })

    // Paging
    const [page, setPage] = useState(params.page)
    const [limit, setLimit] = useState(params.limit)

    // Sorting
    const [column, setColumn] = useState(params.column)
    const [direction, setDirection] = useState(params.direction)

    //Filters
    const [serviceStatus, setServiceStatus] = useState(
        defaultFilters.serviceStatus.filterValue
            ? defaultFilters.serviceStatus.filterValue
            : ''
    )
    const [serviceType, setServiceType] = useState(
        defaultFilters.serviceType.filterValue
            ? defaultFilters.serviceType.filterValue
            : ''
    )
    const [schoolYear, setSchoolYear] = useState(
        defaultFilters.schoolYear.filterValue
            ? defaultFilters.schoolYear.filterValue
            : ''
    )
    const [isExpired, setIsExpired] = useState(
        defaultFilters.isExpired.filterValue
            ? defaultFilters.isExpired.filterValue
            : ''
    )
    const [dateRange, setDateRange] = useState(
        defaultFilters.dateRange.filterValue[0]
            ? defaultFilters.dateRange.filterValue
            : [null, null]
    )
    const [PIC, setPIC] = useState(
        defaultFilters.PIC.filterValue ? defaultFilters.PIC.filterValue : null
    )

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
            case SERVICE_STATUS_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    serviceStatus: { filterType: SERVICE_STATUS_FILTER, filterValue: value },
                }
                setServiceStatus(value)
                break
            case SERVICE_TYPE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    serviceType: { filterType: SERVICE_TYPE_FILTER, filterValue: value },
                }
                setServiceType(value)
                break
            case SCHOOL_YEAR_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: value },
                }
                setSchoolYear(value)
                break
            case EXPIRED_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    isExpired: { filterType: EXPIRED_FILTER, filterValue: value },
                }
                setIsExpired(value)
                break
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
            case PIC_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    PIC: { filterType: PIC_FILTER, filterValue: value },
                }
                setPIC(value)
                break
            default:
                break
        }
    }

    // APIs get data for filters
    const expiredStatuses = [null, true, false];
    const serviceStatuses = ['Pending', 'Approved', 'Rejected'];
    const [PICs, setPICs] = useState([])
    const [serviceTypes, setServiceTypes] = useState([])
    useEffect(() => {
        getServiceTypes().then(res => {
            setServiceTypes(res);
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }, []);

    const getListPICs = (fullName) => {
        getPICs({ active: true, fullName: fullName, role: roleNames.salesman }).then((data) => {
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
        // return () => setPICs([])
    }, [])

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
        serviceStatus,
        serviceType,
        schoolYear,
        serviceTypes,
        dateRange,
        isExpired,
        expiredStatuses,
        serviceStatuses,
        PIC,
        PICs,
        getListPICs,
        setFilter,
    }
}

function ServiceProvider(props) {
    const { children } = props
    const service = useServiceProvider()

    return (
        <ServiceContext.Provider value={service}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceProvider

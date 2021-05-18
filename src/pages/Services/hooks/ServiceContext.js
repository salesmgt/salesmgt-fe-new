import React, {
    useState,
    useContext,
    createContext,
    useReducer,
    useEffect,
} from 'react'
import { ServiceReducer } from './ServiceReducer'
import {
    SCHOOL_YEAR_FILTER,
    SERVICE_STATUS_FILTER,
    SERVICE_TYPE_FILTER
} from '../../../constants/Filters'
import { useHistory } from 'react-router-dom'
import { getServiceTypes } from '../ServicesServices';

const ServiceContext = createContext()

export function useService() {
    return useContext(ServiceContext)
}

let defaultFilters = {
    serviceStatus: { filterType: SERVICE_STATUS_FILTER, filterValue: '' },
    serviceType: { filterType: SERVICE_TYPE_FILTER, filterValue: '' },
    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
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

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
            case SERVICE_STATUS_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    serviceStatus: { filterType: SERVICE_STATUS_FILTER, filterValue: value },
                }
                setServiceStatus(value)
            case SERVICE_TYPE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    serviceType: { filterType: SERVICE_TYPE_FILTER, filterValue: value },
                }
                setServiceType(value)
            case SCHOOL_YEAR_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: value },
                }
                setSchoolYear(value)
                break
            default:
                break
        }
    }

    // APIs get data for filters
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

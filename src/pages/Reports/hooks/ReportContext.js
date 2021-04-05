import React, { useState, useContext, createContext, useEffect, useReducer } from 'react'
import * as FiltersServices from '../../../services/FiltersServices'
import { useHistory } from 'react-router-dom'
import { ReportReducer } from './ReportReducer';

const ReportContext = createContext()

export function useReport() {
    return useContext(ReportContext)
}

function useReportProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(
        ReportReducer,
        {
            listFilters: {
                PIC: { filterType: 'PIC', filterValue: null },
                district: { filterType: 'district', filterValue: '' },
                schoolYear: { filterType: 'schoolYear', filterValue: '' },
                status: { filterType: 'status', filterValue: '' },
                purpose: { filterType: 'purpose', filterValue: '' },
                fromDate: { filterType: 'fromDate', filterValue: null },
                toDate: { filterType: 'toDate', filterValue: null },
            },
            searchKey: '',
            page: 0,
            limit: 25,
            column: 'id',
            direction: 'asc'
        }
    )

    // Paging
    const [page, setPage] = useState(params.page)
    const [limit, setLimit] = useState(params.limit)

    // Sorting
    const [column, setColumn] = useState(params.column)
    const [direction, setDirection] = useState(params.direction)

    //Filters
    const [PIC, setPIC] = useState(null);
    const [district, setDistrict] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [purpose, setPurpose] = useState('');
    const [schoolStatus, setSchoolStatus] = useState('');
    const [fromDate, setFromDate] = useState((new Date()).getDate() - 7);
    const [toDate, setToDate] = useState((new Date()).getDate());

    // APIs
    const [PICs, setPICs] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [schoolYears, setSchoolYears] = useState([]);
    const [schoolStatuses, setSchoolStatuses] = useState([]);

    // Search field (do not have)

    // Get filters' data
    const getPICsFilter = () => {
        FiltersServices.getPICs().then((res) => {
            setPICs(res.data.list)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status }
                })
            }
        })
    }

    const getDistrictsFilter = () => {
        FiltersServices.getDistricts().then((res) => {
            setDistricts(res.data)
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

    const getSchoolYearsFilter = () => {
        FiltersServices.getSchoolYears().then((res) => {
            setSchoolYears(res.data)
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

    const getSchoolStatusesFilter = () => {
        FiltersServices.getSchoolStatuses().then((res) => {
            setSchoolStatuses(res.data)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status }
                })
            }
        })
    }

    useEffect(() => {
        getPICsFilter()
        getDistrictsFilter()
        getSchoolYearsFilter()
        getSchoolStatusesFilter()
    }, [])

    return {
        params, dispatchParams,
        PICs, districts, schoolYears, schoolStatuses,
        page, setPage, limit, setLimit,
        direction, setDirection, column, setColumn,
        PIC, setPIC, district, setDistrict, schoolYear, setSchoolYear,
        purpose, setPurpose, schoolStatus, setSchoolStatus,
        fromDate, setFromDate, toDate, setToDate
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
import React, { useState, useContext, createContext, useEffect, useReducer } from 'react'
import * as FiltersServices from '../../../services/FiltersServices'
import { useHistory } from 'react-router-dom'
import { SchoolReducer } from './SchoolReducer';

const SchoolContext = createContext()

export function useSchool() {
    return useContext(SchoolContext)
}

function useSchoolProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(
        SchoolReducer,
        {
            listFilters: {
                district: { filterType: 'district', filterValue: '' },
                type: { filterType: 'type', filterValue: '' },
                level: { filterType: 'level', filterValue: '' },
                scale: { filterType: 'scale', filterValue: '' },
                status: { filterType: 'status', filterValue: '' }
            },
            searchKey: '',
            page: 0,
            limit: 10,
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
    const [district, setDistrict] = useState('');
    const [schoolType, setSchoolType] = useState('');
    const [schoolLevel, setSchoolLevel] = useState('');
    const [schoolScale, setSchoolScale] = useState('');
    const [schoolStatus, setSchoolStatus] = useState('');

    // APIs
    const [districts, setDistricts] = useState([]);
    const [schoolTypes, setSchoolTypes] = useState([]);
    const [schoolLevels, setSchoolLevels] = useState([]);
    const [schoolScales, setSchoolScales] = useState([]);
    const [schoolStatuses, setSchoolStatuses] = useState([]);

    // Search field (do not have)

    // Get filters' data
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

    const getSchoolTypesFilter = () => {
        FiltersServices.getSchoolTypes().then((res) => {
            setSchoolTypes(res.data)
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

    const getSchoolLevelsFilter = () => {
        FiltersServices.getEducationalLevels().then((res) => {
            setSchoolLevels(res.data)
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

    const getSchoolScalesFilter = () => {
        FiltersServices.getSchoolScales().then((res) => {
            setSchoolScales(res.data)
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
        getDistrictsFilter()
        getSchoolTypesFilter()
        getSchoolLevelsFilter()
        getSchoolScalesFilter()
        getSchoolStatusesFilter()
    }, [])

    return {
        params, dispatchParams,
        districts, schoolTypes, schoolLevels, schoolScales, schoolStatuses,
        page, setPage, limit, setLimit,
        direction, setDirection, column, setColumn,
        district, setDistrict, schoolType, setSchoolType,
        schoolLevel, setSchoolLevel, schoolScale,
        setSchoolScale, schoolStatus, setSchoolStatus
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
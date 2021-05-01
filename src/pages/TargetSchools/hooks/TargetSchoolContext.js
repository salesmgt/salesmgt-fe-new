import React, {
    useState,
    useContext,
    createContext,
    useEffect,
    useReducer,
} from 'react'
import { useHistory } from 'react-router-dom'
import { TargetSchoolReducer } from './TargetSchoolReducer'
import { getPICs } from '../../../services/FiltersServices'
import {
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    SCALE_FILTER,
    PURPOSE_FILTER,
    PIC_FILTER,
    SCHOOL_YEAR_FILTER,
    STATUS_FILTER,
    ASSIGNED_FILTER
} from '../../../constants/Filters'

const TargetSchoolContext = createContext()

export function useTargetSchool() {
    return useContext(TargetSchoolContext)
}

let defaultFilters = {
    schoolYear: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
    district: { filterType: DISTRICT_FILTER, filterValue: '' },
    type: { filterType: TYPE_FILTER, filterValue: '' },
    level: { filterType: LEVEL_FILTER, filterValue: '' },
    scale: { filterType: SCALE_FILTER, filterValue: '' },
    PIC: { filterType: PIC_FILTER, filterValue: null },
    purpose: { filterType: PURPOSE_FILTER, filterValue: '' },
    status: { filterType: STATUS_FILTER, filterValue: '' },
    isAssigned: { filterType: ASSIGNED_FILTER, filterValue: null },
}

function useTargetSchoolProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(TargetSchoolReducer, {
        // listFilters: {
        //     schoolYear: { filterType: 'schoolYear', filterValue: '' },
        //     district: { filterType: 'district', filterValue: '' },
        //     type: { filterType: 'type', filterValue: '' },
        //     level: { filterType: 'level', filterValue: '' },
        //     scale: { filterType: 'scale', filterValue: '' },
        //     PIC: { filterType: 'PIC', filterValue: null },
        //     purpose: { filterType: 'purpose', filterValue: '' },
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
    // const [schoolYear, setSchoolYear] = useState('')
    // const [district, setDistrict] = useState('')
    // const [schoolType, setSchoolType] = useState('')
    // const [schoolLevel, setSchoolLevel] = useState('')
    // const [schoolScale, setSchoolScale] = useState('')
    // const [PIC, setPIC] = useState(null)
    // const [purpose, setPurpose] = useState('')

    const [schoolYear, setSchoolYear] = useState(
        defaultFilters.schoolYear.filterValue
            ? defaultFilters.schoolYear.filterValue
            : ''
    )
    const [district, setDistrict] = useState(
        defaultFilters.district.filterValue ? defaultFilters.district.filterValue : ''
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
    const [PIC, setPIC] = useState(
        defaultFilters.PIC.filterValue ? defaultFilters.PIC.filterValue : null
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
    const [isAssigned, setIsAssigned] = useState(
        defaultFilters.isAssigned.filterValue
            ? defaultFilters.isAssigned.filterValue
            : null
    )

    const assignedStatuses = [null, true, false];

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
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
            case PURPOSE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    purpose: { filterType: PURPOSE_FILTER, filterValue: value },
                }
                setPurpose(value)
                break
            case STATUS_FILTER:
                console.log('setFilter - STATUS_FILTER: ', value);
                defaultFilters = {
                    ...defaultFilters,
                    status: { filterType: STATUS_FILTER, filterValue: value },
                }
                setSchoolStatus(value)
                break
            case ASSIGNED_FILTER:
                console.log('setFilter - ASSIGNED_FILTER: ', value);
                defaultFilters = {
                    ...defaultFilters,
                    status: { filterType: ASSIGNED_FILTER, filterValue: value },
                }
                setIsAssigned(value)
                break
            default:
                break
        }
    }

    // APIs
    const [PICs, setPICs] = useState([])
    // const [schoolYears, setSchoolYears] = useState([])
    // const [districts, setDistricts] = useState([])
    // const [schoolTypes, setSchoolTypes] = useState([])
    // const [schoolLevels, setSchoolLevels] = useState([])
    // const [schoolScales, setSchoolScales] = useState([])

    // Search field (do not have)

    const getListPICs = (fullName) => {
        getPICs({active: true, fullName: fullName}).then((data) => {
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
    
    useEffect(getListPICs, [])

    //================Parse object "params" --> query-string================
    //........

    return {
        params,
        dispatchParams,
        PICs,
        // districts,
        // schoolYears,
        // schoolTypes,
        // schoolLevels,
        // schoolScales,
        page,
        setPage,
        limit,
        setLimit,
        direction,
        setDirection,
        column,
        setColumn,
        schoolYear,
        // setSchoolYear,
        district,
        // setDistrict,
        schoolType,
        // setSchoolType,
        schoolLevel,
        // setSchoolLevel,
        schoolScale,
        // setSchoolScale,
        PIC,
        // setPIC,
        purpose,
        // setPurpose,
        schoolStatus,
        isAssigned,
        assignedStatuses,
        setFilter,
        getListPICs,
    }
}

function TargetSchoolProvider(props) {
    const { children } = props
    const targetSchool = useTargetSchoolProvider()

    return (
        <TargetSchoolContext.Provider value={targetSchool}>
            {children}
        </TargetSchoolContext.Provider>
    )
}

export default TargetSchoolProvider

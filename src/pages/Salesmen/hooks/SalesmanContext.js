import React, { useState, useContext, createContext, useReducer } from 'react'
import { SalesmanReducer } from './SalesmanReducer'
import { ACTIVE_FILTER, ROLE_FILTER } from '../../../constants/Filters'

const SalesmanContext = createContext()

export function useSalesman() {
    return useContext(SalesmanContext)
}

let defaultFilters = {
    // isActive: { filterType: ACTIVE_FILTER, filterValue: { isActive: true, status: 'Active' } },
    isActive: { filterType: ACTIVE_FILTER, filterValue: null },
    role: { filterType: ROLE_FILTER, filterValue: '' },
}

function useSalesmanProvider() {
    // Reducer
    const [params, dispatchParams] = useReducer(SalesmanReducer, {
        listFilters: defaultFilters,
        searchKey: '',
        page: 0,
        limit: 10,
        column: 'username',
        direction: 'asc',
    })

    // Paging
    const [page, setPage] = useState(params.page)
    const [limit, setLimit] = useState(params.limit)

    // Sorting
    const [column, setColumn] = useState(params.column)
    const [direction, setDirection] = useState(params.direction)

    //Filters
    // const workingStatuses = [
    //     { isActive: true, status: 'Active' },
    //     { isActive: false, status: 'Inactive' }
    // ]
    const workingStatuses = [null, true, false];

    const [isActive, setIsActive] = useState(
        defaultFilters.isActive.filterValue
            ? defaultFilters.isActive.filterValue
            : null // { isActive: true, status: 'Active' }
    )

    const [role, setRole] = useState(
        defaultFilters.role.filterValue ? defaultFilters.role.filterValue : ''
    )

    // APIs
    // const isActives = [true, false]  // bỏ, chỉ có 2 gtrị thì làm luôn FE
    // const [roles, setRoles] = useState([])   // Bỏ, dùng cái bên LocalStorage

    // Search field (do not have)

    // Move API get filter's data to AppContext

    // Fix major BUG
    const setFilter = (key, value) => {
        // console.log('setFilter - value = ', value);

        switch (key) {
            case ACTIVE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    isActive: { filterType: ACTIVE_FILTER, filterValue: value },
                }
                // console.log('setFilter - value.status = ', value.status);
                setIsActive(value)
                break
            case ROLE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    role: { filterType: ROLE_FILTER, filterValue: value },
                }
                setRole(value)
                break
            default:
                break
        }
    }

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
        isActive,
        // setIsActive,
        role,
        // setRole,
        workingStatuses,
        setFilter
    }
}

function SalesmanProvider(props) {
    const { children } = props
    const salesman = useSalesmanProvider()

    return (
        <SalesmanContext.Provider value={salesman}>
            {children}
        </SalesmanContext.Provider>
    )
}

export default SalesmanProvider

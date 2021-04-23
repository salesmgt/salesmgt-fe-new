import React, { useState, useContext, createContext, useReducer } from 'react'
import { AccountReducer } from './AccountReducer'
import { ACTIVE_FILTER, ROLE_FILTER } from '../../../constants/Filters'

const AccountContext = createContext()

export function useAccount() {
    return useContext(AccountContext)
}

let defaultFilters = {
    isActive: { filterType: ACTIVE_FILTER, filterValue: { isActive: true, status: 'Active' } },
    role: { filterType: ROLE_FILTER, filterValue: '' },
}

function useAccountProvider() {
    // Reducer
    const [params, dispatchParams] = useReducer(AccountReducer, {
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
    const workingStatuses = [
        { isActive: true, status: 'Active' },
        { isActive: false, status: 'Inactive' }
    ]

    const [isActive, setIsActive] = useState(
        defaultFilters.isActive.filterValue
            ? defaultFilters.isActive.filterValue
            : { isActive: true, status: 'Active' }
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
        console.log('setFilter - value = ', value);

        switch (key) {
            case ACTIVE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    isActive: { filterType: ACTIVE_FILTER, filterValue: value },
                }
                console.log('setFilter - value.status = ', value.status);
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

function AccountProvider(props) {
    const { children } = props
    const account = useAccountProvider()

    return (
        <AccountContext.Provider value={account}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider

import React, { useState, useContext, createContext, useReducer } from 'react'
import { AccountReducer } from './AccountReducer'
import { ACTIVE_FILTER, ROLE_FILTER } from '../components/Filters/FilterConsts'

const AccountContext = createContext()

export function useAccount() {
    return useContext(AccountContext)
}

let defaultFilters = {
    isActive: { filterType: ACTIVE_FILTER, filterValue: true },
    role: { filterType: ROLE_FILTER, filterValue: '' },
}

function useAccountProvider() {
    // Reducer
    const [params, dispatchParams] = useReducer(AccountReducer, {
        // listFilters: {
        //     isActive: { filterType: 'isActive', filterValue: true },
        //     role: { filterType: 'role', filterValue: '' },
        // },
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
    // const [active, setActive] = useState(true)
    // const [role, setRole] = useState('')

    const [active, setActive] = useState(
        defaultFilters.isActive.filterValue
            ? defaultFilters.isActive.filterValue
            : true
    )

    const [role, setRole] = useState(
        defaultFilters.role.filterValue ? defaultFilters.role.filterValue : ''
    )

    // APIs
    // const isActives = [true, false]  // bỏ, chỉ có 2 gtrị thì làm luôn FE
    // const [roles, setRoles] = useState([])   // Bỏ, dùng cái bên LocalStorage

    // Search field (do not have)

    // Get filter's data
    // const getRolesFilter = () => {
    //     FiltersServices.getRoles()
    //         .then((data) => {
    //             setRoles(data)
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
    //     getRolesFilter()
    // }, [])

    // fix major BUG
    const setFilter = (key, value) => {
        switch (key) {
            case ACTIVE_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    isActive: { filterType: ACTIVE_FILTER, filterValue: value },
                }
                setActive(value)
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
        // roles, // isActives,
        page,
        setPage,
        limit,
        setLimit,
        direction,
        setDirection,
        column,
        setColumn,
        active,
        // setActive,
        role,
        // setRole,
        setFilter,
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

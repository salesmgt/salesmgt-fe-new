import React, {
    useState,
    useContext,
    createContext,
    useReducer,
    // useEffect,
} from 'react'
// import { useHistory } from 'react-router'
// import * as FiltersServices from '../../../services/FiltersServices'
import { AccountReducer } from './AccountReducer'

const AccountContext = createContext()

export function useAccount() {
    return useContext(AccountContext)
}

function useAccountProvider() {
    // Reducer
    const [params, dispatchParams] = useReducer(AccountReducer, {
        listFilters: {
            isActive: { filterType: 'isActive', filterValue: { isActive: true, status: 'Active' } },
            role: { filterType: 'role', filterValue: '' },
        },
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
    const [isActive, setIsActive] = useState({ isActive: true, status: 'Active' })
    const [role, setRole] = useState('')

    // APIs
    // const isActives = [true, false]  // bỏ, chỉ có 2 gtrị thì làm luôn FE
    const workingStatuses = [
        { isActive: true, status: 'Active' },
        { isActive: false, status: 'Inactive' }
    ]
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
        setIsActive,
        role,
        setRole,
        workingStatuses
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

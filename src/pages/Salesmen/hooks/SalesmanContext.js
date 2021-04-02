import React, { useState, useContext, createContext, useReducer, useEffect } from 'react'
import { useHistory } from 'react-router';
import * as FiltersServices from '../../../services/FiltersServices'
import { SalesmanReducer } from './SalesmanReducer';

const SalesmanContext = createContext()

export function useSalesman() {
    return useContext(SalesmanContext)
}

function useSalesmanProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(
        SalesmanReducer,
        {
            listFilters: {
                isActive: { filterType: 'isActive', filterValue: true },
                role: { filterType: 'role', filterValue: '' },
            },
            searchKey: '',
            page: 0,
            limit: 10,
            column: 'username',
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
    const [active, setActive] = useState(true);
    const [role, setRole] = useState('');

    // APIs
    // const isActives = [true, false]
    const [roles, setRoles] = useState([]);

    // Search field (do not have)

    // Get filter's data
    const getRolesFilter = () => {
        FiltersServices.getRoles().then((res) => {
            setRoles(res.data)
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
        getRolesFilter()
    }, [])

    return {
        params, dispatchParams,
        roles,  // isActives, 
        page, setPage, limit, setLimit,
        direction, setDirection, column, setColumn,
        active, setActive, role, setRole
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
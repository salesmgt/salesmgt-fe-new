import React, {
    useState,
    useContext,
    createContext,
    useReducer,
    useEffect,
} from 'react'
import { KPIReducer } from './KPIReducer'
import { ACTIVE_FILTER } from '../../../constants/Filters'
import { useHistory } from 'react-router-dom'
import { getKPICriteria } from '../KPIsServices'

const KPIContext = createContext()

export function useKPI() {
    return useContext(KPIContext)
}

let defaultFilters = {
    status: { filterType: ACTIVE_FILTER, filterValue: '' },  // active, disable,...
}

function useKPIProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(KPIReducer, {
        listFilters: defaultFilters,
        searchKey: '',
        page: 0,
        limit: 10,
        column: 'id',
        direction: 'desc',
    })

    // Paging
    const [page, setPage] = useState(params.page)
    const [limit, setLimit] = useState(params.limit)

    // Sorting
    const [column, setColumn] = useState(params.column)
    const [direction, setDirection] = useState(params.direction)

    //Filters
    const [status, setStatus] = useState(
        defaultFilters.status.filterValue ? defaultFilters.status.filterValue : ''
    )

    // Get data from APIs
    const [criteria, setCriteria] = useState([])
    const getCriteria = () => {
        getKPICriteria().then(res => {
            setCriteria(res);
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
    useEffect(getCriteria, []);

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
        status,
        setStatus,
        criteria,
    }
}

function KPIProvider(props) {
    const { children } = props
    const kpi = useKPIProvider()

    return (
        <KPIContext.Provider value={kpi}>
            {children}
        </KPIContext.Provider>
    )
}

export default KPIProvider

import React, {
    useState,
    useContext,
    createContext,
    useReducer,
    useEffect,
} from 'react'
import { KPIReducer } from './KPIReducer'
import { KPI_STATUS_FILTER } from '../../../constants/Filters'
import { useHistory } from 'react-router-dom'
import { getKPICriteria } from '../KPIsServices'
import { kpiStatusNames } from '../../../constants/Generals'

const KPIContext = createContext()

export function useKPI() {
    return useContext(KPIContext)
}

let defaultFilters = {
    status: { filterType: KPI_STATUS_FILTER, filterValue: '' },  // active, disable, expired
}

function useKPIProvider() {
    const history = useHistory()

    // Reducer
    const [params, dispatchParams] = useReducer(KPIReducer, {
        listFilters: defaultFilters,
        searchKey: '',
        column: 'id',
        direction: 'desc',
    })

    // This table does not have Paging

    // Sorting
    const [column, setColumn] = useState(params.column)
    const [direction, setDirection] = useState(params.direction)

    //Filters
    const [status, setStatus] = useState(
        defaultFilters.status.filterValue ? defaultFilters.status.filterValue : ''
    )
    const kpiStatuses = [kpiStatusNames.applying, kpiStatusNames.expired, kpiStatusNames.disable]

    const setFilter = (key, value) => {
        switch (key) {
            case KPI_STATUS_FILTER:
                defaultFilters = {
                    ...defaultFilters,
                    status: { filterType: KPI_STATUS_FILTER, filterValue: value },
                }
                setStatus(value)
                break
            default:
                break
        }
    }

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
        direction,
        setDirection,
        column,
        setColumn,
        status,
        setStatus,
        criteria,
        status,
        kpiStatuses,
        setFilter
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

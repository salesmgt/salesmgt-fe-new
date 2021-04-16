import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './ContractsConfig';
import { useContract } from './hooks/ContractContext';
import * as ContractsServices from './ContractsServices'
import classes from './Contracts.module.scss'

function Contracts() {
    const history = useHistory()

    const { params } = useContract()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    function refreshContract(page = 0, limit = 10, column = "id", direction = "asc", searchKey, listFilters) {
        ContractsServices.getAccounts(page, limit, column, direction, searchKey, listFilters).then((res) => {
            setData(res.data)
        }).catch(error => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }

    useEffect(() => {
        refreshContract(page, limit, column, direction, searchKey, listFilters)
    }, [params])

    if (!data) {
        return null;
    }

    return (
        <div className={classes.panel}>
            <Filters className={classes.filter} />
            <Tables columns={columns}
                rows={data.list}
                className={classes.table}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            />
        </div>
    )
}

export default Contracts

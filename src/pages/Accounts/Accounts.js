import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './AccountsConfig';
import { useAccount } from './hooks/AccountContext';
import * as AccountsServices from './AccountsServices'
import classes from './Accounts.module.scss'

function Accounts() {
    const history = useHistory()

    const { params } = useAccount()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    function refreshAccount(page = 0, limit = 10, column = "username", direction = "asc", searchKey, listFilters) {
        AccountsServices.getAccounts(page, limit, column, direction, searchKey, listFilters).then((res) => {
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
        refreshAccount(page, limit, column, direction, searchKey, listFilters)
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

export default Accounts

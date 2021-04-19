import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './AccountsConfig';
import { useAccount } from './hooks/AccountContext';
import * as AccountsServices from './AccountsServices'
import classes from './Accounts.module.scss'

function Accounts() {
    console.log("abc");
    const history = useHistory()

    const { params } = useAccount()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    let isMounted = true
    function refreshAccount(page = 0, limit = 10, column = "username", direction = "asc", searchKey, listFilters) {
        AccountsServices.getAccounts(page, limit, column, direction, searchKey, listFilters).then((res) => {
            if (isMounted) {
                setData(res)
            }
        }).catch(error => {
            if (error.response) {
                console.log('error', error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshAccount(page, limit, column, direction, searchKey, listFilters)
        console.log('inside useEffect()');
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
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

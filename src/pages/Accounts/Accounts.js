import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './AccountsConfig'
import { useAccount } from './hooks/AccountContext'
import * as AccountsServices from './AccountsServices'
import { Loading } from '../../components'
import classes from './Accounts.module.scss'

function Accounts() {
    const history = useHistory()

    const { params } = useAccount()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    let isMounted = true
    const refreshPage = (
        page = 0,
        limit = 10,
        column = 'username',
        direction = 'asc',
        searchKey,
        listFilters
    ) => {
        AccountsServices.getAccounts(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters
        )
            .then((res) => {
                if (isMounted) {
                    setData(res.data)
                    // console.log('accounts: ', res.data.list[0]);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage(page, limit, column, direction, searchKey, listFilters)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
            // setData(null)
        }
    }, [params])

    if (!data) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            <Filters className={classes.filter} refreshPage={refreshPage} />
            <Tables
                columns={columns}
                rows={data.list}
                className={classes.table}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            />
        </div>
    )
}

export default Accounts

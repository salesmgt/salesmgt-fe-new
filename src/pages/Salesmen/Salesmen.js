import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './SalesmenConfig';
import { useSalesman } from './hooks/SalesmanContext';
import * as SalesmenServices from './SalesmenServices'
import classes from './Salesmen.module.scss'

function Salesmen() {
    const history = useHistory()

    const { params } = useSalesman()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    function refreshSalesmen(page = 0, limit = 10, column = "username", direction = "asc", searchKey, listFilters) {
        SalesmenServices.getSalesmen(page, limit, column, direction, searchKey, listFilters).then((res) => {
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
        refreshSalesmen(page, limit, column, direction, searchKey, listFilters)
    }, [params])

    if (!data) {
        return null;
    }

    return (
        <div className={classes.wrapper}>
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

export default Salesmen

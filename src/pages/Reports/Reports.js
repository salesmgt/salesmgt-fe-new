import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Filters, Tables } from './components'
import { columns } from './ReportsConfig'
import { useReport } from './hooks/ReportContext'
import * as ReportsServices from './ReportsServices'
import { Loading } from '../../components'
import classes from './Reports.module.scss'

function Reports() {
    const history = useHistory()

    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    function getAllReports(
        page = 0,
        limit = 10,
        column = 'id',
        direction = 'asc',
        searchKey,
        listFilters
    ) {
        ReportsServices.getReports(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters
        )
            .then((res) => {
                setData(res)
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

    useEffect(() => {
        getAllReports(page, limit, column, direction, searchKey, listFilters)
    }, [params])

    if (!data) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            <Filters />
            <Tables
                columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            />
        </div>
    )
}

export default Reports

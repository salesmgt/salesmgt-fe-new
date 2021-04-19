import React, { useEffect, useState } from 'react'
import { Filters, Tables } from './components'
import { columns } from './ReportsConfig';
import { useReport } from './hooks/ReportContext'
import * as ReportsServices from './ReportsServices'
import classes from './Reports.module.scss'
import { useHistory } from 'react-router';

function Reports() {
    const history = useHistory()
    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    function getAllReports(
        page = 0, limit = 10, column = 'id', direction = 'asc', searchKey, listFilters
    ) {
        ReportsServices.getReports(page, limit, column, direction, searchKey, listFilters)
            .then((res) => {
                console.log("list reports: ", res);
                setData(res)
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

    useEffect(() => {
        getAllReports(page, limit, column, direction, searchKey, listFilters)
    }, [params])

    if (!data) {
        return null
    }

    return (
        <div className={classes.panel}>
            <Filters />
            <Tables columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            />
        </div>
    )
}

export default Reports

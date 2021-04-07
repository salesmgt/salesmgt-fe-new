import React from 'react'
import { Filters, Tables } from './components'
import { data, columns } from './ReportsConfig';
// import { useReport } from './hooks/ReportContext'
import classes from './Reports.module.scss'

function Reports() {
    // const { params } = useReport()
    // const { listFilters, page, limit, column, direction, searchKey } = params

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

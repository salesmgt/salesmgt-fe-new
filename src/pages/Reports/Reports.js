import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Filters, Tables } from './components'
import { columns } from './ReportsConfig'
import { useReport } from './hooks/ReportContext'
import * as ReportsServices from './ReportsServices'
import { Loading } from '../../components'
import classes from './Reports.module.scss'

function Reports() {
    const history = useHistory()
    const location = useLocation()

    const [taskId, setTaskId] = useState(
        location?.state?.taskId ? location?.state?.taskId : 0
    )
    // const schoolName = location?.state?.schoolName ? location?.state?.schoolName : ''
    // const PIC = location?.state?.PIC ? location?.state?.PIC : null

    // console.log('location: ', location);

    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    const getAllReports = (
        page = 0,
        limit = 10,
        column = 'date',
        direction = 'desc',
        searchKey,
        listFilters,
        taskId
    ) => {
        ReportsServices.getReports(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters,
            taskId
        )
            .then((res) => {
                setData(res)
                // console.log('reports nè: ', res);
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
        getAllReports(page, limit, column, direction, searchKey, listFilters, taskId)

        // return () => setData(null)
    }, [params, taskId])  // Coi lại chỗ này nữa, click lại Sidebar thì ko thấy load lại từ đầu

    if (!data) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            <Filters setTaskId={setTaskId} refreshAPI={getAllReports} />
            <Tables
                columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
                refreshAPI={getAllReports}
            />
        </div>
    )
}

export default Reports

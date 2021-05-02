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

    const [targetId, setTargetId] = useState(location?.state?.targetId ? location?.state?.targetId : 0)
    // const schoolName = location?.state?.schoolName ? location?.state?.schoolName : ''
    // const PIC = location?.state?.PIC ? location?.state?.PIC : null

    console.log('location: ', location);

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
        targetId
    ) => {
        ReportsServices.getReports(
            page,limit,column,direction,searchKey,listFilters,targetId
        ).then((res) => {
            setData(res)
            // console.log('reports nè: ', res);
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
        getAllReports(page,limit,column,direction,searchKey,listFilters,targetId)
    }, [params, targetId])

    if (!data) {
        return <Loading />
    }

    console.log('params = ', params);
    console.log('targetId = ', targetId);

    return (
        <div className={classes.panel}>
            <Filters setTargetId={setTargetId} />
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

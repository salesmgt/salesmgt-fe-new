import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './TargetSchoolsConfig'
import { useTargetSchool } from './hooks/TargetSchoolContext'
import * as TargetSchoolsServices from './TargetSchoolsServices'
import classes from './TargetSchools.module.scss'

function TargetSchools() {
    const history = useHistory()

    const { params } = useTargetSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params
    // const { schoolYear, district, PIC, purpose, level, scale, type } = listFilters

    const [data, setData] = useState({})

    function onGetTargets(
        page = 0,
        limit = 10,
        column = 'id',
        direction = 'asc',
        searchKey,
        listFilters
    ) {
        TargetSchoolsServices.getTargetSchools(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters
        ).then((res) => {
            setData(res)
            console.log('Targets: ', res);
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
        onGetTargets(page, limit, column, direction, searchKey, listFilters)
    }, [params])

    if (!data) {
        return null
    }

    return (
        <div className={classes.panel}>
            <Filters className={classes.filter} />
            <Tables
                columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            />
        </div>
    )
}

export default TargetSchools

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './SchoolsConfig';
import { useSchool } from './hooks/SchoolContext';
import * as SchoolsServices from './SchoolsServices'
import classes from './Schools.module.scss'

function Schools() {
    const history = useHistory()

    const { params } = useSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    function refreshSchools(page = 0, limit = 10, column = "id", direction = "asc", searchKey, listFilters) {
        SchoolsServices.getSchools(page, limit, column, direction, searchKey, listFilters).then((res) => {
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
        refreshSchools(page, limit, column, direction, searchKey, listFilters)
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

export default Schools

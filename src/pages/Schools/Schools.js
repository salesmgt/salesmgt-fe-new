import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './SchoolsConfig'
import { useSchool } from './hooks/SchoolContext'
import * as SchoolsServices from './SchoolsServices'
import { Loading } from '../../components'
import classes from './Schools.module.scss'

function Schools() {
    const history = useHistory()

    const { params } = useSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    let isMounted = true
    const refreshPage = (
        page = 0,
        limit = 10,
        column = 'id',
        direction = 'asc',
        searchKey,
        listFilters
    ) => {
        SchoolsServices.getSchools(
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
                    // console.log('schools: ', res.data.list[0])
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
            setData(null)
        }
    }, [params])

    if (!data) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            {/* <Fab size="medium" variant="extended" color="primary" className={classes.fab}>
                <MdAdd fontSize="large" />&nbsp; Add School
            </Fab> */}
            <Filters className={classes.filter} refreshAPI={refreshPage} />
            <Tables
                className={classes.table}
                columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
                refreshAPI={refreshPage}
            />
        </div>
    )
}

export default Schools

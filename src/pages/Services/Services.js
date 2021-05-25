import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { getColumns } from './ServicesConfig'
import { useService } from './hooks/ServiceContext'
import { getServices } from './ServicesServices'
import { Loading } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames } from '../../constants/Generals';
import classes from './Services.module.scss'

function Services() {
    const history = useHistory()
    const { user } = useAuth()
    const columns = getColumns(user.roles[0])
    const { params } = useService()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    let isMounted = true
    const refreshPage = (
        page = 0,
        limit = 10,
        column = 'submitDate',
        direction = 'desc',
        searchKey,
        listFilters,
        picUsername
    ) => {
        getServices(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters,
            picUsername
        )
            .then((res) => {
                if (isMounted) {
                    setData(res.data)
                    // console.log('Services nè: ', res.data.list)
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
        if (user.roles[0] === roleNames.salesman) {
            refreshPage(page, limit, column, direction, searchKey, listFilters, user.username)
        } else {
            refreshPage(page, limit, column, direction, searchKey, listFilters)
        }
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
            {/* <Fab size="medium" variant="extended" color="primary" className={classes.fab}>
                <MdAdd fontSize="large" />&nbsp; Add Service
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

export default Services

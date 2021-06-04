import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './KPIsConfig'
import { useKPI } from './hooks/KPIContext'
import { getKPIGroups, getMyKPIGroups } from './KPIsServices'
import { Loading } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames } from '../../constants/Generals'
import classes from './KPIs.module.scss'

function KPIs() {
    const history = useHistory()
    const { user } = useAuth()
    const { params } = useKPI()
    const { listFilters, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    let isMounted = true
    const refreshPage = (column = 'id', direction = 'desc', searchKey, listFilters) => {
        getKPIGroups(column, direction, searchKey, listFilters).then((res) => {
            if (isMounted) {
                setData(res.data)
                // console.log('KPIs nè: ', res.data)
            }
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
    const getSalesmanKPIGroup = (column = 'id', direction = 'desc', searchKey, listFilters, username) => {
        getMyKPIGroups(column, direction, searchKey, listFilters, username).then(data => {
            if (isMounted) {
                setData(data)
                console.log(`KPIs của ${username} nè: `, data)
            }
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
        if (user.roles[0] === roleNames.salesman) {
            getSalesmanKPIGroup(column, direction, searchKey, listFilters, user.username)
        } else {
            refreshPage(column, direction, searchKey, listFilters)
        }
        return () => {
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
                <MdAdd fontSize="large" />&nbsp; Add KPI
            </Fab> */}
            <Filters className={classes.filter} refreshAPI={refreshPage} />
            <Tables
                className={classes.table}
                columns={columns}
                rows={data}
                // totalRecord={data.totalElements}
                // totalPage={data.totalPage}
                refreshAPI={refreshPage}
            />
        </div>
    )
}

export default KPIs

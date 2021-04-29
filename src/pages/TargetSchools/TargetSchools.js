import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { useTargetSchool } from './hooks/TargetSchoolContext'
import * as TargetSchoolsServices from './TargetSchoolsServices'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames } from '../../constants/Generals'
import classes from './TargetSchools.module.scss'

function TargetSchools() {
    const history = useHistory()
    const [selectedRows, setSelectedRows] = React.useState([])
    const { params } = useTargetSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const { user } = useAuth()

    const [data, setData] = useState({})

    function onGetTargets(
        page = 0,
        limit = 10,
        column = 'id',
        direction = 'asc',
        searchKey,
        listFilters,
        pic
    ) {
        TargetSchoolsServices.getTargetSchools(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters,
            pic
        )
            .then((res) => {
                setData(res)
                // console.log("target res = ", res);
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
        if (user.roles[0] === roleNames.salesman) {
            onGetTargets(page, limit, column, direction, searchKey, listFilters, user.username)
        } else {
            onGetTargets(page, limit, column, direction, searchKey, listFilters)
        }
    }, [params])

    if (!data) {
        return null
    }

    return (
        <div className={classes.panel}>
            <Filters 
                selectedRows={selectedRows} 
                setSelectedRows={setSelectedRows} 
                className={classes.filter} 
                refreshAPI={onGetTargets}
            />
            <Tables
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
                refreshAPI={onGetTargets}
            />
        </div>
    )
}

export default TargetSchools

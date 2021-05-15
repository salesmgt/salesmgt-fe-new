import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { useTask } from './hooks/TaskContext'
import * as TasksServices from './TasksServices'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames } from '../../constants/Generals'
import { Loading } from '../../components'
import classes from './Tasks.module.scss'

function Tasks() {
    const history = useHistory()
    const [selectedRows, setSelectedRows] = React.useState([])
    const { params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const { user } = useAuth()

    const [data, setData] = useState(null)

    function onGetTasks(
        page = 0,
        limit = 10,
        column = 'id',
        direction = 'asc',
        searchKey,
        listFilters,
        pic
    ) {
        TasksServices.getTasks(
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
                // console.log("list tasks = ", res.list);
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
            onGetTasks(page, limit, column, direction, searchKey, listFilters, user.username)
        } else {
            onGetTasks(page, limit, column, direction, searchKey, listFilters)
        }
        // return () => setData(null)
    }, [params])

    if (!data) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            <Filters
                className={classes.filter}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                refreshAPI={onGetTasks}
            />
            <Tables
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
                refreshAPI={onGetTasks}
            />
        </div>
    )
}

export default Tasks

import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { SchoolInfo, AssignInfo, Timelines } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames } from '../../constants/Generals'
import * as TasksServices from './TasksServices'
import { taskConsts } from './TasksConfig'
import { Loading, NotFound } from '../../components'

function Task() {
    const { linkNames, tabNames, operations } = taskConsts
    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    // const [tabValue, setTabValue] = useState(0)
    const [tabValue, setTabValue] = useState(location?.state?.tabNo ? location?.state?.tabNo : 0)

    const stateData = location?.state?.data
    const [task, setTask] = useState(stateData?.model)

    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (taskId) => {
        TasksServices.getTask(taskId)
            .then((data) => {
                if (isMounted) {
                    setTask(data)
                    // console.log('task detail: ', task);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (error.response.status === 403) {
                        setExist(false)
                    } else {
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
                }
            })
    }

    useEffect(() => {
        refreshPage(id)
        return () => {
            isMounted = false
        }
    }, [])

    if (!task) {
        if (!exist) {
            return <NotFound title={operations.notFound} />
        } else {
            return <Loading />
        }
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const getListTabs = (role) => {
        if (role === roleNames.salesman)
            return [tabNames.tab2, tabNames.tab1, tabNames.tab3]
        else return [tabNames.tab1, tabNames.tab2, tabNames.tab3]
    }

    const getTab = (role, tabValue) => {
        switch (tabValue) {
            case 0:
                if (role === roleNames.salesman) {
                    return <AssignInfo task={task} refreshPage={refreshPage} />;
                } else {
                    return <SchoolInfo task={task} refreshPage={refreshPage} />;
                }
            case 1:
                if (role === roleNames.salesman) {
                    return <SchoolInfo task={task} refreshPage={refreshPage} />;
                } else {
                    return <AssignInfo task={task} refreshPage={refreshPage} />;
                }
            case 2:
                return <Timelines task={task} />;
            default:
                break;
        }
    }

    return (
        <DetailLayouts
            linkBack={linkNames.back}
            header={`${task?.level} ${task?.schoolName}`}
            subHeader={task?.schoolStatus}
            isStatus={true}
            tabs={getListTabs(user.roles[0])}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {getTab(user.roles[0], tabValue)}
        </DetailLayouts>
    )
}

export default Task
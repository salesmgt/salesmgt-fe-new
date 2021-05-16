import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { SchoolInfo, ServicesInfo, AssignInfo, Timelines } from './panels'
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

    // console.log('location = ', location);

    // location?.state?.tabNo must be dynamic according to task, not only a fixed number
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
                    console.log('task detail: ', task);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage(id)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const getTabNames = (role) => {
        switch (role) {
            case roleNames.manager:
                if (!task?.services) {
                    // if (location?.state?.openTimeline)
                    //     setTabValue(2)
                    return [tabNames.tab1, tabNames.tab2, tabNames.tab4]
                }
                else {
                    // if (location?.state?.openTimeline)
                    //     setTabValue(3)
                    return [tabNames.tab1, tabNames.tab2, tabNames.tab3, tabNames.tab4]
                }
            case roleNames.supervisor:
                // if (location?.state?.openTimeline)
                //     setTabValue(2)
                return [tabNames.tab1, tabNames.tab2, tabNames.tab4]
            case roleNames.salesman:
                if (!task?.services) {   // ý đồ gì mà phải đảo thứ tự nhỉ?
                    // if (location?.state?.openTimeline)
                    //     setTabValue(2)
                    return [tabNames.tab2, tabNames.tab1, tabNames.tab4]
                }
                else {
                    // if (location?.state?.openTimeline)
                    //     setTabValue(3)
                    return [tabNames.tab2, tabNames.tab1, tabNames.tab3, tabNames.tab4]
                }
            default:
                break;
        }
    }

    const getTabs = (role, tabValue) => {
        switch (role) {
            case roleNames.manager:
                if (!task?.services) {
                    //[tabNames.tab1, tabNames.tab2, tabNames.tab4]
                    switch (tabValue) {
                        case 0:
                            return <SchoolInfo task={task} refreshPage={refreshPage} />;
                        case 1:
                            return <AssignInfo task={task} refreshPage={refreshPage} />;
                        case 2:
                            return <Timelines task={task} />;
                        default:
                            break;
                    }
                }
                else {
                    //[tabNames.tab1, tabNames.tab2, tabNames.tab3, tabNames.tab4]
                    switch (tabValue) {
                        case 0:
                            return <SchoolInfo task={task} refreshPage={refreshPage} />;
                        case 1:
                            return <AssignInfo task={task} refreshPage={refreshPage} />;
                        case 2:
                            return <ServicesInfo task={task} refreshPage={refreshPage} />;
                        case 3:
                            return <Timelines task={task} />;
                        default:
                            break;
                    }
                }
            case roleNames.supervisor:
                //[tabNames.tab1, tabNames.tab2, tabNames.tab4]
                switch (tabValue) {
                    case 0:
                        return <SchoolInfo task={task} refreshPage={refreshPage} />;
                    case 1:
                        return <AssignInfo task={task} refreshPage={refreshPage} />;
                    case 2:
                        return <Timelines task={task} />;
                    default:
                        break;
                }
            case roleNames.salesman:
                if (!task?.services) {   // ý đồ gì mà phải đảo thứ tự nhỉ?
                    //[tabNames.tab2, tabNames.tab1, tabNames.tab4]
                    switch (tabValue) {
                        case 0:
                            return <AssignInfo task={task} refreshPage={refreshPage} />;
                        case 1:
                            return <SchoolInfo task={task} refreshPage={refreshPage} />;
                        case 2:
                            return <Timelines task={task} />;
                        default:
                            break;
                    }
                }
                else {
                    //[tabNames.tab2, tabNames.tab1, tabNames.tab3, tabNames.tab4]
                    switch (tabValue) {
                        case 0:
                            return <AssignInfo task={task} refreshPage={refreshPage} />;
                        case 1:
                            return <SchoolInfo task={task} refreshPage={refreshPage} />;
                        case 2:
                            return <ServicesInfo task={task} refreshPage={refreshPage} />;
                        case 3:
                            return <Timelines task={task} />;
                        default:
                            break;
                    }
                }
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
            tabs={getTabNames(user.roles[0])}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {getTabs(user.roles[0], tabValue)}
        </DetailLayouts>
    )
}

export default Task

import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { SchoolInfo, MOUInfo, AssignInfo } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames } from '../../constants/Generals'
import * as TargetsServices from './TargetsServices'
import { targetConsts } from './TargetsConfig'
import { Loading, NotFound } from '../../components'
import HistoryInfo from './panels/HistoryInfo/HistoryInfo'

function Target() {
    const { linkNames, tabNames, operations } = targetConsts
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [target, setTarget] = useState(stateData?.model)

    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (targetId) => {
        TargetsServices.getTarget(targetId)
            .then((data) => {
                if (isMounted) {
                    setTarget(data)
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

    if (!target) {
        if (!exist) {
            return <NotFound title={operations.notFound} />
        } else {
            return <Loading />
        }
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const getTabs = (role) => {
        switch (role) {
            case roleNames.manager:
                if (!target?.memorandums) {
                    return [tabNames.tab1, tabNames.tab2, tabNames.tab4]
                }
                else {
                    return [tabNames.tab1, tabNames.tab2, tabNames.tab3, tabNames.tab4]
                }
            case roleNames.supervisor:
                return [tabNames.tab1, tabNames.tab2, tabNames.tab4]
            case roleNames.salesman:
                if (!target?.memorandums) {   // ý đồ gì mà phải đảo thứ tự nhỉ?
                    return [tabNames.tab2, tabNames.tab1, tabNames.tab4]
                }
                else {
                    return [tabNames.tab2, tabNames.tab1, tabNames.tab3, tabNames.tab4]
                }
            default:
                break;
        }
    }

    const renderTargetDetail = (role) => {
        return (
            <DetailLayouts
                linkBack={linkNames.back}
                header={`${target?.level} ${target?.schoolName}`}
                subHeader={target?.schoolStatus}
                isStatus={true}
                tabs={getTabs(role)}
                tabValue={tabValue}
                handleChangeTab={handleChangeTab}
            >
                {tabValue === 0 && (
                    <SchoolInfo target={target} refreshPage={refreshPage} />
                )}
                {tabValue === 1 && (
                    <AssignInfo target={target} refreshPage={refreshPage} />
                )}
                {tabValue === 2 && (
                    <MOUInfo target={target} refreshPage={refreshPage} />
                )}
                {tabValue === 3 && (
                    <HistoryInfo />
                )}
            </DetailLayouts>
        );
    }

    return renderTargetDetail(user.roles[0])
}

export default Target

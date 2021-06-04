import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { KPIInfo, SalesmanKPIInfo } from './panels'
import { getKPIGroup, getMyKPIDetail } from './KPIsServices'
import { detailPageConsts } from './KPIsConfig'
import { Loading, NotFound } from '../../components'
import { parseDateToString } from '../../utils/DateTimes'
import { roleNames } from '../../constants/Generals'
import { useAuth } from '../../hooks/AuthContext';

function KPI() {
    const { linkNames, tabNames, operations } = detailPageConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const history = useHistory()
    const { user } = useAuth()

    const [KPI, setKPI] = useState(null)
    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (groupId) => {
        getKPIGroup(groupId).then((data) => {
            if (isMounted) {
                setKPI(data)
                // console.log('KPI data: ', data);
            }
        }).catch((error) => {
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
    const getSalesmanKPIDetails = (groupId, username) => {
        getMyKPIDetail(groupId, username).then((data) => {
            if (isMounted) {
                setKPI(data)
                console.log(`KPI data for ${username}: `, data);
            }
        }).catch((error) => {
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
        if (user.roles[0] === roleNames.manager) {
            refreshPage(id)
        } else {
            getSalesmanKPIDetails(id, user.username)
        }
        return () => {
            isMounted = false
        }
    }, [])

    if (!KPI) {
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
                return [tabNames.tab1]
            case roleNames.supervisor:
            case roleNames.salesman:
                return [tabNames.tab2]
            default:
                break;
        }
    }

    return (
        <DetailLayouts
            linkBack={linkNames.back}
            header={KPI?.groupName}
            subHeader={`
                ${parseDateToString(KPI.startDate, 'DD/MM/YYYY')} ➜ ${parseDateToString(KPI.endDate, 'DD/MM/YYYY')}
            `}
            tabs={getTabNames(user.roles[0])}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {user.roles[0] === roleNames.manager ? (
                <KPIInfo KPI={KPI} refreshPage={refreshPage} />
            ) : (
                <SalesmanKPIInfo KPI={KPI} />
            )}
        </DetailLayouts>
    )
}

export default KPI
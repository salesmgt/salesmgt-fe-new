import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { KPIInfo } from './panels'
import { getKPIGroup } from './KPIsServices'
import { detailPageConsts } from './KPIsConfig'
import { Loading, NotFound } from '../../components'
import { parseDateToString } from '../../utils/DateTimes'

function KPI() {
    const { linkNames, tabNames, operations } = detailPageConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const history = useHistory()

    const [KPI, setKPI] = useState(null)
    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (groupId) => {
        getKPIGroup(groupId).then((data) => {
            // if (isMounted) {
            setKPI(data)
            // console.log('KPI data: ', data);
            // }
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
        refreshPage(id)
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

    return (
        <DetailLayouts
            linkBack={linkNames.back}
            header={KPI?.groupName}
            subHeader={`
                ${parseDateToString(KPI.startDate, 'DD/MM/YYYY')} ➜ ${parseDateToString(KPI.endDate, 'DD/MM/YYYY')}
            `}
            tabs={[tabNames.tab1]}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            <KPIInfo KPI={KPI} refreshPage={refreshPage} />
        </DetailLayouts>
    )
}

export default KPI
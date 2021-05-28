import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { KPIInfo } from './panels'
import { getKPI } from './KPIsServices'
import { detailPageConsts } from './KPIsConfig'
import { Loading, NotFound } from '../../components'

function KPI() {
    const { linkNames, tabNames, operations } = detailPageConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [KPI, setKPI] = useState(stateData?.model)
    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (kpiId) => {
        // getKPI(kpiId)
        //     .then((data) => {
        //         if (isMounted) {
        //             setKPI(data)
        //             console.log('KPIInfo: ', data);
        //         }
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error)
        //             if (error.response.status === 403) {
        //                 setExist(false)
        //             } else {
        //                 history.push({
        //                     pathname: '/errors',
        //                     state: { error: error.response.status },
        //                 })
        //             }
        //         }
        //     })
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
        // <DetailLayouts
        //     linkBack={linkNames.back}
        //     header={`${KPI?.serviceType} for ${service?.educationLevel} ${service?.schoolName}`}
        //     subHeader={service?.status}
        //     isStatus={true}
        //     tabs={[tabNames.tab1]}
        //     tabValue={tabValue}
        //     handleChangeTab={handleChangeTab}
        // >
        //     <ServiceInfo service={service} refreshPage={refreshPage} />
        // </DetailLayouts>
        <></>
    )
}

export default KPI
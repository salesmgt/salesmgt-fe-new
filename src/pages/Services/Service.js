import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { ServiceInfo } from './panels'
import { getService } from './ServicesServices'
import { detailPageConsts } from './ServicesConfig'
import { Loading, NotFound } from '../../components'

function Service() {
    const { linkNames, tabNames, operations } = detailPageConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [service, setService] = useState(stateData?.model)

    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (serviceId) => {
        getService(serviceId)
            .then((data) => {
                if (isMounted) {
                    setService(data)
                    console.log('serviceInfo: ', data);
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

    if (!service) {
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
            header={`${service?.serviceType} for ${service?.educationLevel} ${service?.schoolName}`}
            subHeader={service?.status}
            isStatus={true}
            tabs={[tabNames.tab1]}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            <ServiceInfo service={service} refreshPage={refreshPage} />
        </DetailLayouts>
    )
}

export default Service
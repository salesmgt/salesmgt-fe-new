import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo, Timelines } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import * as ServicesServices from './ServicesServices'
import { detailPageConsts } from './ServicesConfig'
import { Loading, NotFound } from '../../components'
import { roleNames } from '../../constants/Generals'

function Service() {
    const { linkNames, tabNames, operations } = detailPageConsts
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [service, setService] = useState(stateData?.model)

    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (serviceId) => {
        ServicesServices.getService(serviceId)
            .then((data) => {
                if (isMounted) {
                    setService(data)
                    // console.log('serviceInfo: ', data);
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

    const getTabNames = (role) => {
        switch (role) {
            case roleNames.admin:
                return [tabNames.tab1, tabNames.tab2]
            case roleNames.manager:
            case roleNames.supervisor:
                return [tabNames.tab1, tabNames.tab3]
            default:
                break;
        }
    }

    const getTabs = (role, tabValue) => {
        switch (role) {
            case roleNames.admin:
                //[tabNames.tab1, tabNames.tab2]
                switch (tabValue) {
                    case 0:
                        return <GenInfo service={service} refreshPage={refreshPage} userRole={role} />
                    case 1:
                        return <RepInfo service={service} refreshPage={refreshPage} />
                    default:
                        break;
                }
            case roleNames.manager:
            case roleNames.supervisor:
                //[tabNames.tab1, tabNames.tab3]
                switch (tabValue) {
                    case 0:
                        return <GenInfo service={service} refreshPage={refreshPage} userRole={role} />
                    case 1:
                        return <Timelines />;
                    default:
                        break;
                }
            default:
                break;
        }
    }

    const getSubHeader = (role) => {
        switch (role) {
            case roleNames.admin:
                return service?.active ? 'Active' : 'Inactive'
            case roleNames.manager:
            case roleNames.supervisor:
                return service?.status
            default:
                break;
        }
    }

    return (
        <>
            {/* {user.roles[0] === roleNames.admin && ( */}
            <DetailLayouts
                linkBack={linkNames.back}
                header={`${service?.educationalLevel} ${service?.name}`}
                subHeader={getSubHeader(user.roles[0])}
                isStatus={true}
                tabs={getTabNames(user.roles[0])}
                tabValue={tabValue}
                handleChangeTab={handleChangeTab}
            >
                {getTabs(user.roles[0], tabValue)}
            </DetailLayouts>
        </>
    )
}

export default Service
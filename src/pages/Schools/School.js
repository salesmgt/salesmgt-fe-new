import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo, Timelines } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import * as SchoolsServices from './SchoolsServices'
import { schConsts } from './SchoolsConfig'
import { Loading, NotFound } from '../../components'
import { roleNames } from '../../constants/Generals'

function School() {
    const { linkNames, tabNames, operations } = schConsts
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [school, setSchool] = useState(stateData?.model)

    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (schoolId) => {
        SchoolsServices.getSchool(schoolId)
            .then((data) => {
                if (isMounted) {
                    setSchool(data)
                    // console.log('schoolInfo: ', data);
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

    if (!school) {
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
                break
        }
    }

    const getTabs = (role, tabValue) => {
        switch (role) {
            case roleNames.admin:
                //[tabNames.tab1, tabNames.tab2]
                switch (tabValue) {
                    case 0:
                        return (
                            <GenInfo
                                school={school}
                                refreshPage={refreshPage}
                                userRole={role}
                            />
                        )
                    case 1:
                        return (
                            <RepInfo
                                school={school}
                                refreshPage={refreshPage}
                            />
                        )
                    default:
                        break
                }
                break
            case roleNames.manager:
            case roleNames.supervisor:
                //[tabNames.tab1, tabNames.tab3]
                switch (tabValue) {
                    case 0:
                        return (
                            <GenInfo
                                school={school}
                                refreshPage={refreshPage}
                                userRole={role}
                            />
                        )
                    case 1:
                        return <Timelines />
                    default:
                        break
                }
                break
            default:
                break
        }
    }

    const getSubHeader = (role) => {
        switch (role) {
            case roleNames.admin:
                return school?.active ? 'Active' : 'Inactive'
            // case roleNames.manager:
            case roleNames.supervisor:
                return school?.status
            default:
                break
        }
    }

    return (
        <DetailLayouts
            linkBack={linkNames.back}
            header={`${school?.educationalLevel} ${school?.name}`}
            subHeader={getSubHeader(user.roles[0])}
            isStatus={true}
            tabs={getTabNames(user.roles[0])}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {getTabs(user.roles[0], tabValue)}
        </DetailLayouts>
    )
}

export default School

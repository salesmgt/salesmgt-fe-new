import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { SchoolInfo, MOUInfo, AssignInfo } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames, statusNames } from '../../constants/Generals'
import * as TargetSchoolsServices from './TargetSchoolsServices'
import { targetConsts } from './TargetSchoolsConfig'
import { Loading } from '../../components'

function TargetSchool() {
    const { linkNames, tabNames } = targetConsts
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data    
    const [target, setTarget] = useState(stateData?.model)

    let isMounted = true
    const refreshPage = (targetId) => {
        TargetSchoolsServices.getTarget(targetId)
            .then((data) => {
                if (isMounted) {
                    setTarget(data)
                }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage(id)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
    }, [])

    if (!target) {
        return <Loading />
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const renderTargetDetail = (role) => {
        switch (role) {
            case roleNames.manager:
                return (
                    <>
                        {!target?.memorandums ? (
                            <DetailLayouts
                                linkBack={linkNames.back}
                                header={target?.schoolName}
                                subHeader={target?.schoolStatus}
                                tabs={[tabNames.tab1, tabNames.tab2]}
                                tabValue={tabValue}
                                handleChangeTab={handleChangeTab}
                            >
                                {tabValue === 0 && (
                                    <SchoolInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                                {tabValue === 1 && (
                                    <AssignInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                            </DetailLayouts>
                        ) : (
                            <DetailLayouts
                                linkBack={linkNames.back}
                                header={target?.schoolName}
                                subHeader={target?.schoolStatus}
                                tabs={[
                                    tabNames.tab1,
                                    tabNames.tab2,
                                    tabNames.tab3,
                                ]}
                                tabValue={tabValue}
                                handleChangeTab={handleChangeTab}
                            >
                                {tabValue === 0 && (
                                    <SchoolInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                                {tabValue === 1 && (
                                    <AssignInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                                {tabValue === 2 && (
                                    <MOUInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                            </DetailLayouts>
                        )}
                    </>
                )
            case roleNames.supervisor:
                return (
                    <>
                        <DetailLayouts
                            linkBack={linkNames.back}
                            header={`${target?.level} ${target?.schoolName}`}
                            subHeader={target?.schoolStatus}
                            tabs={[tabNames.tab1, tabNames.tab2]}
                            tabValue={tabValue}
                            handleChangeTab={handleChangeTab}
                        >
                            {tabValue === 0 && (
                                <SchoolInfo
                                    target={target}
                                    refreshPage={refreshPage}
                                />
                            )}
                            {tabValue === 1 && (
                                <AssignInfo
                                    target={target}
                                    refreshPage={refreshPage}
                                />
                            )}
                        </DetailLayouts>
                    </>
                )
            case roleNames.salesman:
                return (
                    <>
                        {/* {target?.schoolStatus === statusNames.lead ? ( */}
                        {!target?.memorandums ? (
                            <DetailLayouts
                                linkBack={linkNames.back}
                                header={target?.schoolName}
                                subHeader={target?.schoolStatus}
                                tabs={[tabNames.tab2, tabNames.tab1]}
                                tabValue={tabValue}
                                handleChangeTab={handleChangeTab}
                            >
                                {tabValue === 0 && (
                                    <AssignInfo target={target} />
                                )}
                                {tabValue === 1 && (
                                    <SchoolInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                            </DetailLayouts>
                            ) : (
                            <DetailLayouts
                                linkBack={linkNames.back}
                                header={`${target?.level} ${target?.schoolName}`}
                                subHeader={target?.schoolStatus}
                                tabs={[tabNames.tab2, tabNames.tab1, tabNames.tab3]}
                                tabValue={tabValue}
                                handleChangeTab={handleChangeTab}
                            >
                                {tabValue === 0 && <AssignInfo target={target} />}
                                {tabValue === 1 && (
                                    <SchoolInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                                {tabValue === 2 && (
                                    <MOUInfo
                                        target={target}
                                        refreshPage={refreshPage}
                                    />
                                )}
                            </DetailLayouts>
                        )}
                    </>
                )
            default:
                break
        }
    }

    return renderTargetDetail(user.roles[0])
}

export default TargetSchool

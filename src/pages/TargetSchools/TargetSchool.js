import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo, AssignInfo } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames, statusNames } from '../../constants/Generals'
import * as TargetSchoolsServices from './TargetSchoolsServices'

function TargetSchool() {
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [target, setTarget] = useState(stateData?.model)

    console.log(target)

    // let isMounted = true
    // const refreshPage = (targetId) => {
    //     TargetSchoolsServices.getTargetSchools(targetId)
    //         .then((data) => {
    //             if (isMounted) {
    //                 setTarget(data)
    //             }
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     refreshPage(id)
    //     return () => {
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         isMounted = false
    //     }
    // }, [])

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <>
            {(user.roles[0] === roleNames.manager ||
                user.roles[0] === roleNames.supervisor) && (
                    <DetailLayouts
                        linkBack="Target Schools"
                        header={target.schoolName}
                        tabs={['Assign Info', 'School Info']}
                        subHeader={target.schoolYear}
                        // isStatus={false}
                        tabValue={tabValue}
                        handleChangeTab={handleChangeTab}
                    >
                        {tabValue === 0 && (
                            <AssignInfo
                                target={target}
                            // refreshPage={refreshPage}
                            />
                        )}

                        {tabValue === 1 && <GenInfo target={target} />}

                        {tabValue === 2 && (
                            <RepInfo
                                target={target}
                            // refreshPage={refreshPage}
                            />
                        )}
                    </DetailLayouts>
                )}

            {user.roles[0] === roleNames.salesman && (
                <DetailLayouts
                    linkBack="Target Schools"
                    header={target.schoolName}
                    tabs={[
                        'School Info',
                        'Assign Info',
                        'Principal Info',
                        // 'Contract Info',
                    ]}
                    subHeader={target.schoolYear}
                    // isStatus={false}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {tabValue === 0 && (
                        <AssignInfo
                            target={target}
                        // refreshPage={refreshPage}
                        />
                    )}

                    {tabValue === 1 && <GenInfo target={target} />}

                    {tabValue === 2 && (
                        <RepInfo
                            target={target}
                        // refreshPage={refreshPage}
                        />
                    )}
                </DetailLayouts>
            )}
        </>
    )
}

export default TargetSchool

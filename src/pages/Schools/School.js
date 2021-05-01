import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo } from './panels'
// import { useAuth } from '../../hooks/AuthContext'
// import { roleNames, statusNames } from '../../constants/Generals'
import * as SchoolsServices from './SchoolsServices'
import { schConsts } from './SchoolsConfig'
import { Loading } from '../../components'

function School() {
    const { linkNames, tabNames } = schConsts
    const [tabValue, setTabValue] = useState(0)

    // const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [school, setSchool] = useState(stateData?.model)

    let isMounted = true
    const refreshPage = (schoolId) => {
        SchoolsServices.getSchool(schoolId)
            .then((data) => {
                if (isMounted) {
                    setSchool(data)
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

    if (!school) {
        return <Loading />
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    // const getTabsByStatus = (status) => {
    //     switch (status) {
    //         case statusNames.lead:
    //             return ['General Info', 'Principal Info']
    //         case statusNames.customer:
    //             return ['General Info', 'Principal Info', 'Contracts Info']
    //         case statusNames.pending:
    //             return ['General Info', 'Principal Info', 'Contracts Info']
    //         default:
    //             break
    //     }
    // }

    // const currStatus = 'Ngưng hợp tác'
    // console.log('detail status', school.status)

    return (
        <>
            {/* {user.roles[0] === roleNames.admin && ( */}
            <DetailLayouts
                linkBack={linkNames.back}
                header={`${school?.educationalLevel} ${school?.name}`}
                subHeader={school?.active}
                isStatus={true}
                tabs={[tabNames.tab1, tabNames.tab2]}
                tabValue={tabValue}
                handleChangeTab={handleChangeTab}
            >
                {tabValue === 0 && (
                    <GenInfo school={school} refreshPage={refreshPage} />
                )}

                {tabValue === 1 && (
                    <RepInfo school={school} refreshPage={refreshPage} />
                )}
            </DetailLayouts>
            {/* )} */}
            {/* {user.roles[0] === roleNames.manager && (
                <DetailLayouts
                    linkBack="Schools"
                    header={school?.name}
                    subHeader={school?.status}
                    // isStatus={true}
                    tabs={getTabsByStatus(school.status)}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {tabValue === 0 && (
                        <GenInfo school={school} refreshPage={refreshPage} />
                    )}

                    {tabValue === 1 && (
                        <RepInfo school={school} refreshPage={refreshPage} />
                    )}

                    {tabValue === 2 && (
                        <RepInfo school={school} refreshPage={refreshPage} />
                    )}
                </DetailLayouts>
            )}
            {user.roles[0] === roleNames.supervisor && (
                <DetailLayouts
                    linkBack="Schools"
                    header={school?.name}
                    subHeader={school?.status}
                    // isStatus={true}
                    tabs={['General Info', 'Principal Info']}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {tabValue === 0 && (
                        <GenInfo school={school} refreshPage={refreshPage} />
                    )}

                    {tabValue === 1 && (
                        <RepInfo school={school} refreshPage={refreshPage} />
                    )}
                </DetailLayouts>
            )} */}
        </>
    )
}

export default School
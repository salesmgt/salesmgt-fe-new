import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames, statusNames } from '../../constants/Generals'
import * as SchoolsServices from './SchoolsServices'

function School() {
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

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

    // const repData = {
    //     name: data?.reprName,
    //     reprIsMale: data?.reprIsMale,
    //     phone: data?.reprPhone,
    //     email: data?.reprEmail,
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage(id)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
    }, [])

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const getTabsByStatus = (status) => {
        switch (status) {
            case statusNames.lead:
                return ['General Info', 'Principal Info']
            case statusNames.customer:
                return ['General Info', 'Principal Info', 'Contracts Info']
            case statusNames.pending:
                return ['General Info', 'Principal Info', 'Contracts Info']
            default:
                break
        }
    }

    // const currStatus = 'Ngưng hợp tác'
    // console.log('detail status', school.status)

    return (
        <>
            {user.roles[0] === roleNames.admin && (
                <DetailLayouts
                    linkBack="Schools"
                    header={school?.name}
                    subHeader={school?.active}
                    isStatus={true}
                    tabs={['General Info', 'Principal Info']}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {/* General Info */}
                    {tabValue === 0 && (
                        <GenInfo school={school} refreshPage={refreshPage} />
                    )}

                    {/* Principal Info */}
                    {tabValue === 1 && (
                        <RepInfo school={school} refreshPage={refreshPage} />
                    )}
                </DetailLayouts>
            )}
            {user.roles[0] === roleNames.manager && (
                <DetailLayouts
                    linkBack="Schools"
                    header={school?.name}
                    subHeader={school?.status}
                    // isStatus={true}
                    tabs={getTabsByStatus(school.status)}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {/* General Info */}
                    {tabValue === 0 && (
                        <GenInfo school={school} refreshPage={refreshPage} />
                    )}

                    {/* Principal Info */}
                    {tabValue === 1 && (
                        <RepInfo school={school} refreshPage={refreshPage} />
                    )}

                    {/* Contract Info */}
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
                    {/* General Info */}
                    {tabValue === 0 && (
                        <GenInfo school={school} refreshPage={refreshPage} />
                    )}

                    {/* Principal Info */}
                    {tabValue === 1 && (
                        <RepInfo school={school} refreshPage={refreshPage} />
                    )}
                </DetailLayouts>
            )}
        </>
    )
}

export default School

// const schData = {
//     id: data?.id,
//     name: data?.name,
//     address: data?.address,
//     district: data?.district,

//     educationalLevel: data?.educationalLevel,
//     type: data?.type,
//     scale: data?.scale,
//     phone: data?.phone,

//     description: data?.description,
//     status: data?.status,

//     active: data?.active,

//     reprName: data?.reprName,
//     reprIsMale: data?.reprIsMale,
//     reprPhone: data?.reprPhone,
//     reprEmail: data?.reprEmail,
// }

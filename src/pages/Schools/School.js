import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NotFound } from '../../components'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo } from './panels'
import { useAuth } from '../../hooks/AuthContext'

function School() {
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const location = useLocation()

    const data = location.state?.data

    if (!data) {
        return <NotFound />
    }

    const schData = {
        id: data?.id,
        name: data?.name,
        address: data?.address,
        district: data?.district,

        educationalLevel: data?.educationalLevel,
        type: data?.type,
        scale: data?.scale,
        phone: data?.phone,

        description: data?.description,
        status: data?.status,

        active: data?.active,

        reprName: data?.reprName,
        reprIsMale: data?.reprIsMale,
        reprPhone: data?.reprPhone,
        reprEmail: data?.reprEmail,
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const getTabsByStatus = (status) => {
        switch (status) {
            case 'Chưa hợp tác':
                return ['General Info', 'Principal Info']
            case 'Đang hợp tác':
                return ['General Info', 'Principal Info', 'Contracts Info']
            case 'Ngưng hợp tác':
                return ['General Info', 'Principal Info', 'Contracts Info']
            default:
                throw new Error()
        }
    }

    const currStatus = 'Ngưng hợp tác'

    return (
        <>
            {user.roles[0] === 'ADMIN' && (
                <DetailLayouts
                    linkBack="Schools"
                    header={data.name}
                    subHeader={data.active}
                    isStatus={true}
                    tabs={['General Info', 'Principal Info']}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {/* General Info */}
                    {tabValue === 0 && <GenInfo schData={schData} />}

                    {/* Principal Info */}
                    {tabValue === 1 && <RepInfo schData={schData} />}
                </DetailLayouts>
            )}
            {user.roles[0] === 'SALES MANAGER' && (
                <DetailLayouts
                    linkBack="Schools"
                    header={data.name}
                    subHeader={data.status}
                    // isStatus={true}
                    tabs={getTabsByStatus(currStatus)}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {/* General Info */}
                    {tabValue === 0 && <GenInfo schData={schData} />}

                    {/* Principal Info */}
                    {tabValue === 1 && <RepInfo schData={schData} />}

                    {/* Contract Info */}
                    {tabValue === 2 && <RepInfo schData={schData} />}
                </DetailLayouts>
            )}
            {user.roles[0] === 'SALES SUPERVISOR' && (
                <DetailLayouts
                    linkBack="Schools"
                    header={data.name}
                    subHeader={data.status}
                    // isStatus={true}
                    tabs={['General Info', 'Principal Info']}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                >
                    {/* General Info */}
                    {tabValue === 0 && <GenInfo schData={schData} />}

                    {/* Principal Info */}
                    {tabValue === 1 && <RepInfo schData={schData} />}
                </DetailLayouts>
            )}
        </>
    )
}

export default School

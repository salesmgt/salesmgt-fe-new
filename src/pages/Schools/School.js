import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, RepInfo } from './panels'

function School() {
    const [tabValue, setTabValue] = useState(0)

    const location = useLocation()

    const data = location.state?.data

    const schData = {
        name: data.name,
        active: data.active,
        addr: data.address,
        tel: data.phone,
        email: data.email,
        dist: data.district,
        eduLvl: data.educationalLevel,
        scale: data.scale,
        status: data.status,
        type: data.type,
        des: data.description,
    }

    const repData = {
        name: data.reprName,
        gender: data.reprGender,
        phone: data.reprPhone,
        email: data.reprEmail,
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            header={data.name}
            tabs={['General Info', 'Pricipal Info']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {/* General Info */}
            {tabValue === 0 && <GenInfo data={schData} />}

            {/* Pricipal Info */}
            {tabValue === 1 && <RepInfo data={repData} />}
        </DetailLayouts>
    )
}

export default School

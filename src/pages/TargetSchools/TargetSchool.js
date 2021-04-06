import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, AsgInfo } from './panels'

function TargetSchool() {
    const [tabValue, setTabValue] = useState(0)

    const location = useLocation()

    const data = location.state?.data

    const schData = {
        schName: data.schoolName,
        dist: data.district,
        year: data.schoolYear,
        // active: data.active,
        // addr: data.address,
        // tel: data.phone,
        // email: data.email,
        // eduLvl: data.educationalLevel,
        // scale: data.scale,
        // status: data.status,
        // type: data.type,
        // des: data.description,
        repName: data.reprName,
        repGender: data.reprGender,
        repPhone: data.reprPhone,
        repEmail: data.reprEmail,
    }

    // const repData = {
    //     name: data.reprName,
    //     gender: data.reprGender,
    //     phone: data.reprPhone,
    //     email: data.reprEmail,
    // }

    const asgData = {
        avatar: data.avatar,
        name: data.username,
        fullName: data.fullName,
        phone: data.userPhone,
        email: data.userEmail,
        purp: data.purpose,
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack="Target Schools"
            header={data.schoolName}
            tabs={['General Info', 'Assign Info']}
            subHeader={data.schoolYear}
            isStatus={false}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {/* General Info */}
            {tabValue === 0 && <GenInfo data={schData} />}

            {/* Assign Info */}
            {tabValue === 1 && <AsgInfo data={asgData} />}
        </DetailLayouts>
    )
}

export default TargetSchool

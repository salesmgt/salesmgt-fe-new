import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo, AsgInfo } from './panels'
import { NotFound } from '../../components'

function TargetSchool() {
    const [tabValue, setTabValue] = useState(0)

    const location = useLocation()

    const data = location.state?.data

    if (!data) {
        return <NotFound />
    }
    console.log(data)
    const schData = {
        schName: data?.schoolName,
        addr: data?.address,
        dist: data?.district,
        year: data?.schoolYear,
        level: data?.level,
        scale: data?.schoolScale,
        status: data?.schoolStatus,
        type: data?.schoolType,
        des: data?.schoolDescription,
        note: data?.note,

        repName: data?.reprName,
        repGender: data?.reprGender,
        repPhone: data?.reprPhone,
        repEmail: data?.reprEmail,
    }

    const asgData = {
        avatar: data?.avatar,
        name: data?.username,
        fullName: data?.fullName,
        phone: data?.userPhone,
        email: data?.userEmail,
        purp: data?.purpose,
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

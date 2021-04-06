import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo } from './panels'

function Account() {
    const [tabValue, setTabValue] = useState(0)

    const location = useLocation()

    const data = location.state?.data

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack='Accounts'
            avatar={data.avatar}
            header={data.fullName}
            tabs={['General Info']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {/* General Info */}
            {tabValue === 0 && <GenInfo data={data} />}
        </DetailLayouts>
    )
}

export default Account

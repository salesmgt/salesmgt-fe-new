import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo } from './panels'
import * as AccountsServices from './AccountsServices'

function Account() {
    const [tabValue, setTabValue] = useState(0)

    const location = useLocation()
    const history = useHistory()

    const data = location.state?.data
    const [accountDTO, setAccountDTO] = useState(data?.accountDTO)

    console.log('Data từ bảng: ', data);

    const refreshPage = (username) => {
        // console.log('username nè = ', username)
        AccountsServices.getAccount(username).then((res) => {
            setAccountDTO(res)

            console.log('Get one: ', res);
        }).catch(error => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack="Accounts"
            avatar={accountDTO?.avatar}
            header={accountDTO?.fullName}
            subHeader={accountDTO?.active}
            isStatus={true}
            tabs={['General Info']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {/* General Info */}
            {tabValue === 0 && <GenInfo data={accountDTO} refreshPage={refreshPage} />}
        </DetailLayouts>
    )
}

export default Account

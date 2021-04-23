import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo } from './panels'
import * as AccountsServices from './AccountsServices'

function Account() {
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [account, setAccount] = useState(stateData?.model)

    let isMounted = true
    const refreshPage = (username) => {
        AccountsServices.getAccount(username)
            .then((data) => {
                if (isMounted) {
                    setAccount(data)
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

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack="Accounts"
            avatar={account?.avatar}
            header={account?.fullName}
            subHeader={account?.active}
            isStatus={true}
            tabs={['General Info']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {tabValue === 0 && (
                <GenInfo account={account} refreshPage={refreshPage} />
            )}
        </DetailLayouts>
    )
}

export default Account

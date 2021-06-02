import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo } from './panels'
import * as AccountsServices from './AccountsServices'
import { acctConsts } from './AccountsConfig'
import { Loading, NotFound } from '../../components'

function Account() {
    const { linkNames, tabNames, operations } = acctConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    // const stateData = location.state?.data
    const [account, setAccount] = useState(null)    //stateData?.model

    const [exist, setExist] = useState(true)

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
                    if (error.response.status === 403) {
                        setExist(false)
                    } else {
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
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

    if (!account) {
        if (!exist) {
            return <NotFound title={operations.notFound} />
        } else {
            return <Loading />
        }
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack={linkNames.back}
            avatar={
                account?.avatar
                    ? account?.avatar
                    : account?.fullName.split(' ').pop()[0]
            }
            checkAvatar={account?.avatar ? true : false}
            header={account?.fullName}
            subHeader={account?.active ? 'Active' : 'Inactive'}
            isStatus={true}
            tabs={[tabNames.tab1]}
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

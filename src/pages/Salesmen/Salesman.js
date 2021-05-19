import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { GenInfo } from './panels'
import { getSalesman } from './SalesmenServices'
import { acctConsts } from './SalesmenConfig'
import { Loading, NotFound } from '../../components'

function Salesman() {
    const { linkNames, tabNames, operations } = acctConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [salesman, setSalesman] = useState(stateData?.model)

    const [exist, setExist] = useState(true)

    let isMounted = true
    const refreshPage = (username) => {
        getSalesman(username)
            .then((data) => {
                if (isMounted) {
                    setSalesman(data)
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

    if (!salesman) {
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
                salesman?.avatar
                    ? salesman?.avatar
                    : salesman?.fullName.split(' ').pop()[0]
            }
            checkAvatar={salesman?.avatar ? true : false}
            header={salesman?.fullName}
            subHeader={salesman?.active ? 'Active' : 'Inactive'}
            isStatus={true}
            tabs={[tabNames.tab1]}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {tabValue === 0 && (
                <GenInfo salesman={salesman} refreshPage={refreshPage} />
            )}
        </DetailLayouts>
    )
}

export default Salesman

import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { AssignInfo, ReportInfo } from './panels'
import moment from 'moment'
import * as ReportsServices from './ReportsServices'
import { rpConsts } from './ReportsConfig'
import { Loading } from '../../components'

function Report() {
    const { linkNames, tabNames } = rpConsts
    const [tabValue, setTabValue] = useState(0)

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [report, setReport] = useState(stateData?.model)

    let isMounted = true
    const refreshPage = (reportId) => {
        ReportsServices.getReport(reportId)
            .then((data) => {
                if (isMounted) {
                    setReport(data)
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

    if (!report) {
        return <Loading />
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack={linkNames.back}
            header={`${report?.level} ${report?.schoolName}`}
            subHeader={moment(report?.date).format('DD/MM/YYYY')}
            tabs={[tabNames.tab1, tabNames.tab2]}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {tabValue === 0 && (
                <ReportInfo report={report} refreshPage={refreshPage} />
            )}

            {tabValue === 1 && <AssignInfo report={report} />}
        </DetailLayouts>
    )
}

export default Report

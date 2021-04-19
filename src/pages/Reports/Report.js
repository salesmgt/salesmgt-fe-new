import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import { SchoolInfo, ReportInfo, AsgInfo } from './panels'
import { useAuth } from '../../hooks/AuthContext'
import { roleNames, statusNames } from '../../utils/Constants'
import * as ReportsServices from './ReportsServices'

function Report() {
    const [tabValue, setTabValue] = useState(0)

    const { user } = useAuth()

    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()

    const stateData = location.state?.data
    const [report, setReport] = useState(stateData?.model)

    console.log('data', report)

    //   let isMounted = true
    //   const refreshPage = (reportId) => {
    //       ReportsServices.getReport(reportId)
    //           .then((data) => {
    //               if (isMounted) {
    //                   setSchool(data)
    //               }
    //           })
    //           .catch((error) => {
    //               if (error.response) {
    //                   console.log(error)
    //                   history.push({
    //                       pathname: '/errors',
    //                       state: { error: error.response.status },
    //                   })
    //               }
    //           })
    //   }

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   useEffect(() => {
    //       refreshPage(id)
    //       return () => {
    //           // eslint-disable-next-line react-hooks/exhaustive-deps
    //           isMounted = false
    //       }
    //   }, [])

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <DetailLayouts
            linkBack="Reports"
            // avatar={report?.avatar}
            header={report?.schoolName}
            subHeader={report?.date}
            // isStatus={true}
            tabs={['Report Info', 'School Info', 'Assign Info']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {/* Report Info */}
            {tabValue === 0 && (
                <ReportInfo
                    report={report}
                    // refreshPage={refreshPage}
                />
            )}
            {/* School Info */}
            {tabValue === 1 && (
                <SchoolInfo
                    report={report}
                    // refreshPage={refreshPage}
                />
            )}
            {/* Assign Info */}
            {tabValue === 2 && (
                <AsgInfo
                    report={report}
                    // refreshPage={refreshPage}
                />
            )}
        </DetailLayouts>
    )
}

export default Report

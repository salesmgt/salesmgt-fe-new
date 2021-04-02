import React from 'react'
import { Button } from '@material-ui/core'
import { useRouteMatch, Link } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
// import * as SchoolsServices from './SchoolsServices'

function Schools() {
    const { url } = useRouteMatch()
    const [tabValue, setTabValue] = React.useState(0)

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    // const id = 'abc'

    return (
        // <div>
        //     <Button component={Link} to={`${url}/${id}`}>
        //         Go to Detail
        //     </Button>
        // </div>

        <DetailLayouts
            header="FPT University"
            tabs={['School Detail', 'Actions', 'abc']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {tabValue === 0 && (
                <div className="">
                    <h1>Item one</h1>
                </div>
            )}
            {tabValue === 1 && (
                <div className="">
                    <h1>Item two</h1>
                </div>
            )}
            {tabValue === 2 && (
                <div className="">
                    <h1>Item three</h1>
                </div>
            )}
        </DetailLayouts>
    )
}

export default Schools

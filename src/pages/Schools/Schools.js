import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './SchoolsConfig'
import { useSchool } from './hooks/SchoolContext'
import * as SchoolsServices from './SchoolsServices'
import classes from './Schools.module.scss'

function Schools() {
    const history = useHistory()

    const { params } = useSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState({})

    function refreshSchools(
        page = 0,
        limit = 10,
        column = 'id',
        direction = 'asc',
        searchKey,
        listFilters
    ) {
        SchoolsServices.getSchools(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters
        )
            .then((res) => {
                setData(res.data)
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

    useEffect(() => {
        refreshSchools(page, limit, column, direction, searchKey, listFilters)
    }, [params])

    // let isMounted = true
    // const refreshPage = () => {
    //     SchoolsServices.getSchools()
    //         .then((data) => {
    //             if (isMounted) {
    //                 setData(data)
    //             }
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // useEffect(() => {
    //     refreshPage()
    //     return () => {
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         isMounted = false
    //     }
    // }, [location.pathname])

    if (!data) {
        // return <NotFound title="Schools not found!" />
        return null
    }

    return (
        <div className={classes.panel}>
            {/* <Fab size="medium" variant="extended" color="primary" className={classes.fab}>
                <MdAdd fontSize="large" />&nbsp; Add School
            </Fab> */}
            <Filters className={classes.filter} />
            <Tables
                className={classes.table}
                columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            />
        </div>
    )
}

export default Schools

//================================================================================================
//====================================Detail Page====================================
// import React from 'react'
// import { Button } from '@material-ui/core'
// import { useRouteMatch, Link } from 'react-router-dom'
// import { DetailLayouts } from '../../layouts'
// // import * as SchoolsServices from './SchoolsServices'

// function Schools() {
//     const { url } = useRouteMatch()
//     const [tabValue, setTabValue] = React.useState(0)

//     const handleChangeTab = (event, value) => {
//         setTabValue(value)
//     }

//     // const id = 'abc'

//     return (
//         // <.div>
//         //     <Button component={Link} to={`${url}/${id}`}>
//         //         Go to Detail
//         //     </Button>
//         // </.div>

//         <DetailLayouts
//             header="FPT University"
//             tabs={['School Detail', 'Actions', 'abc']}
//             tabValue={tabValue}
//             handleChangeTab={handleChangeTab}
//         >
//             {tabValue === 0 && (
//                 <.div className="">
//                     <.h1>Item one</.h1>
//                 </.div>
//             )}
//             {tabValue === 1 && (
//                 <.div className="">
//                     <.h1>Item two</.h1>
//                 </.div>
//             )}
//             {tabValue === 2 && (
//                 <.div className="">
//                     <.h1>Item three</.h1>
//                 </.div>
//             )}
//         </DetailLayouts>

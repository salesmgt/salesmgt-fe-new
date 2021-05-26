import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { getColumns } from './SchoolsConfig'
import { useSchool } from './hooks/SchoolContext'
import * as SchoolsServices from './SchoolsServices'
import { Loading } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import classes from './Schools.module.scss'

function Schools() {
    const history = useHistory()
    const { user } = useAuth()
    const columns = getColumns(user.roles[0])
    const { params } = useSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)
    // const [newData, setNewData] = useState(null)
    // const [newSchooslList, setNewSchooslList] = useState([])

    let isMounted = true
    const refreshPage = (
        page = 0,
        limit = 10,
        column = 'schoolId',
        direction = 'asc',
        searchKey,
        listFilters,
        userRole
    ) => {
        SchoolsServices.getSchools(
            page,
            limit,
            column,
            direction,
            searchKey,
            listFilters,
            userRole
        )
            .then((res) => {
                if (isMounted) {
                    setData(res.data)
                    // const schoolList = res.data.list;
                    // setNewSchooslList([])
                    // schoolList.forEach(school => {
                    //     getSchoolTimeline(school)
                    // });
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

    // const getSchoolTimeline = (school) => {
    //     // const customSchoolData = { ...school }
    //     SchoolsServices.getTimeline(school?.schoolId).then(res => {
    //         if (isMounted) {
    //             if (res.length > 0) {
    //                 // setHasTimeline(false)
    //                 // customSchoolData = { ...school, hasTimeline: true }
    //                 // schooslList = [...schooslList, { ...school, hasTimeline: true }]
    //                 setNewSchooslList(newSchooslList.push({ ...school, hasTimeline: true }))
    //             } else {
    //                 setNewSchooslList(newSchooslList.push({ ...school, hasTimeline: false }))
    //             }
    //             // console.log('trong khi getTimeline: ', newSchooslList);
    //             setNewData(newSchooslList)
    //         }
    //     }).catch((error) => {
    //         if (error.response) {
    //             console.log(error)
    //             history.push({
    //                 pathname: '/errors',
    //                 state: { error: error.response.status },
    //             })
    //         }
    //     })
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // setNewSchooslList([])
        refreshPage(page, limit, column, direction, searchKey, listFilters, user.roles[0])
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
            // setData(null)
        }
    }, [params])

    if (!data) {
        return <Loading />
    }

    // console.log('newData = ', newData)

    return (
        <div className={classes.panel}>
            {/* <Fab size="medium" variant="extended" color="primary" className={classes.fab}>
                <MdAdd fontSize="large" />&nbsp; Add School
            </Fab> */}
            <Filters className={classes.filter} refreshAPI={refreshPage} />
            <Tables
                className={classes.table}
                columns={columns}
                rows={data?.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
                refreshAPI={refreshPage}
            />
        </div>
    )
}

export default Schools

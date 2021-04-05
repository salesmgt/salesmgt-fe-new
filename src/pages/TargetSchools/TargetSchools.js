import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './TargetSchoolsConfig';
import { useTargetSchool } from './hooks/TargetSchoolContext'
import * as TargetSchoolsServices from './TargetSchoolsServices'
import classes from './TargetSchools.module.scss'

function TargetSchools() {
    // console.log('aaaaaaaaaaaaaaaaa rerender')
    const history = useHistory()

    const { params } = useTargetSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params
    // const { schoolYear, district, PIC, purpose, level, scale, type } = listFilters

    const [data, setData] = useState({})

    function onGetTargets(page = 0, limit = 10, column = "id", direction = "asc", searchKey, listFilters) {
        TargetSchoolsServices.getTargetSchools(page, limit, column, direction, searchKey, listFilters).then((res) => {
            setData(res.data)
            // console.log('new list: ', res.data);
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

    useEffect(() => {
        onGetTargets(page, limit, column, direction, searchKey, listFilters)
    }, [params])  // params

    if (!data) {
        return null;
    }
    // const { list } = data   // totalElements, totalPage
    // const rows = list
    // console.log('list trường: ', rows)
    // console.log("TargetSchool.js - params: ", params);
    // console.log("TargetSchool.js - data: ", data.list);

    return (
        // <TargetSchoolProvider>        onGetTargets={onGetTargets}
        <div className={classes.panel}>
            <Filters className={classes.filter} />
            <Tables columns={columns}
                rows={data.list}
                totalRecord={data.totalElements}
                totalPage={data.totalPage}
            // className={classes.table}
            // onGetTargets={onGetTargets}
            />
            {/* <Paper
                    variant="outlined"
                    style={{ width: '100%', height: 407, backgroundColor: 'white' }}
                >
                </Paper> */}
        </div>
        // </TargetSchoolProvider>
    )
}

export default TargetSchools
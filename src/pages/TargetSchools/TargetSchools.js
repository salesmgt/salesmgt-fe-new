import React, {useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Filters, Tables } from './components'
import { columns } from './TargetSchoolsConfig';
import * as TargetSchoolsServices from './TargetSchoolsServices'
import classes from './TargetSchools.module.scss'
import TargetSchoolProvider from './hooks/TargetSchoolContext'

function TargetSchools() {
    const history = useHistory()

    const [data, setData] = useState(null)

    const refreshTargetSchools = () => {
        TargetSchoolsServices.getTargetSchools().then((data) => {
           setData(data)    
        }).catch (error=> {
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
        refreshTargetSchools()
       
    }, [])
    
    if (!data) {
        return null
    }

    const { list, totalElements, totalPage } = data
    const rows = list
    console.log('list trường: ', list)

    return (
        <TargetSchoolProvider>
            <div className={classes.wrapper}>
                <Filters className={classes.filter}/>
                <Tables columns={columns} rows={rows} className={classes.table} />
                {/* <Paper
                    variant="outlined"
                    style={{ width: '100%', height: 407, backgroundColor: 'white' }}
                >
                </Paper> */}
            </div>
        </TargetSchoolProvider>
    )
}

export default TargetSchools
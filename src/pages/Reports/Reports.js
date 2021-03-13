import React from 'react'
import { Tables } from '../../components'
import { data } from './ReportsConfig'

function Reports() {
    return (
        <div>
            <Tables data={data} />
        </div>
    )
}

export default Reports

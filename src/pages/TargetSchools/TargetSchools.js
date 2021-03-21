import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Filters, Tables } from './components'
import classes from './TargetSchools.module.scss'

function TargetSchools() {
    return (
        <div className={classes.wrapper}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <Filters />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <Tables />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: '1rem'}}>
                    <Paper
                        variant="outlined"
                        style={{ width: '100%', height: 407, backgroundColor: 'white' }}
                    >
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default TargetSchools
import React from 'react'
import { LinearProgress, Typography } from '@material-ui/core'
import classes from './Loading.module.scss'

function Loading() {
    return (
        <div className={classes.wrapper}>
            <Typography className={classes.loadingTxt}>Loading...</Typography>
            <LinearProgress className={classes.progress} />
        </div>
    )
}

export default Loading

import React from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import classes from './CardInfo.module.scss'

function CardInfo(props) {
    const { title, color, data, des } = props

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title} color="inherit">
                    {title}
                </Typography>
            </div>
            <Divider />
            <div className={classes.body}>
                <Typography className={classes.detail} style={{ color: color }}>
                    {data.detail}
                </Typography>
                <Typography className={classes.subDetail}>{des}</Typography>
            </div>
        </Paper>
    )
}

export default React.memo(CardInfo)

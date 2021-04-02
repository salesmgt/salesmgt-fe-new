import React, { useEffect, useRef, useState } from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import classes from './CardNow.module.scss'

function CardNow() {
    const [time, setTime] = useState(moment())
    const intervalRef = useRef()

    useEffect(() => {
        intervalRef.current = setInterval(update, 1000)
        return () => {
            clearInterval(intervalRef.current)
        }
    })

    function update() {
        setTime(moment())
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title} color="inherit">
                    {time.format('dddd, HH:mm:ss')}
                </Typography>
            </div>
            <Divider />
            <div className={classes.body}>
                <Typography className={classes.month}>
                    {time.format('MMMM')}
                </Typography>
                <Typography className={classes.day}>
                    {time.format('D')}
                </Typography>
                <Typography className={classes.year}>
                    {time.format('Y')}
                </Typography>
            </div>
        </Paper>
        // <Card className={classes.card}>
        //     <AppBar className={classes.appBar} position="static" elevation={0}>
        //         <Toolbar className={classes.toolbar}>
        //             <Typography className={classes.timeHour} color="inherit">
        //                 {time.format('dddd, HH:mm:ss')}
        //             </Typography>
        //         </Toolbar>
        //     </AppBar>
        //     <CardContent className={classes.content}>
        //         <Typography className={classes.timeMonth}>
        //             {time.format('MMMM')}
        //         </Typography>
        //         <Typography className={classes.timeDay}>
        //             {time.format('D')}
        //         </Typography>
        //         <Typography className={classes.timeYear}>
        //             {time.format('Y')}
        //         </Typography>
        //     </CardContent>
        // </Card>
    )
}

export default React.memo(CardNow)

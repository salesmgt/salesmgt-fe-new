import React from 'react'
import clsx from 'clsx'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Cards, Charts } from '.'
// import classes from '../styles/Dashboards.module.scss'

const useStyles = makeStyles((theme) => ({
    // paper: {
    //     padding: theme.spacing(2),
    //     display: 'flex',
    //     overflow: 'auto',
    //     flexDirection: 'column',
    // },
    // fixedHeight: {
    //     height: 240,
    // },
}))

// function createCardsData(title, des, date, link) {
//     return { title, des, date, link }
// }

// const cardsData = [
//     createCardsData('00:00', 0),
//     createCardsData('03:00', 300),
//     createCardsData('06:00', 600),
// ]

function Dashboards() {
    const classes = useStyles()

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
        <Grid container>
            <Grid item container xs={12} md={12} lg={10} spacing={3}>
                {/* Cards */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Cards />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Cards />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Cards />
                    </Paper>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Charts />
                    </Paper>
                </Grid>
            </Grid>


            {/* Ha nghich */}
            <Grid item xs={12} md={12} lg={2}>
                <Paper className={fixedHeightPaper}>
                    <Cards />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Dashboards

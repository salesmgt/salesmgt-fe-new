import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'
import { Grid, Typography } from '@material-ui/core'
import { CardNow, CardRanks, CardJack, MixedCharts } from './components'
import { Animation, AnimationGroup } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import * as DashboardsServices from './DashboardsServices'
import { rankData, chartData as ChartData, cardData } from './DashboardsConfig'
import classes from './Dashboards.module.scss'

function Dashboards() {
    const { user } = useAuth()
    const { username, roles } = user

    const location = useLocation()
    const history = useHistory()

    const [userData, setUserData] = useState(null)

    const [chartData, setChartData] = useState([])

    const [chartView, setChartView] = useState([])

    let isMounted = true
    const refreshPage = () => {
        DashboardsServices.getUser(username)
            .then((data) => {
                if (isMounted) {
                    setUserData(data)
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
        new Promise((res, rej) => {
            setTimeout(() => {
                if (isMounted) {
                    setChartData(ChartData)
                    setChartView(ChartData.datasets[0])
                }
            }, 2000)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage()
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
    }, [location.pathname])

    if (!userData) {
        return null
    }

    const { fullName, birthDate } = userData

    const generateGreetings = () => {
        const currHour = moment().format('kk')
        const currDay = moment().format('DD/MM')
        const specialDay = moment(birthDate).format('DD/MM')

        if (currDay === specialDay) {
            return 'Happy birthday'
        } else {
            if (currHour >= 4 && currHour < 12) {
                return 'Good morning'
            }
            if (currHour >= 12 && currHour < 17) {
                return 'Good afternoon'
            }
            if (currHour >= 17 && currHour < 23) {
                return 'Good evening'
            }
            if (
                (currHour >= 23 && currHour <= 24) ||
                (currHour > 0 && currHour < 4)
            ) {
                return 'Good night'
            }
        }
        return 'Hello'
    }

    const handleChartView = (keyName) => {
        // eslint-disable-next-line array-callback-return
        chartData?.datasets.map((val) => {
            if (val.name === keyName) {
                setChartView(val)
            }
        })
    }

    const renderLeftBody = (role) => {
        switch (role) {
            case 'SALES MANAGER':
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total Lead"
                                color="rgba(33, 150, 243, 1)"
                                isOpts={true}
                                ranges={cardData.manager.targetLeadSum.ranges}
                                datasets={
                                    cardData.manager.targetLeadSum.datasets
                                }
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total Potential Lead"
                                color="rgba(255, 152, 0, 1)"
                                isOpts={true}
                                ranges={cardData.manager.potLeadsum.ranges}
                                datasets={cardData.manager.potLeadsum.datasets}
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total New Lead"
                                color="rgba(76, 175, 80, 1)"
                                isOpts={true}
                                ranges={cardData.manager.newLeadSum.ranges}
                                datasets={cardData.manager.newLeadSum.datasets}
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <MixedCharts
                                title="Sales Targets Result"
                                labels={chartData.labels}
                                chartView={chartView}
                                handleChartView={handleChartView}
                            />
                        </Grid>
                    </Grid>
                )
            case 'SALES SUPERVISOR':
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total Lead"
                                color="rgba(33, 150, 243, 1)"
                                isOpts={true}
                                ranges={cardData.manager.targetLeadSum.ranges}
                                datasets={
                                    cardData.manager.targetLeadSum.datasets
                                }
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total Potential Lead"
                                color="rgba(255, 152, 0, 1)"
                                isOpts={true}
                                ranges={cardData.manager.potLeadsum.ranges}
                                datasets={cardData.manager.potLeadsum.datasets}
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total New Lead"
                                color="rgba(76, 175, 80, 1)"
                                isOpts={true}
                                ranges={cardData.manager.newLeadSum.ranges}
                                datasets={cardData.manager.newLeadSum.datasets}
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <MixedCharts
                                title="Sales Targets Result"
                                labels={chartData.labels}
                                chartView={chartView}
                                handleChartView={handleChartView}
                            />
                        </Grid>
                    </Grid>
                )
            case 'SALESMAN':
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total Potential Lead"
                                color="rgba(33, 150, 243, 1)"
                                isOpts={false}
                                ranges={cardData.salesman.targetLeadSum.ranges}
                                datasets={
                                    cardData.salesman.targetLeadSum.datasets
                                }
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total Potential Lead"
                                color="rgba(255, 152, 0, 1)"
                                isOpts={false}
                                ranges={cardData.salesman.potLeadsum.ranges}
                                datasets={cardData.salesman.potLeadsum.datasets}
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <CardJack
                                title="Total New Lead"
                                color="rgba(76, 175, 80, 1)"
                                isOpts={false}
                                ranges={cardData.salesman.newLeadSum.ranges}
                                datasets={cardData.salesman.newLeadSum.datasets}
                                des="Targets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <MixedCharts
                                title="Sales Targets Result"
                                labels={chartData.labels}
                                chartView={chartView}
                                handleChartView={handleChartView}
                            />
                        </Grid>
                    </Grid>
                )
            default:
                throw new Error()
        }
    }

    return (
        <div className={classes.wrapper}>
            <Grid container spacing={0}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={9}
                    className={classes.leftSide}
                >
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.header}
                        >
                            <Animation
                                animation="transition.slideLeftIn"
                                delay={300}
                            >
                                <Typography
                                    className={classes.greeting}
                                    variant="h4"
                                    color="inherit"
                                >
                                    {`${generateGreetings()}, ${fullName
                                        .split(' ')
                                        .pop()}!`}
                                </Typography>
                            </Animation>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.body}
                        >
                            <AnimationGroup
                                enter={{
                                    animation: 'transition.slideUpBigIn',
                                }}
                            >
                                {renderLeftBody(roles[0])}
                            </AnimationGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={3}
                    className={classes.rightSide}
                >
                    <AnimationGroup
                        enter={{
                            animation: 'transition.slideUpBigIn',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={3} lg={12}>
                                <CardNow />
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={12}>
                                <CardRanks
                                    title="Monthly Salesman Rank"
                                    columns={['Rank', 'Person']}
                                    data={rankData}
                                />
                            </Grid>
                        </Grid>
                    </AnimationGroup>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboards

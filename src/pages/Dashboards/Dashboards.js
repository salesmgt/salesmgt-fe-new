import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'
import { Grid, Typography } from '@material-ui/core'
import {
    MdFiberNew,
    MdTrendingUp,
    MdLoop,
    MdLoyalty,
    MdVisibility,
} from 'react-icons/md'
import { FaFileSignature } from 'react-icons/fa'
import { CardJack } from './components'
import { Animation, AnimationGroup, Loading } from '../../components'
// import { useAuth } from '../../hooks/AuthContext'
import { useApp } from '../../hooks/AppContext'
import * as DashboardsServices from './DashboardsServices'
import { Consts } from './DashboardsConfig'
import * as Milk from '../../utils/Milk'
import { milkNames } from '../../constants/Generals'
import classes from './Dashboards.module.scss'

function Dashboards() {
    // const { user } = useAuth()
    const { schYears, userInfo } = useApp()
    const bakschYears = schYears ? schYears : Milk.getMilk(milkNames.schYears)

    const location = useLocation()
    const history = useHistory()

    // const [userData, setUserData] = useState(null)

    const [cardData, setCardData] = useState(null)

    const { header, cardsConsts } = Consts

    // let isMounted = true
    // const refreshPage = () => {
    //     DashboardsServices.getUser(user.username)
    //         .then((data) => {
    //             if (isMounted) {
    //                 setUserData(data)
    //             }
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //                 history.push({
    //                     pathname: '/errors',
    //                     state: { error: error.response.status },
    //                 })
    //             }
    //         })
    // }

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     refreshPage()
    //     return () => {
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         isMounted = false
    //     }
    // }, [location.pathname])

    let isMounted = true
    const refreshPage = () => {
        // DashboardsServices.getDashboards()
        //     .then((data) => {
        //         if (isMounted) {
        //             setCardData(data)
        //         }
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error)
        //             history.push({
        //                 pathname: '/errors',
        //                 state: { error: error.response.status },
        //             })
        //         }
        //     })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshPage()
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
    }, [location.pathname])

    // // if (!userData) {
    // //     return <Loading />
    // // }

    // // if (!schYears) {
    // //     return <Loading />
    // // }

    // if (!bakschYears) {
    //     return <Loading />
    // }

    // if (!userInfo) {
    //     return <Loading />
    // }

    // if (!cardData) {
    //     return <Loading />
    // }

    const generateGreetings = () => {
        const currHour = moment().format('kk')
        const currDay = moment().format('DD/MM')
        const specialDay = moment(userInfo?.birthDate).format('DD/MM')

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

    return (
        <div className={classes.wrapper}>
            {/* <Grid container spacing={0}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
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
                                    {`${generateGreetings()}, ${userInfo?.fullName
                                        .split(' ')
                                        .pop()}`}
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
                                <Grid container spacing={0}>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.rowy}
                                    >
                                        <Typography className={classes.title}>
                                            {header.child1}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container spacing={2}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <CardJack
                                                    title={
                                                        cardsConsts.card1.title
                                                    }
                                                    color={
                                                        cardsConsts.card1.color
                                                    }
                                                    icon={
                                                        <MdFiberNew
                                                            style={{
                                                                width: '2rem',
                                                                height: '2rem',
                                                                color:
                                                                    'rgba(75, 192, 192, 1)',
                                                            }}
                                                        />
                                                    }
                                                    isOpts={true}
                                                    ranges={bakschYears}
                                                    datasets={
                                                        cardData?.salesMoi
                                                    }
                                                    des={cardsConsts.card1.des}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <CardJack
                                                    title={
                                                        cardsConsts.card2.title
                                                    }
                                                    color={
                                                        cardsConsts.card2.color
                                                    }
                                                    icon={
                                                        <MdVisibility
                                                            style={{
                                                                width: '2rem',
                                                                height: '2rem',
                                                                color:
                                                                    'rgba(255, 206, 86, 1)',
                                                            }}
                                                        />
                                                    }
                                                    isOpts={true}
                                                    ranges={bakschYears}
                                                    datasets={cardData?.theoDoi}
                                                    des={cardsConsts.card2.des}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <CardJack
                                                    title={
                                                        cardsConsts.card3.title
                                                    }
                                                    color={
                                                        cardsConsts.card3.color
                                                    }
                                                    icon={
                                                        <MdTrendingUp
                                                            style={{
                                                                width: '2rem',
                                                                height: '2rem',
                                                                color:
                                                                    'rgba(54, 162, 235, 1)',
                                                            }}
                                                        />
                                                    }
                                                    isOpts={true}
                                                    ranges={bakschYears}
                                                    datasets={
                                                        cardData?.tiemNang
                                                    }
                                                    des={cardsConsts.card3.des}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.rowy}
                                    >
                                        <Typography className={classes.title}>
                                            {header.child2}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container spacing={2}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <CardJack
                                                    title={
                                                        cardsConsts.card6.title
                                                    }
                                                    color={
                                                        cardsConsts.card6.color
                                                    }
                                                    icon={
                                                        <MdLoyalty
                                                            style={{
                                                                width: '2rem',
                                                                height: '2rem',
                                                                color:
                                                                    'rgba(255, 99, 132, 1)',
                                                            }}
                                                        />
                                                    }
                                                    isOpts={true}
                                                    ranges={bakschYears}
                                                    datasets={cardData?.chamSoc}
                                                    des={cardsConsts.card6.des}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <CardJack
                                                    title={
                                                        cardsConsts.card4.title
                                                    }
                                                    color={
                                                        cardsConsts.card4.color
                                                    }
                                                    icon={
                                                        <FaFileSignature
                                                            style={{
                                                                width: '2rem',
                                                                height: '2rem',
                                                                color:
                                                                    'rgba(153, 102, 255, 1)',
                                                            }}
                                                        />
                                                    }
                                                    isOpts={true}
                                                    ranges={bakschYears}
                                                    datasets={cardData?.kyMoi}
                                                    des={cardsConsts.card4.des}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <CardJack
                                                    title={
                                                        cardsConsts.card5.title
                                                    }
                                                    color={
                                                        cardsConsts.card5.color
                                                    }
                                                    icon={
                                                        <MdLoop
                                                            style={{
                                                                width: '2rem',
                                                                height: '2rem',
                                                                color:
                                                                    'rgba(255, 159, 64, 1)',
                                                            }}
                                                        />
                                                    }
                                                    isOpts={true}
                                                    ranges={bakschYears}
                                                    datasets={cardData?.taiKy}
                                                    des={cardsConsts.card5.des}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AnimationGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
        </div>
    )
}

export default Dashboards

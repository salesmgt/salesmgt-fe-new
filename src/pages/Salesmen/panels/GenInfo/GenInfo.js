import React from 'react'
import { Grid, Icon, Typography } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
// import { MixedCharts } from '../../components'
import { Consts } from './GenConfig'
import classes from './GenInfo.module.scss'

function GenInfo(props) {
    const { data } = props
    const {
        headers,
        fields,
        // charts
    } = Consts

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Content Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    <Grid container spacing={0}>
                        {/* Info Child */}
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.child}
                        >
                            <Grid container spacing={0}>
                                {/* Child header */}
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.header}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {headers.child1}
                                    </Typography>
                                </Grid>
                                {/* Child body */}
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.body}
                                >
                                    <Grid container spacing={0}>
                                        {/* Detail */}
                                        <Grid
                                            item
                                            xs={12}
                                            sm={3}
                                            md={3}
                                            lg={3}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.username.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.detail}
                                            >
                                                {data?.username}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={3}
                                            md={3}
                                            lg={3}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.gender.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.detail}
                                            >
                                                {data.gender
                                                    ? 'Male'
                                                    : 'Female'}
                                            </Typography>
                                            <Icon className={classes.icon}>
                                                {data?.gender ? (
                                                    <AiOutlineMan color="#005BB5" />
                                                ) : (
                                                    <AiOutlineWoman color="#E26A89" />
                                                )}
                                            </Icon>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={3}
                                            md={3}
                                            lg={3}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.dob.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.detail}
                                            >
                                                {data?.birthDate}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={3}
                                            md={3}
                                            lg={3}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.phone.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.detail}
                                            >
                                                {data?.phone}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={3}
                                            md={3}
                                            lg={3}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.email.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.detail}
                                            >
                                                {data?.email}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={3}
                                            md={3}
                                            lg={3}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.addr.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            className={classes.detailZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.detail}
                                            >
                                                {data?.address}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Another Sector */}
                {/* Chart Child */}
                {/* <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.child}
                        >
                            <MixedCharts
                                title="Sales Targets Result"
                                labels={charts.mixed.lables}
                                dataLbs={charts.mixed.dataLbs}
                                // data={}
                            />
                        </Grid> */}
            </Grid>
        </div>
    )
}

export default GenInfo

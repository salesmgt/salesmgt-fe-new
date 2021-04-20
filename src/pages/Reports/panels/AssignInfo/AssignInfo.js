import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    // makeStyles,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Switch,
    Icon,
    Avatar,
} from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { Loading } from '../../../../components'
import { Consts } from './AssignInfoConfig'
import classes from './AssignInfo.module.scss'

function AssignInfo(props) {
    const { report } = props
    const { headers, fields } = Consts

    const history = useHistory()

    if (!report) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Content Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className={classes.content}
                >
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.rowZone}
                        >
                            <Typography
                                color="inherit"
                                className={classes.header}
                            >
                                {headers.child1}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.rowZoneX}
                        >
                            {' '}
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.pic.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                <div className={classes.user}>
                                                    {report?.avatar ? (
                                                        <Avatar
                                                            className={
                                                                classes.avatar
                                                            }
                                                            alt="user avatar"
                                                            src={report?.avatar}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            className={
                                                                classes.avatar
                                                            }
                                                        >
                                                            {
                                                                report?.fullName
                                                                    .split(' ')
                                                                    .pop()[0]
                                                            }
                                                        </Avatar>
                                                    )}

                                                    <div
                                                        className={classes.info}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            className={
                                                                classes.fullName
                                                            }
                                                        >
                                                            {/* {report?.fullName} */}
                                                            fuck yeah shit
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                classes.username
                                                            }
                                                        >
                                                            {report?.username}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*  */}
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.rowZoneX}
                        >
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.schlYear.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.schoolYear}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*  */}
                        </Grid>
                        {/*  */}

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.rowZoneX}
                        >
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.purpose.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.purpose}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*  */}
                        </Grid>
                    </Grid>
                </Grid>
                {/* end content */}
                {/* Another Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className={classes.content}
                >
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.rowZone}
                        >
                            <Typography
                                color="inherit"
                                className={classes.header}
                            >
                                {headers.child2}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.rowZoneX}
                        >
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.name.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.schoolName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
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
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.address}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.dist.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.district}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.eduLvl.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.level}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.reprName.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <Typography color="inherit">
                                                {report?.reprName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        // className={classes.rowZone}
                                    >
                                        <Grid
                                            item
                                            xs={5}
                                            sm={4}
                                            md={3}
                                            lg={2}
                                            className={classes.titleZone}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.reprIsMale.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={8}
                                            md={9}
                                            lg={10}
                                            className={classes.detailZone}
                                        >
                                            <div className={classes.genderZone}>
                                                <Typography
                                                    color="inherit"
                                                    className={classes.gender}
                                                >
                                                    {report?.reprIsMale
                                                        ? 'Male'
                                                        : 'Female'}
                                                </Typography>
                                                <Icon>
                                                    {report?.reprIsMale ? (
                                                        <AiOutlineMan color="#005BB5" />
                                                    ) : (
                                                        <AiOutlineWoman color="#E26A89" />
                                                    )}
                                                </Icon>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*  */}
                    </Grid>
                </Grid>
                {/* end content */}
            </Grid>
        </div>
    )
}

export default AssignInfo

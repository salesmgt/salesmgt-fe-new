import React from 'react'
import { Grid, InputLabel, TextField, Typography } from '@material-ui/core'
import classes from './GenInfo.module.scss'

function GenInfo(props) {
    const { data } = props

    // const defaultValues = {
    //     username: data.username,
    //     active: data.active,
    //     gender: String(data.gender),
    //     dob: data.birthDate,
    //     phone: data.phone,
    //     email: data.email,
    //     addr: data.address,
    // }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.basic}
                >
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.infoChild}
                        >
                            <Grid container spacing={0}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.titleZone}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        Username
                                    </Typography>
                                </Grid>
                                {/* <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailZone}
                                > */}
                                {/* <Grid container spacing={0}> */}
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailItem}
                                >
                                    {/* <InputLabel className={classes.lb}>
                                                Username
                                            </InputLabel> */}
                                    <Typography>{data.username}</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.titleZone}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        Gender
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailItem}
                                >
                                    {/* <InputLabel className={classes.lb}>
                                                Gender
                                            </InputLabel> */}
                                    <Typography>
                                        {String(data.gender)}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.titleZone}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        Birthday
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailItem}
                                >
                                    {/* <InputLabel className={classes.lb}>
                                        Birthday
                                    </InputLabel> */}
                                    <Typography>{data.birthDate}</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.titleZone}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        Phone number
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailItem}
                                >
                                    {/* <InputLabel className={classes.lb}>
                                        Phone number
                                    </InputLabel> */}
                                    <Typography>{data.phone}</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.titleZone}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        Email
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailItem}
                                >
                                    {/* <InputLabel className={classes.lb}>
                                        Email
                                    </InputLabel> */}
                                    <Typography>{data.email}</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.titleZone}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        Address
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    lg={7}
                                    className={classes.detailItem}
                                >
                                    {/* <InputLabel className={classes.lb}>
                                        Address
                                    </InputLabel> */}
                                    <Typography>{data.address}</Typography>
                                </Grid>
                                {/* </Grid> */}
                                {/* </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.chart}
                ></Grid>
            </Grid>
        </div>
    )
}

export default GenInfo

import React from 'react'
import { Grid, Typography, Icon, Avatar } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { Loading } from '../../../../components'
import { Consts } from './AssignInfoConfig'
import classes from './AssignInfo.module.scss'
import { useLocation } from 'react-router'

function AssignInfo(props) {
    const { report } = props
    const { headers, fields } = Consts

    const location = useLocation()
    // console.log("location Report's: ", location);

    if (!report) {
        return <Loading />
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Assign Info*/}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
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
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    {/* <Typography color="inherit"> */}
                                    <div className={classes.user}>
                                        {report?.avatar ? (
                                            <Avatar
                                                className={classes.avatar}
                                                alt="user avatar"
                                                src={report?.avatar}
                                            />
                                        ) : (
                                            <Avatar className={classes.avatar}>
                                                {
                                                    report?.fullName
                                                        .split(' ')
                                                        .pop()[0]
                                                }
                                            </Avatar>
                                        )}

                                        <div className={classes.info}>
                                            <Typography
                                                component="span"
                                                className={classes.fullName}
                                            >
                                                {report?.fullName}
                                            </Typography>
                                            <Typography
                                                className={classes.username}
                                            >
                                                {report?.username}
                                            </Typography>
                                        </div>
                                    </div>
                                    {/* </Typography> */}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.schoolYear}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.purpose}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* end wrapper */}
                </Grid>
                {/* end content */}

                {/*School Info */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
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
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.schoolName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.district}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.level}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {report?.reprName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.row}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.rowx}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
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
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.rowx}
                                >
                                    <div className={classes.genderZone}>
                                        <Typography
                                            color="inherit"
                                            className={classes.gender}
                                        >
                                            {report?.reprIsMale
                                                ? fields.reprIsMale.male.lb
                                                : fields.reprIsMale.female.lb}
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
                    {/* end wrapper */}
                </Grid>
                {/* end content */}
            </Grid>
        </div>
    )
}

export default AssignInfo

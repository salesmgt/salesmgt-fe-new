import React, { useEffect, useState } from 'react'
import { Grid, Typography, Icon, Avatar, Chip } from '@material-ui/core'
import { Loading } from '../../../../components'
import { Consts } from './AssignInfoConfig'
import { purposeNames } from '../../../../constants/Generals'
import { getTask } from '../../../Tasks/TasksServices';
import { parseDateToString } from '../../../../utils/DateTimes';
import classes from './AssignInfo.module.scss'

function AssignInfo(props) {
    const { report } = props
    const { headers, fields } = Consts

    // console.log('report: ', report);

    const [taskDetail, setTaskDetail] = useState(null);
    useEffect(() => {
        getTask(report?.taskId).then(res => {
            console.log('task of the report: ', res);
            setTaskDetail(res)
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }, []);

    if (!report || !taskDetail) {
        return <Loading />
    }

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case purposeNames.purp1:
                return <Chip label={purpose} className={classes.chipSalesMoi} />
            case purposeNames.purp2:
                return <Chip label={purpose} className={classes.chipTheoDoi} />
            case purposeNames.purp3:
                return <Chip label={purpose} className={classes.chipChamSoc} />
            case purposeNames.purp4:
                return <Chip label={purpose} className={classes.chipTaiKy} />
            case purposeNames.purp5:
                return <Chip label={purpose} className={classes.chipKyMoi} />
            default:
                return <Chip label={purpose} /> // #5c21f3
        }
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

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
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
                                        {fields.duration.title}
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
                                        {parseDateToString(taskDetail?.assignDate, 'DD-MM-YYYY')}
                                        &nbsp; ➜ &nbsp;
                                        {parseDateToString(taskDetail?.endDate, 'DD-MM-YYYY')}
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
                                        {report?.purpose && setPurposeChipColor(report?.purpose)}
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
                                        {report?.level} {report?.schoolName}
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
                                        {report?.reprName
                                            ? (`${report?.reprIsMale ? 'Mr. ' : 'Ms. '} ${report?.reprName}`)
                                            : fields.empty.title
                                        }
                                    </Typography>
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

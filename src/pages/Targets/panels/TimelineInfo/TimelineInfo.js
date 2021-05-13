import React from 'react'
import {
    Grid,
    Typography,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Chip,
} from '@material-ui/core'
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@material-ui/lab';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { MdDescription } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5'
import { FaHandshake } from 'react-icons/fa'
import { Consts, timeline } from './TimelineInfoConfig'
import { purposeNames } from '../../../../constants/Generals'
import classes from './TimelineInfo.module.scss'

function TimelineInfo() {
    const { headers, labels } = Consts
    const { url } = useRouteMatch()
    const newUrl = url.substring(0, 5)

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
                {/* Content Sector */}
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.content}>
                    {/* History of reports */}
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid item xs={12} sm={12} md={2} lg={2} className={classes.row}>
                            <Typography color="inherit" className={classes.header}>
                                {headers.child1} {/*of assignments and reports*/}
                            </Typography>
                        </Grid>
                        {/* Detail */}
                        <Grid item xs={12} sm={12} md={10} lg={9} className={classes.row}>
                            <Timeline>
                                {timeline.map((item, index) =>
                                    <div key={index}>
                                        {item?.type === 'assign' && (
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <div className={classes.tlnOpsContent}>
                                                        <Typography variant="body1">
                                                            <strong>{item?.date}</strong>
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {labels.schoolYear} <em>{item?.schoolYear}</em>
                                                        </Typography>
                                                    </div>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot color="secondary">
                                                        <IoPersonAddSharp fontSize="large" />
                                                    </TimelineDot>
                                                    <TimelineConnector className={classes.secondaryTail} />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <div className={classes.tlnContent1}>
                                                        <div className={classes.picZone}>
                                                            <ListItemAvatar className={classes.picAvatar}>
                                                                <Avatar src={item?.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={item?.fullName} className={classes.picName} />
                                                        </div>
                                                        {setPurposeChipColor(item?.purpose)}
                                                    </div>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )}

                                        {/* {item?.type === 'unassign' && (
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <div className={classes.tlnOpsContent}>
                                                        <Typography variant="body1">
                                                            <strong>{item?.date}</strong>
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {labels.schoolYear} <em>{item?.schoolYear}</em>
                                                        </Typography>
                                                    </div>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot>
                                                        <IoPersonRemoveSharp fontSize="large" />
                                                    </TimelineDot>
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <div className={classes.tlnContent}>
                                                        <div className={classes.picZone}>
                                                            <ListItemAvatar className={classes.picAvatar}>
                                                                <Avatar src={item?.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={item?.fullName} className={classes.picName} />
                                                        </div>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            <b>{labels.reason}</b> {item?.reason}
                                                        </Typography>
                                                    </div>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )} */}

                                        {item?.type === 'report' && (
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <div className={classes.tlnOpsContent}>
                                                        <Typography variant="body1">
                                                            <strong>{item?.date}</strong>
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {labels.schoolYear} <em>{item?.schoolYear}</em>
                                                        </Typography>
                                                    </div>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot color="primary">
                                                        <MdDescription fontSize="large" />
                                                    </TimelineDot>
                                                    <TimelineConnector className={classes.primaryTail} />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Link
                                                        to={{
                                                            pathname: `${newUrl}/reports/${item?.reportId}`
                                                        }}
                                                        onClick={() => console.log(item.targetId)}
                                                        className={classes.linkCard}
                                                    >
                                                        <div className={item?.result ? classes.reportSuccess : classes.reportFailed}>
                                                            <Typography variant="subtitle1">
                                                                {item?.description}
                                                            </Typography>
                                                            {setPurposeChipColor(item?.purpose)}
                                                        </div>
                                                    </Link>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )}

                                        {item?.type === 'service' && (
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <div className={classes.tlnContent}>
                                                        <Typography variant="subtitle1">
                                                            {labels.services} <strong> {item?.services.join(', ')} </strong>
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            <b>{labels.duration}</b> {item?.duration}
                                                        </Typography>
                                                    </div>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot className={classes.ternary}>
                                                        <FaHandshake fontSize="large" />
                                                    </TimelineDot>
                                                    {/* <TimelineConnector className={classes.ternaryTail} /> */}
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <div className={classes.tlnOpsContent}>
                                                        <Typography variant="body1">
                                                            <strong>{item?.date}</strong>
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {labels.schoolYear} <em>{item?.schoolYear}</em>
                                                        </Typography>
                                                    </div>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )}
                                    </div>
                                )}

                                {/* <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary">
                                            <MdDescription fontSize="large" />
                                        </TimelineDot>
                                        <TimelineConnector className={classes.primaryTail} />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        {data.listReports.filter(rep => rep.schoolYear === '2019-2020').map(
                                            report => (
                                                <div
                                                    className={report.result ? classes.reportSuccess : classes.reportFailed}
                                                >
                                                    <Typography variant="subtitle1">
                                                        {report.description}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        {report.date}
                                                    </Typography>
                                                </div>
                                            )
                                        )}
                                    </TimelineContent>
                                </TimelineItem> */}
                            </Timeline>
                        </Grid>
                        {/* End Detail */}
                    </Grid>
                </Grid>
                {/* Another Sector */}
            </Grid>
        </div>
    )
}

export default TimelineInfo
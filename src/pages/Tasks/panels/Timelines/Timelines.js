import React, { useState, useEffect } from 'react'
import {
    Grid,
    Typography,
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
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { MdDescription } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5'
import { FaHandshake } from 'react-icons/fa'
import { Consts } from './TimelinesConfig'  // timeline
import { purposeNames, taskStatusNames } from '../../../../constants/Generals'
import { getTimeline } from '../../TasksServices';
import { Loading } from '../../../../components';
import classes from './Timelines.module.scss'
import { parseDateToString } from '../../../../utils/DateTimes';

function Timelines(props) {
    const { headers, labels } = Consts
    const history = useHistory()
    const { url } = useRouteMatch()
    const newUrl = url.substring(0, 5)

    const { task } = props

    const taskId = url.substring(url.lastIndexOf('/') + 1)
    const [timeline, setTimeline] = useState(null);

    let isMounted = true
    useEffect(() => {
        getTimeline(taskId).then(res => {
            if (isMounted) {
                setTimeline(res)
                console.log('TaskDetail - getTimeline: ', res);
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
        return () => {
            isMounted = false
        };
    }, []);

    if (!timeline) {
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

    const setTaskStatusChipColor = (status) => {
        switch (status) {
            case taskStatusNames.ongoing:
                return <Chip label={status} className={classes.chipOnGoing} />
            case taskStatusNames.success:
                return <Chip label={status} className={classes.chipSuccess} />
            case taskStatusNames.failed:
                return <Chip label={status} className={classes.chipFailed} />
            default:
                return <Chip label={status} /> // #5c21f3
        }
    }

    // console.log('timeline: ', timeline);

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
                            {timeline.length > 0 ? (
                                <Timeline>
                                    {task?.username && (
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <div className={classes.tlnOpsContent}>
                                                    <Typography variant="body1">
                                                        <strong>{parseDateToString(task?.assignDate, 'DD/MM/yyyy')}</strong>
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        {labels.schoolYear} <em>{task?.schoolYear}</em>
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
                                                <div className={classes.tlnContent}>
                                                    <div className={classes.tlnContentChild}>
                                                        <div className={classes.picZone}>
                                                            <ListItemAvatar className={classes.picAvatar}>
                                                                <Avatar src={task?.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={task?.fullName} className={classes.picName} />
                                                        </div>
                                                        {setPurposeChipColor(task?.purpose)}
                                                    </div>
                                                    {/* <div className={classes.tlnContentChild}>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        <b>{labels.startDate}</b> {task?.startDate}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        <b>{labels.endDate}</b> {task?.endDate}
                                                    </Typography>
                                                </div> */}
                                                    <div className={classes.tlnContentChild}>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            <b>{labels.status} </b>
                                                            {setTaskStatusChipColor('Successful')}
                                                            {/* {setTaskStatusChipColor(task?.status)} */}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )}

                                    {timeline.map((item, index) =>
                                        <div key={index}>
                                            {item?.type === 'report' && (
                                                <TimelineItem>
                                                    <TimelineOppositeContent>
                                                        <div className={classes.tlnOpsContent}>
                                                            <Typography variant="body1">
                                                                {parseDateToString(item?.date, 'DD-MM-yyyy')}
                                                                {/* <strong>{parseDateToString(item?.date, 'DD-MM-yyyy')}</strong> */}
                                                            </Typography>
                                                            {/* <Typography variant="subtitle2" color="textSecondary">
                                                                {labels.schoolYear} <em>{item?.schoolYear}</em>
                                                            </Typography> */}
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
                                                                pathname: `${newUrl}/reports/${item?.id}`
                                                            }}
                                                            onClick={() => console.log(item.taskId)}
                                                            className={classes.linkCard}
                                                        >
                                                            <div className={item?.isSuccess ? classes.tlnContentSuccess : classes.tlnContentFailed}>
                                                                <div className={classes.tlnContentChild}>
                                                                    <Typography variant="subtitle1">
                                                                        {item?.reportDescription}
                                                                    </Typography>
                                                                    {/* {setPurposeChipColor(task?.purpose)} */}
                                                                </div>
                                                                <div className={classes.tlnContentChild}>
                                                                    <Typography variant="subtitle2" color="textSecondary">
                                                                        <b>{labels.result}</b>
                                                                        {item?.isSuccess ? 'Gặp được HT/HP' : 'Chưa gặp được HT/HP'}
                                                                    </Typography>
                                                                </div>
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
                                </Timeline>
                            ) : (
                                <Typography>This task has not had any activities yet.</Typography>
                            )}
                        </Grid>
                        {/* End Detail */}
                    </Grid>
                </Grid>
                {/* Another Sector */}
            </Grid>
        </div>
    )
}

export default Timelines
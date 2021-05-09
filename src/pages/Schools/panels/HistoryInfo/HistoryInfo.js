import React, { useState } from 'react'
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
import { Consts, timeline } from './HistoryInfoConfig'
import { purposeNames } from '../../../../constants/Generals'
import classes from './HistoryInfo.module.scss'

function HistoryInfo() {
    const { headers, labels } = Consts
    const [schoolYear, setSchoolYear] = useState('')

    // const calculateCurrentSchoolYear = () => {
    //     const thisYear = new Date().getFullYear()
    //     const thisMonth = new Date().getMonth()

    //     if (0 <= thisMonth < 4) {   // Jan = 0, May = 4
    //         return `${thisYear}-${thisYear + 1}`
    //     } else if (4 <= thisMonth < 11) {
    //         return `${thisYear - 1}-${thisYear}`
    //     } else {
    //         return ''
    //     }
    // }
    // const [schoolYear, setSchoolYear] = useState(calculateCurrentSchoolYear())

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case purposeNames.purp1:
                return <Chip label={purpose} className={classes.chipSalesMoi} />
            case purposeNames.purp2:
                return <Chip label={purpose} className={classes.chipTheoDoi} />
            case purposeNames.purp3:
                return <Chip label={purpose} className={classes.chipTiemNang} />
            case purposeNames.purp4:
                return <Chip label={purpose} className={classes.chipChamSoc} />
            case purposeNames.purp5:
                return <Chip label={purpose} className={classes.chipTaiKy} />
            case purposeNames.purp6:
                return <Chip label={purpose} className={classes.chipKyMoi} />
            default:
                return <Chip label={purpose} /> // #5c21f3
        }
    }

    // Sao hàm này bị infinity loop nhỉ?
    const updateSchoolYear = (itemSchoolYear) => {
        console.log(itemSchoolYear);
        if (itemSchoolYear !== schoolYear) {
            // setSchoolYear(itemSchoolYear)
            return (
                <strong>{itemSchoolYear}</strong>
            )
        }
        return <></>
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
                                    <TimelineItem key={index}>
                                        <TimelineOppositeContent>
                                            <div className={classes.tlnOpsContent}>
                                                <Typography variant="body1">
                                                    {/* <strong>{item?.startDate}</strong> */}
                                                    {/* {updateSchoolYear(item?.schoolYear)} */}
                                                    <strong>{item?.schoolYear}</strong>
                                                </Typography>
                                                {/* <Typography variant="subtitle2" color="textSecondary">
                                                    {labels.schoolYear} <em>{item?.schoolYear}</em>
                                                </Typography> */}
                                            </div>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color={item !== timeline.slice(-1).pop() ? "primary" : "secondary"} />
                                            <TimelineConnector
                                                className={item !== timeline.slice(-1).pop() ? classes.primaryTail : classes.secondaryTail}
                                            />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <div className={classes.tlnContent}>
                                                <div className={classes.tlnContentChild}>
                                                    <div className={classes.picZone}>
                                                        <ListItemAvatar className={classes.picAvatar}>
                                                            <Avatar src={item?.avatar} />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item?.fullName} className={classes.picName} />
                                                    </div>
                                                    {setPurposeChipColor(item?.purpose)}
                                                </div>
                                                {/* <div className={classes.tlnContentChild}>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        <b>{labels.startDate}</b> {item?.startDate}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        <b>{labels.endDate}</b> {item?.endDate}
                                                    </Typography>
                                                </div> */}
                                                {(item?.purpose === purposeNames.purp1 || item?.purpose === purposeNames.purp5 || item?.purpose === purposeNames.purp6) &&
                                                    <div className={classes.tlnContentChild}>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            <b>{labels.services} </b>
                                                            {item?.services ? item?.services.join(', ') : '(none)'}
                                                        </Typography>
                                                    </div>
                                                }
                                            </div>
                                        </TimelineContent>
                                    </TimelineItem>
                                )}
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

export default HistoryInfo
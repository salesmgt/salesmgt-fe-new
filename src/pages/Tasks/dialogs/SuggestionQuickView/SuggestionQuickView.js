import React, { useState } from 'react';
import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Collapse, Grid, Icon, IconButton, ListItem, ListItemAvatar, ListItemText, makeStyles, Popover, Tooltip, Typography, withStyles } from '@material-ui/core';
import { MdCheck, MdExpandMore, MdHome, MdLocationOn } from 'react-icons/md';
import { GiPathDistance } from 'react-icons/gi';
import { FaTasks } from 'react-icons/fa';
// import { Rating } from '@material-ui/lab';
import clsx from 'clsx'
import { suggestedReasons } from '../../../../constants/Generals';
import classes from './SuggestionQuickView.module.scss';

const StyleChip = withStyles({
    root: {
        fontWeight: 500,
        color: '#388e3c',
        borderColor: '#4caf50',
        '&:hover': {
            backgroundColor: 'rgb(230, 250, 231)'
        }
    }
})(Chip);

const useStyles = makeStyles((theme) => ({
    root: {
        width: 320,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    // itemPIC: {
    //     padding: 0,
    //     margin: 0,
    // },
    // divItemPIC: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     padding: 0,
    //     margin: 0,
    // },
    title: {
        fontSize: '0.9rem',
        fontWeight: 600
    },
    subheader: {
        fontSize: '0.85rem',
        fontWeight: 500
    },
}))

function SuggestionQuickView(props) {
    const styles = useStyles()
    const { open, anchorEl, onClose, salesman, setSelectedSalesman } = props

    const [expandBarem, setExpandBarem] = useState(false);

    const handleSelect = () => {
        setSelectedSalesman({
            username: salesman?.username,
            fullName: salesman?.fullName,
            avatar: salesman?.avatar ? salesman.avatar : null
        })
        onClose()
    }

    // const getTooltipTitle = (expContents, schools) => {
    //     let count = 0
    //     let toolTip = ''    //Experience at: 
    //     expContents.forEach(item => {
    //         console.log(item);
    //         const schoolName = item.substring(14, item.indexOf('20'))
    //         const schoolYearStr = item.substring(item.indexOf('20'))
    //         const schoolYears = []
    //         if (schoolYearStr.includes('+')) {
    //             schoolYears = schoolYearStr.split(' + ')
    //         }
    //         // toolTip.concat('item ')
    //         console.log(schoolName);
    //         console.log(schoolYearStr);
    //         count++
    //     });
    //     return { count }
    // }

    const getSuggestedReasons = () => {
        let reasons = []
        let expContents = []
        const content = String(salesman?.content)
        if (content.includes(',')) {
            let tmp = content.split(',')
            tmp.forEach(str => {
                if (str.includes(suggestedReasons.exp)) {
                    reasons.push(suggestedReasons.exp)
                    expContents.push(str)
                    // getTooltipTitle(expContents)
                } else {
                    reasons.push(str)
                }
            });
        } else {
            reasons.push(content)
        }
        return { reasons, expContents }
    }
    const { reasons, expContents } = getSuggestedReasons()

    // const getBadgePoint = (criteria, taskNo, expList) => {
    //     switch (criteria) {
    //         case suggestedReasons.distance:
    //             if (suggestedReasons.ward) return '+3'
    //             if (suggestedReasons.district) return '+2'
    //             if (suggestedReasons.near) return '+1.5'
    //         case suggestedReasons.taskNo:
    //             if (taskNo <= 5) return '+3'
    //             else if (taskNo <= 20) return '+1'
    //             else if (taskNo <= 49) return '+0.5'
    //             else return '+0'
    //         case suggestedReasons.exp:
    //             expList.forEach(exp => {
    //                 if (exp.includes('+')) {
    //                     return '+2'
    //                 } else return '+4'
    //             });

    //         default:
    //             break;
    //     }
    // }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        >
            <Card className={styles.root}>
                <CardHeader
                    avatar={
                        <Avatar src={salesman?.avatar} variant="rounded" className={classes.avatar} />
                    }
                    action={
                        <Button variant="contained" color="primary" size="small" onClick={handleSelect}>
                            Select
                        </Button>
                    }
                    title={salesman?.fullName}
                    subheader={salesman?.username}
                    classes={{ title: styles.title, subheader: styles.subheader }}
                />
                <CardContent>
                    <Grid container>
                        <Grid item container spacing={1} xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs={12} sm={2} md={2} lg={2} className={classes.iconDes}>
                                <Tooltip title="Number of assigned tasks">
                                    <Icon style={{ padding: 0, margin: 0 }}><FaTasks fontSize="large" /></Icon>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={9} md={9} lg={9} className={classes.row}>
                                {salesman?.numberOfTask} <b>/ 50</b>
                            </Grid>
                            {/* <Grid item xs={12} sm={1} md={1} lg={1}>
                                <Badge color="secondary"
                                    badgeContent={getBadgePoint(suggestedReasons.taskNo, salesman?.numberOfTask, expContents)}
                                />
                            </Grid> */}

                            <Grid item xs={12} sm={2} md={2} lg={2} className={classes.iconDes}>
                                <Tooltip title="Distance from salesman to school(s)">
                                    <Icon style={{ padding: 0, margin: 0 }}><GiPathDistance fontSize="large" /></Icon>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={9} md={9} lg={9}>
                                <b>{parseFloat(salesman?.distance).toFixed(2)} </b>km
                            </Grid>
                            {/* <Grid item xs={12} sm={1} md={1} lg={1}>
                                <Badge color="secondary"
                                    badgeContent={getBadgePoint(suggestedReasons.distance, salesman?.numberOfTask, expContents)}
                                />
                            </Grid> */}

                            <Grid item xs={12} sm={2} md={2} lg={2} className={classes.iconDes}>
                                <Tooltip title="Salesman's address">
                                    <Icon style={{ padding: 0, margin: 0 }}><MdHome fontSize="large" /></Icon>
                                </Tooltip>

                            </Grid>
                            <Grid item xs={12} sm={10} md={10} lg={10}>
                                {salesman?.address}
                                <br />
                                {/* <span>+3</span> */}
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={classes.chipContainer}>
                                    {reasons.map((reason, index) => (
                                        // <Tooltip arrow
                                        //     title={reason === suggestedReasons.exp ? expContents[0] : reason}
                                        // >
                                        <StyleChip variant="outlined" size="small"
                                            icon={<MdCheck style={{ color: '#388e3c', marginLeft: '0.2rem' }} />}
                                            label={reason}
                                            className={classes.chipReason}
                                            key={index}
                                        />
                                        // </Tooltip>
                                    ))}
                                </div>
                            </Grid>

                            {/* <Rating defaultValue={1} max={1} size="small" readOnly /> */}
                        </Grid>
                    </Grid>
                </CardContent >
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(styles.expand, {
                            [styles.expandOpen]: expandBarem,
                        })}
                        onClick={() => setExpandBarem(!expandBarem)}
                        aria-expanded={expandBarem}
                        aria-label="show barem"
                    >
                        <MdExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expandBarem} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="button" style={{ fontSize: '' }}>
                                    Barem of Plus Point
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="body2" className={classes.txtCriInfoHeader}>
                                    1/ Number of assigned tasks
                                </Typography>
                                <div className={classes.txtCriInfo}>
                                    <Grid container>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>≤ 5 tasks:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+3</span></Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>≤ 20 tasks:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+1</span></Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>≤ 49 tasks:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+0.5</span></Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="body2" className={classes.txtCriInfoHeader}>
                                    2/ Distance
                                </Typography>
                                <div className={classes.txtCriInfo}>
                                    <Grid container>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>In same ward:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+3</span></Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>In same district:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+2</span></Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>Nearly:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+1.5</span></Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="body2" className={classes.txtCriInfoHeader}>
                                    3/ Experiences
                                </Typography>
                                <div className={classes.txtCriInfo}>
                                    <Grid container>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>First time:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+4</span></Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>From the 2nd time:</Grid>
                                            <Grid item xs={3}><span style={{ color: '#4caf50', fontWeight: 500 }}>+2</span></Grid>
                                        </Grid>
                                        {/* <Grid item container xs={12}>
                                            <Typography variant="body2"></Typography>
                                            <span style={{ color: '#4caf50', fontWeight: 500 }}>+1.5</span>
                                        </Grid> */}
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card >
        </Popover >
    );
}

export default SuggestionQuickView
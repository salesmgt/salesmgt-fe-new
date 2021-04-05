import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import * as AccountServices from './AccountsServices'
import { Grid, Card, Divider, CardContent, Typography, Icon, CardHeader } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import moment from 'moment'
import classes from './AccountsDetail.module.scss'

function AccountsDetail() {
    const history = useHistory()
    const location = useLocation()

    const [tabValue, setTabValue] = React.useState(0)
    const [accountInfo, setAccountInfo] = useState(null)

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    // const username = props.location.state.username;
    const username = location.state.username;

    // call API
    let isMounted = true
    const getAccountInfo = () => {
        AccountServices.getAccount(username).then((res) => {
            setAccountInfo(res.data);
        }).catch(error => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })

    }

    useEffect(() => {
        getAccountInfo()
        return () => {
            isMounted = false
        }
    }, [])

    if (!accountInfo) {
        return null;
    }

    const renderInfoCard = (account) => {
        return (
            <Card>
                <CardHeader title="Basic info"
                    titleTypographyProps={{ style: { fontSize: '1.15rem', fontWeight: 700 } }}
                    className={classes.header}
                />
                <Divider />
                <CardContent>
                    {/* <Avatar src={accountInfo.avatar} /> */}
                    <Grid container spacing={3} >
                        <Grid item xs sm={3}>
                            <Typography className={classes.titles}>
                                Username:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.username}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container spacing={3}>
                        <Grid item xs sm={3}>
                            <Typography className={classes.titles}>
                                Phone:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.phone}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs sm={3}>
                            <Typography className={classes.titles}>
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.email}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs sm={3}>
                            <Typography className={classes.titles}>
                                Address:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.address}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container spacing={3}>
                        <Grid item xs sm={3}>
                            <Typography className={classes.titles}>
                                Gender:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.gender ? 'Male' : 'Female'}
                                </Typography>
                                <Icon>
                                    {account.gender ? (
                                        <AiOutlineMan color="#005BB5" />
                                    ) : (
                                        <AiOutlineWoman color="#E26A89" />
                                    )}
                                </Icon>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs sm={3}>
                            <Typography className={classes.titles}>
                                BirthDate:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {moment(account.birthDate).format('DD/MM/yyyy')}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    const renderAuditCard = () => {
        return (
            <Card>
                <CardHeader
                    title="Edited log"
                    titleTypographyProps={{ style: { fontSize: '1.15rem', fontWeight: 700 } }}
                    className={classes.header}
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography className={classes.titles}>
                                Created by:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography>haptnn</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography className={classes.titles}>
                                Created date:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography>01/01/2021</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography className={classes.titles}>
                                Modified by:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography>--</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography className={classes.titles}>
                                Modified date:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography>--</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    return (
        <DetailLayouts
            avatar={accountInfo.avatar}
            header={accountInfo.fullName}
            tabs={['Account Detail']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {tabValue === 0 && (
                <div className={classes.wrapper}>
                    {/* <.h1>Hellu</.h1> */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            {renderInfoCard(accountInfo)}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            {renderAuditCard()}
                        </Grid>
                    </Grid>
                </div>
            )}
        </DetailLayouts>
    );
}

export default AccountsDetail

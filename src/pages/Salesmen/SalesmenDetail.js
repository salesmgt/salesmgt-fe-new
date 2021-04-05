import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { DetailLayouts } from '../../layouts'
import * as SalesmenServices from './SalesmenServices'
import { Grid, Card, Divider, CardContent, Typography, Icon, CardHeader } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import moment from 'moment'
import { DoughnutChart } from '../../assets/images'
import classes from './SalesmenDetail.module.scss'

function SalesmenDetail() {
    const history = useHistory()
    const location = useLocation()

    const [tabValue, setTabValue] = useState(0)
    const [salesmanInfo, setSalesmanInfo] = useState(null)

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const username = location.state.username;

    // call API
    let isMounted = true
    const getAccountInfo = () => {
        SalesmenServices.getSalesman(username).then((res) => {
            setSalesmanInfo(res.data);
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

    if (!salesmanInfo) {
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
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Username:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.username}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Phone:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.phone}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.email}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Address:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
                            <div className={classes.detailZone}>
                                <Typography>
                                    {account.address}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Gender:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
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
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                BirthDate:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
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

    const renderEfficiencyCard = () => {
        return (
            <Card>
                <CardHeader
                    title="Efficiency"
                    titleTypographyProps={{ style: { fontSize: '1.15rem', fontWeight: 700 } }}
                    className={classes.header}
                />
                <Divider />
                <CardContent>
                    {/* Ở đây là cái doughnut chart */}
                    <img src={DoughnutChart} />
                </CardContent>
            </Card>
        );
    }

    return (
        <DetailLayouts
            avatar={salesmanInfo.avatar}
            header={salesmanInfo.fullName}
            tabs={['Account Detail']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            {tabValue === 0 && (
                <div className={classes.wrapper}>
                    {/* <.h1>Hellu</.h1> */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            {renderInfoCard(salesmanInfo)}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            {renderEfficiencyCard()}
                        </Grid>
                    </Grid>
                </div>
            )}
        </DetailLayouts>
    );
}

export default SalesmenDetail

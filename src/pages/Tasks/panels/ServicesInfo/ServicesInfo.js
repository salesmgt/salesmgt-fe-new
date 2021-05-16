import React, { useEffect, useState } from 'react'

import {
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Tabs,
    Tab,
} from '@material-ui/core'
import moment from 'moment'
import { Loading, NotFound } from '../../../../components'
import { Consts } from './ServicesInfoConfig'
import { serviceNames } from '../../../../constants/Generals'
import ServicesForm from './ServicesForm/ServicesForm'
import { useAuth } from '../../../../hooks/AuthContext'
import { roleNames } from '../../../../constants/Generals'
import { useTask } from '../../hooks/TaskContext';
import classes from './ServicesInfo.module.scss'

function ServicesInfo(props) {
    const { task, refreshPage } = props
    const services = task?.services

    const [tabValue, setTabValue] = useState(0)
    const [open, setOpen] = useState(false)

    const { headers, operations, fields } = Consts

    const { user } = useAuth()
    const { serviceTypes } = useTask()

    const [service, setService] = useState(null)

    const filteredServices = (serviceTypes) => {
        console.log(serviceTypes);
        switch (serviceTypes) {
            case serviceNames.svc1:
                return services.filter(
                    (aService) => aService.serviceType === serviceNames.svc1
                )
            case serviceNames.svc2:
                return services.filter(
                    (aService) => aService.serviceType === serviceNames.svc2
                )
            case serviceNames.svc3:
                return services.filter(
                    (aService) => aService.serviceType === serviceNames.svc3
                )
            case serviceNames.svc4:
                return services.filter(
                    (aService) => aService.serviceType === serviceNames.svc4
                )
            default:
                break
        }
    }

    // const services = [
    //     serviceNames.svc1,
    //     serviceNames.svc2,
    //     serviceNames.svc3,
    //     serviceNames.svc4,
    // ]
    // List này giờ get từ API chứ ko set cứng phía FE nữa
    // useEffect(() => {
    //     getServiceTypes().then((res) => {
    //         setServiceTypes(res)
    //         // console.log("list tasks = ", res.list);
    //     }).catch((error) => {
    //         if (error.response) {
    //             console.log(error)
    //             history.push({
    //                 pathname: '/errors',
    //                 state: { error: error.response.status },
    //             })
    //         }
    //     })
    // }, []);

    if (!task) {
        return <Loading />
    }

    if (!services) {
        return <NotFound title={operations.empty} />
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {user.roles[0] !== roleNames.salesman ||
                    (user.roles[0] === roleNames.salesman &&
                        user.username === task?.username) ? (
                    <>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.wrapper}
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
                            className={classes.wrapper}
                        >
                            <Grid container spacing={0}>
                                <Grid
                                    item
                                    xs={3}
                                    sm={3}
                                    md={3}
                                    lg={3}
                                    className={classes.leftSector}
                                >
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={tabValue}
                                        onChange={handleChangeTab}
                                        className={classes.tabs}
                                    >
                                        {serviceTypes.map((service, index) => (
                                            <Tab key={index} label={service} />
                                        ))}
                                    </Tabs>
                                </Grid>
                                <Grid
                                    item
                                    xs={9}
                                    sm={8}
                                    md={7}
                                    lg={5}
                                    className={classes.rightSector}
                                >
                                    {tabValue === 0 && (
                                        <>
                                            {filteredServices(serviceNames.svc1)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredServices(
                                                        serviceNames.svc1
                                                    ).map((aService, index) => (
                                                        <Card
                                                            className={
                                                                classes.card
                                                            }
                                                            key={index}
                                                        >
                                                            <CardContent
                                                                className={
                                                                    classes.cardCnt
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.cardCntHeader
                                                                    }
                                                                >
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            0
                                                                        }
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle1"
                                                                                className={
                                                                                    classes.cardSubtitle1
                                                                                }
                                                                            >
                                                                                {
                                                                                    aService?.service
                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle2"
                                                                                className={
                                                                                    classes.cardSubtitle2
                                                                                }
                                                                            >
                                                                                {`${fields
                                                                                    .date
                                                                                    .tittle
                                                                                    } ${moment(
                                                                                        aService?.date
                                                                                    ).format(
                                                                                        'DD/MM/YYYY'
                                                                                    )}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.cardCntBody
                                                                    }
                                                                >
                                                                    <Typography
                                                                        color="inherit"
                                                                        noWrap
                                                                        variant="body1"
                                                                    >
                                                                        {
                                                                            aService?.note
                                                                        }
                                                                    </Typography>
                                                                </div>
                                                            </CardContent>

                                                            <CardActions
                                                                className={
                                                                    classes.cardAct
                                                                }
                                                            >
                                                                <Button
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setOpen(
                                                                            true
                                                                        )
                                                                        setService(
                                                                            aService
                                                                        )
                                                                    }}
                                                                >
                                                                    {
                                                                        operations.view
                                                                    }
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))}
                                                    <ServicesForm
                                                        open={open}
                                                        onClose={() =>
                                                            setOpen(false)
                                                        }
                                                        service={service}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setService={
                                                            setService
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noServicesZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noServices
                                                        }
                                                    >
                                                        {operations.noServices}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tabValue === 1 && (
                                        <>
                                            {filteredServices(serviceNames.svc2)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredServices(
                                                        serviceNames.svc2
                                                    ).map((aService, index) => (
                                                        <Card
                                                            className={
                                                                classes.card
                                                            }
                                                            key={index}
                                                        >
                                                            <CardContent
                                                                className={
                                                                    classes.cardCnt
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.cardCntHeader
                                                                    }
                                                                >
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            0
                                                                        }
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle1"
                                                                                className={
                                                                                    classes.cardSubtitle1
                                                                                }
                                                                            >
                                                                                {
                                                                                    aService?.service
                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle2"
                                                                                className={
                                                                                    classes.cardSubtitle2
                                                                                }
                                                                            >
                                                                                {`${fields
                                                                                    .date
                                                                                    .tittle
                                                                                    } ${moment(
                                                                                        aService?.date
                                                                                    ).format(
                                                                                        'DD/MM/YYYY'
                                                                                    )}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.cardCntBody
                                                                    }
                                                                >
                                                                    <Typography
                                                                        color="inherit"
                                                                        noWrap
                                                                        variant="body1"
                                                                    >
                                                                        {
                                                                            aService?.note
                                                                        }
                                                                    </Typography>
                                                                </div>
                                                            </CardContent>

                                                            <CardActions
                                                                className={
                                                                    classes.cardAct
                                                                }
                                                            >
                                                                <Button
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setOpen(
                                                                            true
                                                                        )
                                                                        setService(
                                                                            aService
                                                                        )
                                                                    }}
                                                                >
                                                                    {
                                                                        operations.view
                                                                    }
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))}
                                                    <ServicesForm
                                                        open={open}
                                                        onClose={() =>
                                                            setOpen(false)
                                                        }
                                                        service={service}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setService={
                                                            setService
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noServicesZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noServices
                                                        }
                                                    >
                                                        {operations.noServices}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tabValue === 2 && (
                                        <>
                                            {filteredServices(serviceNames.svc3)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredServices(
                                                        serviceNames.svc3
                                                    ).map((aService, index) => (
                                                        <Card
                                                            className={
                                                                classes.card
                                                            }
                                                            key={index}
                                                        >
                                                            <CardContent
                                                                className={
                                                                    classes.cardCnt
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.cardCntHeader
                                                                    }
                                                                >
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            0
                                                                        }
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle1"
                                                                                className={
                                                                                    classes.cardSubtitle1
                                                                                }
                                                                            >
                                                                                {
                                                                                    aService?.service
                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle2"
                                                                                className={
                                                                                    classes.cardSubtitle2
                                                                                }
                                                                            >
                                                                                {`${fields
                                                                                    .date
                                                                                    .tittle
                                                                                    } ${moment(
                                                                                        aService?.date
                                                                                    ).format(
                                                                                        'DD/MM/YYYY'
                                                                                    )}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.cardCntBody
                                                                    }
                                                                >
                                                                    <Typography
                                                                        color="inherit"
                                                                        noWrap
                                                                        variant="body1"
                                                                    >
                                                                        {
                                                                            aService?.note
                                                                        }
                                                                    </Typography>
                                                                </div>
                                                            </CardContent>

                                                            <CardActions
                                                                className={
                                                                    classes.cardAct
                                                                }
                                                            >
                                                                <Button
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setOpen(
                                                                            true
                                                                        )
                                                                        setService(
                                                                            aService
                                                                        )
                                                                    }}
                                                                >
                                                                    {
                                                                        operations.view
                                                                    }
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))}
                                                    <ServicesForm
                                                        open={open}
                                                        onClose={() =>
                                                            setOpen(false)
                                                        }
                                                        service={service}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setService={
                                                            setService
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noServicesZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noServices
                                                        }
                                                    >
                                                        {operations.noServices}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tabValue === 3 && (
                                        <>
                                            {filteredServices(serviceNames.svc4)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredServices(
                                                        serviceNames.svc4
                                                    ).map((aService, index) => (
                                                        <Card
                                                            className={
                                                                classes.card
                                                            }
                                                            key={index}
                                                        >
                                                            <CardContent
                                                                className={
                                                                    classes.cardCnt
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.cardCntHeader
                                                                    }
                                                                >
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            0
                                                                        }
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle1"
                                                                                className={
                                                                                    classes.cardSubtitle1
                                                                                }
                                                                            >
                                                                                {
                                                                                    aService?.service
                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                6
                                                                            }
                                                                            sm={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                color="inherit"
                                                                                variant="subtitle2"
                                                                                className={
                                                                                    classes.cardSubtitle2
                                                                                }
                                                                            >
                                                                                {`${fields
                                                                                    .date
                                                                                    .tittle
                                                                                    } ${moment(
                                                                                        aService?.date
                                                                                    ).format(
                                                                                        'DD/MM/YYYY'
                                                                                    )}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.cardCntBody
                                                                    }
                                                                >
                                                                    <Typography
                                                                        color="inherit"
                                                                        noWrap
                                                                        variant="body1"
                                                                    >
                                                                        {
                                                                            aService?.note
                                                                        }
                                                                    </Typography>
                                                                </div>
                                                            </CardContent>

                                                            <CardActions
                                                                className={
                                                                    classes.cardAct
                                                                }
                                                            >
                                                                <Button
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setOpen(
                                                                            true
                                                                        )
                                                                        setService(
                                                                            aService
                                                                        )
                                                                    }}
                                                                >
                                                                    {
                                                                        operations.view
                                                                    }
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))}
                                                    <ServicesForm
                                                        open={open}
                                                        onClose={() =>
                                                            setOpen(false)
                                                        }
                                                        service={service}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setService={
                                                            setService
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noServicesZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noServices
                                                        }
                                                    >
                                                        {operations.noServices}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <div className={classes.notFound}>
                        <NotFound title={operations.restriction} />
                    </div>
                )}
            </Grid>
        </div>
    )
}

export default ServicesInfo

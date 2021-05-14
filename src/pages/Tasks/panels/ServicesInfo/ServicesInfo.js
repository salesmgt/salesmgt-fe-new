import React, { useState } from 'react'

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
import classes from './ServicesInfo.module.scss'

function ServicesInfo(props) {
    const { task, refreshPage } = props
    const memos = task?.memorandums

    const [tabValue, setTabValue] = useState(0)
    const [open, setOpen] = useState(false)

    const { headers, operations, fields } = Consts

    const { user } = useAuth()

    const [memoDets, setMemoDets] = useState(null)

    const filteredMemos = (services) => {
        switch (services) {
            case serviceNames.svc1:
                return memos.filter(
                    (memo) => memo.service === serviceNames.svc1
                )
            case serviceNames.svc2:
                return memos.filter(
                    (memo) => memo.service === serviceNames.svc2
                )
            case serviceNames.svc3:
                return memos.filter(
                    (memo) => memo.service === serviceNames.svc3
                )
            case serviceNames.svc4:
                return memos.filter(
                    (memo) => memo.service === serviceNames.svc4
                )
            default:
                break
        }
    }

    if (!task) {
        return <Loading />
    }

    if (!memos) {
        return <NotFound title={operations.empty} />
    }

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    const services = [
        serviceNames.svc1,
        serviceNames.svc2,
        serviceNames.svc3,
        serviceNames.svc4,
    ]

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
                                        {services.map((service, index) => (
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
                                            {filteredMemos(serviceNames.svc1)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredMemos(
                                                        serviceNames.svc1
                                                    ).map((memo, index) => (
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
                                                                                    memo?.service
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
                                                                                        memo?.date
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
                                                                            memo?.note
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
                                                                        setMemoDets(
                                                                            memo
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
                                                        memoDets={memoDets}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setMemoDets={
                                                            setMemoDets
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noMOUZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noMOU
                                                        }
                                                    >
                                                        {operations.noMOU}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tabValue === 1 && (
                                        <>
                                            {filteredMemos(serviceNames.svc2)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredMemos(
                                                        serviceNames.svc2
                                                    ).map((memo, index) => (
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
                                                                                    memo?.service
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
                                                                                        memo?.date
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
                                                                            memo?.note
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
                                                                        setMemoDets(
                                                                            memo
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
                                                        memoDets={memoDets}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setMemoDets={
                                                            setMemoDets
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noMOUZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noMOU
                                                        }
                                                    >
                                                        {operations.noMOU}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tabValue === 2 && (
                                        <>
                                            {filteredMemos(serviceNames.svc3)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredMemos(
                                                        serviceNames.svc3
                                                    ).map((memo, index) => (
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
                                                                                    memo?.service
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
                                                                                        memo?.date
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
                                                                            memo?.note
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
                                                                        setMemoDets(
                                                                            memo
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
                                                        memoDets={memoDets}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setMemoDets={
                                                            setMemoDets
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noMOUZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noMOU
                                                        }
                                                    >
                                                        {operations.noMOU}
                                                    </Typography>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tabValue === 3 && (
                                        <>
                                            {filteredMemos(serviceNames.svc4)
                                                .length !== 0 ? (
                                                <>
                                                    {filteredMemos(
                                                        serviceNames.svc4
                                                    ).map((memo, index) => (
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
                                                                                    memo?.service
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
                                                                                        memo?.date
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
                                                                            memo?.note
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
                                                                        setMemoDets(
                                                                            memo
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
                                                        memoDets={memoDets}
                                                        refreshPage={
                                                            refreshPage
                                                        }
                                                        setMemoDets={
                                                            setMemoDets
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={
                                                        classes.noMOUZone
                                                    }
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.noMOU
                                                        }
                                                    >
                                                        {operations.noMOU}
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

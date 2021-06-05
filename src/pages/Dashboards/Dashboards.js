import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Card, Grid, Avatar, makeStyles, Typography } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { MdAttachMoney } from 'react-icons/md'
import { FaHandshake, FaSchool } from 'react-icons/fa'
import { AnimationGroup, Loading } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { useApp } from '../../hooks/AppContext'
import { Consts } from './DashboardsConfig'
import * as Milk from '../../utils/Milk'
import { milkNames, roleNames } from '../../constants/Generals'
import * as DashboardsServices from './DashboardsServices'
import { MapCharts, PieCharts, StackColumnCharts } from '../../components/Charts'
import CardRanks from './components/CardRanks/CardRanks'
import { calculateSchoolYear, parseDateToString } from '../../utils/DateTimes'
// import { createMuiTheme } from '@material-ui/core/styles'
import classes from './Dashboards.module.scss'

// const theme = createMuiTheme({
//     palette: {
//         action: {
//             disabledBackground: 'rgb(255, 252, 225)' || 'red',
//             disabled: ''
//         }
//     }
// }

const useStyles = makeStyles((theme) => ({
    btnToggles: {
        minHeight: '1.8rem',
        maxHeight: '1.8rem',
        color: theme.palette.secondary.main,
        // background: theme.palette.secondary.light
    }
}))


function Dashboards() {
    const styles = useStyles()
    const { toggleButtonOptions } = Consts
    const { user } = useAuth()
    const { schYears } = useApp()
    const bakschYears = schYears ? schYears : Milk.getMilk(milkNames.schYears)
    const history = useHistory()

    const [data4Blocks, setData4Blocks] = useState()
    const [data4ServiceColumn, setData4ServiceColumn] = useState()
    const [data4CustomerPie, setData4CustomerPie] = useState()
    const [data4CustomerMap, setData4CustomerMap] = useState([])
    const [data4Ranking, setData4Ranking] = useState([])

    let isMounted = true
    const getData4Blocks = (type) => {
        DashboardsServices.getDashboards(type).then((data) => {
            if (isMounted) {
                setData4Blocks(data)
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
    }
    useEffect(() => {
        getData4Blocks('div')
        return () => {
            isMounted = false
        };
    }, [])

    // useEffect(() => {
    //     getData4CustomerPie('pie', 'school-status')
    //     return () => {
    //         isMounted = false
    //     };
    // }, [])


    const [years, setYears] = useState([])
    const getData4ServiceColumn = (type, name) => {
        DashboardsServices.getDashboards(type, name).then((data) => {
            if (isMounted) {
                setData4ServiceColumn(data)
                setYears(data[0].years)
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
    }
    useEffect(() => {
        getData4ServiceColumn('column', 'DS')
        return () => {
            isMounted = false
        };
    }, [])

    const [pieLabels, setPieLabels] = useState([])
    const getData4CustomerPie = (type, name) => {
        DashboardsServices.getDashboards(type, name).then((data) => {
            if (isMounted) {
                // setData4CustomerPie(data)
                let values = []
                let labels = []
                data.forEach(item => {
                    labels.push(item?.name)
                    values.push(item?.data)
                });
                setData4CustomerPie(values)
                setPieLabels(labels)
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
    }
    useEffect(() => {
        getData4CustomerPie('pie', 'school-status')
        return () => {
            isMounted = false
        };
    }, [])

    const columns = ['Rank', 'Salesman', 'Sales']
    const getData4Ranking = (type, name) => {
        DashboardsServices.getDashboards(type, name).then((data) => {
            if (isMounted) {
                setData4Ranking(data)
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
    }
    useEffect(() => {
        getData4Ranking('rank', 'month')
        return () => {
            isMounted = false
        };
    }, [])


    // const [districts, setDistricts] = useState([]);
    // const promise = DashboardsServices.fetchDistrictsData();
    // useEffect(() => {
    //     promise.then(data => {
    //         setData4CustomerMap(data.api)

    //         data.file.json().then(json => {
    //             setDistricts(json.features)
    //         })
    //     });
    // }, []);


    // const getData = () => {
    //     fetch('districts.json', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }).then(function (response) {
    //         console.log(response)
    //         return response.json();
    //     }).then(function (myJson) {
    //         console.log(myJson);
    //     });
    // }
    // useEffect(() => {
    //     getData()
    // }, [])

    //============================================================================

    const [viewServiceBy, setViewServiceBy] = useState("Sales");
    const handleChangeViewServiceBy = (event, option) => {
        if (option && option !== viewServiceBy) {
            setViewServiceBy(option);
            if (option === 'Sales') {
                getData4ServiceColumn('column', 'DS')
            } else {
                getData4ServiceColumn('column', 'SL')
            }
        }   // if (option === null || option === viewServiceBy), then ignore it <=> still keep the current value
    };

    const [viewCustomerBy, setViewCustomerBy] = useState("status");
    const handleChangeViewCustomerBy = (event, option) => {
        if (option !== null && option !== viewCustomerBy) {
            setViewCustomerBy(option);
            if (option === 'status') {
                getData4CustomerPie('pie', 'school-status')
            } else if (option === 'level') {
                getData4CustomerPie('pie', 'level')
            } else if (option === 'type') {
                getData4CustomerPie('pie', 'school-type')
            } else {
                getData4CustomerPie('pie', 'district')
            }
        }
    };

    const [viewRankingBy, setViewRankingBy] = useState("month");
    const handleChangeViewRankingBy = (event, option) => {
        if (option !== null && option !== viewRankingBy) {
            setViewRankingBy(option);
            if (option === 'month') {
                getData4Ranking('rank', 'month')
            } else if (option === 'year') {
                getData4Ranking('rank', 'year')
            } else {
                getData4Ranking('rank', 'all')
            }
        }
    };

    if (!bakschYears || !data4Blocks || !data4ServiceColumn ||
        !data4CustomerPie || !data4Ranking) {
        return <Loading />
    }

    let dataBlockSales = { ...data4Blocks[1], isIncreased: true, changes: 0 }
    let dataBlockServices = { ...data4Blocks[2], isIncreased: true, changes: 0 }
    let dataBlockCustomers = { ...data4Blocks[0], isIncreased: true, changes: 0 }
    const prepareDataFor3Blocks = () => {
        const thisSchoolYear = calculateSchoolYear();

        // dataBlockSales
        dataBlockSales = {
            ...dataBlockSales,
            title: dataBlockSales.name.substring(0, dataBlockSales.name.indexOf(thisSchoolYear) - 1),
            subtitle: dataBlockSales.name.substring(dataBlockSales.name.indexOf(thisSchoolYear))
            // subtitle: `${dataBlockSales.name.substring(dataBlockSales.name.indexOf(thisSchoolYear))} • until ${parseDateToString(new Date(), 'DD/MM/YYYY')}`
        }
        if (dataBlockSales?.present > dataBlockSales?.previous) {
            dataBlockSales = {
                ...dataBlockSales,
                isIncreased: true,
                changes: ((dataBlockSales?.present - dataBlockSales?.previous) / dataBlockSales?.previous) * 100
            }
        } else if (dataBlockSales?.present < dataBlockSales?.previous) {
            dataBlockSales = {
                ...dataBlockSales,
                isIncreased: false,
                changes: ((dataBlockSales?.present - dataBlockSales?.previous) / dataBlockSales?.previous) * 100
            }
        } else {
            dataBlockSales = {
                ...dataBlockSales,
                trend: 'stable',
                changes: 0
            }
        }

        // dataBlockServices
        dataBlockServices = {
            ...dataBlockServices,
            title: dataBlockServices.name.substring(0, dataBlockServices.name.indexOf(thisSchoolYear) - 1),
            subtitle: dataBlockServices.name.substring(dataBlockServices.name.indexOf(thisSchoolYear))
            // subtitle: `${dataBlockServices.name.substring(dataBlockServices.name.indexOf(thisSchoolYear))} • until ${parseDateToString(new Date(), 'DD/MM/YYYY')}`
        }
        if (dataBlockServices?.present > dataBlockServices?.previous) {
            dataBlockServices = {
                ...dataBlockServices,
                isIncreased: true,
                changes: ((dataBlockServices?.present - dataBlockServices?.previous) / dataBlockServices?.previous) * 100
            }
        } else if (dataBlockServices?.present < dataBlockServices?.previous) {
            dataBlockServices = {
                ...dataBlockServices,
                isIncreased: false,
                changes: ((dataBlockServices?.present - dataBlockServices?.previous) / dataBlockServices?.previous) * 100
            }
        } else {
            dataBlockServices = {
                ...dataBlockServices,
                trend: 'stable',
                changes: 0
            }
        }

        // dataBlockCustomers
        dataBlockCustomers = {
            ...dataBlockCustomers,
            title: dataBlockCustomers.name.substring(0, dataBlockCustomers.name.indexOf(thisSchoolYear) - 1),
            subtitle: dataBlockCustomers.name.substring(dataBlockCustomers.name.indexOf(thisSchoolYear))
            // subtitle: `${dataBlockCustomers.name.substring(dataBlockCustomers.name.indexOf(thisSchoolYear))} • until ${parseDateToString(new Date(), 'DD/MM/YYYY')}`
        }
        if (dataBlockCustomers?.present > dataBlockCustomers?.previous) {
            dataBlockCustomers = {
                ...dataBlockCustomers,
                isIncreased: true,
                changes: ((dataBlockCustomers?.present - dataBlockCustomers?.previous) / dataBlockCustomers?.previous) * 100
            }
        } else if (dataBlockCustomers?.present < dataBlockCustomers?.previous) {
            dataBlockCustomers = {
                ...dataBlockCustomers,
                isIncreased: false,
                changes: ((dataBlockCustomers?.present - dataBlockCustomers?.previous) / dataBlockCustomers?.previous) * 100
            }
        } else {
            dataBlockCustomers = {
                ...dataBlockCustomers,
                trend: true,
                changes: 0
            }
        }

    }
    prepareDataFor3Blocks()
    // console.log('dataBlockSales = ', dataBlockSales);
    // console.log('dataBlockServices = ', dataBlockServices);
    // console.log('dataBlockCustomers = ', dataBlockCustomers);

    const shortenCurrencyValue = (value) => {
        let val = Math.abs(value);
        if (val >= 1000000000) {
            val = (val / 1000000000).toFixed(2) + "B ₫";
            return val
        } else if (val >= 1000000) {
            val = (val / 1000000).toFixed(1) + "M ₫";
            return val;
        } else
            return val + " ₫";
    }

    return (
        <div className={classes.wrapper}>
            <Grid container spacing={0}>
                <Grid item container xs={12} sm={12} md={12} lg={12} className={classes.root}>
                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.body}>
                        <AnimationGroup enter={{ animation: 'transition.slideUpBigIn' }}>
                            <Grid container spacing={0}>
                                {user.roles[0] !== roleNames.salesman && (
                                    <>
                                        {/**3 Info Blocks */}
                                        <Grid item container spacing={3} xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                            {/**Block 1: Total Sales */}
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Card className={classes.blockSales} variant="elevation" elevation={10}>
                                                    <Box display="flex" flexDirection="column">
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                            <Box display="flex" flexDirection="row" alignItems="center" className={classes.box1Block1} flexGrow={1}>
                                                                <Avatar className={classes.avaBlock1}><MdAttachMoney className={classes.iconBlock1} /></Avatar>
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography className={classes.titleBlock1} color="textSecondary">{dataBlockSales?.title}</Typography>
                                                                    <span className={classes.subtitleBlock1}>
                                                                        <span className={classes.subtitle1Block1}>{dataBlockSales?.subtitle}</span>
                                                                        <span className={classes.subtitle2Block1}> • until </span>
                                                                        <span className={classes.subtitle1Block1}>{parseDateToString(new Date(), 'DD/MM/YYYY')}</span>
                                                                    </span>
                                                                </Box>
                                                            </Box>
                                                            {dataBlockSales?.isIncreased ? (
                                                                <Box className={classes.changesUpBlock1}>+{dataBlockSales?.changes.toFixed(1)}%▲</Box>
                                                            ) : (
                                                                <Box className={classes.changesDownBlock1}>{dataBlockSales?.changes.toFixed(1)}%▼</Box>
                                                            )}
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around">
                                                            <Box display="flex" flexDirection="column">
                                                                <Typography className={classes.content1Block1} variant="caption" color="textSecondary">Last year</Typography>
                                                                <span className={classes.previousBlock1}>{shortenCurrencyValue(dataBlockSales?.previous)}</span>
                                                            </Box>
                                                            <Box display="flex" flexDirection="column">
                                                                <Typography className={classes.content1Block1} variant="caption" color="textSecondary">Present</Typography>
                                                                <span className={classes.presentBlock1}>{shortenCurrencyValue(dataBlockSales?.present)}</span>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                            {/**Block 2: Sold Services */}
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Card className={classes.blockSevices} variant="elevation" elevation={10}>
                                                    <Box display="flex" flexDirection="column">
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                            <Box display="flex" flexDirection="row" alignItems="center" className={classes.box1Block2} flexGrow={1}>
                                                                <Avatar className={classes.avaBlock2}><FaHandshake className={classes.iconBlock2} /></Avatar>
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography className={classes.titleBlock2} color="textSecondary">{dataBlockServices?.title}</Typography>
                                                                    <span className={classes.subtitleBlock2}>
                                                                        <span className={classes.subtitle1Block2}>{dataBlockServices?.subtitle}</span>
                                                                        <span className={classes.subtitle2Block2}> • until </span>
                                                                        <span className={classes.subtitle1Block2}>{parseDateToString(new Date(), 'DD/MM/YYYY')}</span>
                                                                    </span>
                                                                </Box>
                                                            </Box>
                                                            {dataBlockServices?.isIncreased ? (
                                                                <Box className={classes.changesUpBlock2}>+{dataBlockServices?.changes.toFixed(1)}%▲</Box>
                                                            ) : (
                                                                <Box className={classes.changesDownBlock2}>{dataBlockServices?.changes.toFixed(1)}%▼</Box>
                                                            )}
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around">
                                                            <Box display="flex" flexDirection="column">
                                                                <Typography className={classes.content1Block2} variant="caption" color="textSecondary">Last year</Typography>
                                                                <span className={classes.previousBlock2}>{dataBlockServices?.previous} services</span>
                                                            </Box>
                                                            <Box display="flex" flexDirection="column">
                                                                <Typography className={classes.content1Block2} variant="caption" color="textSecondary">Present</Typography>
                                                                <span className={classes.presentBlock2}>{dataBlockServices?.present} services</span>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                            {/**Block 3: New Customers */}
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Card className={classes.blockCustomers} variant="elevation" elevation={10}>
                                                    <Box display="flex" flexDirection="column">
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                            <Box display="flex" flexDirection="row" alignItems="center" className={classes.box1Block3} flexGrow={1}>
                                                                <Avatar className={classes.avaBlock3}><FaSchool className={classes.iconBlock3} /></Avatar>
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography className={classes.titleBlock3} color="textSecondary">{dataBlockCustomers?.title}</Typography>
                                                                    <span className={classes.subtitleBlock3}>
                                                                        <span className={classes.subtitle1Block3}>{dataBlockCustomers?.subtitle}</span>
                                                                        <span className={classes.subtitle2Block3}> • until </span>
                                                                        <span className={classes.subtitle1Block3}>{parseDateToString(new Date(), 'DD/MM/YYYY')}</span>
                                                                    </span>
                                                                </Box>
                                                            </Box>
                                                            {dataBlockCustomers?.isIncreased ? (
                                                                <Box className={classes.changesUpBlock3}>+{dataBlockCustomers?.changes.toFixed(1)}%▲</Box>
                                                            ) : (
                                                                <Box className={classes.changesDownBlock3}>{dataBlockCustomers?.changes.toFixed(1)}%▼</Box>
                                                            )}
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around">
                                                            <Box display="flex" flexDirection="column">
                                                                <Typography className={classes.content1Block3} variant="caption" color="textSecondary">Last year</Typography>
                                                                <span className={classes.previousBlock3}>{dataBlockCustomers?.previous} schools</span>
                                                            </Box>
                                                            <Box display="flex" flexDirection="column">
                                                                <Typography className={classes.content1Block3} variant="caption" color="textSecondary">Present</Typography>
                                                                <span className={classes.presentBlock3}>{dataBlockCustomers?.present} schools</span>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        </Grid>

                                        {/**Services & Customer */}
                                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.rowt}>
                                            <Grid item container spacing={3} xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                                {/* Services (bar) */}
                                                <Grid item xs={12} sm={7} md={7} lg={7}>
                                                    <Card className={classes.panelServices} variant="elevation" elevation={4}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" className={classes.toggleOptions}>
                                                                    <Typography variant="subtitle2" className={classes.txtViewBy}>View by </Typography>
                                                                    {/* <ThemeProvider theme={theme}> */}
                                                                    <ToggleButtonGroup
                                                                        value={viewServiceBy}
                                                                        exclusive
                                                                        onChange={handleChangeViewServiceBy}
                                                                        size="small"
                                                                        color="primary"
                                                                        classes={{ root: styles.btnToggles }}
                                                                    >
                                                                        <ToggleButton value={toggleButtonOptions.serviceBarChart.ds}>Sales</ToggleButton>
                                                                        <ToggleButton value={toggleButtonOptions.serviceBarChart.sl}>Quantity</ToggleButton>
                                                                    </ToggleButtonGroup>
                                                                    {/* </ThemeProvider> */}
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                {data4ServiceColumn && years &&
                                                                    <StackColumnCharts values={data4ServiceColumn} years={years} option={viewServiceBy} />
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>

                                                {/** Customers (pie) */}
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <Card className={classes.panelCustomers} variant="elevation" elevation={4}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" className={classes.toggleOptions}>
                                                                    <Typography variant="subtitle2" className={classes.txtViewBy}>View by </Typography>
                                                                    <ToggleButtonGroup
                                                                        value={viewCustomerBy}
                                                                        exclusive
                                                                        onChange={handleChangeViewCustomerBy}
                                                                        size="small"
                                                                        color="secondary"
                                                                        classes={{ root: styles.btnToggles }}
                                                                    >
                                                                        <ToggleButton color="secondary" value="status">Status</ToggleButton>
                                                                        <ToggleButton color="secondary" value="level">Level</ToggleButton>
                                                                        <ToggleButton color="secondary" value="type">Type</ToggleButton>
                                                                        <ToggleButton color="secondary" value="district">District</ToggleButton>
                                                                    </ToggleButtonGroup>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                {data4ServiceColumn &&
                                                                    <PieCharts values={data4CustomerPie} labels={pieLabels} option={viewCustomerBy} />
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}

                                {/**HCM Map (Customer) & Salesmen Ranking */}
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.rowy}>
                                    <Grid item container spacing={3} xs={12} sm={12} md={12} lg={12} className={classes.rowx}>
                                        {/** Customers Map Chart */}
                                        <Grid item xs={12} sm={8} md={8} lg={8}>
                                            <Card className={classes.panelMap} variant="elevation" elevation={4}>
                                                <Typography className={classes.title}>
                                                    Number of Customers by Districts in HCMC <br />
                                                    (until {parseDateToString(new Date(), 'DD/MM/YYYY')})
                                                </Typography>
                                                <div className={classes.mapPanel}>
                                                    <MapCharts />
                                                </div>
                                            </Card>
                                        </Grid>

                                        {/** Salesmen Ranking */}
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Card className={classes.panelRanking} variant="elevation" elevation={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" className={classes.toggleOptions}>
                                                            <Typography variant="subtitle2" className={classes.txtViewBy}>View by </Typography>
                                                            <ToggleButtonGroup
                                                                value={viewRankingBy}
                                                                exclusive
                                                                onChange={handleChangeViewRankingBy}
                                                                size="small"
                                                                color="primary"
                                                                classes={{ root: styles.btnToggles }}
                                                            >
                                                                <ToggleButton value="month">This month</ToggleButton>
                                                                <ToggleButton value="year">This year</ToggleButton>
                                                                <ToggleButton value="all">Whole time</ToggleButton>
                                                            </ToggleButtonGroup>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <CardRanks data={data4Ranking} columns={columns} />
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AnimationGroup>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboards
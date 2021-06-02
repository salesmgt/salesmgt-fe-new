import React, { useEffect, useState } from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Card,
    Avatar,
    Box,
    ListItemText,
    makeStyles,
    TextField,
    Tooltip,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
// import { Medal } from '../../../../assets/icons/index';
import { Consts } from '../DialogConfig'
import { getKPIDetails, updateKPIManual } from '../../KPIsServices';
import { useHistory } from 'react-router';
import { Loading } from '../../../../components';
import { parseDateToString } from '../../../../utils/DateTimes';
import { kpiDetailTypes, roleNames } from '../../../../constants/Generals';
import RadarCharts from '../../../../components/Charts/RadarCharts/RadarCharts';
import { useSnackbar } from 'notistack'
import { useAuth } from '../../../../hooks/AuthContext';
import classes from './SalesmanKPIs.module.scss'

const stylesTitle = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

const useStyles = makeStyles((theme) => ({
    txtFullName: {
        fontSize: '1.2rem',
        fontWeight: 500
    },
    txtUsername: {
        fontSize: '1rem',
        fontWeight: 400
    },
    customHeight: {
        height: '1.3rem',
        padding: '0.1rem 0.25rem'
    }
}))

function SalesmanKPIs(props) {
    const styles = useStyles()
    const { open, onClose, refreshPage, kpiInfo } = props    //, setNotify
    const { kpiId, kpiGroupId, kpiGroupName, averageValues } = kpiInfo
    const { headers, operations } = Consts

    const { user } = useAuth()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    const [kpiDetails, setKpiDetails] = useState(null);
    // const { fullName, username, avatar, startDate, endDate, total, kpis } = kpiDetails
    let autoKPIs = []
    let manualKPIs = []
    const [dataForChart, setDataForChart] = useState({
        salesmanName: '',
        criteria: [],
        actualValues: [],
        targetValues: [],
        averageValues: averageValues
    });

    // console.log('outside - kpiDetails = ', kpiDetails);

    let isMounted = true
    const getKpiDetails = () => {
        getKPIDetails(kpiId).then(data => {
            if (isMounted) {
                setKpiDetails(data)
                // console.log('KPIDetails nè: ', data);
                // divideKPIsByTypes(data?.kpis)
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

    // Phức tạp, để lại
    // Tự làm khó mình quá, chi thế ta, có mấy cái khối ở trang KPI Group Details chính là average rồi đó!
    // const calculateAverageValues = () => {
    //     let sum = 0
    //     kpiDetails?.kpis.forEach(kpi => {
    //         sum += kpi?.actualValue
    //         console.log('actualValue = ', kpi?.actualValue);
    //     });
    //     console.log('sum = ', sum);
    //     console.log('avg = ', sum / (kpiDetails?.kpis.length));
    //     // return sum / (kpiDetails?.kpis.length)
    // }

    const prepareDataForChart = () => {
        let criteria = []
        let actualValues = []
        let targetValues = []
        // let averageValues = []
        // const averageValue = calculateAverageValues()

        kpiDetails?.kpis.forEach(kpi => {

            criteria.push(kpi?.cirteriaContent)
            actualValues.push(parseFloat((kpi?.actualValue / kpi?.targetValue) * 100))
            targetValues.push(100)  // 100%
            // averageValues.push(averageValue)
        });

        // console.log(kpiDetails?.kpis);
        // console.log(criteria);
        // console.log(actualValues);
        // console.log(targetValues);
        // console.log(averageValues);

        setDataForChart({
            ...dataForChart,
            salesmanName: kpiDetails?.fullName,
            criteria: criteria,
            actualValues: actualValues,
            targetValues: targetValues,
            // averageValues: averageValues
        })
    }

    useEffect(() => {
        getKpiDetails()
        // prepareDataForChart()

        return () => {
            isMounted = false
        };
    }, []);

    useEffect(() => {
        prepareDataForChart()
        // console.log('DataForChart = ', dataForChart);
    }, [kpiDetails]);

    if (!kpiDetails) {
        return <Loading />
    }

    const divideKPIsByTypes = (listKPIs) => {
        listKPIs.forEach(kpi => {
            if (kpi?.type === kpiDetailTypes.auto) {
                autoKPIs.push(kpi)
            } else if (kpi?.type === kpiDetailTypes.manual) {
                manualKPIs.push(kpi)
            }
        });
    }
    divideKPIsByTypes(kpiDetails?.kpis)

    const getSalesmanRank = (kpiPoints) => {
        if (kpiPoints > 100)
            return 'S'
        else if (kpiPoints > 90)
            return 'A'
        else if (kpiPoints > 50)
            return 'B'
        else if (kpiPoints > 0)
            return 'C'
        else return 'F'
    }

    const handleUpdateManualKPIActualValue = () => {
        // nhờ a Gia đổi request thành 1 array[kpiDetails]
        // let models = []
        let model = {
            criteriaId: '',
            criteria: '',
            descrption: '',
            type: '',
            value: 0,
            weight: 0
        }
        kpiDetails?.kpis.map(kpiDetail => {
            if (kpiDetail?.type === kpiDetailTypes.manual) {
                model = {
                    ...model,
                    criteria: kpiDetail?.cirteriaContent,
                    descrption: kpiDetail?.description,
                    type: kpiDetail?.type,
                    value: Number(kpiDetail?.actualValue),
                    weight: kpiDetail?.weight
                }
                // models.push(model)
                console.log('kpiGroupId = ', kpiGroupId);
                updateKPIManual(kpiDetail?.kpiDetailId, model).then(res => {
                    refreshPage(kpiGroupId)

                    enqueueSnackbar('Updated Salesman evaluation successfully', { variant: 'success' })
                }).catch((error) => {
                    if (error.response) {
                        console.log(error)
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }

                    enqueueSnackbar('Updated Salesman evaluation failed', { variant: 'error' })
                })
            }
        })
        // console.log('models: ', models);


    }

    const handleTargetValueChange = (event, currentKPIPoint) => {
        let cloneKPIs = [...kpiDetails?.kpis]
        const index = cloneKPIs.findIndex((obj) => obj.kpiDetailId === currentKPIPoint.kpiDetailId)
        // console.log('found editing actualValue at ', index, cloneKPIs[index]);
        cloneKPIs[index] = {
            ...cloneKPIs[index],
            actualValue: event.target.value
        }
        setKpiDetails({ ...kpiDetails, kpis: cloneKPIs })
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            // component="form"
            className={classes.dialog}
        >
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.salesmanKPI}
            </DialogTitleWithIconClose>
            <DialogContent>
                <Grid container spacing={5}>
                    {/**Titles */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box display="flex" alignItems="start" justifyContent="space-around">
                            <Box display="flex" flexDirection="column" className={classes.boxTitle}>
                                <Typography variant="button" color="textSecondary">Salesman</Typography>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Avatar src={kpiDetails?.avatar} variant="rounded" className={classes.avatar} />
                                    <ListItemText primary={kpiDetails?.fullName} secondary={kpiDetails?.username}
                                        classes={{ primary: styles.txtFullName, secondary: styles.txtUsername }}
                                        className={classes.salesmanName}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="button" color="textSecondary">KPI Group</Typography>
                                <ListItemText
                                    primary={kpiGroupName}
                                    secondary={`${parseDateToString(kpiDetails?.startDate, 'DD/MM/YYYY')} 
                                        ➜ ${parseDateToString(kpiDetails?.endDate, 'DD/MM/YYYY')}`}
                                    classes={{ primary: styles.txtFullName, secondary: styles.txtUsername }}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="button" color="textSecondary">KPI Points</Typography>
                                <Typography variant="h5" className={classes.weight}>
                                    {parseFloat(kpiDetails?.total).toFixed(2)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/**KPI Details */}
                    <Grid item container spacing={3} xs={12} sm={12} md={12} lg={12}>
                        {/**KPI Cards */}
                        <Grid item container spacing={2} xs={12} sm={12} md={7} lg={7}>
                            {/**Manual KPIs */}
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                {/* <Typography variant="button" color="textSecondary">Manual KPI</Typography> */}
                                {manualKPIs.map((kpiPoint, index) => (
                                    <Card key={index} variant="outlined" className={classes.cardKPIs}>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Box display="flex" flexDirection="row">
                                                    <Box flexGrow={1}>
                                                        <Typography className={classes.criName}>{kpiPoint?.cirteriaContent}</Typography>
                                                        {/* <Tooltip title="">
                                                    <div className={classes.icon}><MdInfo className={classes.iconInfo} /></div>
                                                </Tooltip> */}
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" alignItems="center" className={classes.boxIcon}>
                                                        <Typography variant="caption" color="textSecondary" className={classes.txtRank}>Class: </Typography>
                                                        {/* <img src={Medal} className={classes.iconRank} />? */}
                                                        <span className={classes.rankName}>
                                                            {getSalesmanRank((kpiPoint?.actualValue / kpiPoint?.targetValue) * 100)}
                                                        </span>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item container xs={12} sm={12} md={12} lg={12}>
                                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.divider}>
                                                    <Typography variant="caption" color="textSecondary">Actual value</Typography>
                                                    {user.roles[0] === roleNames.manager ? (
                                                        <TextField className={classes.txtTargetValue}
                                                            variant="outlined" size="small"
                                                            type="number"
                                                            value={kpiPoint?.actualValue}
                                                            onChange={(event) => handleTargetValueChange(event, kpiPoint)}
                                                            InputProps={{
                                                                inputProps: { min: 0, max: 100 },
                                                                classes: { input: styles.customHeight }
                                                            }}
                                                        />
                                                    ) : (
                                                        <Typography className={classes.kpiValues}>
                                                            {Intl.NumberFormat('vi-VN').format(kpiPoint?.actualValue)}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.divider}>
                                                    <Typography variant="caption" color="textSecondary">Target value</Typography>
                                                    <Typography className={classes.kpiValues}>{kpiPoint?.targetValue}</Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.noDivider}>
                                                    <Typography variant="caption" color="textSecondary">KPI (%)</Typography>
                                                    <Typography className={classes.kpiValues}>
                                                        {parseFloat((kpiPoint?.actualValue / kpiPoint?.targetValue) * 100).toFixed(1)} %
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </Grid>
                            {/**Auto KPIs */}
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                {/* <Typography variant="button" color="textSecondary">Performance KPI</Typography> */}
                                {autoKPIs.map((kpi, index) => (
                                    <Card key={index} variant="outlined" className={classes.cardKPIs}>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Box display="flex" flexDirection="row">
                                                    <Box flexGrow={1}>
                                                        <Typography className={classes.criName}>{kpi?.cirteriaContent}</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" alignItems="center" className={classes.boxIcon}>
                                                        <Typography variant="caption" color="textSecondary" className={classes.txtRank}>Class: </Typography>
                                                        {/* <img src={Medal} className={classes.iconRank} /> */}
                                                        <span className={classes.rankName}>
                                                            {getSalesmanRank((kpi?.actualValue / kpi?.targetValue) * 100)}
                                                        </span>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item container xs={12} sm={12} md={12} lg={12}>
                                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.divider}>
                                                    <Typography variant="caption" color="textSecondary">Actual value</Typography>
                                                    <Typography className={classes.kpiValues}>
                                                        {Intl.NumberFormat('vi-VN').format(kpi?.actualValue)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.divider}>
                                                    <Typography variant="caption" color="textSecondary">Target value</Typography>
                                                    <Typography className={classes.kpiValues}>
                                                        {Intl.NumberFormat('vi-VN').format(kpi?.targetValue)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.noDivider}>
                                                    <Typography variant="caption" color="textSecondary">KPI (%)</Typography>
                                                    <Typography className={classes.kpiValues}>
                                                        {parseFloat((kpi?.actualValue / kpi?.targetValue) * 100).toFixed(1)} %
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </Grid>
                        </Grid>

                        {/**Charts */}
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <RadarCharts values={dataForChart} />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnSave} onClick={handleUpdateManualKPIActualValue} autoFocus>
                    {operations.save}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SalesmanKPIs
import React, { useEffect, useState } from 'react'
import {
    Box,
    Divider,
    Grid,
    Paper,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { MdInfo } from 'react-icons/md';
import { Loading } from '../../../../components';
import { GaugeCharts, RadarCharts } from '../../../../components/Charts';
import { parseDateToString } from '../../../../utils/DateTimes';
import Carousel from 'react-material-ui-carousel'
import classes from './SalesmanKPIInfo.module.scss'

function SalesmanKPIInfo(props) {
    const { KPI } = props
    // const { headers, operations, fields } = Consts
    // const [openSalesmanKPIDialog, setOpenSalesmanKPIDialog] = useState(false)
    // const [kpiInfo, setKpiInfo] = useState(null)

    // const getChartTitle = () => {
    //     const today = new Date()
    //     const endDate = new Date(KPI?.endDate)

    //     if (today > endDate) {
    //         return `KPI of Salesmen for [${KPI?.groupName}] from ${parseDateToString(KPI?.startDate, 'DD/MM/YYYY')} ➜ ${parseDateToString(endDate, 'DD/MM/YYYY')}`
    //     } else {
    //         return `KPI of Salesmen for [${KPI?.groupName}] from ${parseDateToString(KPI?.startDate, 'DD/MM/YYYY')} ➜ ${parseDateToString(today, 'DD/MM/YYYY')}`
    //     }
    // }

    console.log('KPI hien tai = ', KPI);

    const [dataForRadarChart, setDataForRadarChart] = useState({
        title: 'My KPIs (divided by Criteria)',
        criteria: [],
        actualValues: [],
        targetValues: [],
    });
    // const [dataForGaugeChart, setDataForGaugeChart] = useState({
    //     kpiName: '',
    //     kpiPoints: 0
    // });

    const prepareDataForRadarChart = () => {
        let criteria = []
        let actualValues = []
        let targetValues = []

        KPI?.kpis.forEach(kpi => {
            criteria.push(kpi?.cirteriaContent)
            actualValues.push(parseFloat((kpi?.actualValue / kpi?.targetValue) * 100))  // x%
            targetValues.push(100)  // 100%
        });

        setDataForRadarChart({
            ...dataForRadarChart,
            criteria: criteria,
            actualValues: actualValues,
            targetValues: targetValues,
        })
    }
    // const prepareDataForGaugeChart = (kpi) => {
    //     setDataForGaugeChart({
    //         kpiName: kpi?.cirteriaContent,
    //         kpiPoints: parseFloat((kpi?.actualValue / kpi?.targetValue) * 100)
    //     })
    // }

    // console.log('dataForGaugeChart = ', dataForGaugeChart);

    useEffect(() => {
        prepareDataForRadarChart()
        // prepareDataForGaugeChart()
    }, []);

    if (!KPI) {
        return <Loading />
    }

    const getKPICriteriaTitle = (criteria) => {
        console.log(criteria);
        return (
            <span>
                <span>Weight: {criteria?.weight * 100}%</span><br />
                <span>Description:</span><br />
                <span>{criteria?.descrption}</span>
            </span>
        )
    }

    const shortenCurrencyValue = (value) => {
        let val = Math.abs(value);
        if (val >= 1000000000) {
            val = (val / 1000000000).toFixed(2) + "B ₫";
            return val
        } else if (val >= 1000000) {
            val = (val / 1000000).toFixed(1) + "M ₫";
            return val;
        } else
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    const getSalesmanRank = (kpiPoints) => {
        if (kpiPoints > 100)
            return 'S'
        else if (kpiPoints > 80)
            return 'A'
        else if (kpiPoints > 50)
            return 'B'
        else if (kpiPoints > 0)
            return 'C'
        else return 'F'
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={2} className={classes.body}>
                {/**My KPI Points */}
                <Grid item container spacing={2} xs={12} sm={12} md={6} lg={7}>
                    {/**List of Gauge charts KPIs in each criterion */}
                    {KPI?.kpis.map(kpi => (
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Paper className={classes.gaugeChartCard} elevation={5}>
                                {/* <div class="ribbon-1"></div> */}
                                <Box display="flex" flexDirection="column">
                                    <GaugeCharts kpiName={kpi?.cirteriaContent} kpiPoints={parseFloat((kpi?.actualValue / kpi?.targetValue) * 100).toFixed(1)} />
                                    <Divider className={classes.divider} />
                                    <Grid container>
                                        <Grid xs={9} sm={9} md={9} lg={9} style={{ borderRight: '1px solid #9e9e9e' }}>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                style={{ padding: '0 1.5rem' }}
                                            >
                                                <Typography variant="subtitle2" color="textSecondary">Target: </Typography>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {kpi?.criteriaId === 'DS'
                                                        ? shortenCurrencyValue(kpi?.targetValue)
                                                        : kpi?.targetValue
                                                    }
                                                </Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                style={{ padding: '0 1.5rem' }}
                                            >
                                                <Typography variant="subtitle2" color="textSecondary">Actual:</Typography>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {kpi?.criteriaId === 'DS'
                                                        ? shortenCurrencyValue(kpi?.actualValue)
                                                        : kpi?.actualValue
                                                    }
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={3} sm={3} md={3} lg={3}>
                                            <Typography variant="h5" style={{ color: '#ffa000', fontWeight: 700, textAlign: 'center', paddingTop: '0.3rem' }}>
                                                {getSalesmanRank((kpi?.actualValue / kpi?.targetValue) * 100)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5}>
                    {/**Radar chart */}
                    <RadarCharts values={dataForRadarChart} />
                </Grid>
            </Grid >
        </div >
    )
}

export default SalesmanKPIInfo

import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
// import { updateKPI } from '../../KPIsServices'
import { Loading, SimpleColumnCharts } from '../../../../components';
import { MdInfo } from 'react-icons/md';
import { parseDateToString } from '../../../../utils/DateTimes';
import { chunkArray } from '../../../../utils/Arrays';
import SalesmanKPIs from '../../dialogs/SalesmanKPIs/SalesmanKPIs';
import classes from './KPIInfo.module.scss'

function KPIInfo(props) {
    const { KPI, refreshPage } = props
    // const { headers, operations, fields } = Consts
    const [openSalesmanKPIDialog, setOpenSalesmanKPIDialog] = useState(false)
    const [kpiInfo, setKpiInfo] = useState(null)

    let listCriteria = chunkArray(KPI?.kpiDetails, 4)
    // console.log('listCriteria = ', listCriteria);

    // console.log('kpiGroup details: ', KPI?.kpiDetails);

    const getChartTitle = () => {
        const today = new Date()
        const endDate = new Date(KPI?.endDate)

        if (today > endDate) {
            return `KPI of Salesmen for [${KPI?.groupName}] from ${parseDateToString(KPI?.startDate, 'DD/MM/YYYY')} ➜ ${parseDateToString(endDate, 'DD/MM/YYYY')}`
        } else {
            return `KPI of Salesmen for [${KPI?.groupName}] from ${parseDateToString(KPI?.startDate, 'DD/MM/YYYY')} ➜ ${parseDateToString(today, 'DD/MM/YYYY')}`
        }
    }

    const [dataForChart, setDataForChart] = useState({
        title: getChartTitle(),
        xAxis: [],
        yAxis: []
    });

    const prepareDataForChart = () => {
        let salesmen = []
        let values = []
        // chỉ lấy top 10 chứ ko lấy hết tất cả
        if (KPI?.kpis.length < 10) {
            KPI?.kpis.forEach(kpi => {
                salesmen.push(kpi?.fullName)
                values.push(kpi?.value)
            });
        } else {
            for (let i = 0; i < 10; i++) {
                salesmen.push(KPI?.kpis[i]?.fullName)
                values.push(KPI?.kpis[i]?.value)
            }
        }
        setDataForChart({
            ...dataForChart,
            xAxis: salesmen,
            yAxis: values
        })
    }

    useEffect(() => {
        prepareDataForChart()
    }, []);

    if (!KPI) {
        return <Loading />
    }

    const handleViewSalesmanKPI = (e, kpiId, kpiGroupName, kpiDetails) => {
        let averageValues = []
        kpiDetails.forEach(detail => {
            averageValues.push(detail?.value)
        });
        // console.log('handleViewSalesmanKPI ---- averageValues = ', averageValues);

        setOpenSalesmanKPIDialog(true)
        setKpiInfo({
            kpiId: kpiId,
            kpiGroupId: KPI?.id,
            kpiGroupName: kpiGroupName,
            averageValues: averageValues,
        })
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={4} className={classes.body}>
                {/**Criteria */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Carousel animation="slide" autoPlay={false}>
                        {listCriteria.map((subListCriteria, time) => (
                            // <CriteriaCard key={time} criteria={subListCriteria} />
                            <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} key={time}>
                                {subListCriteria.map((cri, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Card key={index} className={classes.cardCriteria} variant="elevation" elevation={5}>
                                            <CardContent>
                                                {/* <Grid container>
                                                    <Grid item xs={12} sm={11} md={11} lg={11}> */}
                                                <Box display="flex" flexDirection="row">
                                                    <Box>
                                                        <Typography className={classes.criName} gutterBottom>{cri?.criteria}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Tooltip title={`Weight: ${cri?.weight * 100}%`} placement="right">
                                                            <div className={classes.icon}><MdInfo className={classes.iconInfo} /></div>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                                {/* </Grid>
                                            <Grid item xs={12} sm={1} md={1} lg={1}>

                                            </Grid> */}
                                                {/* <Grid item xs={12} sm={12} md={12} lg={12}> */}
                                                <Typography variant="h5" component="h2">{parseFloat(cri?.value).toFixed(2)} %</Typography>
                                                {/* </Grid> */}
                                                {/* </Grid> */}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Carousel>
                </Grid>

                {/**List Salesman & Chart */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={3}>
                        {/**List Salesman */}
                        <Grid item xs={12} sm={12} md={4} lg={4} className={classes.listSalesmen}>
                            {KPI?.kpis.map((kpi, index) => (
                                <Card key={index}
                                    className={classes.cardSalesman}
                                    variant="outlined"
                                    onClick={(e) => handleViewSalesmanKPI(e, kpi?.kpiId, KPI?.groupName, KPI?.kpiDetails)}
                                >
                                    <Grid container>
                                        <Grid item xs={1} sm={1} md={1} lg={1} className={(index + 1 < 10) ? classes.indexSalesman1 : classes.indexSalesman2}>
                                            <Typography>{index + 1}</Typography>
                                        </Grid>
                                        <Grid item xs={11} sm={9} md={9} lg={8}>
                                            <Box display="flex" alignItems="center">
                                                <Avatar src={kpi?.avatar} />
                                                <Typography className={classes.salesmanName}>{kpi?.fullName}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={3}>
                                            <Typography className={classes.criWeight}>{parseFloat(kpi?.value).toFixed(2)} %</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                            {openSalesmanKPIDialog && (
                                <SalesmanKPIs
                                    open={openSalesmanKPIDialog}
                                    onClose={() => setOpenSalesmanKPIDialog(false)}
                                    refreshPage={refreshPage}
                                    kpiInfo={kpiInfo}
                                />
                            )}
                        </Grid>

                        {/**Chart */}
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <SimpleColumnCharts values={dataForChart} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
            {/* <Snackbars notify={notify} setNotify={setNotify} /> */}
        </div >
    )
}

export default KPIInfo

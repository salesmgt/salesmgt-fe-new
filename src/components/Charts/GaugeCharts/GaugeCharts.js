
import React from 'react';
import Chart from "react-apexcharts"
import { parseDateToString } from '../../../utils/DateTimes';

const GaugeCharts = (props) => {
    const { kpiPoints, kpiName } = props

    let values = []
    values.push(kpiPoints)
    // console.log('kpiPoints = ', kpiPoints);
    // console.log('kpiName = ', kpiName);

    const getTitle = (option) => {
        switch (option) {
            case 'status':
                let title = `Number of Schools by Status (unit: school)
                (until ${parseDateToString(new Date(), 'DD/MM/YYYY')})`
                // return (<span>
                //     Number of Schools by School status (unit: school) <br />
                //     (until {parseDateToString(new Date(), 'DD/MM/YYYY')})
                // </span>
                // )
                return title
            case 'level':
                return `Customer Segment Divided by Level (unit: school) (until ${parseDateToString(new Date(), 'DD/MM/YYYY')})`
            case 'type':
                return `Customer Segment Divided by Type (unit: school) (until ${parseDateToString(new Date(), 'DD/MM/YYYY')})`
            case 'district':
                return `Customer Segment Divided by District (unit: school) (until ${parseDateToString(new Date(), 'DD/MM/YYYY')})`
            default:
                break;
        }
    }

    const state = {
        series: values,
        options: {
            chart: {
                height: 210,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetX: 0,
                    offsetY: -22,
                    hollow: {
                        size: '60%',
                        margin: 0,
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            fontSize: '13px',
                            fontWeight: 100,
                            color: '#000',
                            offsetY: 85
                        },
                        value: {
                            fontSize: '23px',
                            fontWeight: 700,
                            // color: '#ffc107',
                            offsetY: -8
                        }
                    }
                },
            },
            labels: [kpiName],
            colors: [
                function ({ value, seriesIndex, w }) {
                    if (value < 50) {
                        return '#f44336'
                    } else if (value < 80) {
                        return '#ff9800'
                    } else {
                        return '#4caf50'
                    }
                }
            ]
        },
    };


    return (
        <div>
            <Chart options={state.options} series={state.series} type="radialBar" height={210} />
        </div>
    );
}

export default GaugeCharts;
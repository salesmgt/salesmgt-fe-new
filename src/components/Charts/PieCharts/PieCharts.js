
import React from 'react';
import Chart from "react-apexcharts"
import { parseDateToString } from '../../../utils/DateTimes';

const PieCharts = (props) => {
    const { values, labels, option } = props

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
                width: 350,
                type: 'donut',
                dropShadow: {
                    enabled: true,
                    color: '#111',
                    top: -1,
                    left: 3,
                    blur: 3,
                    opacity: 0.2
                },
            },
            stroke: {
                width: 0,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                fontSize: '22px',
                            }
                        }
                    }
                }
            },
            labels: labels,
            dataLabels: {
                dropShadow: {
                    blur: 3,
                    opacity: 0.8
                }
            },
            legend: {
                position: 'right',
                offsetX: -20,
                offsetY: 40,
                fontSize: '14px'
            },
            fill: {
                // type: 'pattern',
                opacity: 1,
                // pattern: {
                //     enabled: true,
                //     style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
                // },
            },
            states: {
                hover: {
                    filter: 'none'
                }
            },
            theme: {
                palette: 'palette2'
            },
            title: {
                text: getTitle(option),
                whiteSpace: 'wrap'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };


    return (
        <div>
            <Chart options={state.options} series={state.series} type="donut" height={350} />
        </div>
    );
}

export default PieCharts;
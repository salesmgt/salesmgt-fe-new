
import React from 'react';
import Chart from "react-apexcharts"

const PieCharts = (props) => {
    const { values, labels, option } = props

    const getTitle = (option) => {
        switch (option) {
            case 'status':
                return 'Customer Segment divided by School status (unit: school)'
            case 'level':
                return 'Customer Segment divided by School level (unit: school)'
            case 'type':
                return 'Customer Segment divided by School type (unit: school)'
            case 'district':
                return 'Customer Segment divided by District (unit: school)'
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
                }
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
                text: getTitle(option)
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
            <Chart options={state.options} series={props?.values} type="donut" height={350} />
        </div>
    );
}

export default PieCharts;
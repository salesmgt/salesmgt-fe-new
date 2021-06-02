import React from 'react';
import Chart from "react-apexcharts"

const RadarCharts = (props) => {
    const { salesmanName, criteria, actualValues, targetValues, averageValues } = props.values

    const state = {
        series: [{
            name: 'My KPIs',
            data: actualValues,
        }, {
            name: 'Target',
            data: targetValues,
        }, {
            name: 'Average KPIs',
            data: averageValues,
        }],
        options: {
            chart: {
                height: 500,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                },
                // style: {
                //     marginBottom: '0 !important',
                //     paddingBottom: '0 !important'
                // }
            },
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                radar: {
                    size: 140,
                    polygons: {
                        strokeColors: '#e9e9e9',
                        fill: {
                            colors: ['#f8f8f8', '#fff']
                        }
                    }
                }
            },
            title: {
                text: `KPI of ${salesmanName} (divided by Criteria)`,
                // style: {
                //     marginBottom: '0 !important',
                //     paddingBottom: '0 !important'
                // }
            },
            stroke: {
                width: 2
            },
            fill: { opacity: 0.1 },
            markers: { size: 4 },
            // markers: {
            //     size: 4,
            //     colors: ['#fff'],
            //     strokeColor: '#FF4560',
            //     strokeWidth: 2,
            // },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            xaxis: { categories: criteria },
            dataLabels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                },
                background: {
                    enabled: true,
                    foreColor: '#fff',
                    borderRadius: 2,
                    padding: 4,
                    opacity: 0.9,
                    borderWidth: 1,
                    borderColor: '#fff'
                },
            },
        },
    };

    return (
        <div>
            <Chart options={state.options} series={state.series} type="radar" height={500} />
        </div>
    );
}

export default RadarCharts;
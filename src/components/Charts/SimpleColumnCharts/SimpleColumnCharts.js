import React from 'react';
import Chart from "react-apexcharts"

const SimpleColumnCharts = (props) => {
    const { title, xAxis, yAxis } = props.values

    const state = {

        series: [{
            name: 'KPI points',
            data: yAxis
            // data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: xAxis,
                position: 'bottom',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: true,
                },
                labels: {
                    show: true,
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            title: {
                text: title,
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                    color: '#444',
                    // paddingBottom: '50px !important'
                }
            }
        },
    };

    return (
        <div>
            <Chart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    );
}

export default SimpleColumnCharts;
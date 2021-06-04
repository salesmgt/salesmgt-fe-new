
import React from 'react';
import Chart from "react-apexcharts"

const StackColumnCharts = (props) => {
    const { values, years, option } = props
    // let array = []
    // array = props.values
    // array.forEach(element => {
    //     element = { ...element, seriesName: element.name, logarithmic: true }
    // });

    const getTitle = () => {
        if (option === 'Sales')
            return 'Yearly Total Sales of Services (unit: billion VND)'
        else
            return 'Yearly Quantity of Services (unit: service)'
    }

    const labelFormatter = function (value) {
        let val = Math.abs(value);
        if (val >= 1000000000) {
            val = (val / 1000000000).toFixed(2) + "B ₫";
            return val
        }
        if (val >= 1000000) {
            val = (val / 1000000).toFixed(1) + "M ₫";
            return val;
        }
        return val;
    };

    const state = {
        // series: series,
        options: {
            chart: {
                height: 350,
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: true
                },
                // zoom: {
                //     enabled: true
                // }
            },
            // responsive: [{
            //     breakpoint: 480,
            //     options: {
            //         legend: {
            //             position: 'bottom',
            //             offsetX: -10,
            //             offsetY: 0
            //         }
            //     }
            // }],
            plotOptions: {
                bar: {
                    borderRadius: 2,
                    horizontal: false,
                },
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            },
            dataLabels: {
                enabled: true,
                formatter: labelFormatter,
            },
            title: {
                text: getTitle(),
                // style: {
                //     marginBottom: '0 !important',
                //     paddingBottom: '0 !important'
                // }
            },
            xaxis: { categories: years },
            yaxis: {
                labels: {
                    formatter: labelFormatter,
                }
            },

            // Try to convert from column to bar
            // xaxis: {
            //     labels: {
            //         formatter: labelFormatter,
            //     }
            // },
            // yaxis: {
            //     categories: years
            // },
            legend: {
                position: 'right',
                offsetY: 40,
                fontSize: '14px'
            },
            fill: {
                opacity: 1
            }
        },
    };

    return (
        <div>
            <Chart options={state.options} series={values} type="bar" height={350} />
        </div>
    );
}

export default StackColumnCharts;
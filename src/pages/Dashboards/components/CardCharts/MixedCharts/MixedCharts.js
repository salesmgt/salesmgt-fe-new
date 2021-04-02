import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'
import classes from './MixedCharts.module.scss'

function MixedCharts(props) {
    const { title, labels, chartView, handleChartView } = props

    const opts = [
        { name: 'Week', keyName: 'week' },
        { name: 'Month', keyName: 'month' },
    ]

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title}>{title}</Typography>
                {opts.map((opt) => (
                    <div className={classes.action} key={opt.keyName}>
                        <Button onClick={() => handleChartView(opt.keyName)}>
                            {opt.name}
                        </Button>
                    </div>
                ))}
            </div>

            <div className={classes.body}>
                <Bar
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Sales',
                                data: chartView.data,
                                order: 1,
                                barPercentage: 0.1,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                hoverBorderWidth: 2,
                            },
                            {
                                type: 'line',
                                label: 'Average target',
                                data: chartView.averageData,
                                order: 2,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                        },
                        spanGaps: false,
                        // elements: {
                        //     point: {
                        //         radius: 4,
                        //         borderWidth: 2,
                        //         hoverRadius: 4,
                        //         hoverBorderWidth: 2,
                        //     },
                        // },
                        layout: {
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        fontColor: 'rgba(0,0,0,0.54)',
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        stepSize: 5,
                                        fontColor: 'rgba(0, 0, 0, 0.54)',
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        </Paper>
    )
}

export default React.memo(MixedCharts)

// 'rgba(255, 99, 132, 0.2)',
// 'rgba(54, 162, 235, 0.2)',
// 'rgba(255, 206, 86, 0.2)',
// 'rgba(75, 192, 192, 0.2)',
// 'rgba(153, 102, 255, 0.2)',
// 'rgba(255, 159, 64, 0.2)',

// 'rgba(255, 99, 132, 1)',
// 'rgba(54, 162, 235, 1)',
// 'rgba(255, 206, 86, 1)',
// 'rgba(75, 192, 192, 1)',
// 'rgba(153, 102, 255, 1)',
// 'rgba(255, 159, 64, 1)',
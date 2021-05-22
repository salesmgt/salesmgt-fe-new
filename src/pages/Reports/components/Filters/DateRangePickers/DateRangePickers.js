import React from 'react'
import { FormControl, Grid, makeStyles, TextField } from '@material-ui/core'
import { DateRangePicker, LocalizationProvider } from 'mui-pickers-v4' //DateRangeDelimiter
// import DateFnsUtils from "mui-pickers-v4/adapter/date-fns";
import DateFnsAdapter from 'mui-pickers-v4/adapter/date-fns'
import { useReport } from '../../../hooks/ReportContext'
import { DATE_RANGE_FILTER } from '../../../../../constants/Filters'
import { Consts } from '../../../ReportsConfig'
// import classes from "./DateRangePickers.module.scss";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 130,
        margin: theme.spacing(1),
        // paddingRight: '0.5rem',
    },
}))

function DateRangePickers(props) {
    const classes = useStyles()

    const { handleDateRangeChange } = props
    const { filters } = Consts

    const {
        dateRange,
        // setDateRange
        setFilter,
    } = useReport()

    const handleChangeDate = (newDate) => {
        // setDateRange(newDate)
        // setFilter(DATE_RANGE_FILTER, [null, null])
        setFilter(DATE_RANGE_FILTER, newDate)
        handleDateRangeChange(newDate)
        // console.log('newDate: ', newDate);
    }

    return (
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DateRangePicker
                className={classes.picker}
                startText={filters.dateRange.titleFrom}
                endText={filters.dateRange.titleTo}
                // clearable
                disableFuture
                allowSameDateSelection
                showToolbar
                minDate={new Date('2010-01-01')}
                inputFormat='dd/MM/yyyy'
                value={dateRange}
                onChange={(newRange) => handleChangeDate(newRange)}
                renderInput={(startProps, endProps) => (
                    <Grid container>
                        <Grid item xs={12} sm={5} md={5} lg={5}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    {...startProps}
                                    variant="standard"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5} md={5} lg={5}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    {...endProps}
                                    variant="standard"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
            />
        </LocalizationProvider>
    )
}

export default DateRangePickers

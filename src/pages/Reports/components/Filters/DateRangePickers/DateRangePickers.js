import React from 'react'
import { FormControl, Grid, makeStyles, TextField } from '@material-ui/core'
import { DateRangePicker, LocalizationProvider } from 'mui-pickers-v4' //DateRangeDelimiter
// import DateFnsUtils from "mui-pickers-v4/adapter/date-fns";
import DateFnsAdapter from 'mui-pickers-v4/adapter/date-fns'
import { useReport } from '../../../hooks/ReportContext'
import { DATE_RANGE_FILTER } from '../../../../../constants/Filters'
// import classes from "./DateRangePickers.module.scss";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 125,
        margin: theme.spacing(1),
        paddingRight: '0.5rem',
    },
}))

function DateRangePickers(props) {
    const classes = useStyles()

    const { handleDateRangeChange } = props

    const {
        dateRange,
        // setDateRange
        setFilter,
    } = useReport()

    const handleChangeDate = (newDate) => {
        // setDateRange(newDate)
        setFilter(DATE_RANGE_FILTER, newDate)
        handleDateRangeChange(newDate)
        // console.log('newDate: ', newDate);
    }

    return (
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DateRangePicker
                className={classes.picker}
                startText="From date"
                endText="To date"
                // clearable
                disableFuture
                showToolbar
                minDate={new Date('2010-01-01')}
                // maxDate={new Date('2024-12-12')}
                inputFormat="dd/MM/yyyy"
                value={dateRange}
                onChange={handleChangeDate}
                renderInput={(startProps, endProps) => (
                    <Grid container>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    {...startProps}
                                    variant="standard"
                                    // onBlur={handleFromDateChange}
                                    // onChange={handleFromDateChange}
                                    // onSubmit={handleFromDateChange}
                                    // onBeforeInput={handleFromDateChange}
                                    // onInput={handleFromDateChange}
                                    // onAbort={handleFromDateChange}
                                    // onClick={handleFromDateChange}
                                    // onLoad={handleFromDateChange}
                                    // onReset={handleFromDateChange}
                                    // onFocus={handleFromDateChange}
                                    // onSuspend={handleFromDateChange}
                                    // onSelect={handleFromDateChange}
                                />
                            </FormControl>
                        </Grid>
                        {/* <DateRangeDelimiter> to </DateRangeDelimiter> */}
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    {...endProps}
                                    variant="standard"
                                    // onBlur={handleToDateChange}
                                    // onChange={handleToDateChange}
                                    // onSubmit={handleToDateChange}
                                    // onBeforeInput={handleToDateChange}
                                    // onInput={handleToDateChange}
                                    // onAbort={handleToDateChange}
                                    // onClick={handleToDateChange}
                                    // onLoad={handleToDateChange}
                                    // onReset={handleToDateChange}
                                    // onFocus={handleToDateChange}
                                    // onSuspend={handleToDateChange}
                                    // onSelect={handleToDateChange}
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

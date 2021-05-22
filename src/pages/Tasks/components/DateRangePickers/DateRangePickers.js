import React, { useState } from 'react'
import { Box, FormControl, Grid, makeStyles, TextField } from '@material-ui/core'
import { DateRangePicker, LocalizationProvider } from 'mui-pickers-v4' //DateRangeDelimiter
// import DateFnsUtils from "mui-pickers-v4/adapter/date-fns";
import DateFnsAdapter from 'mui-pickers-v4/adapter/date-fns'
// import { DATE_RANGE_FILTER } from '../../../../../constants/Filters'
// import classes from "./DateRangePickers.module.scss";

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         width: 130,
//         // margin: theme.spacing(1),
//         // paddingRight: '0.5rem',
//     },
// }))

function DateRangePickers(props) {
    // const classes = useStyles()
    const { dateRange, handleDateRangeChange, textFieldVariant } = props
    const [duration, setDuration] = useState(dateRange);    //[null, null]

    // const { filters } = Consts

    // const {
    //     dateRange,
    //     // setDateRange
    //     setFilter,
    // } = useReport()

    const handleChange = (newDuration) => {
        // console.log('handleDateRangeChange: ', handleDateRangeChange);
        console.log('newDuration: ', newDuration);

        setDuration(newDuration)
        handleDateRangeChange(newDuration)


        // setDateRange(newDate)
        // setFilter(DATE_RANGE_FILTER, [null, null])
        // setFilter(DATE_RANGE_FILTER, newDate)
    }

    return (
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DateRangePicker
                // className={classes.picker}
                startText='From'
                endText='To'
                // clearable
                showToolbar
                minDate={new Date()}
                inputFormat='dd/MM/yyyy'
                value={duration}
                onChange={(newRange) => handleChange(newRange)}
                // allowSameDateSelection
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth>
                                <TextField {...startProps} variant={textFieldVariant} fullWidth value={duration[0]} />
                            </FormControl>
                        </Grid>
                        {/* <Box sx={{ mx: 2 }}> to </Box> */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth>
                                <TextField {...endProps} variant={textFieldVariant} fullWidth value={duration[1]} />
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
            />
        </LocalizationProvider>
    )
}

export default DateRangePickers

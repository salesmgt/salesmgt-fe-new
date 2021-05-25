import React, { useState } from 'react'
import { FormControl, Grid, TextField } from '@material-ui/core'
import { DateRangePicker, LocalizationProvider } from 'mui-pickers-v4' //DateRangeDelimiter
// import DateFnsUtils from "mui-pickers-v4/adapter/date-fns";
import DateFnsAdapter from 'mui-pickers-v4/adapter/date-fns'
// import { DATE_RANGE_FILTER } from '../../../../../constants/Filters'
// import classes from "./DateRangePickers.module.scss";

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         width: 130,
//         // paddingRight: '0.5rem',
//     },
// }))

function DateRangePickers(props) {
    // const classes = useStyles()
    const { dateRange, handleDateRangeChange } = props
    const [duration, setDuration] = useState(dateRange);

    // const { filters } = Consts

    // const {
    //     dateRange,
    //     // setDateRange
    //     setFilter,
    // } = useReport()

    console.log('Service ------- duration: ', duration);

    const handleChange = (newDuration) => {
        console.log('Service ------- newDuration: ', newDuration);

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
                startText='Valid from'
                endText='Expire on'  //Valid until
                // clearable
                showToolbar
                inputFormat='dd/MM/yyyy'
                value={duration}
                onChange={(newRange) => handleChange(newRange)}
                // allowSameDateSelection
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <FormControl>
                                <TextField {...startProps} variant="outlined" value={duration[0]} fullWidth />
                            </FormControl>
                        </Grid>
                        {/* <Box sx={{ mx: 2 }}> to </Box> */}
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <FormControl>
                                <TextField {...endProps} variant="outlined" value={duration[1]} fullWidth />
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
            />
        </LocalizationProvider>
    )
}

export default DateRangePickers

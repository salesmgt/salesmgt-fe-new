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
    const [duration, setDuration] = useState([null, null]);

    const { handleDurationChange } = props
    // const { filters } = Consts

    // const {
    //     dateRange,
    //     // setDateRange
    //     setFilter,
    // } = useReport()

    const handleChange = (newDuration) => {
        console.log('handleDurationChange: ', handleDurationChange);
        console.log('newDuration: ', newDuration);

        setDuration(newDuration)
        handleDurationChange(newDuration)


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
                minDate={new Date('2010-01-01')}
                inputFormat='dd/MM/yyyy'
                value={duration}
                onChange={(newRange) => handleChange(newRange)}
                // onChange={(newRange) => {
                //     setDuration(newRange)
                //     console.log('new duration: ', newRange);
                // }}
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth>
                                <TextField {...startProps} variant="outlined" fullWidth />
                            </FormControl>
                        </Grid>
                        {/* <Box sx={{ mx: 2 }}> to </Box> */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth>
                                <TextField {...endProps} variant="outlined" fullWidth />
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
            />
        </LocalizationProvider>
    )
}

export default DateRangePickers

import React, { useState } from 'react'
import { FormControl, Grid, makeStyles, TextField } from '@material-ui/core'
import { DateRangePicker, LocalizationProvider } from 'mui-pickers-v4' //DateRangeDelimiter
// import DateFnsUtils from "mui-pickers-v4/adapter/date-fns";
import DateFnsAdapter from 'mui-pickers-v4/adapter/date-fns'
// import { DATE_RANGE_FILTER } from '../../../../../constants/Filters'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 130,
        margin: theme.spacing(1),
        // paddingRight: '0.5rem',
    },
}))

function DateRangePickers(props) {
    const classes = useStyles()
    const { dateRange, handleDateRangeChange, startLabel, endLabel, isFilter } = props
    const [duration, setDuration] = useState(dateRange);    //[null, null]

    // const { filters } = Consts

    // const {
    //     dateRange,
    //     // setDateRange
    //     setFilter,
    // } = useReport()
    // console.log('Task ------- duration: ', duration);

    const handleChange = (newDuration) => {
        // console.log('Task ------- newDuration: ', newDuration);

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
                startText={startLabel}
                endText={endLabel}
                // clearable
                showToolbar
                // minDate={new Date()}
                disablePast={!isFilter}
                inputFormat='dd/MM/yyyy'
                value={duration}
                onChange={(newRange) => handleChange(newRange)}
                // allowSameDateSelection
                renderInput={(startProps, endProps) => (
                    <>
                        {isFilter ? (
                            <Grid container >
                                <Grid item xs={6} sm={5} md={5} lg={5}>
                                    <FormControl className={classes.formControl}>
                                        <TextField {...startProps} variant="standard" fullWidth />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={5} md={5} lg={5} >
                                    <FormControl className={classes.formControl}>
                                        <TextField {...endProps} variant="standard" fullWidth />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl fullWidth>
                                        <TextField {...startProps} variant="outlined" fullWidth value={duration[0]} />
                                    </FormControl>
                                </Grid>
                                {/* <Box sx={{ mx: 2 }}> to </Box> */}
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl fullWidth>
                                        <TextField {...endProps} variant="outlined" fullWidth value={duration[1]} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )}
                    </>
                )}
            />
        </LocalizationProvider >
    )
}

export default DateRangePickers

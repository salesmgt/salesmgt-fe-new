import React from 'react'
import {
    Typography,
    Box,
    LinearProgress,
    Icon,
    Tooltip
} from '@material-ui/core'
import { BiRun } from 'react-icons/bi'
import { FaHandshake } from 'react-icons/fa'
import { parseDateToString, calculateDatesGap } from '../../utils/DateTimes';

function LinearProgressBars(props) {
    const { startDate, endDate, marker, type } = props

    const calculatePercentage = (date1, date2) => {
        const daysPassed = calculateDatesGap(new Date(date1), new Date(), "D");
        const duration = calculateDatesGap(new Date(date1), new Date(date2), "D");

        // console.log('daysPassed = ', daysPassed);
        // console.log('duration = ', duration);

        if (daysPassed * 100 / duration > 100)
            return 100
        if (duration === 0 || daysPassed * 100 / duration < 0)
            return 0
        return daysPassed * 100 / duration
    }
    const value = calculatePercentage(startDate, endDate)

    const percent = () => {
        const position = value - 5;
        if (position < 0) {
            return 0
        } else return position
    }

    return (
        <Box display="flex" flexDirection='column'>
            <Box display="flex" flexDirection='row'>
                <Box flexGrow={1}>
                    <Typography variant="body2">    {/** color="textSecondary" */}
                        {startDate ? parseDateToString(startDate, 'DD-MM-YYYY') : ' ?'}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2">    {/** color="textSecondary" */}
                        {parseDateToString(endDate, 'DD-MM-YYYY')}
                    </Typography>
                </Box>
            </Box>
            <Box width="100%">
                <Tooltip title={`${Math.round(value)}%`} placement="top">
                    <LinearProgress variant="determinate" {...props} value={value} />
                </Tooltip>
            </Box>
            {type && (
                <Box display="flex" flexDirection="row" width="100%">
                    <Box style={{ flexBasis: `${percent()}%`, marginTop: '0.5rem' }}>
                        {/* <Box style={{ flexBasis: `calc(${value}% - 0.9rem)%`, marginTop: '0.5rem' }}> */}

                    </Box>
                    <Box style={{ marginTop: '0.5rem' }}>
                        <Tooltip title={
                            <Typography variant="overline">
                                {parseDateToString(marker, 'DD-MM-YYYY')}
                            </Typography>} placement="right"
                        >
                            <Icon>
                                {type === 'task' ? <BiRun style={{ width: '1.8rem', height: '1.8rem' }} />
                                    : <FaHandshake style={{ width: '1.8rem', height: '1.8rem' }} />
                                }
                            </Icon>
                        </Tooltip>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default LinearProgressBars
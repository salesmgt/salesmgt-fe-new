import React, { useState } from 'react'
import {
    Divider,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@material-ui/core'
import { Loading } from '../../../../components'

import classes from './CardJack.module.scss'

const ITEM_HEIGHT = 120
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT,
        },
    },
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    getContentAnchorEl: null,
}

const useStyles = makeStyles((theme) => ({
    root: {},
    menuItemRoot: {
        '&$menuItemSelected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        '&$menuItemSelected:focus': { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
        '&$menuItemSelected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04);',
        },
    },
    menuItemSelected: {},
}))

function CardJack(props) {
    const { title, color, icon, isOpts, ranges, datasets, des } = props
    const styles = useStyles()

    const [currentRange, setCurrentRange] = useState(ranges[0])

    const handleChangeRange = (event) => {
        setCurrentRange(event.target.value)
    }

    console.log('datasets: ', datasets);

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title} color="inherit">
                    {title}
                </Typography>

                {isOpts && (
                    <Select
                        className={classes.action}
                        value={currentRange}
                        onChange={handleChangeRange}
                        disableUnderline
                        MenuProps={MenuProps}
                    // style={{ display: isOpts ? 'inline-flex' : 'none' }}
                    >
                        {ranges.map((key) => {
                            return (
                                <MenuItem
                                    key={key}
                                    value={key}
                                    classes={{
                                        root: styles.menuItemRoot,
                                        selected: styles.menuItemSelected,
                                    }}
                                >
                                    {key}
                                </MenuItem>
                            )
                        })}
                    </Select>
                )}
            </div>
            <Divider />

            {datasets[currentRange].map((obj, index) => (
                <div className={classes.body} key={index}>
                    <div
                        className={classes.icon}
                        style={{ backgroundColor: color }}
                    >
                        {icon}
                    </div>

                    <div className={classes.info}>
                        <Typography
                            className={classes.detail}
                        // style={{ color: color }}
                        >
                            {obj.schools}
                            {/* {`${obj.leads} ${des}`} */}
                        </Typography>
                        <Typography className={classes.subDetail}>
                            {des}
                        </Typography>
                    </div>
                </div>
            ))}
        </Paper>
    )
}

export default React.memo(CardJack)

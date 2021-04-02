import React, { useState } from 'react'
import {
    Divider,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@material-ui/core'
import classes from './CardOps.module.scss'

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

function CardOps(props) {
    const { title, color, data, des } = props
    const { ranges, datasets } = data

    const [currentRange, setCurrentRange] = useState(ranges[0])

    const styles = useStyles()

    const handleChangeRange = (event) => {
        setCurrentRange(event.target.value)
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title} color="inherit">
                    {title}
                </Typography>
                <Select
                    className={classes.action}
                    value={currentRange}
                    onChange={handleChangeRange}
                    disableUnderline
                    MenuProps={MenuProps}
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
            </div>
            <Divider />
            {datasets[currentRange].map((obj, index) => (
                <div className={classes.body} key={index}>
                    <Typography
                        className={classes.detail}
                        style={{ color: color }}
                    >
                        {obj.leads}
                    </Typography>
                    <Typography className={classes.subDetail}>{des}</Typography>
                </div>
            ))}
        </Paper>
    )
}

export default React.memo(CardOps)

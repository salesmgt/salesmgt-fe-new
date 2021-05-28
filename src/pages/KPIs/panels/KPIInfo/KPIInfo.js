import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { updateKPI } from '../../KPIsServices'
import { useAuth } from '../../../../hooks/AuthContext';
import classes from './KPIInfo.module.scss'

const useStyles = makeStyles((theme) => ({

}))

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND',
});

function KPIInfo(props) {
    const styles = useStyles()
    const { kpi, refreshPage } = props
    // const { headers, operations, fields } = Consts

    const history = useHistory()
    const { user } = useAuth()



    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>


            </Grid>
            {/* <Snackbars notify={notify} setNotify={setNotify} /> */}
        </div >
    )
}

export default KPIInfo

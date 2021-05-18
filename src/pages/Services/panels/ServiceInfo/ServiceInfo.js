import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@material-ui/core'
import { Snackbars, Loading } from '../../../../components'
import { Consts, criteria } from './ServiceInfoConfig'
import { approveServices } from '../../ServicesServices'
import { CheckMark } from '../../../../assets/icons'
import classes from './ServiceInfo.module.scss'

function ServiceInfo(props) {
    const { service } = props   //, refreshPage
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    if (!service) {
        return <Loading />
    }

    const approve = () => {
        approveServices(service?.id).then((res) => {
            // refreshPage(service?.id)
            setNotify({
                isOpen: true,
                message: 'Approved service successfully',
                type: 'success',
            })
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
            setNotify({
                isOpen: true,
                message: 'Approved service failed',
                type: 'error',
            })
        })
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Detail Sector */}
                <Grid item xs={12} sm={12} md={7} lg={7} className={classes.content}>
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid item xs={12} sm={12} md={3} lg={3} className={classes.row}>
                            <Typography color="inherit" className={classes.header}>
                                {headers.child1}
                            </Typography>
                        </Grid>
                        {/* Detail */}
                        <Grid item container xs={12} sm={12} md={9} lg={8} className={classes.row}>
                            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.row}>

                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                <Grid container spacing={0} className={classes.rowx}>
                                    {/* <Grid item xs={12} sm={12} md={3} lg={3} className={classes.rowx}>
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.reprName.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={9} lg={8} className={classes.rowx}>
                                        <Typography color="inherit">
                                            {school?.reprName
                                                ? (`${school?.reprIsMale ? 'Mr. ' : 'Ms. '} ${school?.reprName}`)
                                                : fields.empty.title}
                                        </Typography>
                                    </Grid> */}
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>

                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.row}>

                            </Grid>
                            {/* Action */}
                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.action}>
                                <Button
                                    className={classes.btnApprove}
                                    variant="contained"
                                    onClick={approve}
                                >
                                    {operations.approve}
                                </Button>
                                <Button
                                    className={classes.btnReject}
                                    variant="contained"
                                    onClick={() => { }}
                                >
                                    {operations.reject}
                                </Button>
                            </Grid>
                        </Grid>
                        {/* End Detail */}
                    </Grid>
                </Grid>

                {/* Criteria Sector */}
                <Grid item xs={12} sm={12} md={5} lg={5} className={classes.content}>
                    <Grid container spacing={0} className={classes.wrapper}>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                            <Typography color="inherit" className={classes.header}>
                                {headers.child2}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={12} lg={12} className={classes.row}>
                            {/* <div className={classes.header}>
                                <Typography className={classes.title}>{title}</Typography>
                            </div>
                            <Divider /> */}
                            <TableContainer className={classes.table}>
                                <Table stickyHeader>
                                    {/* <TableHead>
                                        <TableRow>
                                            {columns.map((key) => (
                                                <TableCell key={key} align="center">
                                                    {key}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead> */}
                                    <TableBody>
                                        {criteria.map((cri) => (
                                            <TableRow key={cri.key}>
                                                <TableCell>
                                                    {/* {checkCriteria(cri.key, cri.value)} */}
                                                    <img
                                                        className={classes.icon}
                                                        src={CheckMark}
                                                        alt="check-mark"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {cri.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default ServiceInfo

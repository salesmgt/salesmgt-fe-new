import React from 'react'
import {
    Paper,
    Divider,
    Typography,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Avatar,
    TableContainer,
    ListItemText,
    Box,
    makeStyles,
} from '@material-ui/core'
import * as MedalIcons from '../../../../assets/icons'
import classes from './CardRanks.module.scss'

const useStyles = makeStyles(() => ({
    txtFullName: {
        fontSize: '0.875rem'
    },
    txtUsername: {
        fontSize: '0.8rem'
    }
}))

function CardRanks(props) {
    const styles = useStyles()
    const { title, columns, data } = props
    // const { rows } = data

    const getRankMedal = (rank) => {
        switch (rank) {
            case 1:
                return (
                    <img
                        className={classes.medalIcon}
                        src={MedalIcons.GoldMedal}
                        alt="gold-medal"
                    />
                )
            case 2:
                return (
                    <img
                        className={classes.medalIcon}
                        src={MedalIcons.SilverMedal}
                        alt="silver-medal"
                    />
                )
            case 3:
                return (
                    <img
                        className={classes.medalIcon}
                        src={MedalIcons.BronzeMedal}
                        alt="bronze-medal"
                    />
                )
            default:
                return rank
        }
    }

    const shortenCurrencyValue = (value) => {
        let val = Math.abs(value);
        if (val >= 1000000000) {
            val = (val / 1000000000).toFixed(2) + " B ₫";
            return val
        } else if (val >= 1000000) {
            val = (val / 1000000).toFixed(1) + " M ₫";
            return val;
        } else
            return val + " ₫";
    }

    return (
        <div className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title}>Salesmen Ranking by Sales</Typography>
            </div>
            <Divider />
            <TableContainer className={classes.table}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((key) => (
                                <TableCell key={key} align="center">
                                    {key}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tBody}>
                        {data.map((salesman, index) => (
                            <TableRow key={index} className={classes.tBodyRow}>
                                <TableCell align="center" className={classes.tBodyCell}>
                                    {getRankMedal(index + 1)}
                                </TableCell>
                                <TableCell className={classes.tBodyCell}>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Avatar className={classes.avatar}
                                            src={salesman.avatar}
                                            alt="avatar"
                                        />
                                        <ListItemText primary={salesman.fullName} secondary={salesman.username}
                                            classes={{ primary: styles.txtFullName, secondary: styles.txtUsername }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell className={classes.tBodyCell} align="right">
                                    <strong>
                                        {shortenCurrencyValue(salesman?.value)}
                                    </strong>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default React.memo(CardRanks)

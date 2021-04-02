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
    Grid,
    TableContainer,
} from '@material-ui/core'
import * as MedalIcons from '../../../../assets/icons'
import classes from './CardRanks.module.scss'

function CardRanks(props) {
    const { title, columns, data } = props
    const { rows } = data

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

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <Typography className={classes.title}>{title}</Typography>
            </div>
            <Divider />
            <TableContainer className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((key) => (
                                <TableCell key={key} align="center">
                                    {key}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((key) => (
                            <TableRow key={key.rank}>
                                <TableCell align="center">
                                    {getRankMedal(key.rank)}
                                </TableCell>
                                <TableCell align="center">
                                    <Grid
                                        container
                                        alignItems="center"
                                        justify="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Avatar
                                                className={classes.avatar}
                                                src={key.personAvatar}
                                                alt="avatar"
                                            />
                                        </Grid>
                                        <Grid item>{key.personName}</Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default React.memo(CardRanks)

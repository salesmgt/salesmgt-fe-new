import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Chip,
    TableSortLabel,
    withStyles,
    Avatar,
} from '@material-ui/core'
import { useKPI } from '../../hooks/KPIContext'
import MenuOptions from './MenuOptions/MenuOptions'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { kpiStatusNames, roleNames } from '../../../../constants/Generals'
import { Consts } from '../../KPIsConfig'
import Highlighter from 'react-highlight-words'
import { useAuth } from '../../../../hooks/AuthContext'
// import PropTypes from 'prop-types'
import classes from './Tables.module.scss'
import { parseDateToString } from '../../../../utils/DateTimes'
import { AvatarGroup } from '@material-ui/lab'

function SortableTableHeaders(props) {
    const { columns, direction, column, onRequestSort, role } = props
    const createSortHandler = (col, direction) => {
        onRequestSort(col, direction)
    }

    const MuiTableSortLabel = withStyles({
        root: {
            color: 'white !important',
            '&:hover': {
                color: 'white !important',
            },
            '&$active': {
                color: 'white !important',
            },
        },
        active: {},
        icon: {
            color: 'white !important',
        },
    })(TableSortLabel)

    return (
        <TableHead>
            <TableRow className={classes.tHead}>
                {columns.map((col) => (
                    <TableCell
                        key={col.key}
                        className={classes.tHeadCell}
                        sortDirection={column === col.key ? direction : false}
                        align={col.key === 'no' ? 'center' : 'left'}
                        width={role !== roleNames.salesman ? col.width1 : col.width2}
                    >
                        {col?.sortable ? (
                            <MuiTableSortLabel
                                active={column === col.key}
                                direction={column === col.key ? direction : 'asc'}
                                onClick={() => createSortHandler(col, direction)}
                            >
                                {col.name}
                            </MuiTableSortLabel>
                        ) :
                            col.name
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

// SortableTableHeaders.propTypes = {
//     columns: PropTypes.array.isRequired,
//     direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     column: PropTypes.string.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
// }

// Customize component Table
function Tables(props) {
    const { columns, rows, refreshAPI } = props
    const { messages } = Consts
    const { user } = useAuth()

    const { params, dispatchParams, direction, setDirection, column, setColumn } = useKPI()

    // ====================Sorting====================
    const onSortBy = (col, direction) => {
        if (col.sortable) {
            setDirection(direction === 'desc' ? 'asc' : 'desc')
            setColumn(col.key)

            dispatchParams({
                type: ReducerActions.SORT_BY,
                payload: {
                    column: col.key,
                    direction: direction,
                },
            })
        }
    }

    const setKPIStatusChipColor = (status) => {
        if (status === true) {
            return <b style={{ color: '#1976d2' }}>{kpiStatusNames.applying}</b>
            // return <Chip label={kpiStatusNames.applying} className={classes.chipApplying} />
        } else if (status === false) {
            return <b style={{ color: '#757575' }}>{kpiStatusNames.disable}</b>
            // return <Chip label={kpiStatusNames.disable} />
        }
    }

    return (
        <div className={classes.wrapper}>
            <TableContainer className={classes.container} component="div">
                <Table
                    className={classes.table}
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                >
                    <SortableTableHeaders
                        columns={columns}
                        direction={direction}
                        column={column}
                        onRequestSort={onSortBy}
                        role={user.roles[0]}
                    />

                    <TableBody className={classes.tBody}>
                        {rows?.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow
                                    key={row?.id}
                                    className={classes.tBodyRow}
                                >
                                    <TableCell className={classes.tableCell} align='center'>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <Highlighter
                                            highlightClassName="YourHighlightClass"
                                            searchWords={[params.searchKey]}
                                            autoEscape={true}
                                            textToHighlight={row?.groupName}
                                        />
                                    </TableCell>
                                    {user.roles[0] !== roleNames.salesman &&
                                        <TableCell className={classes.tBodyCell}>
                                            <AvatarGroup max={5}>
                                                {row?.size.map((avatar, index) => (
                                                    <Avatar key={index} src={avatar} />
                                                ))}
                                            </AvatarGroup>
                                        </TableCell>
                                    }
                                    <TableCell className={classes.tBodyCellDuration}>
                                        {parseDateToString(row?.startDate, 'DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCellDuration}>
                                        {parseDateToString(row?.endDate, 'DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        {row?.active !== null && setKPIStatusChipColor(row?.active)}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tBodyCell}
                                        align="right"
                                    >
                                        <MenuOptions data={row} refreshAPI={refreshAPI} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className={classes.tBodyRow}>
                                <TableCell
                                    className={classes.noRecord}
                                    component="td"
                                    colSpan="100%"
                                >
                                    {messages.notFound}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default React.memo(Tables)
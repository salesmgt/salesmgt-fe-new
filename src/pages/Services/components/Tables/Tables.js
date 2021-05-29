import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    IconButton,
    Chip,
    TableSortLabel,
    withStyles,
    ListItemText,
    Avatar,
    ListItemAvatar,
    ListItem,
} from '@material-ui/core'
import {
    MdFirstPage,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdLastPage,
} from 'react-icons/md'
import { useService } from '../../hooks/ServiceContext'
import MenuOptions from './MenuOptions/MenuOptions'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { roleNames, serviceStatusNames } from '../../../../constants/Generals'
import { Consts } from '../../ServicesConfig'
import Highlighter from 'react-highlight-words'
import { LinearProgressBars } from '../../../../components'
import { useAuth } from '../../../../hooks/AuthContext'
// import PropTypes from 'prop-types'
import classes from './Tables.module.scss'

// Customize component TablePagination
function TablePaginationActions(props) {
    const theme = useTheme()

    const { count, page, rowsPerPage, totalPage, onChangePage } = props

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0) // firstPage has index = 0
    }

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.ceil(count / rowsPerPage) - 1)
    }

    const handleBackPageButtonClick = (event) => {
        onChangePage(event, page - 1) // current page - 1
    }

    const handleNextPageButtonClick = (event) => {
        onChangePage(event, page + 1) // current page + 1
    }

    return (
        <div className={classes.paging}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <MdLastPage /> : <MdFirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackPageButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <MdKeyboardArrowRight />
                ) : (
                    <MdKeyboardArrowLeft />
                )}
            </IconButton>
            <span>
                {page + 1} / {totalPage}
            </span>
            <IconButton
                onClick={handleNextPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <MdKeyboardArrowLeft />
                ) : (
                    <MdKeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <MdFirstPage /> : <MdLastPage />}
            </IconButton>
        </div>
    )
}

// TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
//     onChangePage: PropTypes.func.isRequired,
//     totalPage: PropTypes.number.isRequired,
// }

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
                        align={(col.key === 'no' || col.key === 'task.user.username') ? 'center' : 'left'}
                        width={role === roleNames.manager ? col.width1 : col.width2}
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

const useStyles = makeStyles(() => ({
    itemPIC: {
        padding: 0,
        margin: 0,
    },
    itemTextPrimary: {
        fontSize: '0.875rem',
    },
    itemTextSecondary: {
        fontSize: '0.8rem',
    },
}))

function Tables(props) {
    const styles = useStyles()
    const { columns, rows, totalRecord, totalPage } = props
    const { messages } = Consts

    const { user } = useAuth()

    const {
        params,
        dispatchParams,
        limit,
        direction,
        column,
        setColumn,
        setLimit,
        setPage,
        setDirection,
    } = useService()

    // ====================Paging====================
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        dispatchParams({
            type: ReducerActions.CHANGE_PAGE,
            payload: {
                page: newPage,
                limit: params.limit,
            },
        })
    }

    const handleChangeLimit = (event) => {
        setLimit(parseInt(event.target.value, 10))
        setPage(0)
        dispatchParams({
            type: ReducerActions.CHANGE_PAGE,
            payload: {
                page: 0,
                limit: parseInt(event.target.value, 10),
            },
        })
    }

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

    const setServiceStatusChipColor = (status) => {
        switch (status) {
            case serviceStatusNames.approved:
                return <Chip label={status} className={classes.chipApproved} />
            case serviceStatusNames.rejected:
                return <Chip label={status} className={classes.chipRejected} />
            case serviceStatusNames.pending:
                return <Chip label={status} className={classes.chipPending} />
            default:
                break;
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
                                        {params.page * params.limit + index + 1}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <Highlighter
                                            highlightClassName="YourHighlightClass"
                                            searchWords={[params.searchKey]}
                                            autoEscape={true}
                                            textToHighlight={row?.serviceType}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <ListItemText
                                            primary={
                                                <>
                                                    {row?.educationLevel} {' '}
                                                    <Highlighter
                                                        highlightClassName="YourHighlightClass"
                                                        searchWords={[params.searchKey]}
                                                        autoEscape={true}
                                                        textToHighlight={row?.schoolName}
                                                    />
                                                </>
                                            }
                                            secondary={row?.district}
                                            classes={{
                                                primary: classes.itemText,
                                                secondary: classes.itemText,
                                            }}
                                        />
                                    </TableCell>
                                    {user.roles[0] === roleNames.manager && (
                                        <TableCell>
                                            {row?.fullName && (
                                                <ListItem className={classes.itemPIC}>
                                                    <ListItemAvatar>
                                                        <Avatar src={row?.avatar} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        className={classes.picName}
                                                        primary={
                                                            <Highlighter
                                                                highlightClassName="YourHighlightClass"
                                                                searchWords={[params.searchKey]}
                                                                autoEscape={true}
                                                                textToHighlight={row?.fullName || ''}
                                                            />
                                                        }
                                                        secondary={
                                                            <Highlighter
                                                                highlightClassName="YourHighlightClass"
                                                                searchWords={[params.searchKey]}
                                                                autoEscape={true}
                                                                textToHighlight={row?.username || ''}
                                                            />
                                                        }
                                                        classes={{
                                                            primary: styles.itemTextPrimary,
                                                            secondary: styles.itemTextSecondary,
                                                        }}
                                                    />
                                                </ListItem>
                                            )}
                                        </TableCell>
                                    )}
                                    {/* <TableCell className={classes.tBodyCellDuration}>
                                        {row?.status === serviceStatusNames.approved && ( */}
                                    {/* <> */}
                                    {/**Duration 1 cái progress bar ở đây */}
                                    {/* <LinearProgressBars
                                                startDate={row?.startDate}
                                                endDate={row?.endDate}
                                                marker={new Date()}
                                            /> */}
                                    {/* {parseDateToString(row?.startDate, 'DD-MM-YYYY')} ➜ &nbsp;
                                                {parseDateToString(row?.endDate, 'DD-MM-YYYY')}
                                            </> */}
                                    {/* )}
                                    </TableCell> */}
                                    <TableCell className={classes.tBodyCell}>
                                        {row?.status && setServiceStatusChipColor(row?.status)}
                                    </TableCell>
                                    {/* <TableCell className={classes.tBodyCell}>
                                        {row?.approveDate ? parseDateToString(row?.approveDate, 'DD-MM-YYYY') : ''}
                                    </TableCell> */}
                                    <TableCell
                                        className={classes.tBodyCell}
                                        align="right"
                                    >
                                        <MenuOptions data={row} />
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
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={totalRecord ? totalRecord : 0}
                rowsPerPage={limit}
                page={params.page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeLimit}
                ActionsComponent={() => (
                    <TablePaginationActions
                        count={totalRecord ? totalRecord : 0}
                        page={params.page}
                        rowsPerPage={params.limit}
                        totalPage={totalPage}
                        onChangePage={handleChangePage}
                    />
                )}
            />
        </div>
    )
}

export default React.memo(Tables)

// Tables.propTypes = {
//     rows: PropTypes.array,
//     columns: PropTypes.array.isRequired,
//     totalRecord: PropTypes.number.isRequired,
//     totalPage: PropTypes.number.isRequired,
// }

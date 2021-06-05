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
    ListItem,
    ListItemAvatar,
    Avatar,
    Badge,
} from '@material-ui/core'
import {
    MdChat,
    MdFirstPage,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdLastPage,
} from 'react-icons/md'
// import PropTypes from 'prop-types'
import { useReport } from '../../hooks/ReportContext'
import MenuOptions from './MenuOptions/MenuOptions'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { parseDateToString } from '../../../../utils/DateTimes'
import Highlighter from 'react-highlight-words';
import { purposeNames } from '../../../../constants/Generals'
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
    const { columns, direction, column, onRequestSort } = props
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
                        width={col.width}
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

const useStyles = makeStyles(() => ({
    itemPIC: {
        padding: 0,
        margin: 0,
    },
    itemTextLarge: {
        fontSize: '0.95rem',
    },
    itemTextMedium: {
        fontSize: '0.875rem',
    },
    itemTextSmall: {
        fontSize: '0.8rem',
    },
}))

// Customize component Table
function Tables(props) {
    const styles = useStyles();
    const { columns, rows, totalRecord, totalPage, refreshAPI } = props;

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
    } = useReport()

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

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case purposeNames.purp1:
                return <Chip label={purpose} className={classes.chipSalesMoi} />
            // case purposeNames.purp2:
            //     return <Chip label={purpose} className={classes.chipTheoDoi} />
            case purposeNames.purp3:
                return <Chip label={purpose} className={classes.chipChamSoc} />
            case purposeNames.purp4:
                return <Chip label={purpose} className={classes.chipTaiKy} />
            case purposeNames.purp5:
                return <Chip label={purpose} className={classes.chipKyMoi} />
            default:
                return <Chip label={purpose} /> // #5c21f3
        }
    }

    // const setResultChipColor = (result) => {
    //     if (result === true) {
    //         return <Chip label='Đã gặp HT/HP' className={classes.chipSuccess} />
    //     } else if (result === false) {
    //         return <Chip label='Chưa gặp HT/HP' className={classes.chipFailed} />
    //     }
    // }

    const truncateString = (str) => {
        if (str) return str.length > 60 ? str.substring(0, 57) + '...' : str
        else return ''
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
                    />
                    <TableBody className={classes.tBody}>
                        {rows?.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow
                                    key={row?.id}
                                    className={classes.tBodyRow}
                                >
                                    <TableCell className={classes.tableCell} align="center">{params.page * params.limit + index + 1}</TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        {parseDateToString(row?.date, 'DD/MM/YYYY')} &nbsp;
                                        {row?.contextComments && (
                                            <Badge
                                                color="secondary"
                                                variant="dot"
                                            >
                                                <MdChat />
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <ListItemText
                                            primary={
                                                <>
                                                    {`${row?.level} `}
                                                    <Highlighter
                                                        highlightClassName="YourHighlightClass"
                                                        searchWords={[params.searchKey]}
                                                        autoEscape={true}
                                                        textToHighlight={row?.schoolName || ''}
                                                    />
                                                </>
                                            }
                                            secondary={row?.district}
                                            classes={{
                                                primary: styles.itemTextLarge,
                                                secondary:
                                                    styles.itemTextMedium,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <ListItem className={styles.itemPIC}>
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
                                                    primary:
                                                        styles.itemTextMedium,
                                                    secondary:
                                                        styles.itemTextSmall,
                                                }}
                                            />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        {row?.purpose && setPurposeChipColor(row?.purpose)}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <span className={row?.isSuccess ? classes.rpDaGap : classes.rpChuaGap}>
                                            {row?.isSuccess ? 'Đã gặp HT/HP' : 'Chưa gặp HT/HP'}
                                        </span>
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <Highlighter
                                            highlightClassName="YourHighlightClass"
                                            searchWords={[params.searchKey]}
                                            autoEscape={true}
                                            textToHighlight={truncateString(row?.description) || ''}
                                        />
                                    </TableCell>
                                    {/* <TableCell className={classes.tBodyCell}>{truncateString(row?.comment?.content)}</TableCell> */}
                                    <TableCell className={classes.tBodyCell} align="right">
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
                                    No records found.
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
//     refreshAPI: PropTypes.func
// };

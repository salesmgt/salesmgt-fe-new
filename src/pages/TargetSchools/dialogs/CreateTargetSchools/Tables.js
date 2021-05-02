import React from 'react'
import { useTheme } from '@material-ui/core/styles'
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
    Checkbox,
} from '@material-ui/core'
import {
    MdFirstPage,
    MdInfo,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdLastPage,
} from 'react-icons/md'
import { useTargetForm } from './TargetFormContext'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { statusNames } from '../../../../constants/Generals'
import { Consts } from '../DialogConfig'
import Highlighter from "react-highlight-words"
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
    const { columns, direction, column, onRequestSort, numSelected, rowCount, onSelectAllClick } = props
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
                <TableCell padding="checkbox" className={classes.tHeadCell}>
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {columns.map((col) => (
                    <TableCell
                        key={col.key}
                        className={classes.tHeadCell}
                        sortDirection={column === col.key ? direction : false}
                        width={col.width}
                    >
                        <MuiTableSortLabel
                            active={column === col.key}
                            direction={column === col.key ? direction : 'asc'}
                            onClick={() => createSortHandler(col, direction)}
                        >
                            {col.name}
                        </MuiTableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead >
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
    const { selectedRows, setSelectedRows, columns, rows, totalRecord, totalPage } = props
    const { messages } = Consts

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
    } = useTargetForm()

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const  newSelecteds = rows.filter((row) => !row.username)
            setSelectedRows(newSelecteds)
            return;
          }
          setSelectedRows([])  
    }

    const handleClick = (event,row) => {
        console.log(event.target.checked)
        // if(!event.target.checked){
        //     event.target.checked=false
        // }
        const selectedIndex = selectedRows.indexOf(row)
        let newSelected = []
         if (selectedIndex === -1) {
             newSelected = newSelected.concat(selectedRows, row)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1))
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            )
        }
        console.log("index ",selectedIndex)
        console.log("mảng ",newSelected)
        setSelectedRows(newSelected)
    }

    const isSelected = (row) => 
    {   
        if(selectedRows.indexOf(row) !== -1)
        return true
       else return false
    }

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
    
    const truncateString = (str) => {
        if (str) return str.length > 35 ? str.substring(0, 32) + '...' : str
        else return ''
    }

    const setStatusChipColor = (status) => {
        switch (status) {
            case statusNames.lead:
                return <Chip label={status} className={classes.chipLead} />
            case statusNames.customer:
                return <Chip label={status} className={classes.chipCustomer} />
            default:
                return <Chip label={status} />
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
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows?.filter(item => !item.username)?.length}
                        numSelected={selectedRows?.length}
                    />
                    <TableBody className={classes.tBody}>
                        {rows?.length > 0 ? (
                            rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={classes.tBodyRow}
                                >
                                    <TableCell
                                        padding="checkbox" width="1%"
                                        onClick={(event) => {!row.username &&
                                            handleClick(event, row)
                                        }}
                                    >
                                        <Checkbox
                                            checked={row.username ? false : isSelected(row)}
                                            disabled={row.username ? true : false}
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={classes.tCellSchoolName}
                                    >
                                        {row.educationalLevel} {' '}
                                        <Highlighter
                                            highlightClassName="YourHighlightClass"
                                            searchWords={[params.searchKey]}
                                            autoEscape={true}   
                                            textToHighlight={row.name}
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={classes.tBodyCell}
                                    >
                                        <ListItemText
                                            primary={
                                                <Highlighter
                                                    highlightClassName="YourHighlightClass"
                                                    searchWords={[params.searchKey]}
                                                    autoEscape={true}   
                                                    textToHighlight={truncateString(row.address)}
                                                />
                                            }
                                            secondary={row.district}
                                            classes={{
                                                primary: classes.itemText,
                                                secondary: classes.itemText
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={classes.tBodyCell}
                                    >
                                        <ListItemText
                                            primary={
                                                <>
                                                    {row.reprName
                                                        ? row.reprIsMale ? 'Mr. ' : 'Ms. '
                                                        : ''
                                                    }
                                                    <Highlighter
                                                        highlightClassName="YourHighlightClass"
                                                        searchWords={[params.searchKey]}
                                                        autoEscape={true}   
                                                        textToHighlight={row.reprName}
                                                    />
                                                </>
                                            }
                                            secondary={row.reprPhone}
                                            classes={{
                                                primary: classes.itemText,
                                                secondary: classes.itemText
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {setStatusChipColor(row.status)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton>
                                            <MdInfo />
                                        </IconButton>
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
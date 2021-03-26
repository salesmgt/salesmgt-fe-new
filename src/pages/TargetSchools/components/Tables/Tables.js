import React, { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    IconButton,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    TableSortLabel,
    withStyles,
} from '@material-ui/core'
import {
    MdFirstPage,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdLastPage,
    MdMoreVert,
} from 'react-icons/md'
import { schools as schoolsData } from '../../data/mock-data'
import PropTypes from 'prop-types'
import classes from './Tables.module.scss'

const useStyles = makeStyles((theme) => ({
  tableRow: {
    height: 50
  },
  tableCell: {
    padding: "0.2rem 1rem"
    },    
}));

const columns = [
    'School Name', 'District', 'Principal', 'PIC', 'School Year', 'Purpose', ''
]

const rows = [...schoolsData]

// Customize component TablePagination
function TablePaginationActions(props) {
    const theme = useTheme()
    
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0) // firstPage has index = 0
        console.log('first page: count = ', count)
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
        <div className={classes.root}>
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

// Quy định kiểu dữ liệu cho props của TablePaginationActions
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
}

function SortableTableHeaders(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const MuiTableSortLabel = withStyles({
        root: {
            color: 'white !important',
            "&:hover": {
                color: 'white !important',
            },
            '&$active': {
                color: 'white !important',
            },
        },
        active: {},
        icon: {
            color: 'white !important'
        },
    })(TableSortLabel)

    return (
        <TableHead>
            <TableRow className={classes.thead}>
                {columns.map(column => (  
                    <TableCell className={classes.tcell}
                        sortDirection={orderBy === column ? order : false}
                    >
                        <MuiTableSortLabel
                            active={orderBy === column}
                            direction={orderBy === column ? order : 'asc'}
                            onClick={createSortHandler(column)}
                        >
                            {column}
                        </MuiTableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

SortableTableHeaders.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
}

// Customize component Table
function Tables() {
    // const classes = useStyles()
    const styles = useStyles()
    // Use States and Props to pass data for rows and columns from the Container/Page

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(columns[0])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case "Sales mới":
                return <Chip label={purpose} style={{backgroundColor: '#f57c00', color: 'white'}} />
            case "Chăm sóc":
                return <Chip label={purpose} style={{backgroundColor: '#4caf50', color: 'white'}} />
            case "Tái ký hợp đồng":
                return <Chip label={purpose} style={{backgroundColor: '#1976d2', color: 'white'}} />
            case "Ký mới hợp đồng":
                return <Chip label={purpose} style={{backgroundColor: '#6d33ff', color: 'white'}} />
            default:                                                // #5c21f3
                return <Chip label={purpose}/>;
        }
    }

    const handleRequestSort = (event, columnName) => {
        const isAsc = orderBy === columnName && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnName);

        // Gọi API ở đây
        
        console.log("event: ", event.target)
        console.log('columnName: ', columnName)
        console.log('order: ', isAsc)
    }

    return (
        <Paper className={classes.wrapper}>
            <TableContainer className={classes.customTableContainer }>
                <Table
                    className={classes.table}
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                >
                    <SortableTableHeaders
                        order={order} orderBy={orderBy} onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {rows.length > 0 ? (
                            (rowsPerPage > 0
                                ? rows.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : rows
                            ).map((r) => (
                                <TableRow key={r.no} className={styles.tableRow}>
                                    {/* <TableCell className={styles.tableCell} align="center">{r.no}</TableCell> */}
                                    <TableCell className={styles.tableCell}>{r.schoolName}</TableCell>
                                    <TableCell className={styles.tableCell} align="center">{r.district}</TableCell>
                                    <TableCell className={styles.tableCell}>{r.principal}</TableCell>
                                    <TableCell className={styles.tableCell} align="center">
                                        <ListItem style={{padding: 0 , margin: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar/>
                                            </ListItemAvatar>
                                            <ListItemText primary={r.pic} secondary={r.username} />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell className={styles.tableCell} align="center">{r.schoolYear}</TableCell>
                                    <TableCell className={styles.tableCell}>
                                        {setPurposeChipColor(r.purpose)}
                                    </TableCell>
                                    <TableCell className={styles.tableCell} align="right">
                                        <IconButton>
                                            <MdMoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <i style={{ color: 'gray', fontSize: '1.3em' }}>
                                No records found.
                            </i>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5,10,25,{ label: 'All', value: -1 },]}
                component="div"
                // colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    )
}

export default Tables;

// PropsTypes này dùng để sau này tách ra tái sử dụng cho dễ
// Tables.propTypes = {
//     rows: PropTypes.array.isRequired,
//     columns: PropTypes.array.isRequired,
// }
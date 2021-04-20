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
    Checkbox,
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
} from 'react-icons/md'
// import { schools as schoolsData } from '../../data/mock-data'
import PropTypes from 'prop-types'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import MenuOptions from './MenuOptions/MenuOptions'
import * as ReducerActions from '../../../../hooks/reducer-action-type'
// import { Pagination } from '@material-ui/lab';
import classes from './Tables.module.scss'

// Customize component TablePagination
function TablePaginationActions(props) {
    const theme = useTheme()

    const { count, page, rowsPerPage, totalPage, onChangePage } = props

    // console.log(`count=${count}, page=${page}, rowsPerPage=${rowsPerPage}`)

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
            {/* <Pagination
        count={totalPage} // siblingCount={0} boundaryCount={0}
        showFirstButton showLastButton
        onChange={onChangePage}
      /> */}
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
    totalPage: PropTypes.number.isRequired,
}

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
        </TableHead>
    )
}

SortableTableHeaders.propTypes = {
    columns: PropTypes.array.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
    column: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
}

const useStyles = makeStyles(() => ({
    itemPIC: {
        padding: 0,
        margin: 0
    },
    itemTextLarge: {
        fontSize: '1rem',
    },
    itemTextMedium: {
        fontSize: '0.875rem',
    },
    itemTextSmall: {
        fontSize: '0.8rem',
    }
}));

// Customize component Table
function Tables(props) {
    const styles = useStyles()
    // Use States and Props to pass data for rows and columns from the Container/Page
    const { columns, rows, totalRecord, totalPage } = props // , onGetTargets

    //Use states which have been declared in the TargetSchoolContext
    const {
        params,
        dispatchParams,
        page,
        limit,
        direction,
        column,
        setColumn,
        setLimit,
        setPage,
        setDirection,
    } = useTargetSchool()

    // Destructing TargetSchoolReducer
    // const { sorting, paging } = params  // , listFilters, searchKey
    // const { column, direction } = sorting

    // const { page, limit } = paging

    // const [avatarUrl, setAvatarUrl] = useState('')

    // storage.ref('images/avatars').child('cute.jpg').getDownloadURL().then(url => {
    //     setAvatarUrl(url)
    //     console.log('imagesRef: ', url)
    //     return url;
    // })

    // const fetchAvatarURL = (imageName) => {
    //     console.log('aaaaaaaaaaa')
    //     storage.ref('images/avatars').child(imageName).getDownloadURL().then(url => {
    //         setAvatarUrl(url)
    //         console.log('imagesRef: ', url)
    //         return url;
    //     })
    // };

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
        // console.log('handleChangePage - event: ', event)
        // console.log(`changePage - page=${newPage}, limit=${limit}, column=${column}, direction=${direction}`);
        // onGetTargets(newPage, params.limit, params.column, params.direction, params.searchKey, params.listFilters);

        // console.log('Tables.js - change page - params: ', params)
        // console.log('============handleChangePage============');
        // console.log('page = ', params.page);
        // console.log('limit = ', params.limit);
        // console.log('column = ', params.column);
        // console.log('direction = ', params.direction);
        // console.log('searchKey = ', params.searchKey);
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
        // onGetTargets(0, parseInt(event.target.value, 10), params.column, params.direction, params.searchKey, params.listFilters);

        // console.log('============handleChangeLimit============');
        // console.log('page = ', params.page);
        // console.log('limit = ', params.limit);
        // console.log('column = ', params.column);
        // console.log('direction = ', params.direction);
        // console.log('searchKey = ', params.searchKey);
        // console.log('Tables.js - change limit - params: ', params)
    }

    // ====================Sorting====================
    // const handleRequestSort = () => {
    //   const isAsc = column === columnName && direction === 'asc';
    //   setDirection(isAsc ? 'desc' : 'asc');
    //   setColumn(columnName);

    //   // console.log('event: ', event.target);
    //   // console.log('columnName: ', columnName);
    //   // console.log('direction: ', isAsc);

    //   // Xử lý logic (dispatch reducer, gọi API,... ở đây)
    //   dispatchParams({
    //     type: ReducerActions.SORT_BY,
    //     payload: {
    //       paramName: 'sorting',
    //       paramValue: {
    //         column: columnName,
    //         direction: isAsc ? 'ASC' : 'DES'
    //       }
    //     }
    //   })
    // };

    const onSortBy = (col, direction) => {
        // console.log('onSortBy() - column: ', col)
        if (col.sortable) {
            // console.log(`call api sortBy ${col.key}, direction=${direction}`);

            setDirection(direction === 'desc' ? 'asc' : 'desc')
            setColumn(col.key)

            // Xử lý logic (dispatch reducer, gọi API,... ở đây)
            dispatchParams({
                type: ReducerActions.SORT_BY,
                payload: {
                    column: col.key,
                    direction: direction,
                },
            })
            // onGetTargets(params.page, params.limit, col.key, direction, params.searchKey, params.listFilters);

            // console.log('============onSortBy============');
            // console.log('page = ', params.page);
            // console.log('limit = ', params.limit);
            // console.log('column = ', params.column);
            // console.log('direction = ', params.direction);
            // console.log('searchKey = ', params.searchKey);
        }
    }

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case 'Sales mới':
                return <Chip label={purpose} className={classes.chipSalesMoi} />;
            case 'Chăm sóc':
                return <Chip label={purpose} className={classes.chipChamSoc} />;
            case 'Tái ký hợp đồng':
                return <Chip label={purpose} className={classes.chipTaiKy} />;
            case 'Ký mới hợp đồng':
                return <Chip label={purpose} className={classes.chipKyMoi} />;
            default:
                return <Chip label={purpose} /> // #5c21f3
        }
    }

    //=========================Handle Hover Popover=========================
    // const [anchorEl, setAnchorEl] = useState(null);

    // const handlePopoverOpen = (event) => {
    //   setAnchorEl(event.currentTarget);
    //   console.log('handlePopoverOpen: ', event.currentTarget)
    // };

    // const handlePopoverClose = () => {
    //   setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);

    //=================================================================================
    // const [anchorEl, setAnchorEl] = useState(null)
    // const handleOpenMenuOptions = (event) => {
    //     setAnchorEl(event.currentTarget)
    // }

    //=================================================================================

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
                                    key={row.id}
                                    className={classes.tBodyRow}
                                >
                                    {/* <TableCell>Checkbox</TableCell> */}
                                    <TableCell
                                        className={classes.tBodyCell}
                                        align="center"
                                    >
                                        {params.page * params.limit + index + 1}
                                    </TableCell>
                                    {/* <TableCell className={classes.tCellSchoolName}>
                                        {/**row.type*./} {row.schoolName}
                                    </TableCell> */}
                                    <TableCell className={classes.tBodyCell}>
                                        <ListItemText
                                            primary={`${row.level} ${row.schoolName}`}
                                            secondary={row.district}
                                            classes={{
                                                primary: styles.itemTextLarge,
                                                secondary: styles.itemTextMedium
                                            }}
                                        // primaryTypographyProps={classes.tCellPrimaryText}
                                        // primaryTypographyProps={{ style: { fontSize: '1rem' } }}
                                        // secondaryTypographyProps={{ style: { fontSize: '0.875rem' } }}
                                        />
                                    </TableCell>
                                    {/* <TableCell className={classes.tBodyCell}>
                                        {row.district}
                                    </TableCell> */}
                                    <TableCell
                                        className={classes.tBodyCell}
                                    // onMouseEnter={handlePopoverOpen}
                                    // onMouseLeave={handlePopoverClose}
                                    >
                                        {/* <Typography
                    aria-owns={!!anchorEl ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  > */}
                                        {row.reprGender
                                            ? `Mr. ${row.reprName}`
                                            : `Ms. ${row.reprName}`}
                                        {/* </Typography> */}
                                        {/* <Popover
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography variant="h5" component="h4">{row.reprName}</Typography>
                    <Typography>{row.reprEmail}</Typography>
                    <Typography>{row.reprPhone}</Typography>
                  </Popover> */}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <ListItem className={classes.itemPIC}>
                                            <ListItemAvatar>
                                                {/* <Avatar src={() => fetchAvatarURL(row.avatar)} /> */}
                                                <Avatar src={row.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                className={classes.picName}
                                                primary={row.fullName}
                                                secondary={row.username}
                                                classes={{
                                                    primary: styles.itemTextMedium,
                                                    secondary: styles.itemTextSmall
                                                }}
                                            />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        {row.schoolYear}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        {setPurposeChipColor(row.purpose)}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tBodyCell}
                                        align="right"
                                    >
                                        <MenuOptions data={row} />
                                        {/* <IconButton color="primary" onClick={handleOpenMenuOptions}>
                                            <MdMoreVert />
                                        </IconButton>
                                        {anchorEl && <MenuOptions data={row} />} */}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className={classes.tBodyRow}>
                                <TableCell className={classes.noRecord} component="td" colspan="100%">No records found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                // colSpan={3}
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
                // ActionsComponent={TablePaginationActions}
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

// PropsTypes này dùng để sau này tách ra tái sử dụng cho dễ
Tables.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array.isRequired,
    totalRecord: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    // onGetTargets: PropTypes.func
}

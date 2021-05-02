import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    TableContainer,
    Table,
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
} from '@material-ui/core'
import {
    MdFirstPage,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdLastPage,
} from 'react-icons/md'
// import { schools as schoolsData } from '../../data/mock-data'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import MenuOptions from './MenuOptions/MenuOptions'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { Consts } from '../../TargetSchoolsConfig'
import { useAuth } from '../../../../hooks/AuthContext'
import { getColumns } from '../../TargetSchoolsConfig'
import { roleNames, purposeNames } from '../../../../constants/Generals'
import SortableTableHeaders from './SortableTableHeaders'
import Highlighter from 'react-highlight-words'
// import { Pagination } from '@material-ui/lab';
// import PropTypes from 'prop-types'
import { Snackbars } from '../../../../components'
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
const useStyles = makeStyles(() => ({
    itemPIC: {
        padding: 0,
        margin: 0,
    },
    itemTextLarge: {
        fontSize: '1rem',
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
    const styles = useStyles()
    // Use States and Props to pass data for rows and columns from the Container/Page
    const {
        selectedRows,
        setSelectedRows,
        rows,
        totalRecord,
        totalPage,
        refreshAPI,
    } = props // , onGetTargets
    const { messages } = Consts

    const [notify, setNotify] = React.useState({
        isOpen: false,
        message: '',
        type: '',
    })
    //Use states which have been declared in the TargetSchoolContext
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
    } = useTargetSchool()
    const { user } = useAuth()

    const columns = getColumns(user?.roles[0])

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.filter((row) => !row.username)
            setSelectedRows(newSelecteds)
            return
        }
        setSelectedRows([])
    }
    const handleClick = (event, row) => {
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
        console.log('index ', selectedIndex)
        console.log('mảng ', newSelected)
        setSelectedRows(newSelected)
    }

    const isSelected = (row) => {
        if (selectedRows.indexOf(row) !== -1) return true
        else return false
    }

    // ====================Paging====================
    const handleChangePage = (event, newPage) => {
        setSelectedRows([])
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

    // ====================Sorting====================
    const onSortBy = (col, direction) => {
        if (col.sortable) {
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
        }
    }

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case purposeNames.salesMoi:
                return <Chip label={purpose} className={classes.chipSalesMoi} />
            case purposeNames.chamSoc:
                return <Chip label={purpose} className={classes.chipChamSoc} />
            case purposeNames.taiKy:
                return <Chip label={purpose} className={classes.chipTaiKy} />
            case purposeNames.kyMoi:
                return <Chip label={purpose} className={classes.chipKyMoi} />
            case purposeNames.theoDoi:
                return <Chip label={purpose} /> // #5c21f3
            default:
                return <Chip label={purpose} /> // #5c21f3
        }
    }
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
                        user={user}
                        columns={columns}
                        direction={direction}
                        column={column}
                        onRequestSort={onSortBy}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={
                            rows?.filter((item) => !item.username)?.length
                        }
                        numSelected={selectedRows?.length}
                    />
                    <TableBody className={classes.tBody}>
                        {rows?.length > 0 ? (
                            rows.map((row, index) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        className={classes.tBodyRow}
                                        // hover
                                        role="checkbox"
                                        aria-checked={isSelected(row)}
                                        tabIndex={-1}
                                        selected={isSelected(row)}
                                    >
                                        {user.roles[0] !==
                                            roleNames.salesman && (
                                            <TableCell
                                                padding="checkbox"
                                                width="1%"
                                                onClick={(event) => {
                                                    !row.username &&
                                                        handleClick(event, row)
                                                }}
                                            >
                                                <Checkbox
                                                    checked={
                                                        row.username
                                                            ? false
                                                            : isSelected(row)
                                                    }
                                                    disabled={
                                                        row.username
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </TableCell>
                                        )}
                                        <TableCell
                                            className={classes.tBodyCell}
                                            align="center"
                                            width={
                                                user.roles[0] !==
                                                roleNames.salesman
                                                    ? '0.5%'
                                                    : '1%'
                                            }
                                        >
                                            {params.page * params.limit +
                                                index +
                                                1}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tBodyCell}
                                            width={
                                                user.roles[0] !==
                                                roleNames.salesman
                                                    ? '30%'
                                                    : '35%'
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    <>
                                                        {row.level}
                                                        <Highlighter
                                                            highlightClassName="YourHighlightClass"
                                                            searchWords={[
                                                                params.searchKey,
                                                            ]}
                                                            autoEscape={true}
                                                            textToHighlight={` ${row.schoolName}`}
                                                        />
                                                    </>
                                                }
                                                secondary={row.district}
                                                classes={{
                                                    primary:
                                                        styles.itemTextLarge,
                                                    secondary:
                                                        styles.itemTextMedium,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            className={classes.tBodyCell}
                                            width={
                                                user.roles[0] !==
                                                roleNames.salesman
                                                    ? '14%'
                                                    : '22%'
                                            }
                                        >
                                            <Highlighter
                                                highlightClassName="YourHighlightClass"
                                                searchWords={[params.searchKey]}
                                                autoEscape={true}
                                                textToHighlight={
                                                    row?.reprName
                                                        ? row.reprIsMale
                                                            ? `Mr. ${row.reprName}`
                                                            : `Ms. ${row.reprName}`
                                                        : ''
                                                }
                                            />
                                        </TableCell>
                                        {user.roles[0] !==
                                            roleNames.salesman && (
                                            <TableCell
                                                className={classes.tBodyCell}
                                                width="20%"
                                            >
                                                <ListItem
                                                    className={classes.itemPIC}
                                                >
                                                    <ListItemAvatar>
                                                        {/* <Avatar src={() => fetchAvatarURL(row.avatar)} /> */}
                                                        <Avatar
                                                            src={row.avatar}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        className={
                                                            classes.picName
                                                        }
                                                        primary={
                                                            <Highlighter
                                                                highlightClassName="YourHighlightClass"
                                                                searchWords={[
                                                                    params.searchKey,
                                                                ]}
                                                                autoEscape={
                                                                    true
                                                                }
                                                                textToHighlight={
                                                                    row.fullName
                                                                        ? row.fullName
                                                                        : ''
                                                                }
                                                            />
                                                        }
                                                        secondary={
                                                            <Highlighter
                                                                highlightClassName="YourHighlightClass"
                                                                searchWords={[
                                                                    params.searchKey,
                                                                ]}
                                                                autoEscape={
                                                                    true
                                                                }
                                                                textToHighlight={
                                                                    row.username
                                                                        ? row.username
                                                                        : ''
                                                                }
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
                                        )}
                                        <TableCell
                                            className={classes.tBodyCell}
                                            width={
                                                user.roles[0] !==
                                                roleNames.salesman
                                                    ? '17%'
                                                    : '20%'
                                            }
                                        >
                                            <Highlighter
                                                highlightClassName="YourHighlightClass"
                                                searchWords={[params.searchKey]}
                                                autoEscape={true}
                                                textToHighlight={
                                                    row?.schoolYear
                                                }
                                            />
                                        </TableCell>
                                        <TableCell
                                            className={classes.tBodyCell}
                                            width={
                                                user.roles[0] !==
                                                roleNames.salesman
                                                    ? '17%'
                                                    : '20%'
                                            }
                                        >
                                            {setPurposeChipColor(row.purpose)}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tBodyCell}
                                            align="right"
                                            width={
                                                user.roles[0] !==
                                                roleNames.salesman
                                                    ? '0.5%'
                                                    : '2%'
                                            }
                                        >
                                            <MenuOptions
                                                data={row}
                                                notify={notify}
                                                setNotify={setNotify}
                                                refreshAPI={refreshAPI}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
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

            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default React.memo(Tables)

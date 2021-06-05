import React, { useState, useRef } from 'react'
import {
    Button,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    ListItemText,
    TableHead,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    makeStyles,
    Paper,
    IconButton,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Tooltip,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { previewColumns } from './CreateTasksConfig'
import { Consts, schoolYearSubTitle } from '../DialogConfig'
import {
    statusNames,
    purposeNames,
    milkNames,
} from '../../../../constants/Generals'
import * as Milk from '../../../../utils/Milk'
// import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import { useTaskForm } from './TaskFormContext'
import { getPurpsByStatus } from '../../../../utils/Sortings'
import { createTasks } from '../../TasksServices'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from 'mui-pickers-v3'
import DateFnsUtils from '@date-io/date-fns'
import {
    parseDateToString,
    calculateSchoolYear,
} from '../../../../utils/DateTimes'
import classes from './CreatePreviewDialogForm.module.scss'

//===============Set max-height for dropdown list===============
const ITEM_HEIGHT = 38
const ITEM_PADDING_TOP = 5
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        },
    },
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: '0.5rem',
        minWidth: 180,
    },
    option: {
        fontSize: '0.875rem',
    },
    root: {},
    menuItemRoot: {
        '&$menuItemSelected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        '&$menuItemSelected:focus': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
        },
        '&$menuItemSelected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04);',
        },
    },
    menuItemSelected: {},
    autoComplete: {
        width: 260,
        marginLeft: '0.5rem',
    },
    itemPIC: {
        padding: 0,
        margin: 0,
    },
    divItemPIC: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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

function CreatePreviewDialogForm(props) {
    const styles = useStyles()
    const { onClose, schoolStatus, refreshAPI } = props

    const { fields, operations } = Consts
    const [rowsState, setRowsState] = React.useState(props.rows)
    const [oneRow, setOneRow] = React.useState(null)
    const [purpose, setPurpose] = useState(null)
    // const [deadline, setDeadline] = useState(new Date(new Date().getFullYear(), 8, 30))

    const { salesPurps } = useApp()
    const { params } = useTaskForm() //, dispatchParams, setFilter
    const { page, limit, column, direction, searchKey, listFilters } = params

    const schoolYear = calculateSchoolYear()

    const bakSalesPurps = salesPurps
        ? salesPurps
        : Milk.getMilk(milkNames.salesPurps)
    const purpsByStatus = getPurpsByStatus(schoolStatus, bakSalesPurps)

    // const modifyRowsState = () => {
    //     let array = []
    //     console.log('handleSubmit(): rowsState = ', rowsState);

    //     rowsState.map((item) => {
    //         item = {
    //             ...item,
    //             purpose: purpose,
    //             schoolYear: schoolYear,
    //             endDate: new Date(new Date().getFullYear(), 8, 30)
    //         }
    //         array.push(item)
    //     })

    //     setRowsState(array)
    // }
    // modifyRowsState()
    console.log('Preview Dialog:   rowsState = ', rowsState)

    const handleSubmit = () => {
        let array = []
        console.log('handleSubmit(): rowsState = ', rowsState)

        rowsState.map((item) => {
            item = {
                ...item,
                purpose: purpose,
                schoolYear: schoolYear,
                endDate: parseDateToString(
                    item?.endDate
                        ? item?.endDate
                        : new Date(new Date().getFullYear(), 8, 30),
                    'YYYY-MM-DD HH:mm:ss'
                ),
            } // , schoolId: item.id
            array.push(item)
        })
        console.log('handleSubmit(): array = ', array)
        createTasks(array).then((res) => {
            // console.log('Created. res = ', res);
            setRowsState([])
            refreshAPI(
                schoolYear,
                page,
                limit,
                column,
                direction,
                searchKey,
                listFilters
            )
            onClose()
        })

        // console.log(array)
        // assignMulti(array).then((res) => {
        //     props.setNotify({
        //         isOpen: true,
        //         message: 'Assigned successfully',
        //         type: 'success',
        //     })
        //     props.setRows([])
        //     refreshAPI(page, limit, column, direction, searchKey, listFilters)

        //     onClose()
        // })
    }

    const handleOnRemove = (e, row) => {
        let newSelected = []
        const selectedIndex = rowsState.indexOf(row)
        if (selectedIndex === 0) {
            newSelected = newSelected.concat(rowsState.slice(1))
        } else if (selectedIndex === rowsState.length - 1) {
            newSelected = newSelected.concat(rowsState.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                rowsState.slice(0, selectedIndex),
                rowsState.slice(selectedIndex + 1)
            )
        }
        setRowsState(newSelected)
        if (newSelected.length === 0) {
            onClose()
        }
    }

    const handleDeadlineChange = (newDate, row) => {
        // setDeadline(newDate);
        // console.log('newDate = ', newDate);
        // console.log('editing row = ', row);

        // let editingRow = rowsState.find(obj => obj.id === row.id)
        // console.log('Before ----- editingRow = ', editingRow)
        // editingRow = { ...editingRow, endDate: newDate }

        // console.log('After ----- editingRow = ', editingRow)

        const index = rowsState.findIndex(
            (obj) => obj.schoolId === row.schoolId
        )
        // console.log('deadline of index = ', index);
        //const item ={...rowsState[index],note: e.target.value}
        let array = [...rowsState]
        array[index] = {
            ...array[index],
            endDate: newDate,
        }
        setRowsState(array)
        // setOneRow({ ...row, endDate: newDate })
    }

    const setStatusChipColor = (status) => {
        switch (status) {
            case statusNames.lead:
                return <Chip label={status} className={classes.chipLead} />
            case statusNames.customer:
                return <Chip label={status} className={classes.chipCustomer} />
            // case statusNames.ngungHT:
            //     return <Chip label={status} className={classes.chipCustomer} />
            case statusNames.potential: // tiem nang
                return <Chip label={status} className={classes.chipPotential} />
            default:
                break
            // return <Chip label={status} />
        }
    }

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case purposeNames.purp1:
                return <Chip label={purpose} className={classes.chipSalesMoi} />
            case purposeNames.purp2:
                return <Chip label={purpose} className={classes.chipTheoDoi} />
            case purposeNames.purp3:
                return <Chip label={purpose} className={classes.chipChamSoc} />
            case purposeNames.purp4:
                return <Chip label={purpose} className={classes.chipTaiKy} />
            case purposeNames.purp5:
                return <Chip label={purpose} className={classes.chipKyMoi} />
            default:
                return <Chip label={purpose} /> // #5c21f3
            // break
        }
    }

    //     const object = rowsState.findIndex((obj) => obj.id === row?.id)
    //     //const item ={...rowsState[object],note: e.target.value}
    //     let array = [null]
    //     array = [...rowsState]
    //     array[object] = {
    //         ...array[object],
    //         note: e.target.value ? e.target.value : null,
    //         noteBy: e.target.value ? user.username : null,
    //     }
    //     console.log(array)
    //     setRowsState(array)
    // }

    return (
        <>
            <DialogContent className={classes.wrapper}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            flexWrap="nowrap"
                        >
                            <Box flexGrow={1}>
                                <FormControl className={styles.formControl}>
                                    <InputLabel>
                                        {fields.purpose.label}
                                    </InputLabel>
                                    <Select
                                        value={purpose || ''}
                                        onChange={(event) =>
                                            setPurpose(event.target.value)
                                        }
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem
                                            value=""
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected:
                                                    styles.menuItemSelected,
                                            }}
                                        >
                                            {fields.purpose.options.none}
                                        </MenuItem>
                                        {purpsByStatus?.map((purp) => (
                                            <MenuItem
                                                key={purp}
                                                value={purp}
                                                className={styles.option}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected:
                                                        styles.menuItemSelected,
                                                }}
                                            >
                                                {purp}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    className={classes.title}
                                >
                                    {schoolYearSubTitle(schoolYear)}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle1">
                            List of assigned schools:
                        </Typography>
                        <TableContainer
                            className={classes.container}
                            component={Paper}
                        >
                            <Table
                                className={classes.table}
                                stickyHeader
                                size="small"
                            >
                                <TableHead>
                                    <TableRow className={classes.tHead}>
                                        {previewColumns.map((col) => (
                                            <TableCell
                                                key={col.key}
                                                className={classes.tHeadCell}
                                                align={col.align}
                                                width={col.width}
                                            >
                                                {col.name}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes.tBody}>
                                    {rowsState?.map((row, index) => (
                                        <TableRow key={row?.schoolId}>
                                            <TableCell
                                                className={classes.tBodyCell}
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tBodyCell}
                                            >
                                                <ListItemText
                                                    primary={`${row?.educationalLevel} ${row?.name}`}
                                                    secondary={row?.district}
                                                    classes={{
                                                        primary:
                                                            classes.itemTextPrimary,
                                                        secondary:
                                                            classes.itemTextSecondary,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className={classes.tBodyCell}
                                            >
                                                {row?.status &&
                                                    setStatusChipColor(
                                                        row?.status
                                                    )}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tBodyCell}
                                            >
                                                {purpose &&
                                                    setPurposeChipColor(
                                                        purpose
                                                    )}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tBodyCell}
                                            >
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <KeyboardDatePicker
                                                        format="dd/MM/yyyy"
                                                        minDate={
                                                            new Date(
                                                                new Date().getTime() +
                                                                    24 *
                                                                        60 *
                                                                        60 *
                                                                        1000
                                                            )
                                                        }
                                                        disablePast
                                                        allowKeyboardControl
                                                        disableToolbar
                                                        variant="inline"
                                                        value={
                                                            row?.endDate
                                                                ? row?.endDate
                                                                : new Date(
                                                                      new Date().getFullYear(),
                                                                      8,
                                                                      30
                                                                  )
                                                        }
                                                        onChange={(newDate) =>
                                                            handleDeadlineChange(
                                                                newDate,
                                                                row
                                                            )
                                                        }
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </TableCell>
                                            <TableCell
                                                className={classes.tBodyCell}
                                            >
                                                <Tooltip title="Remove">
                                                    <IconButton
                                                        onClick={(e) =>
                                                            handleOnRemove(
                                                                e,
                                                                row
                                                            )
                                                        }
                                                    >
                                                        <MdClose />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className="">
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!purpose}
                    className={classes.btnSave}
                >
                    {operations.save}
                </Button>
                <Button onClick={onClose}>{operations.cancel}</Button>
            </DialogActions>
        </>
    )
}

export default CreatePreviewDialogForm

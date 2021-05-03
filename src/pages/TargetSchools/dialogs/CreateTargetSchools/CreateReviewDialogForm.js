import React, { useState, useRef } from 'react'
import {
    Button,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    InputAdornment,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar,
    TableHead,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    makeStyles,
    Paper,
    IconButton,
    Chip
} from '@material-ui/core'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import { Consts, columnReview } from '../DialogConfig'
import { statusNames } from '../../../../constants/Generals'
import { useAuth } from '../../../../hooks/AuthContext'
import classes from './CreateReviewDialogForm.module.scss'

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        marginTop: '0.8rem',
        minWidth: 160,
        // maxWidth: 180
    },
    option: {
        fontSize: '0.875rem',
    },
    lastOption: {
        fontSize: '0.875rem',
        borderBottom: '0.5px solid #e0e0e0',
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
        marginLeft: '0.5rem'
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

function CreateReviewDialogForm(props) {
    const styles = useStyles()
    const { onClose, refreshAPI } = props
    const [rowsState, setRowsState] = React.useState(props.rows)
    const { operations } = Consts
    const [object, setObject] = React.useState(null)

    const { params } = useTargetSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params
    const { user } = useAuth()

    const [PIC, setPIC] = useState(null)

    const typingTimeoutRef = useRef({})

    const handleSubmit = () => {
        let array = []
        rowsState.map((item) => {
            item = { ...item, username: PIC?.username }
            array.push(item)
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
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget)
        setObject(row)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
      console.log(rowsState)
    const open = Boolean(anchorEl)

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
    const truncateString = (str) => {
        if (str) return str.length > 26 ? str.substring(0, 25) + '...' : str
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
   
    //     const object = rowsState.findIndex((obj) => obj.id === row.id)
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
                                        {columnReview.map((col) => (
                                            <TableCell
                                                key={col}
                                                className={classes.tHeadCell}
                                                align={
                                                    col === 'no'
                                                        ? 'center'
                                                        : 'left'
                                                }
                                            >
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes.tBody}>
                                    {rowsState?.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                align="center"
                                                width="5%"
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                width="30%"
                                                className={classes.tBodyCell}
                                            >
                                                <ListItemText
                                                    primary={`${row.educationalLevel} ${row.name}`}
                                                    classes={{
                                                        primary:
                                                            classes.itemTextPrimary,
                                                        secondary:
                                                            classes.itemTextSecondary,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                width="30%"
                                                className={classes.tBodyCell}
                                            >
                                                <ListItemText
                                                    primary={truncateString(row.address)}
                                                    secondary={row.district}
                                                    classes={{
                                                        primary:
                                                            classes.itemTextPrimary,
                                                        secondary:
                                                            classes.itemTextSecondary,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                        {setStatusChipColor(row.status)}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={(e) =>
                                                        handleOnRemove(e, row)
                                                    }
                                                >
                                                    <MdClose />
                                                </IconButton>
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
                    disabled={!PIC}
                    className={classes.btnSave}
                >
                    {operations.save}
                </Button>
                <Button onClick={onClose}>{operations.cancel}</Button>
            </DialogActions>
        </>
    )
}

export default CreateReviewDialogForm
import React, { useState, useRef } from 'react'
import {
    Button,
    TextField,
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
    Popover,
    Badge,
} from '@material-ui/core'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { Autocomplete } from '@material-ui/lab'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import { Consts, columns } from '../DialogConfig'
import { useAuth } from '../../../../hooks/AuthContext'
import { assignMulti, getTargetSchools } from '../../TargetSchoolsServices'
import classes from './AssignMultiple.module.scss'

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

function AssignMultipleForm(props) {
    const styles = useStyles()
    const { onClose, refreshAPI } = props
    const [rowsState, setRowsState] = React.useState(props.rows)
    const { operations } = Consts
    const [object, setObject] = React.useState(null)

    const { PICs, getListPICs, params } = useTargetSchool()
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
        console.log(array)
        assignMulti(array).then((res) => {
            props.setNotify({
                isOpen: true,
                message: 'Assigned successfully',
                type: 'success',
            })
            props.setRows([])
            refreshAPI(page, limit, column, direction, searchKey, listFilters)

            onClose()
        })
    }
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget)
        setObject(row)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onSearchPICChange = (event) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const searchPIC = event.target.value
            if (searchPIC) {
                getListPICs(searchPIC)
            } else {
                getListPICs()
            }
        }, 300)
    }

    const handlePICChange = (event, newPIC) => {
        setPIC(newPIC)
    }
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
    const onBlur = (e, row) => {
        if (e.target.value?.length > 250) {
            props.setNotify({
                isOpen: true,
                message: 'Note length is shorter than 250 letters',
                type: 'warning',
            })
            return
        }
        const object = rowsState.findIndex((obj) => obj.id === row.id)
        //const item ={...rowsState[object],note: e.target.value}
        let array = [null]
        array = [...rowsState]
        array[object] = {
            ...array[object],
            note: e.target.value ? e.target.value : null,
            noteBy: e.target.value ? user.username : null,
        }
        console.log(array)
        setRowsState(array)
    }
    return (
        <>
            <DialogContent className={classes.wrapper}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6} lg={5}>
                                <Autocomplete
                                    autoComplete
                                    autoSelect
                                    autoHighlight
                                    clearOnEscape
                                    options={PICs ? PICs : []}
                                    getOptionLabel={(pic) =>
                                        pic.fullName ? pic.fullName : ''
                                    }
                                    value={PIC}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="PICs"
                                            name="PIC"
                                            margin="normal"
                                            placeholder="PIC will be assigned"
                                            onChange={onSearchPICChange}
                                            // ref={params.InputProps.ref}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <>
                                                        <InputAdornment position="start">
                                                            <MdAccountCircle />
                                                        </InputAdornment>
                                                        {
                                                            params.InputProps
                                                                .startAdornment
                                                        }
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderOption={(option) => {
                                        return (
                                            <div className={styles.divItemPIC} key={option.username}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={option.avatar}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText primary={option.fullName ? option.fullName : ''} classes={{ primary: classes.itemTextPrimary }} />
                                            </div>
                                        );
                                    }}
                                    className={styles.autoComplete}
                                    onChange={(event, newPIC) =>
                                        handlePICChange(event, newPIC)
                                    }
                                />
                            </Grid>
                        </Grid>
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
                                        {columns.map((col) => (
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
                                    {rowsState.map((row, index) => (
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
                                                    primary={row.schoolName}
                                                    secondary={row.district}
                                                    classes={{
                                                        primary:
                                                            classes.itemTextPrimary,
                                                        secondary:
                                                            classes.itemTextSecondary,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                width="30%"
                                                className={classes.tBodyCell}
                                            >
                                                {PIC ? (
                                                    <ListItem
                                                        className={
                                                            classes.itemPIC
                                                        }
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                src={PIC.avatar}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={
                                                                PIC.fullName
                                                            }
                                                            secondary={
                                                                PIC.username
                                                            }
                                                            classes={{
                                                                primary:
                                                                    classes.itemTextPrimary,
                                                                secondary:
                                                                    classes.itemTextSecondary,
                                                            }}
                                                        />
                                                    </ListItem>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                width="40%"
                                                className={classes.tBodyCell}
                                            >
                                                <IconButton
                                                    onClick={(e) =>
                                                        handleClick(e, row)
                                                    }
                                                >
                                                    <Badge
                                                        invisible={!row.note}
                                                        color="secondary"
                                                        variant="dot"
                                                    >
                                                        <BiEdit />
                                                    </Badge>
                                                </IconButton>
                                                <Popover
                                                    open={open}
                                                    onClose={handleClose}
                                                    anchorEl={anchorEl}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <TextField
                                                        onBlur={(e) =>
                                                            onBlur(e, object)
                                                        }
                                                        onChange={(e) =>
                                                            setObject({
                                                                ...object,
                                                                note:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        value={
                                                            object?.note
                                                                ? object?.note
                                                                : ''
                                                        }
                                                        multiline
                                                        autoFocus
                                                        rows={4}
                                                        placeholder="Type note here"
                                                        variant="outlined"
                                                    />
                                                </Popover>
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

export default AssignMultipleForm

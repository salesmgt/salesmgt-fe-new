import React, { useState, useEffect, useRef } from 'react'
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
    Tooltip,
    Card,
    CardContent,
    CardMedia,
    Collapse,
    Box,
} from '@material-ui/core'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { ImSad } from 'react-icons/im';
import { Autocomplete } from '@material-ui/lab'
import { useTask } from '../../hooks/TaskContext'
import { Consts, columnsTableAssign } from '../DialogConfig'
import { useAuth } from '../../../../hooks/AuthContext'
import { assignMulti, suggestSalesmen } from '../../TasksServices'
import { useHistory } from 'react-router'
import { Alert, AlertTitle } from '@material-ui/lab'
import classes from './Assign.module.scss'

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
        width: 280,
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

function AssignForm(props) {
    const styles = useStyles()
    const { onClose, rows, setRows, refreshAPI, setNotify } = props
    const { operations } = Consts
    const history = useHistory()
    const [openAlert, setOpenAlert] = React.useState(true)

    const [anchorEl, setAnchorEl] = useState(null)
    const [rowsState, setRowsState] = useState(rows)
    const [object, setObject] = useState(null)

    const { PICs, getListPICs, params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params
    const { user } = useAuth()

    const [PIC, setPIC] = useState(null)

    const typingTimeoutRef = useRef({})

    const [listSuggestions, setListSuggestions] = useState([]);
    const getSchoolIds = () => {
        console.log('Assign Form --- listSchools: ', rows);
        let schoolIds = []
        rows.forEach(task => {
            schoolIds.push(task?.schoolId)
            console.log('list ids = ', schoolIds);
        });
        return schoolIds
    }

    // let isMounted = true
    useEffect(() => {
        const listSchoolIds = [...getSchoolIds()]
        console.log('useEffect------list ids = ', listSchoolIds);

        suggestSalesmen(listSchoolIds).then(data => {
            // if (isMounted) {
            setListSuggestions(data?.list)
            // }
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })

        // return () => {
        //     isMounted = false
        // };
    }, []);

    // if (!listSuggestions) {
    //     return <Loading />
    // }

    // console.log('assign form --- rowsState: ', rowsState);

    const handleSubmit = () => {
        const array = []
        rowsState.map((item) => {
            item = { ...item, username: PIC?.username }
            array.push(item)
        })
        // console.log(array)
        assignMulti(array).then((res) => {
            setNotify({
                isOpen: true,
                message: 'Assigned successfully',
                type: 'success',
            })
            setRows([])
            refreshAPI(page, limit, column, direction, searchKey, listFilters)

        }).catch((error) => {
            if (error.response) {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: 'Assigned successfully',
                    type: 'success',
                })
            }
        })

        onClose()
    }

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
            setNotify({
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
        // console.log(array)
        setRowsState(array)
    }

    return (
        <>
            <DialogContent className={classes.wrapper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={4} lg={4} style={{ border: '1px solid grey' }}>
                                <Autocomplete
                                    autoComplete
                                    autoSelect
                                    autoHighlight
                                    clearOnEscape
                                    options={PICs ? PICs : []}
                                    getOptionLabel={(pic) => pic?.fullName ? pic.fullName : ''}
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
                                            <div
                                                className={styles.divItemPIC}
                                                key={option.username}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={option.avatar}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        option.fullName
                                                            ? option.fullName
                                                            : ''
                                                    }
                                                    classes={{
                                                        primary:
                                                            classes.itemTextPrimary,
                                                    }}
                                                />
                                            </div>
                                        )
                                    }}
                                    className={styles.autoComplete}
                                    onChange={(event, newPIC) =>
                                        handlePICChange(event, newPIC)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} sm={8} md={8} lg={8} style={{ border: '1px solid grey' }}>
                                <Box display="flex">
                                    <Box flexGrow={1}>
                                        <Typography variant="overline">Salesman Suggestions</Typography>
                                    </Box>
                                    <Box flexShrink={1}>
                                        <Button variant="outlined" size="small"
                                            disabled={openAlert}
                                            onClick={() => { setOpenAlert(true) }}
                                        >
                                            Suggest me
                                        </Button>
                                    </Box>
                                </Box>
                                {(listSuggestions || listSuggestions?.length > 0) ? (
                                    <div className={classes.cardContainer}>
                                        {listSuggestions.map(salesman => (
                                            <Card className={classes.quickCard}>
                                                <CardMedia
                                                    className={classes.quickCardAvatar}
                                                    image={salesman?.avatar}
                                                // title="Live from space album cover"
                                                />
                                                <div className={classes.details}>
                                                    <CardContent className={classes.content}>
                                                        <Typography component="h5" variant="h5">
                                                            Live From Space
                                                </Typography>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            Mac Miller
                                                </Typography>
                                                    </CardContent>
                                                    {/* <div className={classes.controls}>
                                                <IconButton aria-label="previous">
                                                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                                </IconButton>
                                                <IconButton aria-label="play/pause">
                                                    <PlayArrowIcon className={classes.playIcon} />
                                                </IconButton>
                                                <IconButton aria-label="next">
                                                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                                </IconButton>
                                            </div> */}
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={classes.alertContainer}>
                                        <Collapse in={openAlert}>
                                            <Alert
                                                severity="warning" icon={<ImSad />}
                                                action={
                                                    <IconButton
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => { setOpenAlert(false) }}
                                                    >
                                                        <MdClose fontSize="inherit" />
                                                    </IconButton>
                                                }
                                            >
                                                <AlertTitle>Sorry!</AlertTitle>
                                            No salesman suggested in this case. <br />
                                                <i><b>Reason: </b>The distance between selected schools are too far.</i>
                                            </Alert>
                                        </Collapse>
                                    </div>
                                )}
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
                                        {columnsTableAssign.map((col) => (
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
                                    {rowsState.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className={classes.tBodyCell}>
                                                <ListItemText
                                                    primary={`${row.level} ${row.schoolName}`}
                                                    secondary={row.district}
                                                    classes={{
                                                        primary:
                                                            classes.itemTextPrimary,
                                                        secondary:
                                                            classes.itemTextSecondary,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell className={classes.tBodyCell}>
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
                                            <TableCell className={classes.tBodyCell}>
                                                <Tooltip title="Note">
                                                    <IconButton
                                                        onClick={(e) => handleClick(e, row)}
                                                    >
                                                        <Badge
                                                            invisible={!row.note}
                                                            color="secondary"
                                                            variant="dot"
                                                        >
                                                            <BiEdit />
                                                        </Badge>
                                                    </IconButton>
                                                </Tooltip>
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
                                                                note: e.target.value,
                                                            })
                                                        }
                                                        value={
                                                            object?.note ? object?.note : ''
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
                                                <Tooltip title="Remove">
                                                    <IconButton onClick={(e) => handleOnRemove(e, row)}>
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
            <DialogActions>
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

export default AssignForm

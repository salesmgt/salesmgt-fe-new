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
    Icon,
} from '@material-ui/core'
import { MdAccountCircle, MdClose, MdLocationOn, MdRefresh } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { ImSad } from 'react-icons/im'
import { Autocomplete, Rating } from '@material-ui/lab'
import { useTask } from '../../hooks/TaskContext'
import { Consts, columnsTableAssign } from '../DialogConfig'
import { useAuth } from '../../../../hooks/AuthContext'
import { assignMulti, suggestSalesmen } from '../../TasksServices'
import { useHistory } from 'react-router'
import { Alert, AlertTitle } from '@material-ui/lab'
import SuggestionQuickView from '../SuggestionQuickView/SuggestionQuickView'
import { Loading } from '../../../../components'
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
        width: 270,
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
        fontWeight: 600
    },
    itemTextSecondary: {
        fontSize: '0.8rem',
        fontWeight: 500
    },
    itemTextPrimary2: {
        fontSize: '0.9rem',
        fontWeight: 600
    },
}))

function AssignForm(props) {
    const styles = useStyles()
    const { onClose, rows, setRows, refreshAPI, setNotify } = props
    const { operations } = Consts
    const history = useHistory()
    const [openAlert, setOpenAlert] = useState(true)

    const [anchorElQuickViewPopover, setAnchorElQuickViewPopover] = useState(null);
    const [clickedSalesman, setClickedSalesman] = useState(null);   // click to view popover

    const [anchorElNotePopover, setAnchorElNotePopover] = useState(null)
    const [rowsState, setRowsState] = useState(rows)
    const [object, setObject] = useState(null)

    const { PICs, getListPICs, params } = useTask()
    const { listFilters, page, limit, column, direction, searchKey } = params
    const { user } = useAuth()

    const [PIC, setPIC] = useState(null)
    const typingTimeoutRef = useRef({})

    //=====================List suggested Salesmen=====================
    const [listSuggestions, setListSuggestions] = useState(null);
    const getSchoolIds = (listTasks) => {
        console.log('Assign Form --- listSchools: ', listTasks);
        let schoolIds = []
        listTasks.forEach(task => {
            schoolIds.push(task?.schoolId)
            console.log('list ids = ', schoolIds);
        });
        return schoolIds
    }

    const getSuggestions = (listTasks) => {
        const listSchoolIds = [...getSchoolIds(listTasks)]
        console.log('useEffect------list ids = ', listSchoolIds);

        suggestSalesmen(listSchoolIds).then(data => {
            if (isMounted) {
                setListSuggestions(data)
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }

    let isMounted = true
    useEffect(() => {
        getSuggestions(rowsState)

        return () => {
            isMounted = false
        };
    }, []);

    if (!listSuggestions) {
        return <Loading />
    }

    console.log('outside - rowsState: ', rowsState);

    const handleSubmit = () => {
        console.log('handleSubmit() ----- rowsState: ', rowsState);

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
                    message: 'Assigned failed',
                    type: 'error',
                })
            }
        })

        onClose()
    }

    const handleOpenNotePopover = (event, row) => {
        setAnchorElNotePopover(event.currentTarget)
        setObject(row)
    }
    const open = Boolean(anchorElNotePopover)

    const handleOpenQuickViewPopover = (event, salesman) => {
        setAnchorElQuickViewPopover(event.currentTarget)
        setClickedSalesman(salesman)
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
        console.log('selected PIC: ', newPIC);
        setPIC(newPIC)
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
        getSuggestions(newSelected)

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

    const getShortName = (fullName) => {
        const tmp1 = fullName.split(' ')
        const shortName = [tmp1[tmp1.length - 2], tmp1[tmp1.length - 1]]
        return shortName.join(' ')
    }

    return (
        <>
            <DialogContent className={classes.wrapper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
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

                            <Grid item xs={12} sm={8} md={8} lg={8} className={classes.suggestionContainer}>
                                <Box display="flex">
                                    <Box flexGrow={1}>
                                        <Typography variant="button" className={classes.suggestionTitle}>Salesman Suggestions</Typography>
                                    </Box>
                                    {/* <Box flexShrink={1}>
                                        <Tooltip title="Refresh suggestions">
                                            <IconButton color="secondary" disabled={openAlert} onClick={() => { setOpenAlert(true) }}>
                                                <Icon fontSize="small" className={classes.iconRefresh}><MdRefresh /></Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </Box> */}
                                </Box>
                                {(listSuggestions && listSuggestions?.length > 0) ? (
                                    <div className={classes.cardContainer}>
                                        {listSuggestions.map((salesman, index) => (
                                            <div key={index}
                                                className={classes.cardCover}
                                                onClick={(e, clickedSalesman) => handleOpenQuickViewPopover(e, salesman)}
                                            >
                                                <Card className={classes.quickCard}>
                                                    <CardMedia
                                                        className={classes.quickCardAvatar}
                                                        image={salesman?.avatar}
                                                    />
                                                    <CardContent className={classes.content}>
                                                        <ListItem dense alignItems="flex-start" className={classes.listItem}>
                                                            <ListItemText
                                                                className={classes.listItemText}
                                                                primary={getShortName(salesman?.fullName)}
                                                                // primaryTypographyProps={{ paragraph: false }}
                                                                secondary={salesman?.username}
                                                                classes={{ primary: styles.itemTextPrimary2, secondary: styles.itemTextSecondary }}
                                                            />
                                                        </ListItem>
                                                        <div className={classes.subInfo}>
                                                            <div className={classes.starPoint}>
                                                                {/* <Tooltip title="Priority points"> */}
                                                                <Rating defaultValue={1} max={1} size="small" readOnly />
                                                                {/* </Tooltip> */}
                                                                <Typography className={classes.point}>{salesman?.point >= 10 ? 10 : salesman.point}</Typography>
                                                            </div>
                                                            <div className={classes.distancePoint}>
                                                                <MdLocationOn className={classes.iconLocation} />
                                                                <Typography className={classes.distance}>
                                                                    {parseFloat(salesman?.distance).toFixed(1)}km
                                                                </Typography>
                                                            </div>

                                                        </div>
                                                    </CardContent>
                                                    {/* <div className={classes.details}>
                                                        </div> */}
                                                </Card>

                                                {/* <SuggestionQuickView
                                                    open={!!anchorElQuickViewPopover}
                                                    anchorEl={anchorElQuickViewPopover}
                                                    onClose={() => setAnchorElQuickViewPopover(null)}
                                                    salesman={salesman}
                                                /> */}
                                            </div>
                                        ))}
                                        <SuggestionQuickView
                                            open={!!anchorElQuickViewPopover}
                                            anchorEl={anchorElQuickViewPopover}
                                            onClose={() => setAnchorElQuickViewPopover(null)}
                                            salesman={clickedSalesman}
                                            setSelectedSalesman={setPIC}
                                        />
                                    </div>
                                ) : (
                                    <div className={classes.alertContainer}>
                                        {!openAlert && (
                                            <Typography variant="body2" className={classes.noSalesman}>
                                                <i>No salesman suggested in this case</i> <br />
                                                <b>Reason: </b>The distance between selected schools are too far.
                                            </Typography>
                                        )}
                                        <Collapse in={openAlert}>
                                            <Alert
                                                severity="warning" icon={<ImSad />}
                                                action={
                                                    <IconButton
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => setOpenAlert(false)}
                                                    >
                                                        <MdClose fontSize="inherit" />
                                                    </IconButton>
                                                }
                                            >
                                                <AlertTitle>Whoosp...</AlertTitle>
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
                                                {PIC && (
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
                                                )}
                                            </TableCell>
                                            <TableCell className={classes.tBodyCell}>
                                                <Tooltip title="Note">
                                                    <IconButton
                                                        onClick={(e) => handleOpenNotePopover(e, row)}
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
                                    <Popover
                                        open={open}
                                        onClose={() => setAnchorElNotePopover(null)}
                                        anchorEl={anchorElNotePopover}
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

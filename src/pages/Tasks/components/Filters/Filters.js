import React, { useState, useRef } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Select,
    Grid,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    TextField,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Button,
    InputAdornment,
    Tooltip,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
    MdAccountCircle,
    MdAdd,
    MdExpandMore,
    MdFilterList,
    MdPersonAdd,
} from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useTask } from '../../hooks/TaskContext'
import Chips from './Chips/Chips'
import {
    SCHOOL_YEAR_FILTER,
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    // SCALE_FILTER,
    PIC_FILTER,
    PURPOSE_FILTER,
    STATUS_FILTER,
    ASSIGNED_FILTER,
    DATE_RANGE_FILTER,
    TASK_STATUS_FILTER,
} from '../../../../constants/Filters'
import { useAuth } from '../../../../hooks/AuthContext'
import { useApp } from '../../../../hooks/AppContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import NotifyAssign from '../../dialogs/NotifyAssign/NotifyAssign'
import Assign from '../../dialogs/Assign/Assign'
import CreateTasks from '../../dialogs/CreateTasks/CreateTasks'
import { Consts } from '../../TasksConfig'
import { roleNames } from '../../../../constants/Generals'
import { Snackbars } from '../../../../components'
import { getPurpsByStatus } from '../../../../utils/Sortings'
import TaskFormProvider from '../../dialogs/CreateTasks/TaskFormContext'
import styles from './Filters.module.scss'
import DateRangePickers from '../DateRangePickers/DateRangePickers'
import moment from 'moment'

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
//==============================================================
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
        // maxWidth: 180
    },
    flexBox: {
        padding: 0,
        // backgroundColor: '#2a4865',
        // borderRadius: '8px'
    },
    flexItem: {
        padding: 0, //'0 0.2rem'
    },
    option: {
        fontSize: '0.875rem',
    },
    btn: {
        padding: '0.5rem',
        margin: '0 0.3rem',
        borderRadius: '8px',
        // minWidth: 3, // minHeight: 0, // lineHeight: 0,
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
        width: 250,
        marginLeft: '0.5rem',
    },
    itemPIC: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    itemTextPrimary: {
        fontSize: '0.875rem',
    },
    paddingTop: {
        paddingTop: '0.3rem',
    },
}))

const MuiAccordion = withStyles({
    root: {
        backgroundColor: 'rgb(238, 238, 238)',
        // backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '8px',
        marginBottom: '0.5rem',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
            borderRadius: '8px',
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
            borderRadius: '8px',
        },
    },
    expanded: {},
})(Accordion)

const MuiAccordionSummary = withStyles({
    root: {
        height: 41.5,
        minHeight: 35,
        maxWidth: 120,
        backgroundColor: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
        // borderBottom: '1px solid rgba(0, 0, 0, .125)',
        // boxShadow: '1px 1px 2px gray',
        boxShadow: '0 4px 6px -6px #000', // 0px 1px 1px gray
        borderRadius: '8px',
        paddingButtom: 0,
        '&$expanded': {
            minHeight: 35,
            borderRadius: '8px',
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(AccordionSummary)

const MuiAccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '0.5rem 0',
        padding: '0 0 1rem 1.5rem', // top (right-left) bottom
        borderRadius: '8px',
    },
}))(AccordionDetails)

function Filters(props) {
    //   const style = useStyles();
    const classes = useStyles()
    const { operations, filters } = Consts
    const { selectedRows, setSelectedRows, refreshAPI } = props
    // const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])
    const [notify, setNotify] = React.useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const { user } = useAuth()
    const {
        schYears,
        dists,
        schTypes,
        schEduLvls,
        // schScales,
        salesPurps,
        schStatus,
    } = useApp()

    //Use states which have been declared in the TaskContext
    const {
        params,
        dispatchParams,
        PICs,
        schoolYear,
        district,
        schoolType,
        schoolLevel,
        // schoolScale,
        PIC,
        purpose,
        schoolStatus,
        isAssigned,
        assignedStatuses,
        taskStatus,
        taskStatuses,
        setFilter,
        getListPICs,
    } = useTask()

    const bakSchYears = schYears ? schYears : Milk.getMilk(milkNames.schYears)
    const bakDists = dists ? dists : Milk.getMilk(milkNames.dists)
    const bakSchTypes = schTypes ? schTypes : Milk.getMilk(milkNames.types)
    const bakSchEduLvls = schEduLvls
        ? schEduLvls
        : Milk.getMilk(milkNames.eduLvls)
    // const bakSchScales = schScales ? schScales : Milk.getMilk(milkNames.scales)
    const bakSalesPurps = salesPurps
        ? salesPurps
        : Milk.getMilk(milkNames.salesPurps)
    const purpsByStatus = getPurpsByStatus(schoolStatus, bakSalesPurps)

    const typingTimeoutRef = useRef({})

    // const { listFilters } = params  //, searchKey, sorting, paging

    const [openNotifyDialog, setOpenNotifyDialog] = useState(false)
    const [openAssignDialog, setOpenAssignDialog] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    //================Handle useState() of filters================
    const handleSchoolYearChange = (event) => {
        const selectedSchoolYear = event.target.value
        setFilter(SCHOOL_YEAR_FILTER, selectedSchoolYear)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_YEAR,
            payload: {
                filterType: SCHOOL_YEAR_FILTER,
                filterValue: selectedSchoolYear ? selectedSchoolYear : '',
            },
        })
    }

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value
        setFilter(DISTRICT_FILTER, selectedDistrict)
        dispatchParams({
            type: ReducerActions.FILTER_DISTRICT,
            payload: {
                filterType: DISTRICT_FILTER,
                filterValue: selectedDistrict ? selectedDistrict : '',
            },
        })
    }

    const handleSchoolTypeChange = (event) => {
        const selectedSchoolType = event.target.value
        setFilter(TYPE_FILTER, selectedSchoolType)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_TYPE,
            payload: {
                filterType: TYPE_FILTER,
                filterValue: selectedSchoolType ? selectedSchoolType : '',
            },
        })
    }

    const handleSchoolLevelChange = (event) => {
        const selectedSchoolLevel = event.target.value
        setFilter(LEVEL_FILTER, selectedSchoolLevel)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_LEVEL,
            payload: {
                filterType: LEVEL_FILTER,
                filterValue: selectedSchoolLevel ? selectedSchoolLevel : '',
            },
        })
    }

    // const handleSchoolScaleChange = (event) => {
    //     const selectedSchoolScale = event.target.value
    //     setFilter(SCALE_FILTER, selectedSchoolScale)
    //     dispatchParams({
    //         type: ReducerActions.FILTER_SCHOOL_SCALE,
    //         payload: {
    //             filterType: SCALE_FILTER,
    //             filterValue: selectedSchoolScale ? selectedSchoolScale : '',
    //         },
    //     })
    // }

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
        setFilter(PIC_FILTER, newPIC)
        dispatchParams({
            type: ReducerActions.FILTER_PIC,
            payload: {
                filterType: PIC_FILTER,
                filterValue: newPIC ? newPIC : null,
            },
        })
    }

    const handlePurposeChange = (event) => {
        const selectedPurpose = event.target.value
        setFilter(PURPOSE_FILTER, selectedPurpose)
        dispatchParams({
            type: ReducerActions.FILTER_PURPOSE,
            payload: {
                filterType: PURPOSE_FILTER,
                filterValue: selectedPurpose ? selectedPurpose : '',
            },
        })
    }

    const handleStatusChange = (event) => {
        const selectedStatus = event.target.value
        setFilter(STATUS_FILTER, selectedStatus)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_STATUS,
            payload: {
                filterType: STATUS_FILTER,
                filterValue: selectedStatus ? selectedStatus : '',
            },
        })
    }

    const handleIsAssignedChange = (event) => {
        const selectedIsAssigned = event.target.value
        setFilter(ASSIGNED_FILTER, selectedIsAssigned)
        dispatchParams({
            type: ReducerActions.FILTER_ASSIGNED,
            payload: {
                filterType: ASSIGNED_FILTER,
                filterValue: selectedIsAssigned,
            },
        })
    }

    const handleTaskStatusChange = (event) => {
        const selectedTaskStatus = event.target.value
        setFilter(TASK_STATUS_FILTER, selectedTaskStatus)
        dispatchParams({
            type: ReducerActions.FILTER_TASK_STATUS,
            payload: {
                filterType: TASK_STATUS_FILTER,
                filterValue: selectedTaskStatus ? selectedTaskStatus : '',
            },
        })
    }

    // const handleDateRangeChange = (selectedDate) => {
    //     const fromDate = selectedDate[0]
    //         ? moment(selectedDate[0]).format('YYYY-MM-DD')
    //         : null
    //     const toDate = selectedDate[1]
    //         ? moment(selectedDate[1]).format('YYYY-MM-DD')
    //         : null

    //     setFilter(DATE_RANGE_FILTER, [fromDate, toDate])
    //     dispatchParams({
    //         type: ReducerActions.FILTER_DATE_RANGE,
    //         payload: {
    //             filterType: DATE_RANGE_FILTER,
    //             filterValue: [fromDate, toDate]
    //                 ? [fromDate, toDate]
    //                 : [null, null],
    //         },
    //     })
    // }

    //===================================For Chips===================================
    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                case SCHOOL_YEAR_FILTER:
                    setFilter(SCHOOL_YEAR_FILTER, '')
                    break
                case DISTRICT_FILTER:
                    setFilter(DISTRICT_FILTER, '')
                    break
                case TYPE_FILTER:
                    setFilter(TYPE_FILTER, '')
                    break
                case LEVEL_FILTER:
                    setFilter(LEVEL_FILTER, '')
                    break
                // case SCALE_FILTER:
                //     setFilter(SCALE_FILTER, '')
                //     break
                case PIC_FILTER:
                    setFilter(PIC_FILTER, null)
                    break
                case PURPOSE_FILTER:
                    setFilter(PURPOSE_FILTER, '')
                    break
                case STATUS_FILTER:
                    setFilter(STATUS_FILTER, '')
                    break
                case ASSIGNED_FILTER:
                    setFilter(ASSIGNED_FILTER, null)
                    break
                case TASK_STATUS_FILTER:
                    setFilter(TASK_STATUS_FILTER, '')
                    break
                // case DATE_RANGE_FILTER:
                //     setFilter(DATE_RANGE_FILTER, [null, null])
                //     break
                default:
                    break
            }
        })
    }

    const generateChipsArray = (listFilters) => {
        const listChips = []
        // let newListFilters = { ...listFilters }

        for (const chip in listFilters) {     // newListFilters
            // if (chip === DATE_RANGE_FILTER) {
            //     const fromDate = moment(
            //         newListFilters[chip].filterValue[0]
            //     ).format('MMM D, YYYY')
            //     const toDate = moment(
            //         newListFilters[chip].filterValue[1]
            //     ).format('MMM D, YYYY')
            //     if (fromDate !== 'Invalid date' && toDate !== 'Invalid date') {
            //         newListFilters = {
            //             ...newListFilters,
            //             dateRange: {
            //                 filterType: DATE_RANGE_FILTER,
            //                 filterValue: `${fromDate} ➜ ${toDate}`,
            //             },
            //         }
            //     }
            // }
            listChips.push(listFilters[chip])  // newListFilters[chip]
        }
        return listChips
    }

    //===============================================================================

    //=================Handle action enter / submit of SearchFields==================
    const handleSearch = (keyword) => {
        dispatchParams({
            type: ReducerActions.ENTER_SEARCH_KEYWORD,
            payload: keyword,
        })
    }

    const handleOpenCreateDialog = () => {
        // console.log('create dialog')
        setOpenCreateDialog(true)
    }

    const handleOpenAssignDialog = () => {
        if (selectedRows.length > 0) {
            // console.log('assign dialog')
            setOpenAssignDialog(true)
        } else {
            setOpenAssignDialog(false)

            // console.log('noti dialog: ')
            setOpenNotifyDialog(true)
        }
    }

    const renderCreateTaskDialog = () => {
        if (openCreateDialog) {
            return (
                <TaskFormProvider>
                    <CreateTasks
                        open={openCreateDialog}
                        onClose={() => setOpenCreateDialog(false)}
                        refreshTaskPage={refreshAPI}
                    />
                </TaskFormProvider>
            )
        } else return null
    }

    const renderAssignDialog = () => {
        // console.log('selectedRows = ', selectedRows);
        if (selectedRows.length > 0) {
            // Checked task
            return (
                <Assign
                    open={openAssignDialog}
                    onClose={() => setOpenAssignDialog(false)}
                    rows={selectedRows}
                    setRows={setSelectedRows}
                    refreshAPI={refreshAPI}
                    setNotify={setNotify}
                />
            )
        } else {
            // Have not checked task
            return (
                <NotifyAssign
                    open={openNotifyDialog}
                    onClose={() => setOpenNotifyDialog(false)}
                />
            )
        }
    }

    return (
        <div className={styles.wrapper}>
            <MuiAccordion>
                <Box
                    display="flex"
                    flexWrap="nowrap"
                    className={classes.flexBox}
                >
                    <Box className={classes.flexItem}>
                        <MuiAccordionSummary expandIcon={<MdExpandMore />}>
                            <MdFilterList className={styles.iconFilter} />{' '}
                            &nbsp;
                            <Typography>{operations.filter}</Typography>{' '}
                            {/* { renderCount }  */}
                        </MuiAccordionSummary>
                    </Box>
                    <Box flexGrow={1} className={classes.flexItem}>
                        <Chips
                            // chips={(params.listFilters !== undefined && params.listFilters !== null) ? params.listFilters : {}}
                            chips={generateChipsArray(params.listFilters)}
                            dispatch={dispatchParams}
                            handleChipsRemoved={handleChipsRemoved}
                        />
                    </Box>
                    <Box className={classes.flexItem}>
                        <SearchFields
                            placeholder={operations.search.placeholder}
                            onChange={handleSearch}
                        />
                    </Box>
                    {user.roles[0] !== roleNames.salesman && (
                        <>
                            <Box className={classes.flexItem}>
                                <Tooltip title={operations.create}>
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleOpenCreateDialog}
                                    >
                                        <MdAdd fontSize="large" />
                                    </Button>
                                </Tooltip>
                                {renderCreateTaskDialog()}
                            </Box>
                            <Box className={classes.flexItem}>
                                <Tooltip title={operations.assign}>
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleOpenAssignDialog}
                                    >
                                        <MdPersonAdd fontSize="large" />
                                    </Button>
                                </Tooltip>
                                {renderAssignDialog()}
                            </Box>
                        </>
                    )}
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4} lg={3}
                        // md={user.roles[0] === roleNames.salesman ? 4: 3}
                        // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.status.title}</InputLabel>
                                <Select
                                    value={schoolStatus || ''}
                                    onChange={handleStatusChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.status.options.all}
                                    </MenuItem>
                                    {schStatus?.map((status) => (
                                        <MenuItem
                                            key={status}
                                            value={status}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}
                        // md={user.roles[0] === roleNames.salesman ? 4: 3}
                        // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.purpose.title}</InputLabel>
                                <Select
                                    value={purpose || ''}
                                    onChange={handlePurposeChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.purpose.options.all}
                                    </MenuItem>
                                    {purpsByStatus?.map((purp) => (
                                        <MenuItem
                                            key={purp}
                                            value={purp}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {purp}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}
                        // md={user.roles[0] === roleNames.salesman ? 4: 3}
                        // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.district.title}
                                </InputLabel>
                                <Select
                                    value={district || ''}
                                    onChange={handleDistrictChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.district.options.all}
                                    </MenuItem>
                                    {bakDists?.map((dist) => (
                                        <MenuItem
                                            key={dist}
                                            value={dist}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {dist}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}
                        // md={user.roles[0] === roleNames.salesman ? 4: 3}
                        // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolYear.title}
                                </InputLabel>
                                <Select
                                    value={schoolYear || ''}
                                    onChange={handleSchoolYearChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.schoolYear.options.all}
                                    </MenuItem>
                                    {bakSchYears?.map((year) => (
                                        <MenuItem
                                            key={year}
                                            value={year}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}
                        // md={user.roles[0] === roleNames.salesman ? 4: 3}
                        // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolType.title}
                                </InputLabel>
                                <Select
                                    value={schoolType || ''}
                                    onChange={handleSchoolTypeChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.schoolType.options.all}
                                    </MenuItem>
                                    {bakSchTypes?.map((type) => (
                                        <MenuItem
                                            key={type}
                                            value={type}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}
                        // md={user.roles[0] === roleNames.salesman ? 4: 3}
                        // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolLevel.title}
                                </InputLabel>
                                <Select
                                    value={schoolLevel || ''}
                                    onChange={handleSchoolLevelChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.schoolLevel.options.all}
                                    </MenuItem>
                                    {bakSchEduLvls?.map((level) => (
                                        <MenuItem
                                            key={level}
                                            value={level}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={12} sm={6} md={4} lg={3}
                            // md={user.roles[0] === roleNames.salesman ? 4: 3}
                            // lg={user.roles[0] === roleNames.salesman ? 4: 3}
                            className={classes.paddingTop}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolScale.title}
                                </InputLabel>
                                <Select
                                    value={schoolScale || ''}
                                    onChange={handleSchoolScaleChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.schoolScale.options.all}
                                    </MenuItem>
                                    {bakSchScales?.map((scale) => (
                                        <MenuItem
                                            key={scale}
                                            value={scale}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {scale}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel>
                                    {filters.taskStatus.title}
                                </InputLabel>
                                <Select
                                    value={taskStatus || ''}
                                    onChange={handleTaskStatusChange}
                                    MenuProps={MenuProps}
                                >
                                    {taskStatuses?.map(
                                        (status) => (
                                            <MenuItem
                                                key={status}
                                                value={status}
                                                className={
                                                    classes.option
                                                }
                                                classes={{
                                                    root:
                                                        classes.menuItemRoot,
                                                    selected:
                                                        classes.menuItemSelected,
                                                }}
                                            >
                                                {status}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        {user.roles[0] !== roleNames.salesman && (
                            <>
                                <Grid item xs={12} sm={6} md={4} lg={3}
                                    className={classes.paddingTop}
                                >
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel>
                                            {filters.isAssigned.title}
                                        </InputLabel>
                                        <Select
                                            value={
                                                isAssigned === null
                                                    ? '' : isAssigned
                                            }
                                            onChange={handleIsAssignedChange}
                                            MenuProps={MenuProps}
                                        >
                                            {assignedStatuses?.map(
                                                (isAssigned) => (
                                                    <MenuItem
                                                        key={isAssigned}
                                                        value={isAssigned}
                                                        className={
                                                            classes.option
                                                        }
                                                        classes={{
                                                            root:
                                                                classes.menuItemRoot,
                                                            selected:
                                                                classes.menuItemSelected,
                                                        }}
                                                    >
                                                        {isAssigned === null
                                                            ? `${filters.isAssigned.options.all}`
                                                            : isAssigned
                                                                ? `${filters.isAssigned.options.assigned}`
                                                                : `${filters.isAssigned.options.notAssigned}`}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
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
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label={filters.pic.title}
                                                    margin="normal"
                                                    placeholder={
                                                        filters.pic.placeholder
                                                    }
                                                    ref={params.InputProps.ref}
                                                    onChange={onSearchPICChange}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        startAdornment: (
                                                            <>
                                                                <InputAdornment position="start">
                                                                    <MdAccountCircle />
                                                                </InputAdornment>
                                                                {
                                                                    params
                                                                        .InputProps
                                                                        .startAdornment
                                                                }
                                                            </>
                                                        ),
                                                    }}
                                                />
                                            )
                                        }}
                                        renderOption={(option) => {
                                            return (
                                                <div
                                                    className={classes.itemPIC}
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
                                        className={classes.autoComplete}
                                        onChange={(event, newPIC) =>
                                            handlePICChange(event, newPIC)
                                        }
                                    />
                                </Grid>
                            </>
                        )}
                        {/* <Grid item xs={12} sm={6} md={5} lg={4}>
                            <DateRangePickers
                                dateRange={[null, null]}
                                handleDateRangeChange={handleDateRangeChange}
                                startLabel="Assign Date"
                                endLabel="Deadline"
                                isFilter={true}
                            />
                        </Grid> */}
                    </Grid>
                </MuiAccordionDetails>
            </MuiAccordion>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default React.memo(Filters)

// Filters.propTypes = {
//     refreshAPI: PropTypes.func
// }

// Filters.defaultProps = {
//     refreshAPI: null
// }

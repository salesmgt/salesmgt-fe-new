import React, { useRef, useState } from 'react'
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
    Button,
    Menu,
    TextField,
    InputAdornment,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core'
import { MdAccountCircle, MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import Chips from './Chips/Chips'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useService } from '../../hooks/ServiceContext'
import {
    SERVICE_TYPE_FILTER,
    SERVICE_STATUS_FILTER,
    SCHOOL_YEAR_FILTER,
    PIC_FILTER,
    EXPIRED_FILTER,
    DATE_RANGE_FILTER
} from '../../../../constants/Filters'
import { useApp } from '../../../../hooks/AppContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { Consts } from '../../ServicesConfig'
import moment from 'moment'
// import DateRangePickers from '../DateRangePickers/DateRangePickers';
// import { Autocomplete } from '@material-ui/lab'
import styles from './Filters.module.scss'

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
    },
    flexBox: {
        padding: 0,
    },
    flexItem: {
        padding: 0,
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
        width: 260,
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
}))

const MuiAccordion = withStyles({
    root: {
        backgroundColor: 'rgb(238, 238, 238)',
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
        padding: '0.3rem 0 1rem 2rem',
        borderRadius: '8px',
    },
}))(AccordionDetails)

function Filters() {
    const classes = useStyles()
    const { operations, filters } = Consts

    const { schYears } = useApp()
    const bakSchoolYears = schYears ? schYears : Milk.getMilk(milkNames.schYears)

    //Use states which have been declared in the ServiceContext
    const {
        params,
        dispatchParams,
        serviceStatus,
        serviceType,
        schoolYear,
        serviceTypes,
        isExpired,
        expiredStatuses,
        serviceStatuses,
        setFilter,
        PIC,
        PICs,
        getListPICs,
    } = useService()

    const [anchorEl, setAnchorEl] = useState(null)
    const typingTimeoutRef = useRef({})

    //================Handle useState() of filters================
    const handleServiceStatusChange = (event) => {
        const selectedServiceStatus = event.target.value
        setFilter(SERVICE_STATUS_FILTER, selectedServiceStatus)
        dispatchParams({
            type: ReducerActions.FILTER_SERVICE_STATUS,
            payload: {
                filterType: SERVICE_STATUS_FILTER,
                filterValue: selectedServiceStatus,
            },
        })
    }

    const handleServiceTypeChange = (event) => {
        const selectedServiceType = event.target.value
        setFilter(SERVICE_TYPE_FILTER, selectedServiceType)
        dispatchParams({
            type: ReducerActions.FILTER_SERVICE_TYPE,
            payload: {
                filterType: SERVICE_TYPE_FILTER,
                filterValue: selectedServiceType,
            },
        })
    }

    const handleSchoolYearChange = (event) => {
        const selectedSchoolYear = event.target.value
        setFilter(SCHOOL_YEAR_FILTER, selectedSchoolYear)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_YEAR,
            payload: {
                filterType: SCHOOL_YEAR_FILTER,
                filterValue: selectedSchoolYear,
            },
        })
    }

    const handleIsExpiredChange = (event) => {
        const selectedExpiredStatus = event.target.value
        setFilter(EXPIRED_FILTER, selectedExpiredStatus)
        dispatchParams({
            type: ReducerActions.FILTER_EXPIRED,
            payload: {
                filterType: EXPIRED_FILTER,
                filterValue: selectedExpiredStatus,
            },
        })
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
        setFilter(PIC_FILTER, newPIC)
        dispatchParams({
            type: ReducerActions.FILTER_PIC,
            payload: {
                filterType: PIC_FILTER,
                filterValue: newPIC ? newPIC : null,
            },
        })
    }

    // Duration
    const handleDateRangeChange = (selectedDate) => {
        const fromDate = selectedDate[0]
            ? moment(selectedDate[0]).format('YYYY-MM-DD')
            : null
        const toDate = selectedDate[1]
            ? moment(selectedDate[1]).format('YYYY-MM-DD')
            : null

        setFilter(DATE_RANGE_FILTER, [fromDate, toDate])
        dispatchParams({
            type: ReducerActions.FILTER_DATE_RANGE,
            payload: {
                filterType: DATE_RANGE_FILTER,
                filterValue: [fromDate, toDate]
                    ? [fromDate, toDate]
                    : [null, null],
            },
        })
    }

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                case SERVICE_TYPE_FILTER:
                    setFilter(SERVICE_TYPE_FILTER, '')
                    break
                case SERVICE_STATUS_FILTER:
                    setFilter(SERVICE_STATUS_FILTER, '')
                    break
                case SCHOOL_YEAR_FILTER:
                    setFilter(SCHOOL_YEAR_FILTER, '')
                    break
                case EXPIRED_FILTER:
                    setFilter(EXPIRED_FILTER, null)
                    break
                case DATE_RANGE_FILTER:
                    setFilter(DATE_RANGE_FILTER, [null, null])
                    break
                default:
                    break
            }
        })
    }

    const generateChipsArray = (listFilters) => {
        const listChips = []
        let newListFilters = { ...listFilters }

        for (const chip in newListFilters) {
            if (chip === DATE_RANGE_FILTER) {
                const fromDate = moment(
                    newListFilters[chip].filterValue[0]
                ).format('MMM D, YYYY')
                const toDate = moment(
                    newListFilters[chip].filterValue[1]
                ).format('MMM D, YYYY')
                if (fromDate !== 'Invalid date' && toDate !== 'Invalid date') {
                    newListFilters = {
                        ...newListFilters,
                        dateRange: {
                            filterType: DATE_RANGE_FILTER,
                            filterValue: `${fromDate} ➜ ${toDate}`,
                        },
                    }
                }
            }
            listChips.push(newListFilters[chip])
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
                            <Typography>{operations.filter}</Typography>
                        </MuiAccordionSummary>
                    </Box>
                    <Box flexGrow={1} className={classes.flexItem}>
                        <Chips
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
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.serviceType.title}</InputLabel>
                                <Select
                                    value={serviceType || ''}
                                    onChange={handleServiceTypeChange}
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
                                        All
                                    </MenuItem>
                                    {serviceTypes?.map((type) => (
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

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.serviceStatus.title}</InputLabel>
                                <Select
                                    value={serviceStatus || ''}
                                    onChange={handleServiceStatusChange}
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
                                        All
                                    </MenuItem>
                                    {serviceStatuses?.map((status) => (
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

                        <Grid item xs={12} sm={6} md={4} lg={3}>
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
                                        All
                                    </MenuItem>
                                    {bakSchoolYears?.map((year) => (
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

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.expiredStatus.title}</InputLabel>
                                <Select
                                    value={isExpired || ''}
                                    onChange={handleIsExpiredChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value={null}
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        All
                                    </MenuItem>
                                    {expiredStatuses?.map((expiredStatus) => (
                                        <MenuItem
                                            key={expiredStatus}
                                            value={expiredStatus}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {expiredStatus}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Filters

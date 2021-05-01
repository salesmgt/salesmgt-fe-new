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
    InputAdornment,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button,
} from '@material-ui/core'
import {
    MdAccountCircle,
    MdAdd,
    MdExpandMore,
    MdFilterList,
} from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useReport } from '../../hooks/ReportContext'
import Chips from './Chips/Chips'
import { Autocomplete } from '@material-ui/lab'
import DateRangePickers from './DateRangePickers/DateRangePickers'
import moment from 'moment'
import CreateReports from '../../dialogs/CreateReports/CreateReports'
import {
    PIC_FILTER,
    DISTRICT_FILTER,
    SCHOOL_YEAR_FILTER,
    PURPOSE_FILTER,
    // STATUS_FILTER,
    DATE_RANGE_FILTER,
} from '../../../../constants/Filters'
import { useApp } from '../../../../hooks/AppContext'
import { useAuth } from '../../../../hooks/AuthContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { Consts } from '../../ReportsConfig'
import { roleNames } from '../../../../constants/Generals'
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
    lastOption: {
        fontSize: '0.875rem',
        borderBottom: '0.5px solid #e0e0e0',
    },
    autoComplete: {
        width: 260,
        marginLeft: '0.5rem',
    },
    btn: {
        padding: '0.5rem',
        margin: '0 0.3rem',
        borderRadius: '8px',
        // minWidth: 3, // minHeight: 0, // lineHeight: 0,
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

const MuiAccordionDetails = withStyles(() => ({
    root: {
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '0.2rem 0 0.5rem 0',
        padding: '0 0 0.3rem 1.5rem',
        borderRadius: '8px',
    },
}))(AccordionDetails)

function Filters() {
    // console.log('filter reports nè')

    const classes = useStyles()
    const { operations, filters } = Consts

    const { user } = useAuth()
    const { dists, schYears, salesPurps } = useApp()
    const bakDists = dists ? dists : Milk.getMilk(milkNames.dists)
    const bakSchYears = schYears ? schYears : Milk.getMilk(milkNames.schYears)
    const bakSalesPurps = salesPurps
        ? salesPurps
        : Milk.getMilk(milkNames.salesPurps)

    //Use states which have been declared in the TargetSchoolContext
    const {
        params,
        dispatchParams,
        PICs,
        // districts,
        // schoolYears,
        // schoolStatuses,
        PIC,
        district,
        schoolYear,
        purpose,
        // schoolStatus,
        // setPIC,
        // setDistrict,
        // setSchoolYear,
        // setPurpose,
        // setSchoolStatus,
        // setDateRange,
        setFilter,
        getListPICs,
    } = useReport()

    const typingTimeoutRef = useRef({})

    const [openCreateDialog, setOpenCreateDialog] = useState(false)

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

    //================Handle useState() of filters================
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

    // const handleSchoolStatusChange = (event) => {
    //     const selectedSchoolStatus = event.target.value

    //     // setSchoolStatus(selectedSchoolStatus)
    //     // if (selectedSchoolStatus) {
    //     //     dispatchParams({
    //     //         type: ReducerActions.FILTER_SCHOOL_STATUS,
    //     //         payload: {
    //     //             filterType: 'status',
    //     //             filterValue: selectedSchoolStatus,
    //     //         },
    //     //     })
    //     // } else {
    //     //     dispatchParams({
    //     //         type: ReducerActions.FILTER_SCHOOL_STATUS,
    //     //         payload: { filterType: 'status', filterValue: '' },
    //     //     })
    //     // }
    //     setFilter(STATUS_FILTER, selectedSchoolStatus)
    //     dispatchParams({
    //         type: ReducerActions.FILTER_SCHOOL_STATUS,
    //         payload: {
    //             filterType: STATUS_FILTER,
    //             filterValue: selectedSchoolStatus ? selectedSchoolStatus : '',
    //         },
    //     })
    // }

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
    // const handleChipsRemoved = (removedFilters) => {
    //     removedFilters.forEach((removedFilter) => {
    //         switch (removedFilter) {
    //             case 'PIC':
    //                 setPIC(null)
    //                 break
    //             case 'district':
    //                 setDistrict('All')
    //                 break
    //             case 'schoolYear':
    //                 setSchoolYear('All')
    //                 break
    //             case 'status':
    //                 setSchoolStatus('All')
    //                 break
    //             case 'purpose':
    //                 setPurpose('All')
    //                 break
    //             case 'dateRange':
    //                 setDateRange([null, null])
    //                 break
    //             default:
    //                 break
    //         }
    //     })
    // }

    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                case PIC_FILTER:
                    setFilter(PIC_FILTER, null)
                    break
                case DISTRICT_FILTER:
                    setFilter(DISTRICT_FILTER, '')
                    break
                case SCHOOL_YEAR_FILTER:
                    setFilter(SCHOOL_YEAR_FILTER, '')
                    break
                case PURPOSE_FILTER:
                    setFilter(PURPOSE_FILTER, '')
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
        // console.log('Reports - listChips: ', listChips);
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
                    {user?.roles[0] === roleNames.salesman && (
                        <Box className={classes.flexItem}>
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="secondary"
                                onClick={() => setOpenCreateDialog(true)}
                            >
                                <MdAdd fontSize="large" />
                                {/* &nbsp;{operations.create} */}
                            </Button>
                            <CreateReports
                                open={openCreateDialog}
                                onClose={() => setOpenCreateDialog(false)}
                            />
                        </Box>
                    )}
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            sm={5}
                            md={3}
                            lg={3}
                            className={classes.paddingTop}
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
                                    {bakSalesPurps?.map((purp) => (
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

                        <Grid
                            item
                            xs={12}
                            sm={5}
                            md={3}
                            lg={3}
                            className={classes.paddingTop}
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

                        <Grid item xs={12} sm={7} md={5} lg={4}>
                            <DateRangePickers
                                handleDateRangeChange={handleDateRangeChange}
                            />
                            {/* <FormControl className={classes.formControl}>
                            </FormControl> */}
                        </Grid>

                        <Grid item xs={12} sm={4} md={3} lg={3}>
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

                        <Grid item xs={12} sm={6} md={5} lg={4}>
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
                                        label={filters.pic.title}
                                        margin="normal"
                                        placeholder={filters.pic.placeholder}
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
                                            className={classes.itemPIC}
                                            key={option.username}
                                        >
                                            <ListItemAvatar>
                                                <Avatar src={option.avatar} />
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

                        {/* <Grid item xs={6} sm={6} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Statuses</InputLabel>
                                <Select
                                    value={schoolStatus || ''}
                                    onChange={handleSchoolStatusChange}
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
                        </Grid> */}
                    </Grid>
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Filters

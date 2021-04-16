import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Select,
    Grid, Box,
    InputLabel,
    MenuItem,
    FormControl,
    TextField,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    // ListSubheader,
    Button,
} from '@material-ui/core'
import { MdAccountCircle, MdAdd, MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../hooks/reducer-action-type'
import { useReport } from '../../hooks/ReportContext'
import Chips from './Chips/Chips'
import { Autocomplete } from '@material-ui/lab'
import DateRangePickers from './DateRangePickers/DateRangePickers'
import moment from 'moment'
import CreateReports from '../../dialogs/CreateReports'
import styles from './Filters.module.scss'

//===============Set max-height for dropdown list===============
const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        }
    }
};
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
        padding: 0
    },
    option: {
        fontSize: '0.875rem'
    },
    lastOption: {
        fontSize: '0.875rem',
        borderBottom: '0.5px solid #e0e0e0'
    },
    autoComplete: {
        width: 260,
        marginLeft: '0.5rem'
    },
    btn: {
        padding: '0.5rem',
        margin: '0 0.3rem',
        borderRadius: '8px'
        // minWidth: 3, // minHeight: 0, // lineHeight: 0,
    },
    itemPIC: {
        padding: 0,
        margin: 0
    },
    itemTextPrimary: {
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
}));

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
})(Accordion);

const MuiAccordionSummary = withStyles({
    root: {
        height: 41.5,
        minHeight: 35,
        maxWidth: 120,
        backgroundColor: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
        // borderBottom: '1px solid rgba(0, 0, 0, .125)',
        // boxShadow: '1px 1px 2px gray',
        boxShadow: '0 4px 6px -6px #000',  // 0px 1px 1px gray
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
})(AccordionSummary);

const MuiAccordionDetails = withStyles(() => ({
    root: {
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '0.2rem 0 0.5rem 0',
        padding: '0.3rem 0 0.3rem 1.5rem',
        borderRadius: '8px',
    },
}))(AccordionDetails);

function Filters() {
    const classes = useStyles();

    //Use states which have been declared in the TargetSchoolContext
    const {
        params, dispatchParams,
        PICs, districts, schoolYears, schoolStatuses,
        PIC, district, schoolYear, purpose, schoolStatus,
        setPIC, setDistrict, setSchoolYear,
        setPurpose, setSchoolStatus, setDateRange
    } = useReport()

    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    //================Handle useState() of filters================
    const handlePICChange = (event, newPIC) => {
        setPIC(newPIC);

        if (newPIC) {   //  !== null
            dispatchParams({
                type: ReducerActions.FILTER_PIC,
                payload: { filterType: 'PIC', filterValue: newPIC }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_PIC,
                payload: { filterType: 'PIC', filterValue: null }
            })
        }
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        setDistrict(selectedDistrict);

        if (selectedDistrict) { // !== ''
            dispatchParams({
                type: ReducerActions.FILTER_DISTRICT,
                payload: { filterType: 'district', filterValue: selectedDistrict }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_DISTRICT,
                payload: { filterType: 'district', filterValue: '' }
            })
        }
    };

    const handleSchoolYearChange = (event) => {
        const selectedSchoolYear = event.target.value;
        setSchoolYear(selectedSchoolYear);

        if (selectedSchoolYear) {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_YEAR,
                payload: { filterType: 'schoolYear', filterValue: selectedSchoolYear }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_YEAR,
                payload: { filterType: 'schoolYear', filterValue: '' }
            })
        }
    };

    const handleSchoolStatusChange = (event) => {
        const selectedSchoolStatus = event.target.value;
        setSchoolStatus(selectedSchoolStatus);

        if (selectedSchoolStatus) {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_STATUS,
                payload: { filterType: 'status', filterValue: selectedSchoolStatus }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_STATUS,
                payload: { filterType: 'status', filterValue: '' }
            })
        }
    };

    const handlePurposeChange = (event) => {
        const selectedPurpose = event.target.value;
        setPurpose(selectedPurpose);

        if (selectedPurpose) {  // !== '' && selectedPurpose !== undefined
            dispatchParams({
                type: ReducerActions.FILTER_PURPOSE,
                payload: { filterType: 'purpose', filterValue: selectedPurpose }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_PURPOSE,
                payload: { filterType: 'purpose', filterValue: '' }
            })
        }
    };

    const handleDateRangeChange = (selectedDate) => {
        // Tiền xử lý format của date trước khi lưu vào context
        if (selectedDate) {  // !== '' && selectedDate !== undefined
            const fromDate = moment(selectedDate[0]).format('YYYY-MM-DD');
            const toDate = moment(selectedDate[1]).format('YYYY-MM-DD');

            dispatchParams({
                type: ReducerActions.FILTER_DATE_RANGE,
                payload: { filterType: 'dateRange', filterValue: [fromDate, toDate] }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_DATE_RANGE,
                payload: { filterType: 'dateRange', filterValue: [null, null] }
            })
        }
    };

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach(removedFilter => {
            switch (removedFilter) {
                case 'PIC':
                    setPIC(null);
                    break;
                case 'district':
                    setDistrict("All");
                    break;
                case 'schoolYear':
                    setSchoolYear("All");
                    break;
                case 'status':
                    setSchoolStatus("All");
                    break;
                case 'purpose':
                    setPurpose("All");
                    break;
                case 'dateRange':
                    setDateRange([null, null]);
                    break;
                default:
                    break;
            }
        });
    };

    const generateChipsArray = (listFilters) => {
        const listChips = [];
        let newListFilters = { ...listFilters }

        for (const chip in newListFilters) {
            if (chip === 'dateRange') {
                const fromDate = moment(newListFilters[chip].filterValue[0]).format('MMM D, YYYY')
                const toDate = moment(newListFilters[chip].filterValue[1]).format('MMM D, YYYY')

                if (fromDate !== 'Invalid date' && toDate !== 'Invalid date') {
                    newListFilters = {
                        ...newListFilters,
                        dateRange: {
                            filterType: 'dateRange',
                            filterValue: `${fromDate} ➜ ${toDate}`
                        }
                    }
                }
            }
            listChips.push(newListFilters[chip]);
        }
        return listChips;
    }
    //===============================================================================

    //=================Handle action enter / submit of SearchFields==================
    const handleSearch = (keyword) => {
        dispatchParams({
            type: ReducerActions.ENTER_SEARCH_KEYWORD,
            payload: keyword
        })
    }

    return (
        <div className={styles.wrapper}>
            <MuiAccordion>
                <Box display="flex" flexWrap="nowrap" className={classes.flexBox}>
                    <Box className={classes.flexItem}>
                        <MuiAccordionSummary expandIcon={<MdExpandMore />}>
                            <MdFilterList className={styles.iconFilter} /> &nbsp;
                        <Typography>Filters</Typography>
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
                        <SearchFields placeholder="Search..." onChange={handleSearch} />
                    </Box>
                    <Box className={classes.flexItem}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenCreateDialog(true)}
                        >
                            <MdAdd fontSize="large" />&nbsp;Create
                        </Button>
                        <CreateReports
                            open={openCreateDialog}
                            onClose={() => setOpenCreateDialog(false)}
                        />
                    </Box>
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={5} lg={4}>
                            <Autocomplete
                                autoComplete
                                autoSelect
                                autoHighlight
                                clearOnEscape
                                options={PICs}
                                getOptionLabel={(pic) => pic.fullName}
                                value={PIC}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="PICs"
                                        margin="normal"
                                        placeholder="PIC's name"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start">
                                                        <MdAccountCircle />
                                                    </InputAdornment>
                                                    {params.InputProps.startAdornment}
                                                </>
                                            )
                                        }}
                                    />
                                }
                                renderOption={(option) => {
                                    return (
                                        <ListItem className={classes.itemPIC}>
                                            <ListItemAvatar>
                                                <Avatar src={option.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={option.fullName}
                                                classes={{ primary: classes.itemTextPrimary }}
                                            />
                                        </ListItem>
                                    );
                                }}
                                className={classes.autoComplete}
                                onChange={(event, newPIC) => handlePICChange(event, newPIC)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Districts</InputLabel>
                                <Select value={district} onChange={handleDistrictChange} MenuProps={MenuProps}>
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
                                    {districts.map((dist) => (
                                        <MenuItem
                                            key={dist}
                                            value={dist}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected: classes.menuItemSelected,
                                            }}
                                        >
                                            {dist}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Years</InputLabel>
                                <Select value={schoolYear} onChange={handleSchoolYearChange} MenuProps={MenuProps}>
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
                                    {schoolYears.map((year) => (
                                        <MenuItem
                                            key={year}
                                            value={year}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected: classes.menuItemSelected,
                                            }}
                                        >
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={5} lg={4}>
                            <DateRangePickers
                                handleDateRangeChange={handleDateRangeChange}
                            />
                            {/* <FormControl className={classes.formControl}>
                            </FormControl> */}
                        </Grid>

                        <Grid item xs={6} sm={6} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Statuses</InputLabel>
                                <Select value={schoolStatus} onChange={handleSchoolStatusChange} MenuProps={MenuProps}>
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
                                    {schoolStatuses.map((status) => (
                                        <MenuItem
                                            key={status}
                                            value={status}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected: classes.menuItemSelected,
                                            }}
                                        >
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={3} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Purposes</InputLabel>
                                <Select
                                    value={purpose}
                                    onChange={handlePurposeChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={classes.lastOption}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        All
                                    </MenuItem>
                                    {/* <ListSubheader className={classes.option}><em>Leads</em></ListSubheader> */}
                                    <MenuItem
                                        value="Sales mới"
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        Sales mới
                                    </MenuItem>
                                    <MenuItem
                                        value="Theo dõi"
                                        className={classes.lastOption}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        Theo dõi
                                    </MenuItem>
                                    {/* <ListSubheader className={classes.option}><em>Customers</em></ListSubheader> */}
                                    <MenuItem
                                        value="Chăm sóc"
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        Chăm sóc
                                    </MenuItem>
                                    <MenuItem
                                        value="Tái ký hợp đồng"
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        Tái ký hợp đồng
                                    </MenuItem>
                                    <MenuItem
                                        value="Ký mới hợp đồng"
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        Ký mới hợp đồng
                                    </MenuItem>
                                    {/* <ListSubheader className={classes.option}><em>Ngưng hợp tác</em></ListSubheader> */}
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
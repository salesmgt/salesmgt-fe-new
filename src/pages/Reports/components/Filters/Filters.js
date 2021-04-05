import React from 'react'
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
    ListSubheader,
} from '@material-ui/core'
import { MdAccountCircle, MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../hooks/reducer-action-type'
import { useSchool } from '../../hooks/SchoolContext'
import Chips from '../Chips/Chips'
import styles from './Filters.module.scss'
import { Autocomplete } from '@material-ui/lab'
import { DatePicker } from '@material-ui/pickers'

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
    }
}));

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
})(Accordion);

const MuiAccordionSummary = withStyles({
    root: {
        height: 41.5,
        minHeight: 35,
        maxWidth: 120,
        backgroundColor: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
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

const MuiAccordionDetails = withStyles((theme) => ({
    root: {
        margin: '0.2rem 0 0.7rem 0',
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
        fromDate, toDate, setPIC, setDistrict, setSchoolYear,
        setPurpose, setSchoolStatus, setFromDate, setToDate
    } = useSchool()

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

    const handleFromDateChange = (event) => {
        const selectedDate = event.target.value;
        setFromDate(selectedDate);

        if (selectedDate) {  // !== '' && selectedDate !== undefined
            dispatchParams({
                type: ReducerActions.FILTER_FROM_DATE,
                payload: { filterType: 'fromDate', filterValue: selectedDate }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_FROM_DATE,
                payload: { filterType: 'fromDate', filterValue: null }
            })
        }
    };

    const handleToDateChange = (event) => {
        const selectedDate = event.target.value;
        setToDate(selectedDate);

        if (selectedDate) {  // !== '' && selectedDate !== undefined
            dispatchParams({
                type: ReducerActions.FILTER_TO_DATE,
                payload: { filterType: 'toDate', filterValue: selectedDate }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_TO_DATE,
                payload: { filterType: 'toDate', filterValue: null }
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
                case 'fromDate':
                    setFromDate(null);
                    break;
                case 'toDate':
                    setToDate(null);
                    break;
                default:
                    break;
            }
        });
    };

    const generateChipsArray = (listFilters) => {
        const listChips = [];
        for (const chip in listFilters) {
            listChips.push(listFilters[chip]);
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
                            <MdFilterList style={{ fontSize: 20 }} /> &nbsp;
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
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={4} lg={3}>
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
                                    // inputProps={{ style: { fontSize: '0.875rem' }}}
                                    />
                                }
                                renderOption={(option) => {
                                    return (
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar src={option.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText primary={option.fullName} primaryTypographyProps={{ style: { fontSize: '0.875rem' } }} />
                                        </ListItem>
                                    );
                                }}
                                style={{ width: 250, marginLeft: '0.52rem' }}
                                onChange={(event, newPIC) => handlePICChange(event, newPIC)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Districts</InputLabel>
                                <Select value={district} onChange={handleDistrictChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {districts.map((dist) => (
                                        <MenuItem key={dist} value={dist} className={classes.option}>{dist}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={5}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Years</InputLabel>
                                <Select value={schoolYear} onChange={handleSchoolYearChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {schoolYears.map((year) => (
                                        <MenuItem key={year} value={year} className={classes.option}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Statuses</InputLabel>
                                <Select value={schoolStatus} onChange={handleSchoolStatusChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {schoolStatuses.map((status) => (
                                        <MenuItem key={status} value={status} className={classes.option}>{status}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3} style={{ paddingTop: '0.3rem', paddingLeft: '1.5rem' }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Purposes</InputLabel>
                                <Select
                                    value={purpose}
                                    onChange={handlePurposeChange}
                                    // inputProps={{ style: { fontSize: '0.3rem'}}}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="" className={classes.option} style={{ borderBottom: '0.5px solid #e0e0e0' }}>All</MenuItem>
                                    <ListSubheader className={classes.option}><em>Leads</em></ListSubheader>
                                    <MenuItem value="Sales mới" className={classes.option}>Sales mới</MenuItem>
                                    <MenuItem value="Theo dõi" className={classes.option} style={{ borderBottom: '0.5px solid #e0e0e0' }}>Theo dõi</MenuItem>
                                    <ListSubheader className={classes.option}><em>Customers</em></ListSubheader>
                                    <MenuItem value="Chăm sóc" className={classes.option}>Chăm sóc</MenuItem>
                                    <MenuItem value="Tái ký hợp đồng" className={classes.option}>Tái ký hợp đồng</MenuItem>
                                    <MenuItem value="Ký mới hợp đồng" className={classes.option} style={{ borderBottom: '0.5px solid #e0e0e0' }}>Ký mới hợp đồng</MenuItem>
                                    <ListSubheader className={classes.option}><em>Ngưng hợp tác</em></ListSubheader>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <DatePicker
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={fromDate}
                                onChange={setFromDate}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <DatePicker
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={toDate}
                                onChange={setToDate}
                            />
                        </Grid>
                    </Grid>
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Filters
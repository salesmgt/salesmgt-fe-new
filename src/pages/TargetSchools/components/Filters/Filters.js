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
    ListSubheader,
    MenuItem,
    FormControl,
    TextField,
    InputAdornment,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { MdAccountCircle, MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../hooks/reducer-action-type'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import Chips from './Chips/Chips'
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
        // maxWidth: 180
    },
    flexBox: {
        padding: 0,
        // backgroundColor: '#2a4865',
        // borderRadius: '8px'
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
        // backgroundColor: 'rgba(238, 238, 238)',
        // backgroundColor: 'rgb(255, 255, 255)',
        margin: '0.2rem 0 0.7rem 0',
        borderRadius: '8px',
    },
}))(AccordionDetails);

function Filters() {
    //   const style = useStyles();
    const classes = useStyles();
    // const { onGetTargets } = props
    // const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])

    //Use states which have been declared in the TargetSchoolContext
    const {
        params, dispatchParams,
        PICs, districts, schoolYears,
        schoolTypes, schoolLevels, schoolScales,
        schoolYear, district, schoolType, schoolLevel,
        schoolScale, PIC, purpose,
        setSchoolYear, setDistrict, setSchoolType,
        setSchoolLevel, setSchoolScale, setPIC, setPurpose
    } = useTargetSchool()

    // const { listFilters } = params  //, searchKey, sorting, paging

    //================Handle useState() of filters================
    const handleSchoolYearChange = (event) => {
        const selectedSchoolYear = event.target.value;
        setSchoolYear(selectedSchoolYear);

        if (selectedSchoolYear) {   // !== ''
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

        // console.log('updated filters: ', params.listFilters);
        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        console.log('selectedDistrict: ', selectedDistrict);
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

        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    };

    const handleSchoolTypeChange = (event) => {
        const selectedSchoolType = event.target.value;
        setSchoolType(selectedSchoolType);

        if (selectedSchoolType) {   // !== ''
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_TYPE,
                payload: { filterType: 'type', filterValue: selectedSchoolType }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_TYPE,
                payload: { filterType: 'type', filterValue: '' }
            })
        }

        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    };

    const handleSchoolLevelChange = (event) => {
        const selectedSchoolLevel = event.target.value;
        setSchoolLevel(selectedSchoolLevel);

        if (selectedSchoolLevel) {  // !== ''
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_LEVEL,
                payload: { filterType: 'level', filterValue: selectedSchoolLevel }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_LEVEL,
                payload: { filterType: 'level', filterValue: '' }
            })
        }

        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    };

    const handleSchoolScaleChange = (event) => {
        const selectedSchoolScale = event.target.value;
        setSchoolScale(selectedSchoolScale);

        if (selectedSchoolScale) {  // !== ''
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_SCALE,
                payload: { filterType: 'scale', filterValue: selectedSchoolScale }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_SCHOOL_SCALE,
                payload: { filterType: 'scale', filterValue: '' }
            })
        }

        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    };

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

        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
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

        // onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    };

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        // console.log('removedFilters', removedFilters);

        removedFilters.forEach(removedFilter => {
            switch (removedFilter) {
                case 'schoolYear':
                    setSchoolYear("All");
                    break;
                case 'district':
                    setDistrict("All");
                    break;
                case 'type':
                    setSchoolType("All");
                    break;
                case 'level':
                    setSchoolLevel("All");
                    break;
                case 'scale':
                    setSchoolScale("All");
                    break;
                case 'PIC':
                    setPIC(null);
                    break;
                case 'purpose':
                    setPurpose("All");
                    break;
                default:
                    // throw new Error();
                    break;
            }
        });
    };

    const generateChipsArray = (listFilters) => {
        const listChips = [];
        for (const chip in listFilters) {
            // console.log('Filter.js ---> chipsssssss: ', listFilters);
            // console.log(`1 chipppppp: ${chip}: ${listFilters[chip].filterValue}`);
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
        // console.log('page = ', params.page);
        // console.log('limit = ', params.limit);
        // console.log('column = ', params.column);
        // console.log('direction = ', params.direction);
        // console.log('keyword: ', keyword);
        // onGetTargets(params.page, params.limit, params.column, params.direction, keyword, params.listFilters);
    }

    // const refetchAPI = () => {
    //     onGetTargets(params.page, params.limit, params.column, params.direction, params.searchKey, params.listFilters);
    // }

    // console.log('12 params nè: ', params)
    // console.log('filters nè: ', params.listFilters)
    // console.log('filter purpose nè: ', params.listFilters['purpose'].filterValue)
    // console.log('filter PIC nè: ', params.listFilters['PIC'].filterValue.name)


    return (
        <div className={styles.wrapper}>
            <MuiAccordion>
                <Box display="flex" flexWrap="nowrap" className={classes.flexBox}>
                    <Box className={classes.flexItem}>
                        <MuiAccordionSummary expandIcon={<MdExpandMore />}>
                            <MdFilterList style={{ fontSize: 20 }} /> &nbsp;
                        <Typography>Filters</Typography>    {/* { renderCount }  */}
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
                        <SearchFields placeholder="Search..." onChange={handleSearch} />
                    </Box>
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
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

                        <Grid item xs={6} sm={4} md={4} lg={5} style={{ paddingTop: '0.3rem' }}>
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

                        <Grid item xs={6} sm={4} md={3} lg={3}>
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

                        <Grid item xs={6} sm={4} md={3} lg={3} style={{ paddingLeft: '1.5rem' }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Types</InputLabel>
                                <Select value={schoolType} onChange={handleSchoolTypeChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {schoolTypes.map((type) => (
                                        <MenuItem key={type} value={type} className={classes.option}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={3} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Levels</InputLabel>
                                <Select value={schoolLevel} onChange={handleSchoolLevelChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {schoolLevels.map((level) => (
                                        <MenuItem key={level} value={level} className={classes.option}>{level}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={3} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Scales</InputLabel>
                                <Select value={schoolScale} onChange={handleSchoolScaleChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {schoolScales.map((scale) => (
                                        <MenuItem key={scale} value={scale} className={classes.option}>{scale}</MenuItem>
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

// Filters.propTypes = {
//     onGetTargets: PropTypes.func
// }

// Filters.defaultProps = {
//     onGetTargets: null
// }
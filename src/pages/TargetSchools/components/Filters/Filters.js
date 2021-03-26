import React, { useState, useReducer } from 'react'
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
import { schoolYears, schoolScales, PICs } from '../../data/mock-data'
import { TargetSchoolReducer } from '../../hooks/TargetSchoolReducer'
import * as ReducerActions from '../../hooks/reducer-action-type'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import Chips from '../Chips/Chips'
import styles from './Filters.module.scss'

//===============Set max-height for dropdown list===============
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
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
    fontSize: '0.875rem'
    // maxWidth: 180
  },
  flexBox: {
    padding: 0,
    // backgroundColor: '#2a4865',
    // borderRadius: '8px'
  },
  flexItem: {
    padding: 0
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
    
    // const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])
    const [params, dispatchParams] = useReducer(TargetSchoolReducer, {
        listFilters: [],
        searchKey: '',
        sorting: {},
        paging: {}
    })

    const { listFilters } = params  //, searchKey, sorting, paging
    
    //Use states which have been declared in the TargetSchoolContext
    const {
        districts, schoolTypes, schoolLevels,
        schoolYear, setSchoolYear, district, setDistrict,
        schoolType, setSchoolType, schoolLevel,
        setSchoolLevel, schoolScale, setSchoolScale,
        PIC, setPIC, purpose, setPurpose
    } = useTargetSchool()

    //================Handle useState() of filters================
    const handleSchoolYearChange = (event) => {
        const selectedSchoolYear = event.target.value;
        setSchoolYear(selectedSchoolYear);

        if (selectedSchoolYear !== '') {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_SCHOOL_YEAR,
                payload: { filterType: 'schoolYear', filterValue: selectedSchoolYear }
            })
        } else {    // Select option "All"
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_SCHOOL_YEAR,
                payload: { filterType: 'schoolYear' }
            })
        }
    };
    
    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        setDistrict(selectedDistrict);

        if (selectedDistrict !== '') {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_DISTRICT,
                payload: { filterType: 'district', filterValue: selectedDistrict }
            })
        } else {
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_DISTRICT,
                payload: { filterType: 'district' }
            })
        }
    };

    const handleSchoolTypeChange = (event) => {
        const selectedSchoolType = event.target.value;
        setSchoolType(selectedSchoolType);

        if (selectedSchoolType !== '') {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_SCHOOL_TYPE,
                payload: { filterType: 'schoolType', filterValue: selectedSchoolType }
            })
        } else {
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_SCHOOL_TYPE,
                payload: { filterType: 'schoolType' }
            })
        }
    };

    const handleSchoolLevelChange = (event) => {
        const selectedSchoolLevel = event.target.value;
        setSchoolLevel(selectedSchoolLevel);

        if (selectedSchoolLevel !== '') {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_SCHOOL_LEVEL,
                payload: { filterType: 'schoolLevel', filterValue: selectedSchoolLevel }
            })
        } else {
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_SCHOOL_LEVEL,
                payload: { filterType: 'schoolLevel' }
            })
        }
    };

    const handleSchoolScaleChange = (event) => {
        const selectedSchoolScale = event.target.value;
        setSchoolScale(selectedSchoolScale);

        if (selectedSchoolScale !== '') {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_SCHOOL_SCALE,
                payload: { filterType: 'schoolScale', filterValue: selectedSchoolScale }
            })
        } else {
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_SCHOOL_SCALE,
                payload: { filterType: 'schoolScale' }
            })
        }
    };

    const handlePICChange = (event, newPIC) => {
        setPIC(newPIC);

        if (newPIC !== null) {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_PIC,
                payload: { filterType: 'PIC', filterValue: newPIC }
            })
        } else {
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_PIC,
                payload: { filterType: 'PIC' }
            })
        }
    };

    const handlePurposeChange = (event) => {
        const selectedPurpose = event.target.value;
        setPurpose(selectedPurpose);    // Choose option "All"
        
        if (selectedPurpose) {
            dispatchParams({
                type: ReducerActions.ADD_FILTER_PURPOSE,
                payload: { filterType: 'purpose', filterValue: selectedPurpose }
            })
        } else {    // Choose option "All" || choose group label
            dispatchParams({
                type: ReducerActions.REMOVE_FILTER_PURPOSE,
                payload: { filterType: 'purpose' }
            })
        }
        
    };

    console.log("params", params);
    console.log("filters", listFilters);

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        console.log('removedFilters', removedFilters);

        removedFilters.forEach(removedFilter => {
            switch (removedFilter) {
                case 'schoolYear':
                    setSchoolYear("All");
                    break;
                case 'district':
                    setDistrict("All");
                    break;
                case 'schoolType':
                    setSchoolType("All");
                    break;
                case 'schoolLevel':
                    setSchoolLevel("All");
                    break;
                case 'schoolScale':
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
    //===============================================================================

    //=================Handle action enter / submit of SearchFields==================
    const handleSubmit = (keyword) => {
        console.log('keyword: ', keyword);
        dispatchParams({
            type: ReducerActions.ENTER_SEARCH_KEYWORD,
            payload: { paramName: 'searchKey', paramValue: keyword }
        })
    }
    
    return (
    <div className={styles.wrapper}>
        <MuiAccordion>
            <Box display="flex" className={classes.flexBox}>
                <Box className={classes.flexItem}>
                    <MuiAccordionSummary expandIcon={<MdExpandMore />}>              
                        <MdFilterList style={{ fontSize: 20 }} /> &nbsp;
                        <Typography>Filters</Typography>    {/* { renderCount }  */}
                    </MuiAccordionSummary>
                </Box>
                <Box flexGrow={1} className={classes.flexItem}>
                    <Chips chips={listFilters} dispatch={dispatchParams} handleChipsRemoved={handleChipsRemoved} />
                </Box>
                <Box className={classes.flexItem}>
                    <SearchFields placeholder="Search..." onChange={handleSubmit} />
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
                            getOptionLabel={(pic) => pic.name}
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
                                    <ListItem style={{padding: 0}}>
                                        <ListItemAvatar>
                                            <Avatar src={option.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={option.name} />
                                    </ListItem>
                                );
                            }}
                            style={{width: 250, marginLeft: '0.52rem'}}
                            onChange={(event, newPIC) => handlePICChange(event, newPIC)}
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={4} lg={3} style={{paddingTop: '0.3rem', paddingLeft: '2.8rem'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Purposes</InputLabel>
                            <Select 
                                value={purpose}
                                onChange={handlePurposeChange}
                                // inputProps={{ style: { fontSize: '0.875rem'}}}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value="" style={{borderBottom: '0.5px solid #e0e0e0'}}>All</MenuItem>
                                <ListSubheader><em>Leads</em></ListSubheader>
                                <MenuItem value="Sales mới">Sales mới</MenuItem>
                                <MenuItem value="Theo dõi" style={{borderBottom: '0.5px solid #e0e0e0'}}>Theo dõi</MenuItem>
                                <ListSubheader><em>Customers</em></ListSubheader>
                                <MenuItem value="Chăm sóc">Chăm sóc</MenuItem>
                                <MenuItem value="Tái ký hợp đồng">Tái ký hợp đồng</MenuItem>
                                <MenuItem value="Ký mới hợp đồng" style={{borderBottom: '0.5px solid #e0e0e0'}}>Ký mới hợp đồng</MenuItem>
                                <ListSubheader><em>Ngưng hợp tác</em></ListSubheader>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6} sm={4} md={4} lg={5} style={{paddingTop: '0.3rem'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Districts</InputLabel>
                            <Select value={district} onChange={handleDistrictChange} MenuProps={MenuProps}>
                                <MenuItem value="">All</MenuItem>
                                {districts.map((dist) => (
                                    <MenuItem key={dist} value={dist}>{dist}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                            
                    <Grid item xs={6} sm={4} md={3} lg={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>School Years</InputLabel>
                            <Select value={schoolYear} onChange={handleSchoolYearChange} MenuProps={MenuProps}>
                                <MenuItem value="">All</MenuItem>
                                {schoolYears.map((year) => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                
                    <Grid item xs={6} sm={4} md={3} lg={3} style={{paddingLeft: '2.8rem'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>School Types</InputLabel>
                            <Select value={schoolType} onChange={handleSchoolTypeChange} MenuProps={MenuProps}>
                                <MenuItem value="">All</MenuItem>
                                {schoolTypes.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6} sm={4} md={3} lg={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>School Levels</InputLabel>
                            <Select value={schoolLevel} onChange={handleSchoolLevelChange} MenuProps={MenuProps}>
                                <MenuItem value="">All</MenuItem>
                                {schoolLevels.map((level) => (
                                    <MenuItem key={level} value={level}>{level}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                
                    <Grid item xs={6} sm={4} md={3} lg={3} style={{paddingLeft: '3.4rem'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>School Scales</InputLabel>
                            <Select value={schoolScale} onChange={handleSchoolScaleChange} MenuProps={MenuProps}>
                                <MenuItem value="">All</MenuItem>
                                {schoolScales.map((scale) => (
                                    <MenuItem key={scale} value={scale}>{scale}</MenuItem>
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
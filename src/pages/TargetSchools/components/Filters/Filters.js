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
import { schoolYears, districts, schoolTypes, schoolLevels, schoolScales, PICs } from '../../data/mock-data'
import { FilterReducer } from '../../hooks/FilterReducer'
import * as FilterActions from '../../hooks/reducer-action-type'
import Chips from '../Chips/Chips'

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
    // maxWidth: 180
  },
  flexBox: {
    padding: 0
  },
  flexItem: {
    padding: 0
  }
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
    backgroundColor: 'rgba(238, 238, 238)',
  },
}))(AccordionDetails);

let renderCount = 0;

function Filters() {

    renderCount++;

//   const style = useStyles();
    const classes = useStyles();
    
    const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])
    
    //Declare State of all filters
    const [schoolYear, setSchoolYear] = useState(null);
    const [district, setDistrict] = useState(null);
    const [schoolType, setSchoolType] = useState(null);
    const [schoolLevel, setSchoolLevel] = useState(null);
    const [schoolScale, setSchoolScale] = useState(null);
    const [PIC, setPIC] = useState(null);
    const [purpose, setPurpose] = useState(null);

    //================Handle useState() of filters================
    const handleSchoolYearChange = (event) => {
        let selectedSchoolYear = event.target.value;
        setSchoolYear(selectedSchoolYear);

        if (selectedSchoolYear !== '') {
            dispatchFilters({
                type: FilterActions.ADD_SCHOOL_YEAR,
                payload: { filterType: 'schoolYear', filterValue: selectedSchoolYear }
            })
        } else {    // Select option "All"
            dispatchFilters({
                type: FilterActions.REMOVE_SCHOOL_YEAR,
                payload: { filterType: 'schoolYear' }
            })
        }
    };
    
    const handleDistrictChange = (event) => {
        let selectedDistrict = event.target.value;
        setDistrict(selectedDistrict);

        if (selectedDistrict !== '') {
            dispatchFilters({
                type: FilterActions.ADD_DISTRICT,
                payload: { filterType: 'district', filterValue: selectedDistrict }
            })
        } else {
            dispatchFilters({
                type: FilterActions.REMOVE_DISTRICT,
                payload: { filterType: 'district' }
            })
        }
    };

    const handleSchoolTypeChange = (event) => {
        let selectedSchoolType = event.target.value;
        setSchoolType(selectedSchoolType);

        if (selectedSchoolType !== '') {
            dispatchFilters({
                type: FilterActions.ADD_SCHOOL_TYPE,
                payload: { filterType: 'schoolType', filterValue: selectedSchoolType }
            })
        } else {
            dispatchFilters({
                type: FilterActions.REMOVE_SCHOOL_TYPE,
                payload: { filterType: 'schoolType' }
            })
        }
    };

    const handleSchoolLevelChange = (event) => {
        let selectedSchoolLevel = event.target.value;
        setSchoolLevel(selectedSchoolLevel);

        if (selectedSchoolLevel !== '') {
            dispatchFilters({
                type: FilterActions.ADD_SCHOOL_LEVEL,
                payload: { filterType: 'schoolLevel', filterValue: selectedSchoolLevel }
            })
        } else {
            dispatchFilters({
                type: FilterActions.REMOVE_SCHOOL_LEVEL,
                payload: { filterType: 'schoolLevel' }
            })
        }
    };

    const handleSchoolScaleChange = (event) => {
        let selectedSchoolScale = event.target.value;
        setSchoolScale(selectedSchoolScale);

        if (selectedSchoolScale !== '') {
            dispatchFilters({
                type: FilterActions.ADD_SCHOOL_SCALE,
                payload: { filterType: 'schoolScale', filterValue: selectedSchoolScale }
            })
        } else {
            dispatchFilters({
                type: FilterActions.REMOVE_SCHOOL_SCALE,
                payload: { filterType: 'schoolScale' }
            })
        }
    };

    const handlePICChange = (event, newPIC) => {
        setPIC(newPIC);

        if (newPIC !== null) {
            dispatchFilters({
                type: FilterActions.ADD_PIC,
                payload: { filterType: 'PIC', filterValue: newPIC }
            })
        } else {
            dispatchFilters({
                type: FilterActions.REMOVE_PIC,
                payload: { filterType: 'PIC' }
            })
        }
    };

    const handlePurposeChange = (event) => {
        let selectedPurpose = event.target.value;
        setPurpose(selectedPurpose);    // Choose option "All"
        
        if (selectedPurpose) {
            dispatchFilters({
                type: FilterActions.ADD_PURPOSE,
                payload: { filterType: 'purpose', filterValue: selectedPurpose }
            })
        } else {    // Choose option "All" || choose group label
            dispatchFilters({
                type: FilterActions.REMOVE_PURPOSE,
                payload: { filterType: 'purpose' }
            })
        }
        
    };

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

        // Đưa vô TargetSchoolReducer
    }
    
    return (
      <MuiAccordion>
        <Box display="flex" className={classes.flexBox}>
            <Box className={classes.flexItem}>
                <MuiAccordionSummary expandIcon={<MdExpandMore />}>              
                    <MdFilterList style={{ fontSize: 20 }} /> &nbsp;
                    <Typography>Filters</Typography>    {/* { renderCount }  */}
                </MuiAccordionSummary>
            </Box>
            <Box flexGrow={1} className={classes.flexItem}>
                <Chips chips={listFilters} dispatch={dispatchFilters} handleChipsRemoved={handleChipsRemoved} />
            </Box>
            <Box className={classes.flexItem}>
                <SearchFields placeholder="Search..." onChange={handleSubmit} />
            </Box>
        </Box>
      <MuiAccordionDetails>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
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

                    <Grid item xs={6} sm={4} md={4} lg={4} style={{paddingTop: '0.3rem'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Purposes</InputLabel>
                    <Select value={purpose} onChange={handlePurposeChange} MenuProps={MenuProps}>
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
            
            <Grid item xs={6} sm={4} md={4} lg={4} style={{paddingTop: '0.3rem'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Districts</InputLabel>
                    <Select value={district} onChange={handleDistrictChange} MenuProps={MenuProps}>
                        <MenuItem value="">All</MenuItem>
                        {districts.map((dist) => (
                            <MenuItem value={dist}>{dist}</MenuItem>
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
                            <MenuItem value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        
            <Grid item xs={6} sm={4} md={3} lg={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel>School Types</InputLabel>
                    <Select value={schoolType} onChange={handleSchoolTypeChange} MenuProps={MenuProps}>
                        <MenuItem value="">All</MenuItem>
                        {schoolTypes.map((type) => (
                            <MenuItem value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item xs={6} sm={4} md={3} lg={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel>School Levels</InputLabel>
                    <Select value={schoolLevel} onChange={handleSchoolLevelChange} MenuProps={MenuProps}>
                        <MenuItem value="">All</MenuItem>
                        {schoolLevels.map((level) => (
                            <MenuItem value={level}>{level}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        
            <Grid item xs={6} sm={4} md={3} lg={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel>School Scales</InputLabel>
                    <Select value={schoolScale} onChange={handleSchoolScaleChange} MenuProps={MenuProps}>
                        <MenuItem value="">All</MenuItem>
                        {schoolScales.map((scale) => (
                            <MenuItem value={scale}>{scale}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
      </MuiAccordionDetails>
    </MuiAccordion>
  )
}
export default Filters
import React, { useState } from 'react'
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
} from '@material-ui/core'
import { MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useApp } from '../../../../hooks/AppContext'
import { useTargetForm } from './TargetFormContext'
import {
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    SCALE_FILTER,
    STATUS_FILTER,
} from '../../../../constants/Filters'
import { Consts } from '../DialogConfig'
import styles from './CreateTargetSchools.module.scss'

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

    const { dists, schTypes, schEduLvls, schScales, schStatus, salesPurps } = useApp()

    //Use states which have been declared in the TargetFormContext
    const {
        // params,
        dispatchParams,
        district,
        schoolType,
        schoolLevel,
        schoolScale,
        schoolStatus,
        setFilter,
    } = useTargetForm()
    const [purpose, setPurpose] = useState([])

    const { operations, filters } = Consts

    //=========================================Handle filters=========================================
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

    const handleSchoolScaleChange = (event) => {
        const selectedSchoolScale = event.target.value
        setFilter(SCALE_FILTER, selectedSchoolScale)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_SCALE,
            payload: {
                filterType: SCALE_FILTER,
                filterValue: selectedSchoolScale ? selectedSchoolScale : '',
            },
        })
    }

    const handleSchoolStatusChange = (event) => {
        const selectedSchoolStatus = event.target.value
        setFilter(STATUS_FILTER, selectedSchoolStatus)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_STATUS,
            payload: {
                filterType: STATUS_FILTER,
                filterValue: selectedSchoolStatus ? selectedSchoolStatus : '',
            },
        })
    }
    
    const handleSearch = (keyword) => {
        dispatchParams({
            type: ReducerActions.ENTER_SEARCH_KEYWORD,
            payload: keyword,
        })
    }
    //=================================================================================================

    // Dropdown list để users chọn, sau đó mới đổ cái này vô bảng bên dưới
    const handlePurposeChange = (event) => {
        const selectedPurpose = event.target.value
        setPurpose(selectedPurpose)
    }

    //=================Handle action enter / submit of SearchFields==================
    
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
                    <Box className={classes.flexItem}>
                        <SearchFields
                            placeholder={operations.search.placeholder}
                            onChange={handleSearch}
                        />
                    </Box>
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.district.title}</InputLabel>
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
                                        All
                                    </MenuItem>
                                    {dists?.map((dist) => (
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

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.schoolType.title}</InputLabel>
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
                                        All
                                    </MenuItem>
                                    {schTypes?.map((type) => (
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

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.schoolLevel.title}</InputLabel>
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
                                        All
                                    </MenuItem>
                                    {schEduLvls?.map((level) => (
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

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.schoolScale.title}</InputLabel>
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
                                        All
                                    </MenuItem>
                                    {schScales?.map((scale) => (
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
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.schoolStatus.title}</InputLabel>
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
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}
                            // md={user.roles[0] === roleNames.salesman ? 4: 3}
                            // lg={user.roles[0] === roleNames.salesman ? 4: 3}
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
                                        className={classes.lastOption}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        {filters.purpose.options.all}
                                    </MenuItem>
                                    {salesPurps?.map((purp) => (
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
                    </Grid>
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Filters
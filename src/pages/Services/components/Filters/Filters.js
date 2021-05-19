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
    Button,
    Menu,
} from '@material-ui/core'
import { MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import Chips from './Chips/Chips'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useService } from '../../hooks/ServiceContext'
import { SCHOOL_YEAR_FILTER } from '../../../../constants/Filters'
import { useApp } from '../../../../hooks/AppContext'
import { useAuth } from '../../../../hooks/AuthContext';
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { Consts } from '../../ServicesConfig'
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

function Filters(props) {
    const classes = useStyles()
    const { operations, filters } = Consts

    // const { dists, schTypes, schEduLvls } = useApp()    //, schStatus, schScales
    // const bakDists = dists ? dists : Milk.getMilk(milkNames.dists)
    // const bakSchTypes = schTypes ? schTypes : Milk.getMilk(milkNames.types)
    // const bakSchEduLvls = schEduLvls ? schEduLvls : Milk.getMilk(milkNames.eduLvls)
    // const bakSchScales = schScales ? schScales : Milk.getMilk(milkNames.scales)

    //Use states which have been declared in the ServiceContext
    const {
        params,
        dispatchParams,
        serviceStatus,
        serviceType,
        schoolYear,
        serviceTypes,
        setFilter,
    } = useService()

    const [anchorEl, setAnchorEl] = React.useState(null)

    //================Handle useState() of filters================

    // const handleSchoolStatusChange = (event) => {
    //     const selectedSchoolStatus = event.target.value
    //     setFilter(STATUS_FILTER, selectedSchoolStatus)
    //     dispatchParams({
    //         type: ReducerActions.FILTER_SCHOOL_STATUS,
    //         payload: {
    //             filterType: STATUS_FILTER,
    //             filterValue: selectedSchoolStatus ? selectedSchoolStatus : '',
    //         },
    //     })
    // }

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                // case DISTRICT_FILTER:
                //     setFilter(DISTRICT_FILTER, '')
                //     break
                default:
                    break
            }
        })
    }

    const generateChipsArray = (listFilters) => {
        const listChips = []
        for (const chip in listFilters) {
            listChips.push(listFilters[chip])
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
                        {/* <Grid item xs={6} sm={4} md={4} lg={4}>
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
                        </Grid> */}

                        {/* <Grid item xs={6} sm={4} md={4} lg={4}>
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
                    </Grid>
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Filters

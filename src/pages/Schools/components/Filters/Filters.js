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
import { MdAdd, MdEdit, MdExpandMore, MdFilterList } from 'react-icons/md'
import { FaFileImport } from 'react-icons/fa'
import { SearchFields } from '../../../../components'
import Chips from './Chips/Chips'
import CreateSchool from '../../dialogs/CreateSchool'
import ImportFile from '../../dialogs/ImportFile'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useSchool } from '../../hooks/SchoolContext'
import {
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    SCALE_FILTER,
    STATUS_FILTER,
    ACTIVE_FILTER,
} from '../../../../constants/Filters'

import { useApp } from '../../../../hooks/AppContext'

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
        // margin: theme.spacing(1),
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

    const { dists, schTypes, schEduLvls, schScales, schStatus } = useApp()

    //Use states which have been declared in the TargetSchoolContext
    const {
        params,
        dispatchParams,
        district,
        schoolType,
        schoolLevel,
        schoolScale,
        schoolStatus,
        isActive,
        workingStatuses,
        setFilter,
    } = useSchool()

    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openImportDialog, setOpenImportDialog] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenCreateDialog = () => {
        setAnchorEl(null);
        setOpenCreateDialog(true);
    }

    const handleOpenImportDialog = () => {
        setAnchorEl(null);
        setOpenImportDialog(true);
    }

    //================Handle useState() of filters================
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

    const handleIsActiveChange = (event) => {
        const selectedIsActive = event.target.value

        setFilter(ACTIVE_FILTER, selectedIsActive)
        dispatchParams({
            type: ReducerActions.FILTER_ACTIVE,
            payload: {
                filterType: ACTIVE_FILTER,
                filterValue: selectedIsActive,
            },
        })
    }

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                case DISTRICT_FILTER:
                    setFilter(DISTRICT_FILTER, '')
                    break
                case TYPE_FILTER:
                    setFilter(TYPE_FILTER, '')
                    break
                case LEVEL_FILTER:
                    setFilter(LEVEL_FILTER, '')
                    break
                case SCALE_FILTER:
                    setFilter(SCALE_FILTER, '')
                    break
                case STATUS_FILTER:
                    setFilter(STATUS_FILTER, '')
                    break
                case ACTIVE_FILTER:
                    setFilter(ACTIVE_FILTER, null)
                    break
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
        console.log('listChips: ', listChips);
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
                        <SearchFields
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                    </Box>
                    <Box className={classes.flexItem}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        // onClick={() => setOpenCreateDialog(true)}
                        >
                            <MdAdd fontSize="large" />
                            {/* &nbsp;Create */}
                        </Button>

                        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem onClick={() => handleOpenCreateDialog()}>
                                <MdEdit /> &nbsp; &nbsp; Create
                            </MenuItem>
                            <MenuItem onClick={() => handleOpenImportDialog()}>
                                <FaFileImport /> &nbsp; &nbsp; Import
                            </MenuItem>
                        </Menu>

                        <CreateSchool
                            open={openCreateDialog}
                            onClose={() => setOpenCreateDialog(false)}
                        />
                        <ImportFile
                            open={openImportDialog}
                            onClose={() => setOpenImportDialog(false)}
                        />
                    </Box>
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Districts</InputLabel>
                                <Select
                                    value={district}
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
                                <InputLabel>School Status</InputLabel>
                                <Select
                                    value={schoolStatus}
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

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>School Types</InputLabel>
                                <Select
                                    value={schoolType}
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
                                <InputLabel>School Levels</InputLabel>
                                <Select
                                    value={schoolLevel}
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
                                <InputLabel>School Scales</InputLabel>
                                <Select
                                    value={schoolScale}
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
                                <InputLabel>Working Status</InputLabel>
                                <Select value={isActive} onChange={handleIsActiveChange} MenuProps={MenuProps}>
                                    {workingStatuses.map((workingStatus) => (
                                        <MenuItem
                                            value={workingStatus}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected: classes.menuItemSelected,
                                            }}
                                        >
                                            {workingStatus === null ? 'All' : (workingStatus ? 'Active' : 'Inactive')}
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

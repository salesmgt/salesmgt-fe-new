import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Select,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Button,
    Box,
} from '@material-ui/core'
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
import { MdAdd } from 'react-icons/md'
import NotifyDialog from './NotifyDialog'
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
        marginBottom: theme.spacing(1),
        minWidth: 170,
    },
    flexBox: {
        padding: 0,
    },
    flexItem: {
        padding: '0 0.2rem',
    },
    option: {
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
}))

function Filters(props) {
    const classes = useStyles()

    const { dists, schTypes, schEduLvls, schScales } = useApp()

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
    // const [purpose, setPurpose] = useState([])

    const { operations, filters } = Consts

    const [openNotiDialog, setOpenNotiDialog] = useState(false)

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
    
    //=================Handle action enter / submit of SearchFields==================
    const handleSearch = (keyword) => {
        dispatchParams({
            type: ReducerActions.ENTER_SEARCH_KEYWORD,
            payload: keyword,
        })
    }

    const renderNotiDialog = () => {
        return (
            <NotifyDialog 
                open={openNotiDialog} onClose={() => setOpenNotiDialog(false)}
            />
        )
    }

    const onClick = e =>{
        console.log('props.rows: ', props.rows);
        if(props.rows?.length < 1) {
            setOpenNotiDialog(true)
            return
        }

        props.setOpen(true)
    }
    return (
        <div className={styles.filtersZone}>
            <Box display="flex" flexWrap="nowrap" className={classes.flexBox}>
                <Box flexGrow={1}></Box>
                <Box className={classes.flexItem}>
                    <SearchFields
                        placeholder={operations.search.placeholder}
                        onChange={handleSearch}
                    />
                </Box>
                <Box className={classes.flexItem}>
                    <Button onClick={onClick} color="secondary" variant="contained" className={styles.btnAdd}>
                        <MdAdd fontSize="large" />
                    </Button>
                    {renderNotiDialog()}
                </Box>
            </Box>
            <Grid container item xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={6} sm={4} md={3} lg={3}>
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

                <Grid item xs={6} sm={4} md={3} lg={3}>
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

                <Grid item xs={6} sm={4} md={3} lg={3}>
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

                <Grid item xs={6} sm={4} md={3} lg={3}>
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
            </Grid>
        </div>
    )
}

export default Filters
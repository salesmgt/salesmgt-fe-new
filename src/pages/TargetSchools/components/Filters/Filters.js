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
    TextField,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Button,
    InputAdornment,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
    MdAccountCircle,
    MdAdd,
    MdExpandMore,
    MdFilterList,
    MdPersonAdd,
} from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import Chips from './Chips/Chips'
import {
    SCHOOL_YEAR_FILTER,
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    SCALE_FILTER,
    PIC_FILTER,
    PURPOSE_FILTER,
    // STATUS_FILTER,
} from '../../../../constants/Filters'
import { useApp } from '../../../../hooks/AppContext'
import NotifyAssign from '../../dialogs/NotifyAssign/NotifyAssign'
import AssignMultiple from '../../dialogs/AssignMultiple/AssignMultiple'
import CreateTargetSchools from '../../dialogs/CreateTargetSchools/CreateTargetSchools'
import { Consts } from '../../TargetSchoolsConfig'
import { useAuth } from '../../../../hooks/AuthContext'
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
        // maxWidth: 180
    },
    flexBox: {
        padding: 0,
        // backgroundColor: '#2a4865',
        // borderRadius: '8px'
    },
    flexItem: {
        padding: 0, //'0 0.2rem'
    },
    option: {
        fontSize: '0.875rem',
    },
    lastOption: {
        fontSize: '0.875rem',
        borderBottom: '0.5px solid #e0e0e0',
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
    autoComplete: {
        width: 250,
        marginLeft: '0.5rem',
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
}))

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
        padding: '0 0 1rem 1.5rem', // top (right-left) bottom
        borderRadius: '8px',
    },
}))(AccordionDetails)

function Filters() {
    //   const style = useStyles();
    const classes = useStyles()
    // const { onGetTargets } = props
    // const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])

    const {
        schYears,
        dists,
        schTypes,
        schEduLvls,
        schScales,
        salesPurps,
        // schStatus,
    } = useApp()

    //Use states which have been declared in the TargetSchoolContext
    const {
        params,
        dispatchParams,
        PICs,
        schoolYear,
        district,
        schoolType,
        schoolLevel,
        schoolScale,
        PIC,
        purpose,
        setFilter,
    } = useTargetSchool()
    const { operations, filters } = Consts

    const { user } = useAuth()

    // const { listFilters } = params  //, searchKey, sorting, paging

    const [openNotifyDialog, setOpenNotifyDialog] = useState(false)
    const [openAssignDialog, setOpenAssignDialog] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    const selectedSchools = [
        {
            id: 10,
            schoolName: 'THCS Hiệp Thành',
            district: 'Quận 4',
            purpose: '',
            note: '',
        },
        {
            id: 12,
            schoolName: 'Tiểu học Xuân Thu',
            district: 'Quận Bình Tân',
            purpose: '',
            note: '',
        },
        {
            id: 13,
            schoolName: 'THCS Võ Trường Toản',
            district: 'Quận 1',
            purpose: '',
            note: '',
        },
        {
            id: 16,
            schoolName: 'THPT Nguyễn Thượng Hiền',
            district: 'Quận Phú Nhuận',
            purpose: '',
            note: '',
        },
        {
            id: 20,
            schoolName: 'THPT Marie Cuire',
            district: 'Quận 10',
            purpose: '',
            note: '',
        },
        {
            id: 21,
            schoolName: 'Tiểu học Đặng Trần Côn',
            district: 'Quận 12',
            purpose: '',
            note: '',
        },
        {
            id: 30,
            schoolName: 'THPT Nguyễn Trãi',
            district: 'Quận 3',
            purpose: '',
            note: '',
        },
        {
            id: 34,
            schoolName: 'Tiểu học Nguyễn Văn Cừ',
            district: 'Quận 5',
            purpose: '',
            note: '',
        },
    ] // Giờ để tạm ở đây để test trước chứ đúng ra là truyền bằng context

    //================Handle useState() of filters================
    const handleSchoolYearChange = (event) => {
        const selectedSchoolYear = event.target.value

        // setSchoolYear(selectedSchoolYear)
        // if (selectedSchoolYear) {
        //     // !== ''
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_YEAR,
        //         payload: {
        //             filterType: 'schoolYear',
        //             filterValue: selectedSchoolYear,
        //         },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_YEAR,
        //         payload: { filterType: 'schoolYear', filterValue: '' },
        //     })
        // }
        setFilter(SCHOOL_YEAR_FILTER, selectedSchoolYear)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_YEAR,
            payload: {
                filterType: SCHOOL_YEAR_FILTER,
                filterValue: selectedSchoolYear ? selectedSchoolYear : '',
            },
        })
    }

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value

        // setDistrict(selectedDistrict)
        // if (selectedDistrict) {
        //     // !== ''
        //     dispatchParams({
        //         type: ReducerActions.FILTER_DISTRICT,
        //         payload: {
        //             filterType: 'district',
        //             filterValue: selectedDistrict,
        //         },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_DISTRICT,
        //         payload: { filterType: 'district', filterValue: '' },
        //     })
        // }
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

        // setSchoolType(selectedSchoolType)
        // if (selectedSchoolType) {
        //     // !== ''
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_TYPE,
        //         payload: {
        //             filterType: 'type',
        //             filterValue: selectedSchoolType,
        //         },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_TYPE,
        //         payload: { filterType: 'type', filterValue: '' },
        //     })
        // }
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

        // setSchoolLevel(selectedSchoolLevel)
        // if (selectedSchoolLevel) {
        //     // !== ''
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_LEVEL,
        //         payload: {
        //             filterType: 'level',
        //             filterValue: selectedSchoolLevel,
        //         },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_LEVEL,
        //         payload: { filterType: 'level', filterValue: '' },
        //     })
        // }
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

        // setSchoolScale(selectedSchoolScale)
        // if (selectedSchoolScale) {
        //     // !== ''
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_SCALE,
        //         payload: {
        //             filterType: 'scale',
        //             filterValue: selectedSchoolScale,
        //         },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_SCHOOL_SCALE,
        //         payload: { filterType: 'scale', filterValue: '' },
        //     })
        // }
        setFilter(SCALE_FILTER, selectedSchoolScale)
        dispatchParams({
            type: ReducerActions.FILTER_SCHOOL_SCALE,
            payload: {
                filterType: SCALE_FILTER,
                filterValue: selectedSchoolScale ? selectedSchoolScale : '',
            },
        })
    }

    const handlePICChange = (event, newPIC) => {
        // setPIC(newPIC)
        // console.log('handle change, new PIC', newPIC)
        // if (newPIC) {
        //     //  !== null
        //     dispatchParams({
        //         type: ReducerActions.FILTER_PIC,
        //         payload: { filterType: 'PIC', filterValue: newPIC },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_PIC,
        //         payload: { filterType: 'PIC', filterValue: null },
        //     })
        // }
        setFilter(PIC_FILTER, newPIC)
        dispatchParams({
            type: ReducerActions.FILTER_PIC,
            payload: {
                filterType: PIC_FILTER,
                filterValue: newPIC ? newPIC : null,
            },
        })
    }

    const handlePurposeChange = (event) => {
        const selectedPurpose = event.target.value

        // setPurpose(selectedPurpose)
        // if (selectedPurpose) {
        //     // !== '' && selectedPurpose !== undefined
        //     dispatchParams({
        //         type: ReducerActions.FILTER_PURPOSE,
        //         payload: {
        //             filterType: 'purpose',
        //             filterValue: selectedPurpose,
        //         },
        //     })
        // } else {
        //     dispatchParams({
        //         type: ReducerActions.FILTER_PURPOSE,
        //         payload: { filterType: 'purpose', filterValue: '' },
        //     })
        // }
        setFilter(PURPOSE_FILTER, selectedPurpose)
        dispatchParams({
            type: ReducerActions.FILTER_PURPOSE,
            payload: {
                filterType: PURPOSE_FILTER,
                filterValue: selectedPurpose ? selectedPurpose : '',
            },
        })
    }

    //==============Handle action delete from Chips and btn "Clear all"==============
    // const handleChipsRemoved = (removedFilters) => {
    //     removedFilters.forEach((removedFilter) => {
    //         switch (removedFilter) {
    //             case 'schoolYear':
    //                 setSchoolYear('')
    //                 break
    //             case 'district':
    //                 setDistrict('')
    //                 break
    //             case 'type':
    //                 setSchoolType('')
    //                 break
    //             case 'level':
    //                 setSchoolLevel('')
    //                 break
    //             case 'scale':
    //                 setSchoolScale('')
    //                 break
    //             case 'PIC':
    //                 setPIC(null)
    //                 break
    //             case 'purpose':
    //                 setPurpose('')
    //                 break
    //             default:
    //                 // break;
    //                 break
    //         }
    //     })
    // }

    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                case SCHOOL_YEAR_FILTER:
                    setFilter(SCHOOL_YEAR_FILTER, '')
                    break
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
                case PIC_FILTER:
                    setFilter(PIC_FILTER, null)
                    break
                case PURPOSE_FILTER:
                    setFilter(PURPOSE_FILTER, '')
                    break
                // case STATUS_FILTER:
                //     setFilter(STATUS_FILTER, '')
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

    const handleOpenCreateDialog = () => {
        // console.log('create dialog')
        setOpenCreateDialog(true)
    }

    const handleOpenAssignDialog = () => {
        if (selectedSchools.length > 0) {
            // console.log('assign dialog')
            setOpenAssignDialog(true)
        } else {
            // console.log('noti dialog: ')
            setOpenNotifyDialog(true)
        }
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
                            <Typography>{operations.filter}</Typography>{' '}
                            {/* { renderCount }  */}
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
                        <SearchFields
                            placeholder={operations.search.placeholder}
                            onChange={handleSearch}
                        />
                    </Box>
                    <Box className={classes.flexItem}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenCreateDialog}
                        >
                            <MdAdd fontSize="large" />
                            {/* &nbsp;{operations.create} */}
                        </Button>

                        <CreateTargetSchools
                            open={openCreateDialog}
                            onClose={() => setOpenCreateDialog(false)}
                        />
                    </Box>
                    <Box className={classes.flexItem}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenAssignDialog}
                        >
                            <MdPersonAdd fontSize="large" />
                        </Button>
                        {/* Have checked target schools */}
                        <AssignMultiple
                            open={openAssignDialog}
                            onClose={() => setOpenAssignDialog(false)}
                            rows={selectedSchools}
                        />
                        {/* Have not checked target schools */}
                        <NotifyAssign
                            open={openNotifyDialog}
                            onClose={() => setOpenNotifyDialog(false)}
                        />
                    </Box>
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        {user.roles[0] !== roleNames.salesman && (
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
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label={filters.pic.title}
                                                margin="normal"
                                                placeholder={
                                                    filters.pic.placeholder
                                                }
                                                ref={params.InputProps.ref}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment position="start">
                                                                <MdAccountCircle />
                                                            </InputAdornment>
                                                            {
                                                                params
                                                                    .InputProps
                                                                    .startAdornment
                                                            }
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )
                                    }}
                                    renderOption={(option) => {
                                        return (
                                            <div
                                                className={classes.itemPIC}
                                                key={option.username}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={option.avatar}
                                                    />
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
                        )}

                        <Grid
                            item
                            xs={12}
                            sm={4}
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

                        <Grid
                            item
                            xs={12}
                            sm={4}
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

                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            lg={3}
                            className={classes.paddingTop}
                        >
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
                                    {schYears?.map((year) => (
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

                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            lg={3}
                            className={classes.paddingTop}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolType.title}
                                </InputLabel>
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
                                        {filters.schoolType.options.all}
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

                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            lg={3}
                            className={classes.paddingTop}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolLevel.title}
                                </InputLabel>
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
                                        {filters.schoolLevel.options.all}
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

                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            lg={3}
                            className={classes.paddingTop}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.schoolScale.title}
                                </InputLabel>
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
                                        {filters.schoolScale.options.all}
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

// Filters.propTypes = {
//     onGetTargets: PropTypes.func
// }

// Filters.defaultProps = {
//     onGetTargets: null
// }

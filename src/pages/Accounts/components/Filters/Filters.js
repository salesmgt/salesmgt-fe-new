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
} from '@material-ui/core'
import { MdAdd, MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import Chips from './Chips/Chips'
import CreateAccount from '../../dialogs/CreateAccount/CreateAccount'
import * as ReducerActions from '../../../../constants/ActionTypes'
import { useAccount } from '../../hooks/AccountContext'
import { ACTIVE_FILTER, ROLE_FILTER } from '../../../../constants/Filters'
import { useApp } from '../../../../hooks/AppContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { Consts } from '../../AccountsConfig'
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

const useStyles = makeStyles(() => ({
    formControl: {
        margin: '0.3rem 0',
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
        marginLeft: '0.5rem',
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
        padding: '0.3rem 0 1rem 2rem',
        borderRadius: '8px',
    },
}))(AccordionDetails)

function Filters() {
    const classes = useStyles()

    //Use states which have been declared in the TargetSchoolContext
    const {
        params,
        dispatchParams,
        isActive,
        role,
        workingStatuses,
        setFilter,
    } = useAccount() // isActive,

    const { roles } = useApp()
    const bakRoles = roles ? roles : Milk.getMilk(milkNames.roles)

    const { operations, filters } = Consts

    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    //================Handle useState() of filters================
    const handleIsActiveChange = (event) => {
        const selectedIsActive = event.target.value

        // console.log('handleIsActiveChange - selectedIsActive: ', selectedIsActive);

        // setFilter(ACTIVE_FILTER, selectedIsActive ? selectedIsActive : { isActive: true, status: "Active" })
        setFilter(ACTIVE_FILTER, selectedIsActive)
        dispatchParams({
            type: ReducerActions.FILTER_ACTIVE,
            payload: {
                filterType: ACTIVE_FILTER,
                filterValue: selectedIsActive,
                // filterValue: selectedIsActive.isActive ? { isActive: true, status: "Active" } : { isActive: false, status: "Inactive" },
            },
        })
    }

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value
        setFilter(ROLE_FILTER, selectedRole)
        dispatchParams({
            type: ReducerActions.FILTER_ROLE,
            payload: {
                filterType: ROLE_FILTER,
                filterValue: selectedRole ? selectedRole : '',
            },
        })
    }

    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach((removedFilter) => {
            switch (removedFilter) {
                case ACTIVE_FILTER:
                    setFilter(ACTIVE_FILTER, null)
                    break
                case ROLE_FILTER:
                    setFilter(ROLE_FILTER, '')
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
                    <Box className={classes.flexItem}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenCreateDialog(true)}
                        >
                            <MdAdd fontSize="large" />
                            {/* &nbsp;{operations.create} */}
                        </Button>
                        <CreateAccount
                            open={openCreateDialog}
                            onClose={() => setOpenCreateDialog(false)}
                        />
                    </Box>
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>
                                    {filters.workingStatus.title}
                                </InputLabel>
                                <Select
                                    value={isActive === null ? '' : isActive}
                                    onChange={handleIsActiveChange}
                                    MenuProps={MenuProps}
                                >
                                    {workingStatuses.map((workingStatus) => (
                                        <MenuItem
                                            key={workingStatus}
                                            value={workingStatus}
                                            // value={workingStatus || null}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {workingStatus === null
                                                ? `${filters.workingStatus.options.all}`
                                                : workingStatus
                                                ? `${filters.workingStatus.options.active}`
                                                : `${filters.workingStatus.options.inactive}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{filters.role.title}</InputLabel>
                                <Select
                                    value={role || ''}
                                    onChange={handleRoleChange}
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
                                    {bakRoles?.map((role) => (
                                        <MenuItem
                                            key={role}
                                            value={role}
                                            // value={role || ''}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected:
                                                    classes.menuItemSelected,
                                            }}
                                        >
                                            {role}
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

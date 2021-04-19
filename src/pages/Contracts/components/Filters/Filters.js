import React, { useState } from 'react'
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
    Button,
} from '@material-ui/core'
import { MdAdd, MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../../../hooks/reducer-action-type'
import { useContract } from '../../hooks/ContractContext'
import Chips from './Chips/Chips'
import CreateAccount from '../../dialogs/CreateAccount'
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
    },
    flexBox: {
        padding: 0,
    },
    flexItem: {
        padding: 0
    },
    option: {
        fontSize: '0.875rem'
    },
    btn: {
        padding: '0.5rem',
        margin: '0 0.3rem',
        borderRadius: '8px'
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
        // borderBottom: '1px solid rgba(0, 0, 0, .125)',
        // boxShadow: '1px 1px 2px gray',
        boxShadow: '0 4px 6px -6px #000',  // 0px 1px 1px gray
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
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '0.5rem 0',
        padding: '0.5rem 0 1rem 1.5rem',
        borderRadius: '8px',
    },
}))(AccordionDetails);

function Filters() {
    const classes = useStyles();

    //Use states which have been declared in the TargetSchoolContext
    const {
        params, dispatchParams,
        roles,
        active, setActive, role, setRole
    } = useContract()

    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    //================Handle useState() of filters================
    const handleIsActiveChange = (event) => {
        const selectedIsActive = event.target.value;
        setActive(selectedIsActive);

        dispatchParams({
            type: ReducerActions.FILTER_ACTIVE,
            payload: { filterType: 'isActive', filterValue: selectedIsActive }
        })
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);

        if (selectedRole) {   // !== ''
            dispatchParams({
                type: ReducerActions.FILTER_ROLE,
                payload: { filterType: 'role', filterValue: selectedRole }
            })
        } else {
            dispatchParams({
                type: ReducerActions.FILTER_ROLE,
                payload: { filterType: 'role', filterValue: '' }
            })
        }
    };

    //==============Handle action delete from Chips and btn "Clear all"==============
    const handleChipsRemoved = (removedFilters) => {
        removedFilters.forEach(removedFilter => {
            switch (removedFilter) {
                case 'active':
                    setActive(true);
                    break;
                case 'role':
                    setRole("All");
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
                            <MdFilterList className={styles.iconFilter} /> &nbsp;
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
                    <Box className={classes.flexItem}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenCreateDialog(true)}
                        >
                            <MdAdd fontSize="large" />&nbsp;Create
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
                                <InputLabel>Is Active</InputLabel>
                                <Select value={active} defaultValue={true} onChange={handleIsActiveChange} MenuProps={MenuProps}>
                                    <MenuItem
                                        value={true}
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        True
                                    </MenuItem>
                                    <MenuItem
                                        value={false}
                                        className={classes.option}
                                        classes={{
                                            root: classes.menuItemRoot,
                                            selected: classes.menuItemSelected,
                                        }}
                                    >
                                        False
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Roles</InputLabel>
                                <Select value={role} onChange={handleRoleChange} MenuProps={MenuProps}>
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
                                    {roles.map((role) => (
                                        <MenuItem
                                            key={role}
                                            value={role}
                                            className={classes.option}
                                            classes={{
                                                root: classes.menuItemRoot,
                                                selected: classes.menuItemSelected,
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
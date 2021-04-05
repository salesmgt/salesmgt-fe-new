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
    MenuItem,
    FormControl,
} from '@material-ui/core'
import { MdExpandMore, MdFilterList } from 'react-icons/md'
import { SearchFields } from '../../../../components'
import * as ReducerActions from '../../hooks/reducer-action-type'
import { useAccount } from '../../hooks/AccountContext'
import Chips from '../Chips/Chips'
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
        margin: '0.2rem 0 0.7rem 0',
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
    } = useAccount()

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
                            <MdFilterList style={{ fontSize: 20 }} /> &nbsp;
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
                </Box>
                <MuiAccordionDetails>
                    <Grid container>
                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Is Active</InputLabel>
                                <Select value={active} defaultValue={true} onChange={handleIsActiveChange} MenuProps={MenuProps}>
                                    <MenuItem value={true} className={classes.option}>True</MenuItem>
                                    <MenuItem value={false} className={classes.option}>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Roles</InputLabel>
                                <Select value={role} onChange={handleRoleChange} MenuProps={MenuProps}>
                                    <MenuItem value="" className={classes.option}>All</MenuItem>
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role} className={classes.option}>{role}</MenuItem>
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
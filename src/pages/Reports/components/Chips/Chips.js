import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import * as ReducerActions from '../../hooks/reducer-action-type'
// import classes from './Chips.module.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    ul: {
        maxWidth: 810,
        overflowX: 'scroll',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        listStyle: 'none',
        margin: 0,
        paddingLeft: '0.5rem',
    },
    btnClear: {
        fontSize: '0.75rem'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function Chips(props) {
    const classes = useStyles();
    const { chips, dispatch, handleChipsRemoved } = props;

    //================Generate chips according to filters================
    const [btnClearAll, setBtnClearAll] = useState(false);

    const handleChipDelete = (chipToDelete) => () => {
        switch (chipToDelete.filterType) {
            case 'PIC':
                dispatch({
                    type: ReducerActions.FILTER_PIC,
                    payload: { filterType: 'PIC', filterValue: null }
                })
                break;

            case 'district':
                dispatch({
                    type: ReducerActions.FILTER_DISTRICT,
                    payload: { filterType: 'district', filterValue: '' }
                })
                break;

            case 'schoolYear':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_YEAR,
                    payload: { filterType: 'schoolYear', filterValue: '' }
                })
                break;

            case 'purpose':
                dispatch({
                    type: ReducerActions.FILTER_PURPOSE,
                    payload: { filterType: 'purpose', filterValue: '' }
                })
                break;

            case 'status':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_STATUS,
                    payload: { filterType: 'status', filterValue: '' }
                })
                break;

            case 'fromDate':
                dispatch({
                    type: ReducerActions.FILTER_FROM_DATE,
                    payload: { filterType: 'fromDate', filterValue: null }  // null hay ''?
                })
                break;

            case 'toDate':
                dispatch({
                    type: ReducerActions.FILTER_TO_DATE,
                    payload: { filterType: 'toDate', filterValue: null }  // null hay ''?
                })
                break;

            default:
                // throw new Error();
                break;
        }

        if (!handleChipsRemoved)
            return;
        // Reset corresponding filters' value to "All" / null
        const removedFilters = [chipToDelete.filterType]
        handleChipsRemoved(removedFilters);
    }

    const handleClearAllChips = () => {
        setBtnClearAll(false);

        if (!handleChipsRemoved)
            return;

        dispatch({
            type: ReducerActions.FILTER_PIC,
            payload: { filterType: 'PIC', filterValue: null }
        })
        dispatch({
            type: ReducerActions.FILTER_DISTRICT,
            payload: { filterType: 'district', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_YEAR,
            payload: { filterType: 'schoolYear', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_STATUS,
            payload: { filterType: 'status', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_PURPOSE,
            payload: { filterType: 'purpose', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_FROM_DATE,
            payload: { filterType: 'fromDate', filterValue: null }  // null hay ''?
        })
        dispatch({
            type: ReducerActions.FILTER_TO_DATE,
            payload: { filterType: 'toDate', filterValue: null }  // null hay ''?
        })

        const removedFilters = ['district', 'type', 'level', 'scale', 'status']

        handleChipsRemoved(removedFilters);
    }

    const handleShowClearAllButton = () => {
        let count = 0;
        chips.forEach(chip => {
            if (chip.filterValue === '' || chip.filterValue === null)
                count++;
        });
        return count;
    }

    return (
        <>
            {(handleShowClearAllButton() !== 7) &&
                <div className={classes.root}>
                    <Button size='small' className={classes.btnClear} onClick={handleClearAllChips}>
                        Clear all
                    </Button>
                    <ul className={classes.ul}>
                        {chips.map((chip) => {
                            return (
                                <>
                                    {chip.filterValue &&
                                        <li key={chip.filterType}>
                                            {(chip.filterType === 'PIC')
                                                ? <Chip
                                                    label={chip.filterValue.fullName}
                                                    avatar={<Avatar src={chip.filterValue.avatar} />}
                                                    onDelete={handleChipDelete(chip)}
                                                    className={classes.chip}
                                                    color="secondary"
                                                />
                                                : <Chip
                                                    label={chip.filterValue}
                                                    onDelete={handleChipDelete(chip)}
                                                    className={classes.chip}
                                                    color="secondary"
                                                />
                                            }
                                        </li>
                                    }
                                </>
                            );
                        })}
                    </ul>
                </div>
            }
        </>
    )
}

export default React.memo(Chips);

Chips.propTypes = {
    chips: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleChipsRemoved: PropTypes.func
}
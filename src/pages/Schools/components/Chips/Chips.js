import React, { useState } from 'react'
import { Button, Chip } from '@material-ui/core';
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
            case 'district':
                dispatch({
                    type: ReducerActions.FILTER_DISTRICT,
                    payload: { filterType: 'district', filterValue: '' }
                })
                break;

            case 'type':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_TYPE,
                    payload: { filterType: 'type', filterValue: '' }
                })
                break;

            case 'level':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_LEVEL,
                    payload: { filterType: 'level', filterValue: '' }
                })
                break;

            case 'scale':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_SCALE,
                    payload: { filterType: 'scale', filterValue: '' }
                })
                break;

            case 'status':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_STATUS,
                    payload: { filterType: 'status', filterValue: '' }
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
            type: ReducerActions.FILTER_DISTRICT,
            payload: { filterType: 'district', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_TYPE,
            payload: { filterType: 'type', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_LEVEL,
            payload: { filterType: 'level', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_SCALE,
            payload: { filterType: 'scale', filterValue: '' }
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_STATUS,
            payload: { filterType: 'status', filterValue: '' }
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
            {(handleShowClearAllButton() !== 5) &&
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
                                            <Chip
                                                label={chip.filterValue}
                                                onDelete={handleChipDelete(chip)}
                                                className={classes.chip}
                                                color="secondary"
                                            />
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
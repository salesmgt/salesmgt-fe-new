import React, { useState } from 'react'
import { Button, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import PropTypes from 'prop-types'
import * as ReducerActions from '../../../../../constants/ActionTypes'
import {
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    // SCALE_FILTER,
    STATUS_FILTER,
    ACTIVE_FILTER
} from '../../../../../constants/Filters'
// import classes from './Chips.module.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    ul: {
        // maxWidth: 10 * 6 + 5,
        maxWidth: 810,
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        listStyle: 'none',
        margin: 0,
        paddingLeft: '0.5rem',
    },
    btnClear: {
        fontSize: '0.75rem',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))

function Chips(props) {
    const classes = useStyles()
    const { chips, dispatch, handleChipsRemoved } = props

    //================Generate chips according to filters================
    const [btnClearAll, setBtnClearAll] = useState(false)

    const handleChipDelete = (chipToDelete) => () => {
        switch (chipToDelete.filterType) {
            case DISTRICT_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_DISTRICT,
                    payload: { filterType: DISTRICT_FILTER, filterValue: '' },
                })
                break

            case TYPE_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_TYPE,
                    payload: { filterType: TYPE_FILTER, filterValue: '' },
                })
                break

            case LEVEL_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_LEVEL,
                    payload: { filterType: LEVEL_FILTER, filterValue: '' },
                })
                break

            // case SCALE_FILTER:
            //     dispatch({
            //         type: ReducerActions.FILTER_SCHOOL_SCALE,
            //         payload: { filterType: SCALE_FILTER, filterValue: '' },
            //     })
            //     break

            case STATUS_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_STATUS,
                    payload: { filterType: STATUS_FILTER, filterValue: '' },
                })
                break

            case ACTIVE_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_ACTIVE,
                    payload: { filterType: ACTIVE_FILTER, filterValue: null },
                })
                break

            default:
                // break;
                break
        }

        if (!handleChipsRemoved) return
        // Reset corresponding filters' value to "All" / null
        const removedFilters = [chipToDelete.filterType]
        handleChipsRemoved(removedFilters)
    }

    const handleClearAllChips = () => {
        setBtnClearAll(false)

        if (!handleChipsRemoved) return

        // dispatch({
        //     type: ReducerActions.FILTER_DISTRICT,
        //     payload: { filterType: DISTRICT_FILTER, filterValue: '' },
        // })
        // dispatch({
        //     type: ReducerActions.FILTER_SCHOOL_TYPE,
        //     payload: { filterType: TYPE_FILTER, filterValue: '' },
        // })
        // dispatch({
        //     type: ReducerActions.FILTER_SCHOOL_LEVEL,
        //     payload: { filterType: LEVEL_FILTER, filterValue: '' },
        // })
        // dispatch({
        //     type: ReducerActions.FILTER_SCHOOL_SCALE,
        //     payload: { filterType: SCALE_FILTER, filterValue: '' },
        // })
        // dispatch({
        //     type: ReducerActions.FILTER_SCHOOL_STATUS,
        //     payload: { filterType: STATUS_FILTER, filterValue: '' },
        // })
        // dispatch({
        //     type: ReducerActions.FILTER_ACTIVE,
        //     payload: { filterType: ACTIVE_FILTER, filterValue: null },
        // })

        const removedFilters = [
            // DISTRICT_FILTER,
            // TYPE_FILTER,
            // LEVEL_FILTER,
            // // SCALE_FILTER,
            // STATUS_FILTER,
            // ACTIVE_FILTER
        ]

        handleChipsRemoved(removedFilters)
    }

    const handleShowClearAllButton = () => {
        let count = 0
        chips.forEach((chip) => {
            if (chip.filterValue === '' || chip.filterValue === null || chip.filterValue === undefined) {
                count++
            }
        })
        return count;
    }

    return (
        <div>
            {handleShowClearAllButton() !== 5 && (
                <div className={classes.root}>
                    {/* <Button
                        size="small"
                        className={classes.btnClear}
                        onClick={handleClearAllChips}
                    >
                        Clear all
                    </Button> */}
                    <ul className={classes.ul}>
                        {chips.map((chip) => {
                            return (
                                <li key={chip.filterType}>
                                    {chip.filterType !== ACTIVE_FILTER && chip.filterValue &&
                                        <Chip
                                            label={chip.filterValue}
                                            onDelete={handleChipDelete(chip)}
                                            className={classes.chip}
                                            color="secondary"
                                        />
                                    }
                                    {chip.filterType === ACTIVE_FILTER && chip.filterValue !== null &&
                                        <Chip
                                            label={chip.filterValue ? 'Active' : 'Inactive'}
                                            onDelete={handleChipDelete(chip)}
                                            className={classes.chip}
                                            color="secondary"
                                        />
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default React.memo(Chips)

// Chips.propTypes = {
//     chips: PropTypes.array.isRequired,
//     dispatch: PropTypes.func.isRequired,
//     handleChipsRemoved: PropTypes.func,
// }

import React, { useState } from 'react'
import { Button, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as ReducerActions from '../../../../../hooks/reducer-action-type'
// import classes from './Chips.module.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    ul: {
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
            case 'active':
                dispatch({
                    type: ReducerActions.FILTER_ACTIVE,
                    payload: { filterType: 'isActive', filterValue: true },
                })
                break

            case 'role':
                dispatch({
                    type: ReducerActions.FILTER_ROLE,
                    payload: { filterType: 'role', filterValue: '' },
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

        dispatch({
            type: ReducerActions.FILTER_ACTIVE,
            payload: { filterType: 'isActive', filterValue: true },
        })
        dispatch({
            type: ReducerActions.FILTER_ROLE,
            payload: { filterType: 'role', filterValue: '' },
        })

        const removedFilters = ['active', 'role']

        handleChipsRemoved(removedFilters)
    }

    const handleShowClearAllButton = () => {
        let count = 0
        chips.forEach((chip) => {
            if (chip.filterValue === '' || chip.filterValue === null) count++
        })
        return count
    }

    return (
        <>
            {handleShowClearAllButton() !== 2 && (
                <div className={classes.root}>
                    <Button
                        size="small"
                        className={classes.btnClear}
                        onClick={handleClearAllChips}
                    >
                        Clear all
                    </Button>
                    <ul className={classes.ul}>
                        {chips.map((chip) => {
                            return (
                                <li key={chip.filterType}>
                                    {chip.filterType !== 'isActive' &&
                                        chip.filterValue && (
                                            <Chip
                                                label={chip.filterValue}
                                                onDelete={handleChipDelete(
                                                    chip
                                                )}
                                                className={classes.chip}
                                                color="secondary"
                                            />
                                        )}
                                    {chip.filterType === 'isActive' && (
                                        <Chip
                                            label={chip.filterValue.toString()}
                                            onDelete={handleChipDelete(chip)}
                                            className={classes.chip}
                                            color="secondary"
                                        />
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </>
    )
}

export default React.memo(Chips)

Chips.propTypes = {
    chips: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleChipsRemoved: PropTypes.func,
}

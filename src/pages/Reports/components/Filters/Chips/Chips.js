import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as ReducerActions from '../../../../../constants/ActionTypes'
import {
    PIC_FILTER,
    DISTRICT_FILTER,
    SCHOOL_YEAR_FILTER,
    PURPOSE_FILTER,
    STATUS_FILTER,
    DATE_RANGE_FILTER,
} from '../../../../../constants/Filters'
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
            case PIC_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_PIC,
                    payload: { filterType: PIC_FILTER, filterValue: null },
                })
                break

            case DISTRICT_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_DISTRICT,
                    payload: { filterType: DISTRICT_FILTER, filterValue: '' },
                })
                break

            case SCHOOL_YEAR_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_YEAR,
                    payload: {
                        filterType: SCHOOL_YEAR_FILTER,
                        filterValue: '',
                    },
                })
                break

            case PURPOSE_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_PURPOSE,
                    payload: { filterType: PURPOSE_FILTER, filterValue: '' },
                })
                break

            case STATUS_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_STATUS,
                    payload: { filterType: STATUS_FILTER, filterValue: '' },
                })
                break

            case DATE_RANGE_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_DATE_RANGE,
                    payload: {
                        filterType: DATE_RANGE_FILTER,
                        filterValue: [null, null],
                    },
                })
                // dispatch({
                //     type: ReducerActions.FILTER_FROM_DATE,
                //     payload: { filterType: 'fromDate', filterValue: null }
                // })
                // dispatch({
                //     type: ReducerActions.FILTER_TO_DATE,
                //     payload: { filterType: 'toDate', filterValue: null }
                // })
                break
            // case 'fromDate':
            //     dispatch({
            //         type: ReducerActions.FILTER_FROM_DATE,
            //         payload: { filterType: 'fromDate', filterValue: null }
            //     })
            //     break;

            // case 'toDate':
            //     dispatch({
            //         type: ReducerActions.FILTER_TO_DATE,
            //         payload: { filterType: 'toDate', filterValue: null }
            //     })
            //     break;

            default:
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
            type: ReducerActions.FILTER_PIC,
            payload: { filterType: PIC_FILTER, filterValue: null },
        })
        dispatch({
            type: ReducerActions.FILTER_DISTRICT,
            payload: { filterType: DISTRICT_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_YEAR,
            payload: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_STATUS,
            payload: { filterType: STATUS_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_PURPOSE,
            payload: { filterType: PURPOSE_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_DATE_RANGE,
            payload: {
                filterType: DATE_RANGE_FILTER,
                filterValue: [null, null],
            },
        })
        // dispatch({
        //     type: ReducerActions.FILTER_FROM_DATE,
        //     payload: { filterType: 'fromDate', filterValue: null }
        // })
        // dispatch({
        //     type: ReducerActions.FILTER_TO_DATE,
        //     payload: { filterType: 'toDate', filterValue: null }
        // })

        // const removedFilters = [
        //     'PIC',
        //     'district',
        //     'schoolYear',
        //     'status',
        //     'purpose',
        //     'dateRange', //,'fromDate', 'toDate'
        // ]

        const removedFilters = [
            PIC_FILTER,
            DISTRICT_FILTER,
            SCHOOL_YEAR_FILTER,
            PURPOSE_FILTER,
            STATUS_FILTER,
            DATE_RANGE_FILTER,
        ]

        handleChipsRemoved(removedFilters)
    }

    const handleShowClearAllButton = () => {
        let count = 0
        chips.forEach((chip) => {
            if (chip.filterValue === '' || chip.filterValue === null) {
                count++
            } else if (
                chip.filterType === DATE_RANGE_FILTER &&
                typeof chip.filterValue !== 'string'
            ) {
                count++
            }
        })
        console.log('count = ', count);
        return count
    }

    const renderChips = (chip) => {
        if (chip.filterType === PIC_FILTER) {
            return (
                <Chip
                    label={chip.filterValue.fullName}
                    avatar={<Avatar src={chip.filterValue.avatar} />}
                    onDelete={handleChipDelete(chip)}
                    className={classes.chip}
                    color="secondary"
                />
            )
        } else if (chip.filterType === DATE_RANGE_FILTER) {
            if (typeof chip.filterValue === 'string') {
                return (
                    <Chip
                        label={chip.filterValue}
                        onDelete={handleChipDelete(chip)}
                        className={classes.chip}
                        color="secondary"
                    />
                )
            }
        } else {
            // } else if (chip.filterType !== 'dateRange') {
            return (
                <Chip
                    label={chip.filterValue}
                    onDelete={handleChipDelete(chip)}
                    className={classes.chip}
                    color="secondary"
                />
            )
        }
    }

    return (
        <>
            {handleShowClearAllButton() !== 5 && (
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
                                <>
                                    {chip.filterValue && (
                                        <li key={chip.filterType}>
                                            {renderChips(chip)}
                                        </li>
                                    )}
                                </>
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

import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as ReducerActions from '../../../../../constants/ActionTypes'
import {
    SCHOOL_YEAR_FILTER,
    DISTRICT_FILTER,
    TYPE_FILTER,
    LEVEL_FILTER,
    // SCALE_FILTER,
    PIC_FILTER,
    PURPOSE_FILTER,
    STATUS_FILTER,
    ASSIGNED_FILTER,
    TASK_STATUS_FILTER,
    // DATE_RANGE_FILTER,
} from '../../../../../constants/Filters'
import { Consts } from '../../../TasksConfig'
// import PropTypes from 'prop-types'
// import classes from './Chips.module.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    ul: {
        // width: '100%',
        maxWidth: 810,
        overflowX: 'auto',
        // whiteSpace: 'nowrap',
        // height: '100%',
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
    const { filters } = Consts

    //================Generate chips according to filters================
    // const [chipData, setChipData] = useState(chips);
    const [btnClearAll, setBtnClearAll] = useState(false)

    const handleChipDelete = (chipToDelete) => () => {
        // console.log('chipToDelete = ', chipToDelete);
        // setChipData((listChips) => listChips.filter((chip) => chip.filterType !== chipToDelete.filterType));

        switch (chipToDelete.filterType) {
            case SCHOOL_YEAR_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_YEAR,
                    payload: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
                })
                break
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
            case PIC_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_PIC,
                    payload: { filterType: PIC_FILTER, filterValue: null },
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
            case ASSIGNED_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_ASSIGNED,
                    payload: { filterType: ASSIGNED_FILTER, filterValue: null },
                })
                break
            case TASK_STATUS_FILTER:
                dispatch({
                    type: ReducerActions.FILTER_TASK_STATUS,
                    payload: { filterType: TASK_STATUS_FILTER, filterValue: '' },
                })
                break
            // case DATE_RANGE_FILTER:
            //     dispatch({
            //         type: ReducerActions.FILTER_DATE_RANGE,
            //         payload: {
            //             filterType: DATE_RANGE_FILTER,
            //             filterValue: [null, null],
            //         },
            //     })
            default:
                break
        }

        // if (chipData.length === 0) {
        //     setBtnClearAll(false);
        // }

        if (!handleChipsRemoved) return
        // Reset corresponding filters' value to "All" / null
        const removedFilters = [chipToDelete.filterType]
        handleChipsRemoved(removedFilters)

        // handleShowClearAllButton();
    }

    const handleClearAllChips = () => {
        // setChipData([]);
        setBtnClearAll(false)

        // console.log('chipData = ', chipData)
        // console.log('chipData.length = ', chipData.length)

        if (!handleChipsRemoved) return

        dispatch({
            type: ReducerActions.FILTER_SCHOOL_YEAR,
            payload: { filterType: SCHOOL_YEAR_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_DISTRICT,
            payload: { filterType: DISTRICT_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_TYPE,
            payload: { filterType: TYPE_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_LEVEL,
            payload: { filterType: LEVEL_FILTER, filterValue: '' },
        })
        // dispatch({
        //     type: ReducerActions.FILTER_SCHOOL_SCALE,
        //     payload: { filterType: SCALE_FILTER, filterValue: '' },
        // })
        dispatch({
            type: ReducerActions.FILTER_PIC,
            payload: { filterType: PIC_FILTER, filterValue: null },
        })
        dispatch({
            type: ReducerActions.FILTER_PURPOSE,
            payload: { filterType: PURPOSE_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_STATUS,
            payload: { filterType: STATUS_FILTER, filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_ASSIGNED,
            payload: { filterType: ASSIGNED_FILTER, filterValue: null },
        })
        dispatch({
            type: ReducerActions.FILTER_TASK_STATUS,
            payload: { filterType: TASK_STATUS_FILTER, filterValue: '' },
        })
        // dispatch({
        //     type: ReducerActions.FILTER_DATE_RANGE,
        //     payload: {
        //         filterType: DATE_RANGE_FILTER,
        //         filterValue: [null, null],
        //     },
        // })

        const removedFilters = [
            SCHOOL_YEAR_FILTER,
            DISTRICT_FILTER,
            TYPE_FILTER,
            LEVEL_FILTER,
            // SCALE_FILTER,
            PIC_FILTER,
            PURPOSE_FILTER,
            STATUS_FILTER,
            ASSIGNED_FILTER,
            TASK_STATUS_FILTER
            // DATE_RANGE_FILTER,
        ]

        handleChipsRemoved(removedFilters)
    }

    const handleShowClearAllButton = () => {
        let count = 0
        chips.forEach((chip) => {
            if (chip.filterValue === '' || chip.filterValue === null || chip.filterValue === undefined) {
                count++
            }
            // else if (
            //     chip.filterType === DATE_RANGE_FILTER &&
            //     typeof chip.filterValue !== 'string'
            // ) {
            //     count++
            // }
        })
        // if (count === 7) {
        //     setBtnClearAll(false)
        // } else {
        //     setBtnClearAll(true)
        // }
        // console.log('count empty chip = ', count);
        return count
    }

    // const renderChips = (chip) => {
    //     if (chip.filterType === PIC_FILTER) {
    //         return (
    //             <Chip
    //                 label={chip.filterValue.fullName}
    //                 avatar={<Avatar src={chip.filterValue.avatar} />}
    //                 onDelete={handleChipDelete(chip)}
    //                 className={classes.chip}
    //                 color="secondary"
    //             />
    //         )
    //         // } else if (chip.filterType === DATE_RANGE_FILTER) {
    //         //     if (typeof chip.filterValue === 'string') {
    //         //         return (
    //         //             <Chip
    //         //                 label={chip.filterValue}
    //         //                 onDelete={handleChipDelete(chip)}
    //         //                 className={classes.chip}
    //         //                 color="secondary"
    //         //             />
    //         //         )
    //         //     }
    //     } else {
    //         // } else if (chip.filterType !== 'dateRange') {
    //         return (
    //             <Chip
    //                 label={chip.filterValue}
    //                 onDelete={handleChipDelete(chip)}
    //                 className={classes.chip}
    //                 color="secondary"
    //             />
    //         )
    //     }
    // }

    return (
        <div>
            {handleShowClearAllButton() !== 9 && (
                <div className={classes.root}>
                    {/* {(chips !== null && chips !== undefined) && */}
                    {/* {showClearAllButton(chipData)} */}
                    <Button
                        size="small"
                        className={classes.btnClear}
                        onClick={handleClearAllChips}
                    >
                        Clear all
                    </Button>
                    {/* {chips.length > 0 && */}
                    <ul className={classes.ul}>
                        {/* {generateChips(chips).map(chip => {})} */}
                        {chips.map((chip) => {
                            return (
                                // <div key={chip.filterType}>
                                //     {chip.filterValue && (
                                //         <li>
                                //             {renderChips(chip)}
                                //         </li>
                                //     )}
                                // </div>
                                <li key={chip.filterType}>
                                    {chip.filterType === PIC_FILTER && chip.filterValue &&
                                        <Chip
                                            label={chip.filterValue.fullName}
                                            avatar={
                                                <Avatar src={chip.filterValue.avatar} />
                                            }
                                            onDelete={handleChipDelete(chip)}
                                            className={classes.chip}
                                            color="secondary"
                                        />
                                    }
                                    {chip.filterType === ASSIGNED_FILTER && chip.filterValue !== null &&
                                        <Chip
                                            label={chip.filterValue ? `${filters.isAssigned.options.assigned}` : `${filters.isAssigned.options.notAssigned}`}
                                            onDelete={handleChipDelete(chip)}
                                            className={classes.chip}
                                            color="secondary"
                                        />
                                    }
                                    {chip.filterType !== PIC_FILTER && chip.filterType !== ASSIGNED_FILTER && chip.filterValue &&
                                        <Chip
                                            label={chip.filterValue}
                                            onDelete={handleChipDelete(chip)}
                                            className={classes.chip}
                                            color="secondary"
                                        />
                                    }
                                </li>
                            )
                        })}
                    </ul>
                    {/* } */}
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

import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core'
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

    //================Generate chips according to filters================
    // const [chipData, setChipData] = useState(chips);
    const [btnClearAll, setBtnClearAll] = useState(false)

    const handleChipDelete = (chipToDelete) => () => {
        // console.log('chipToDelete = ', chipToDelete);
        // setChipData((listChips) => listChips.filter((chip) => chip.filterType !== chipToDelete.filterType));

        switch (chipToDelete.filterType) {
            case 'schoolYear':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_YEAR,
                    payload: { filterType: 'schoolYear', filterValue: '' },
                })
                break

            case 'district':
                dispatch({
                    type: ReducerActions.FILTER_DISTRICT,
                    payload: { filterType: 'district', filterValue: '' },
                })
                break

            case 'type':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_TYPE,
                    payload: { filterType: 'type', filterValue: '' },
                })
                break

            case 'level':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_LEVEL,
                    payload: { filterType: 'level', filterValue: '' },
                })
                break

            case 'scale':
                dispatch({
                    type: ReducerActions.FILTER_SCHOOL_SCALE,
                    payload: { filterType: 'scale', filterValue: '' },
                })
                break

            case 'PIC':
                dispatch({
                    type: ReducerActions.FILTER_PIC,
                    payload: { filterType: 'PIC', filterValue: null },
                })
                break

            case 'purpose':
                dispatch({
                    type: ReducerActions.FILTER_PURPOSE,
                    payload: { filterType: 'purpose', filterValue: '' },
                })
                break

            default:
                // break;
                break
        }

        // console.log('chipData.length = ', chipData.length)
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
            payload: { filterType: 'schoolYear', filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_DISTRICT,
            payload: { filterType: 'district', filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_TYPE,
            payload: { filterType: 'type', filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_LEVEL,
            payload: { filterType: 'level', filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_SCHOOL_SCALE,
            payload: { filterType: 'scale', filterValue: '' },
        })
        dispatch({
            type: ReducerActions.FILTER_PIC,
            payload: { filterType: 'PIC', filterValue: null },
        })
        dispatch({
            type: ReducerActions.FILTER_PURPOSE,
            payload: { filterType: 'purpose', filterValue: '' },
        })

        const removedFilters = [
            'schoolYear',
            'district',
            'type',
            'level',
            'scale',
            'PIC',
            'purpose',
        ]

        handleChipsRemoved(removedFilters)
    }

    const handleShowClearAllButton = () => {
        let count = 0
        chips.forEach((chip) => {
            if (chip.filterValue === '' || chip.filterValue === null) count++
        })
        // if (count === 7) {
        //     setBtnClearAll(false)
        // } else {
        //     setBtnClearAll(true)
        // }
        // console.log('count empty chip = ', count);
        return count
    }

    return (
        <>
            {handleShowClearAllButton() !== 7 && (
                <div className={classes.root}>
                    {' '}
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
                                <>
                                    {chip.filterValue && (
                                        <li key={chip.filterType}>
                                            {chip.filterType === 'PIC' ? (
                                                <Chip
                                                    label={
                                                        chip.filterValue
                                                            .fullName
                                                    }
                                                    avatar={
                                                        <Avatar
                                                            src={
                                                                chip.filterValue
                                                                    .avatar
                                                            }
                                                        />
                                                    }
                                                    onDelete={handleChipDelete(
                                                        chip
                                                    )}
                                                    className={classes.chip}
                                                    color="secondary"
                                                />
                                            ) : (
                                                <Chip
                                                    label={chip.filterValue}
                                                    onDelete={handleChipDelete(
                                                        chip
                                                    )}
                                                    className={classes.chip}
                                                    color="secondary"
                                                />
                                            )}
                                        </li>
                                    )}
                                </>
                            )
                        })}
                    </ul>
                    {/* } */}
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

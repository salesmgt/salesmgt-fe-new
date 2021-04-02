import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import * as ReducerActions from '../../hooks/reducer-action-type'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  ul: {
    // width: '100%',
    maxWidth: 810,
    overflowX: 'scroll',
    // whiteSpace: 'nowrap',
    // height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    listStyle: 'none',
    margin: 0,
    paddingLeft: '0.5rem',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function Chips(props) {
    const classes = useStyles();
    const { chips, dispatch, handleChipsRemoved } = props;
    
    //================Generate chips according to filters================
    const [chipData, setChipData] = useState(chips);
    const [schowClearAllButton, setSchowClearAllButton] = useState(false);
        
    const handleChipDelete = (chipToDelete) => () => {
        setChipData((listChips) => listChips.filter((chip) => chip.filterType !== chipToDelete.filterType));
        
        if (!handleChipsRemoved)
            return;

        switch (chipToDelete.filterType) {
            case 'schoolYear':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_SCHOOL_YEAR,
                    payload: { filterType: 'schoolYear' }
                })
                break;
        
            case 'district':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_DISTRICT,
                    payload: { filterType: 'district' }
                })
                break;
        
            case 'schoolType':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_SCHOOL_TYPE,
                    payload: { filterType: 'schoolType' }
                })
                break;
        
            case 'schoolLevel':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_SCHOOL_LEVEL,
                    payload: { filterType: 'schoolLevel' }
                })
                break;
        
            case 'schoolScale':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_SCHOOL_SCALE,
                    payload: { filterType: 'schoolScale' }
                })
                break;
        
            case 'PIC':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_PIC,
                    payload: { filterType: 'PIC' }
                })                
                break;
        
            case 'purpose':
                dispatch({
                    type: ReducerActions.REMOVE_FILTER_PURPOSE,
                    payload: { filterType: 'purpose' }
                })                
                break;
        
            default:
                throw new Error();
        }
        
        if (chips.length === 0) {
            setSchowClearAllButton(false);
        }

        // Reset corresponding filters' value to "All" / null
        const removedFilters = [chipToDelete.filterType]
        handleChipsRemoved(removedFilters);
    }

    const handleClearAllChips = () => {
        setChipData([]);
        setSchowClearAllButton(false);

        if (!handleChipsRemoved)
            return;

        dispatch({
            type: ReducerActions.REMOVE_FILTER_SCHOOL_YEAR,
            payload: { filterType: 'schoolYear' }
        })
        dispatch({
            type: ReducerActions.REMOVE_FILTER_DISTRICT,
            payload: { filterType: 'district' }
        })
        dispatch({
            type: ReducerActions.REMOVE_FILTER_SCHOOL_TYPE,
            payload: { filterType: 'schoolType' }
        })
        dispatch({
            type: ReducerActions.REMOVE_FILTER_SCHOOL_LEVEL,
            payload: { filterType: 'schoolLevel' }
        })
        dispatch({
            type: ReducerActions.REMOVE_FILTER_SCHOOL_SCALE,
            payload: { filterType: 'schoolScale' }
        })
        dispatch({
            type: ReducerActions.REMOVE_FILTER_PIC,
            payload: { filterType: 'PIC' }
        })
        dispatch({
            type: ReducerActions.REMOVE_FILTER_PURPOSE,
            payload: { filterType: 'purpose' }
        })

        const removedFilters = [
            'schoolYear',
            'district',
            'schoolType',
            'schoolLevel',
            'schoolScale',
            'PIC',
            'purpose'
        ]

        handleChipsRemoved(removedFilters);
    }

    return (
        <> 
            {
                chips.length > 0 &&
                <div className={classes.root}>
                    <Button onClick={handleClearAllChips}>Clear all</Button>
                    <ul className={classes.ul}>
                        {chips.map((chip) => {
                            return (
                                <li key={chip.filterType}>
                                    {
                                        //{/* (chip.filterType === 'searchKey') && null */}
                                        (chip.filterType === 'PIC')
                                        ? <Chip
                                            label={chip.filterValue.name}
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
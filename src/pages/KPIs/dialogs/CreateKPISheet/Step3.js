import React, { useEffect, useState } from 'react'
import {
    Button,
    DialogContent,
    DialogActions,
    Typography,
    makeStyles,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    InputAdornment,
    TextField,
    Tooltip,
    IconButton,
} from '@material-ui/core'
import { MdAdd, MdDelete } from 'react-icons/md'
import { Autocomplete } from '@material-ui/lab'
import { parseDateToString } from '../../../../utils/DateTimes'
import { useHistory } from 'react-router'
import * as ArrayUtils from '../../../../utils/Arrays'
import { } from '../../../../utils/DateTimes'
import { useAuth } from '../../../../hooks/AuthContext'
import { Consts } from '../DialogConfig'
import { steps, getStepContent } from './CreateKPISheetConfig'
import { useKPI } from '../../hooks/KPIContext'
import classes from './Step3.module.scss'

//===============Set max-height for dropdown list===============
const ITEM_HEIGHT = 38
const ITEM_PADDING_TOP = 5
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        },
    },
}
//==============================================================

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        // minWidth: 160,
    },
    option: {
        fontSize: '0.875rem',
    },
    // Selection
    // root: {},
    // menuItemRoot: {
    //     '&$menuItemSelected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
    //     '&$menuItemSelected:focus': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.12)',
    //     },
    //     '&$menuItemSelected:hover': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.04);',
    //     },
    // },
    // menuItemSelected: {},

    // Stepper
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}))

function Step3(props) {
    const styles = useStyles()
    const { KPI, setKPI } = props
    const history = useHistory()
    const [salesmen, setSalesmen] = useState([])
    const [myCriteria, setMyCriteria] = useState(KPI.criteria)
    // const [previewKPIs, setPreviewKPIs] = useState([])

    const getAllSalesmen = () => {
        // getAllSalesmen({ key: searchKey })
        //     .then((data) => {
        //         setSalesmen(data)
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error)
        //             history.push({
        //                 pathname: '/errors',
        //                 state: { error: error.response.status },
        //             })
        //         }
        //     })
    }
    useEffect(() => {
        getAllSalesmen()
        // return () => setTasks([])
    }, [])

    // if (!myCriteria?.floorValue || !myCriteria?.weight) {
    //     setMyCriteria(refractorCriteria)
    // }

    const handleFloorValueChange = (event, index) => {
        const inputValue = event.target.value;
        console.log('inputValue = ', inputValue);
        let listCriteria = [...myCriteria]
        listCriteria[index] = {
            ...listCriteria[index],
            floorValue: inputValue
        }
        setMyCriteria(listCriteria)
        setKPI({ ...KPI, criteria: listCriteria })
    }

    const handleWeightChange = (event, index) => {
        const inputValue = event.target.value;
        console.log('inputValue = ', inputValue);
        let listCriteria = [...myCriteria]

        listCriteria[index] = {
            ...listCriteria[index],
            weight: inputValue
        }
        setMyCriteria(listCriteria)
        setKPI({ ...KPI, criteria: listCriteria })
    }
    // console.log('outside ------ myCriteria = ', myCriteria);

    console.log('Step 3: kpi = ', KPI)

    return (
        <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" className={classes.wrapper}>
            <Grid container className={classes.child}>

            </Grid>

            <div className={classes.child}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tHead}>
                            <TableRow className={classes.tBodyRow}>
                                <TableCell >
                                </TableCell>
                                {myCriteria.map(col => (
                                    <TableCell key={col.key} width={col.width} className={classes.tHeadCell}>
                                        {col.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tBody}>
                            {myCriteria.map((cri, index) => (
                                <TableRow key={cri.id} className={classes.tBodyRow}>
                                    <TableCell className={classes.tBodyCell}>{index + 1}</TableCell>
                                    <TableCell className={classes.tBodyCell}>{cri.name}</TableCell>
                                    <TableCell className={classes.tBodyCellTextField}>
                                        <TextField className={classes.txtFloorValue}
                                            variant="outlined" size="small"
                                            type="number"
                                            value={cri.floorValue}
                                            onChange={(event) => handleFloorValueChange(event, index)}
                                            InputProps={{
                                                inputProps: { min: 0, max: 999999999999 }  // 999 tỷ 999 triệu 999 ngàn 999
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tBodyCellTextField}>
                                        <TextField className={classes.txtWeight}
                                            variant="outlined" size="small"
                                            type="number"
                                            value={cri.weight}
                                            onChange={(event) => handleWeightChange(event, index)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end"> % </InputAdornment>
                                                ),
                                                inputProps: { min: 0, max: 100 }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    )
}

export default Step3

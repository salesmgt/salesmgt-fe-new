import React, { useEffect, useState } from 'react'
import {
    Grid,
    Box,
    TextField,
    Checkbox,
} from '@material-ui/core'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { Autocomplete } from '@material-ui/lab'
import { getKPICriteria } from '../../KPIsServices';
import { useHistory } from 'react-router';
import classes from './Step1.module.scss'

//===============Set max-height for dropdown list===============
// const ITEM_HEIGHT = 38
// const ITEM_PADDING_TOP = 5
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
//         },
//     },
// }
// //==============================================================

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         // minWidth: 160,
//     },
//     option: {
//         fontSize: '0.875rem',
//     },
//     // Selection
//     // root: {},
//     // menuItemRoot: {
//     //     '&$menuItemSelected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
//     //     '&$menuItemSelected:focus': {
//     //         backgroundColor: 'rgba(0, 0, 0, 0.12)',
//     //     },
//     //     '&$menuItemSelected:hover': {
//     //         backgroundColor: 'rgba(0, 0, 0, 0.04);',
//     //     },
//     // },
//     // menuItemSelected: {},

//     // Stepper
//     root: {
//         width: '100%',
//     },
//     backButton: {
//         marginRight: theme.spacing(1),
//     },
//     instructions: {
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(1),
//     },
// }))

function Step1(props) {
    // const styles = useStyles()
    const { KPI, setKPI } = props
    const { criteria, kpis } = KPI
    const [myCriteria, setMyCriteria] = useState([])  //[]
    const history = useHistory()
    // const [selectedCriteria, setSelectedCriteria] = useState([])  //[]

    const refractorCriteria = (listCri) => {
        let myCriteria = []
        listCri.map((cri, index) => {
            if (index < (listCri.length - 1)) {
                cri = { ...cri, isChecked: false, targetValue: 0, weight: Math.round(100 / listCri.length) }
            } else {
                cri = {
                    ...cri,
                    isChecked: false,
                    targetValue: 0,
                    weight: 100 - (Math.round(100 / listCri.length) * (listCri.length - 1))
                }
            }
            myCriteria.push(cri)
        })

        // setKPI({ ...KPI, criteria: myCriteria, kpis: [{ ...kpis, criteria: myCriteria }] })

        return myCriteria
    }
    const getCriteriaFromDB = () => {
        getKPICriteria().then((data) => {
            const newListCri = refractorCriteria(data)
            setMyCriteria(newListCri)
        })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }
    useEffect(() => {
        console.log('criteria.length = ', criteria.length);
        if (criteria.length === 0) {
            getCriteriaFromDB()
        } else {
            refractorCriteria(criteria)
        }
    }, [])

    const handleCriteriaChange = (event, listCriteria) => {
        console.log('listCriteria: ', listCriteria);
        // console.log('selected criteria: ', listCriteria);
        let myCriteria = []

        listCriteria.map((cri, index) => {
            if (index < (listCriteria.length - 1)) {
                cri = { ...cri, isChecked: true, weight: Math.round(100 / listCriteria.length) }
            } else {
                cri = {
                    ...cri,
                    isChecked: true,
                    weight: 100 - (Math.round(100 / listCriteria.length) * (listCriteria.length - 1))
                }
            }
            myCriteria.push(cri)
        })

        setKPI({ ...KPI, criteria: myCriteria, kpis: [{ ...kpis, criteria: myCriteria }] })
    }

    // const handleCheck = (e, option) => {
    //     console.log('handleCheck ------- e', e);
    //     console.log('handleCheck ------- e', option);
    // }

    console.log('Step 1: KPI = ', KPI);

    return (
        <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" className={classes.wrapper}>
            {/* <Grid container spacing={2} className={classes.child}> */}
            <Grid item xs={12} sm={8} md={6} lg={6} className={classes.child}>
                <TextField
                    label="Group name"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    value={KPI.groupName}
                    onChange={(event) => setKPI({ ...KPI, groupName: event.target.value })} />
                {/* error={!!errors.username}
                    helperText={errors?.username?.message} /> */}
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={6} className={classes.child}>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    autoFocus
                    value={KPI.description}
                    onChange={(event) => setKPI({ ...KPI, description: event.target.value })} />
                {/* error={!!errors.username}
                    helperText={errors?.username?.message} /> */}
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={6} className={classes.child}>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={myCriteria}
                    value={criteria}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(option, { selected }) => {
                        // console.log('option?.isChecked = ', option?.isChecked);
                        return (
                            <>
                                <Checkbox
                                    icon={<MdCheckBoxOutlineBlank />}
                                    checkedIcon={<MdCheckBox />}
                                    style={{ marginRight: 5 }}
                                    // checked={KPI?.criteria.length === 0 ? selected : KPI?.criteria?.isChecked}
                                    checked={selected}
                                // onChange={(e) => handleCheck(e, option)}
                                />
                                {option.name}
                            </>
                        )
                    }}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Evaluation Criteria" required />
                    )}
                    // filterOptions={(options = KPI.criteria) => { console.log('list chọn nè: ', options) }}
                    onChange={handleCriteriaChange}
                />
            </Grid>
            {/* </Grid> */}
        </Box >
    )
}

export default Step1

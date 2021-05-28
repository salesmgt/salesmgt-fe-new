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
    const history = useHistory()
    const [criteria, setCriteria] = useState(KPI.criteria)  //[]
    const [selectedCriteria, setSelectedCriteria] = useState([])  //[]

    const refractorCriteria = (listCri) => {
        let myCriteria = []
        listCri.map(cri => {
            cri = { ...cri, isChecked: false }
            myCriteria.push(cri)
        })
        return myCriteria
    }
    const getCriteria = () => {
        getKPICriteria().then((data) => {
            const newListCri = refractorCriteria(data)
            setCriteria(newListCri)
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
        getCriteria()
        // return () => setTasks([])
    }, [])

    // console.log('newListCriteria = ', criteria);

    const handleCriteriaChange = (event, listCriteria) => {
        console.log('listCriteria: ', listCriteria);
        // console.log('selected criteria: ', listCriteria);
        // let myCriteria = []
        // listCriteria.map(cri => {
        //     if ()
        //     cri = { ...cri, isChecked: true }
        //     myCriteria.push(cri)
        // })

        setKPI({ ...KPI, criteria: listCriteria })
    }

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
                    options={criteria}
                    value={KPI.criteria}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(option, { selected }) => (
                        <>
                            <Checkbox
                                icon={<MdCheckBoxOutlineBlank />}
                                checkedIcon={<MdCheckBox />}
                                style={{ marginRight: 5 }}
                                // checked={KPI?.criteria.length === 0 ? selected : KPI?.criteria?.isChecked}
                                checked={selected}
                            />
                            {option.name}
                        </>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Evaluation Criteria" required />
                    )}
                    onChange={handleCriteriaChange}
                />
            </Grid>
            {/* </Grid> */}
        </Box >
    )
}

export default Step1

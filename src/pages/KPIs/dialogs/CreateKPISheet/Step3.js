import React, { useEffect, useRef, useState } from 'react'
import {
    makeStyles,
    Grid,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    TextField,
    ListItem,
    ListItemText,
    Checkbox,
    ListItemAvatar,
    Avatar,
    Typography,
    FormControl,
    FormControlLabel,
    easing,
} from '@material-ui/core'
import { MdAdd, MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md'
import { Autocomplete, AvatarGroup } from '@material-ui/lab'
import { useHistory } from 'react-router'
import { getAllSalesmen } from '../../KPIsServices';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from 'mui-pickers-v3'
import DateFnsUtils from '@date-io/date-fns'
import * as ArrayUtils from '../../../../utils/Arrays'
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

const useStyles = makeStyles(() => ({
    itemPIC: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        margin: 0,
    },
    itemTextPrimary: {
        fontSize: '0.8rem',
    },
    itemTextSecondary: {
        fontSize: '0.75rem',
    },
}))

function Step3(props) {
    const styles = useStyles()
    const { KPI, setKPI } = props
    const { criteria, users, kpis } = KPI
    const history = useHistory()
    const [listKPIs, setListKPIs] = useState(kpis)
    // const [myCriteria, setMyCriteria] = useState(criteria)
    const [startDate, setStartDate] = useState(KPI?.startDate)
    const [endDate, setEndDate] = useState(KPI?.endDate)

    const [salesmen, setSalesmen] = useState([])
    const [staffs, setStaffs] = useState(users)
    const [checkAll, setCheckAll] = useState(false)
    // const [previewKPIs, setPreviewKPIs] = useState([])

    const getSalesmen = (searchKey) => {
        getAllSalesmen({ key: searchKey })
            .then((data) => {
                setSalesmen(data)
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
        getSalesmen()
        // return () => setTasks([])
    }, [])
    const totalSize = salesmen.length;

    const generateListKPIs = (listStaffs) => {
        let arrKPIs = []
        let objKPI = {}
        objKPI = { ...objKPI, criteria: criteria }

        listStaffs.forEach(staff => {
            objKPI = { ...objKPI, username: staff.username }
            arrKPIs.push(objKPI)
        });
        console.log('Sau khi add staffs: arrKPIs = ', arrKPIs);

        setListKPIs(arrKPIs)
        setKPI({ ...KPI, kpis: arrKPIs, users: listStaffs })
    }

    useEffect(() => {
        generateListKPIs([])
    }, []);

    // if (!myCriteria?.targetValue || !myCriteria?.weight) {
    //     setMyCriteria(refractorCriteria)
    // }
    // console.log('Step 3 ------ myCriteria = ', myCriteria);
    console.log('Step 3 ------ listKPIs = ', kpis?.criteria);

    console.log('Step 3: kpi = ', KPI)

    const handleTargetValueChange = (event, rowIndex, criIndex) => {
        const inputValue = event.target.value;
        console.log('inputValue = ', inputValue);
        console.log(`Edit at [${rowIndex}, ${criIndex}]`);

        let newListKPIs = [...listKPIs]
        let editingRow = newListKPIs[rowIndex]
        let editingListCriteria = [...editingRow.criteria]
        // let editingCriteria = editingListCriteria[criIndex]

        // console.log('editingRow: ', editingRow);
        // console.log('editingCriteria: ', editingCriteria);

        // Tách item ra khỏi mảng để edit
        editingListCriteria[criIndex] = {       // editingCriteria
            ...editingListCriteria[criIndex],   // ...editingCriteria
            targetValue: inputValue
        }
        // editingListCriteria[criIndex] = editingCriteria // sau đó đổ item đó vô lại mảng (replace)
        newListKPIs[rowIndex] = {               // editingRow
            ...newListKPIs[rowIndex],           // ...editingRow
            criteria: editingListCriteria
        }
        // console.log('new editingCriteria: ', editingCriteria);
        console.log('newListKPIs: ', newListKPIs);

        // newListKPIs[rowIndex] = {
        //     ...newListKPIs[rowIndex],
        //     criteria: [...listCriteria, [criIndex]]
        // }
        // setMyCriteria(editingListCriteria)
        setListKPIs(newListKPIs)
        setKPI({ ...KPI, criteria: editingListCriteria, kpis: newListKPIs })
    }

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate)
        setKPI({ ...KPI, startDate: newDate })
    }

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate)
        setKPI({ ...KPI, endDate: newDate })
    }

    const handleSalesmenChange = (event, selectedSalesmen) => {
        setStaffs(selectedSalesmen)
        console.log('selectedSalesmen = ', selectedSalesmen);
        setKPI({ ...KPI, users: selectedSalesmen })
        generateListKPIs(selectedSalesmen)
        if (selectedSalesmen.length === totalSize)
            setCheckAll(true)
        else setCheckAll(false)
        // selectedSalesmen.forEach(option => {
        //     setSalesmen([...ArrayUtils.removeItem(salesmen, 'username', option.username)])
        // });
    }

    const handleCheckedAllChange = (event) => {
        const isChecked = event.target.checked
        setCheckAll(isChecked)
        if (isChecked) {
            setStaffs(salesmen)
            setKPI({ ...KPI, users: salesmen })
            generateListKPIs(salesmen)
        }
        else {
            setStaffs([])
            setKPI({ ...KPI, users: [] })
            generateListKPIs([])
        }
    }

    return (
        <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" className={classes.wrapper}>
            <Box display="flex" flexDirection="row" className={classes.child}>
                <Grid item xs={12} sm={6} md={3} lg={2} className={classes.date}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            format="dd/MM/yyyy"
                            allowKeyboardControl
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            value={startDate}
                            onChange={(newDate) => handleStartDateChange(newDate)}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2} className={classes.date}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            format="dd/MM/yyyy"
                            allowKeyboardControl
                            disableToolbar
                            variant="inline"  // for calendar (date picker)
                            inputVariant="outlined" // for TextField
                            value={endDate}
                            onChange={(newDate) => handleEndDateChange(newDate)}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        multiple
                        limitTags={0}
                        noOptionsText="Cannot find Salesman"
                        disableCloseOnSelect
                        value={staffs}
                        onChange={(event, checkedSalesmen) =>
                            handleSalesmenChange(event, checkedSalesmen)
                        }
                        options={salesmen}
                        getOptionLabel={(salesman) =>
                            salesman.fullName ? salesman.fullName : ''
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Salesmen"
                                // margin="normal"
                                variant="outlined"
                                placeholder={staffs.length === 0 ? "Search Salesman by name" : ""}
                            // onChange={onSearchSalesmenChange}
                            // ref={params.InputProps.ref}
                            />
                        )}
                        renderOption={(option, { selected }) => (
                            <>
                                <Checkbox
                                    icon={<MdCheckBoxOutlineBlank />}
                                    checkedIcon={<MdCheckBox />}
                                    style={{ marginRight: 5 }}
                                    checked={selected}
                                />
                                <div key={option.username} className={styles.itemPIC}>
                                    <ListItemAvatar>
                                        <Avatar src={option.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={option?.fullName ? option.fullName : ''}
                                        secondary={option?.username ? option.username : ''}
                                        classes={{
                                            primary: styles.itemTextPrimary,
                                            secondary: styles.itemTextSecondary
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        renderTags={(value, getTagProps) => {
                            if (value.length === totalSize) {
                                return (
                                    <Typography style={{ fontSize: '0.95rem', color: '#616161', fontStyle: 'italic' }}>Selected all salesmen</Typography>
                                )
                            } else {
                                return (
                                    <Typography style={{ fontSize: '0.95rem', color: '#616161', fontStyle: 'italic' }}>Selected {value.length} salesmen</Typography>
                                )
                            }
                            // value.map((option, index) => (
                            //     <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            // ))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} className={classes.avaGroup}>
                    <FormControl className={classes.formControlCheckbox}>
                        <FormControlLabel
                            value={checkAll}
                            control={
                                <Checkbox color="secondary"
                                    checked={checkAll}
                                    onChange={handleCheckedAllChange} />
                            }
                            label="Select all"
                            labelPlacement="end"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} className={classes.avaGroup}>
                    <AvatarGroup max={4}>
                        {staffs.map(staff => (
                            <Avatar key={staff.username} src={staff?.avatar} />
                        ))}
                    </AvatarGroup>
                </Grid>
            </Box>

            <div className={classes.child}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader size="small">
                        <TableHead className={classes.tHead}>
                            <TableRow className={classes.tBodyRow}>
                                {/* <div className={classes.tHeadCellSticky} rowSpan={2}> */}
                                <TableCell colSpan={2} style={{ backgroundColor: '#2a4865' }} />
                                {/* <TableCell rowSpan={2} style={{ minWidth: 5, maxWidth: 5 }} className={classes.tHeadCell}>#</TableCell>
                                <TableCell rowSpan={2} style={{ minWidth: 100, maxWidth: 250 }}
                                    className={classes.tHeadCell}>Salesman</TableCell> */}
                                {/* </div> */}
                                <TableCell className={classes.tHeadCell} align="center" colSpan={criteria.length}>Target Values</TableCell>
                            </TableRow>
                            <TableRow className={classes.tBodyRow}>
                                <TableCell rowSpan={2} style={{ minWidth: 2, maxWidth: 2 }} className={classes.tHeadCell}>#</TableCell>
                                <TableCell rowSpan={2} style={{ minWidth: 120, maxWidth: 150 }}
                                    className={classes.tHeadCell}>Salesman</TableCell>
                                {criteria?.map(cri => (
                                    <TableCell key={cri.id} className={classes.tSubHeadCell} style={{ minWidth: 80, maxWidth: 100 }}>
                                        {cri.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tBody}>
                            {users.map((salesman, rowIndex) => (
                                <TableRow key={salesman.username} className={classes.tBodyRow}>
                                    <TableCell className={classes.tBodyCell} style={{ minWidth: 2, maxWidth: 2 }}>{rowIndex + 1}</TableCell>
                                    <TableCell className={classes.tBodyCell} style={{ minWidth: 120, maxWidth: 150 }}>
                                        <ListItem className={styles.itemPIC}>
                                            {/* <ListItemAvatar>
                                                <Avatar src={salesman?.avatar} />
                                            </ListItemAvatar> */}
                                            <ListItemText
                                                className={classes.picName}
                                                primary={salesman.fullName}
                                                secondary={salesman.username}
                                                classes={{
                                                    primary: styles.itemTextPrimary,
                                                    secondary: styles.itemTextSecondary,
                                                }}
                                            />
                                        </ListItem>
                                    </TableCell>
                                    {kpis[rowIndex]?.criteria?.map((cri, criIndex) => (
                                        <TableCell key={cri.id} className={classes.tBodyCellTextField} style={{ minWidth: 80, maxWidth: 100 }}>
                                            <TextField className={classes.txtTargetValue}
                                                variant="outlined" size="small"
                                                type="number"
                                                value={cri.targetValue}
                                                onChange={(event) => handleTargetValueChange(event, rowIndex, criIndex)}
                                                InputProps={{
                                                    inputProps: { min: 0, max: 999999999999 }  // 999 tỷ 999 triệu 999 ngàn 999
                                                }}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box >
    )
}

export default Step3

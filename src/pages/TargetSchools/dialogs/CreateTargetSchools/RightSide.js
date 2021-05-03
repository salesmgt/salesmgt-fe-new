import React, { useState } from 'react'
import {
    FormControl,
    Grid, IconButton, InputLabel, ListItemText, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@material-ui/core'
import { previewColumns } from './CreateTargetSchoolsConfig'
import { Consts } from '../DialogConfig'
import { statusNames } from '../../../../constants/Generals'
import { useTargetForm } from './TargetFormContext'
import { MdClose } from 'react-icons/md'
import * as Milk from '../../../../utils/Milk'
import { milkNames } from '../../../../constants/Generals'
import { useApp } from '../../../../hooks/AppContext'
import { getPurpsByStatus } from '../../../../utils/Sortings'
import classes from './RightSide.module.scss'

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
        marginBottom: theme.spacing(1),
        minWidth: 160,
    },
    option: {
        fontSize: '0.875rem',
    },
    root: {},
    menuItemRoot: {
        '&$menuItemSelected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        '&$menuItemSelected:focus': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
        },
        '&$menuItemSelected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04);',
        },
    },
    menuItemSelected: {},
}))

function RightSide(props) {
    const styles = useStyles()
    const { data, setData, status } = props  // data từ bảng check bên kia qua
    const { fields } = Consts
    const [rowsState, setRowsState] = useState([])
    const [purpose, setPurpose] = useState('')
    const [schoolYear, setSchoolYear] = useState('')

    const { salesPurps } = useApp()

    const bakSalesPurps = salesPurps
        ? salesPurps
        : Milk.getMilk(milkNames.salesPurps)

    const purposes = getPurpsByStatus(statusNames.customer, bakSalesPurps)
    // const purposes = getPurpsByStatus(status, bakSalesPurps)

    let schoolYears = []
    const generateListSchoolYears = () => {
        const schYears = []; 
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();

        if (thisMonth < 7) {
            schYears.push(`${thisYear - 1}-${thisYear}`);
            schYears.push(`${thisYear}-${thisYear + 1}`);
        } else {
            schYears.push(`${thisYear}-${thisYear + 1}`);
            schYears.push(`${thisYear + 1}-${thisYear + 2}`);
        }
        return schYears;
    }
    schoolYears = generateListSchoolYears()

    const handleOnRemove = (e, row) => {
        let newSelected = []
        const selectedIndex = rowsState.indexOf(row)
        if (selectedIndex === 0) {
            newSelected = newSelected.concat(rowsState.slice(1))
        } else if (selectedIndex === rowsState.length - 1) {
            newSelected = newSelected.concat(rowsState.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                rowsState.slice(0, selectedIndex),
                rowsState.slice(selectedIndex + 1)
            )
        }
        setRowsState(newSelected)
        if (newSelected.length === 0) {
            // onClose()
        }
    }

    const handlePurposeChange = (event) => {
        setPurpose(event.target.value)
    }

    return (        
        <div className={classes.wrapper}>
            <Grid container> 
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl className={styles.formControl}>
                                <InputLabel>{fields.purpose.label}</InputLabel>
                                <Select
                                    value={purpose || ''}
                                    onChange={handlePurposeChange}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value=""
                                        className={styles.option}
                                        classes={{
                                            root: styles.menuItemRoot,
                                            selected: styles.menuItemSelected,
                                        }}
                                    >
                                        {fields.purpose.options.none}
                                    </MenuItem>
                                    {purposes?.map((purp) => (
                                        <MenuItem
                                            key={purp}
                                            value={purp}
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected:
                                                    styles.menuItemSelected,
                                            }}
                                        >
                                            {purp}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl className={styles.formControl}>
                                <InputLabel>{fields.schoolYear.label}</InputLabel>
                                <Select
                                    value={schoolYear || schoolYears[0]}
                                    onChange={(event) => setSchoolYear(event.target.value)}
                                    MenuProps={MenuProps}
                                >
                                    {schoolYears?.map((year) => (
                                        <MenuItem
                                            key={year}
                                            value={year}
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected:
                                                    styles.menuItemSelected,
                                            }}
                                        >
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1">
                        List of assigned schools:
                    </Typography>
                    <TableContainer
                        className={classes.container}
                        component={Paper}
                    >
                        <Table
                            className={classes.table}
                            stickyHeader
                            size="small"
                        >
                            <TableHead>
                                <TableRow className={classes.tHead}>
                                    {previewColumns.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            className={classes.tHeadCell}
                                            align={col.align}
                                            width={col.width}
                                        >
                                            {col.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tBody}>
                                {rowsState.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tBodyCell}
                                        >
                                            <ListItemText
                                                primary={row.schoolName}
                                                secondary={row.district}
                                                classes={{
                                                    primary:
                                                        classes.itemTextPrimary,
                                                    secondary:
                                                        classes.itemTextSecondary,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(e) =>
                                                    handleOnRemove(e, row)
                                                }
                                            >
                                                <MdClose />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}

export default RightSide
import React, { useState } from 'react'
import {
    Button,
    TextField,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    InputAdornment,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar,
    TableHead,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    makeStyles,
    Paper,
} from '@material-ui/core'
import { MdAccountCircle } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import { Consts, columns } from '../FormConfig'
import classes from './AssignMultiple.module.scss'

const clientSchema = yup.object().shape({
    // title: yup.string().trim().max(30).required(),
    // remark: yup.string().trim().max(50).required(),
    PIC: yup.string().required(),
    // purpose: yup.string().required()
})

//===============Set max-height for dropdown list===============
const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        }
    }
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        marginTop: '0.8rem',
        minWidth: 160,
        // maxWidth: 180
    },
    option: {
        fontSize: '0.875rem'
    },
    lastOption: {
        fontSize: '0.875rem',
        borderBottom: '0.5px solid #e0e0e0'
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
    autoComplete: {
        width: 250,
        marginLeft: '0.5rem'
    },
    itemPIC: {
        padding: 0,
        margin: 0
    },
    itemTextPrimary: {
        fontSize: '0.875rem',
    },
    itemTextSecondary: {
        fontSize: '0.8rem',
    },
}));

function AssignMultipleForm(props) {
    const styles = useStyles();
    const { onClose, rows } = props
    const { operations } = Consts

    const { register, handleSubmit, errors } = useForm({  // getValues, , setError
        resolver: yupResolver(clientSchema),
    })

    const { PICs } = useTargetSchool()

    const [PIC, setPIC] = useState(null)
    const [purpose, setPurpose] = useState('')
    // const [purpose, setPurpose] = useState({})    // Hiện tại chỉ lưu đc purpose của 1 trường
    // Tức là mỗi lần chọn nó sẽ đè gtri mới lên nhau. Sau này update lên là 1 [] các purpose hoặc
    // cứ để 1 obj cũng đc nhưng cần ghi lại cái trường này vao đâu đó luôn để gửi cho API còn Assign.

    const onSubmit = (data) => {
        console.log(data)
        onClose()
    }

    const handlePICChange = (event, newPIC) => {
        setPIC(newPIC);
    };

    const handlePurposeChange = (event) => {    // , target
        setPurpose(event.target.value)
        // target.purpose = event.target.value;
        // // console.log('event.target.value = ', event.target.value);
        // // console.log('target = ', target);
        // setPurpose({
        //     id: target.id,
        //     value: target.purpose
        // });

        // const selectedPurpose = {
        //     // schoolIndex: schoolIndex,
        //     purpose: event.target.value
        // };
        // console.log('selectedPurpose: ', selectedPurpose)
        // console.log('2nd: ', schoolIndex)
        // console.log('3rd: ', schoolIndex)
        // { index, purpose }
    };
    // console.log("Purpose: ", purpose);
    // console.log('List targets: ', rows)

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <DialogContent className={classes.wrapper}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6} lg={5}>
                                <Autocomplete
                                    autoComplete
                                    autoSelect
                                    autoHighlight
                                    clearOnEscape
                                    options={PICs ? PICs : []}
                                    getOptionLabel={(pic) =>
                                        pic.fullName ? pic.fullName : ''
                                    }
                                    value={PIC}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="PICs"
                                            name="PIC"
                                            inputRef={register}
                                            error={!!errors.PIC}
                                            helperText={errors?.PIC?.message}
                                            margin="normal"
                                            placeholder="PIC will be assigned"
                                            // ref={params.InputProps.ref}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <>
                                                        <InputAdornment position="start">
                                                            <MdAccountCircle />
                                                        </InputAdornment>
                                                        {params.InputProps.startAdornment}
                                                    </>
                                                )
                                            }}
                                        />
                                    }
                                    renderOption={(option) => {
                                        return (
                                            <ListItem className={classes.itemPIC} key={option.username}>
                                                <ListItemAvatar>
                                                    <Avatar src={option.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText primary={option.fullName} classes={{ primary: classes.itemTextPrimary }} />
                                            </ListItem>
                                        );
                                    }}
                                    className={styles.autoComplete}
                                    onChange={(event, newPIC) => handlePICChange(event, newPIC)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={6} lg={4}>
                                <FormControl className={styles.formControl}>
                                    <InputLabel>Purposes</InputLabel>
                                    <Select
                                        value={purpose}
                                        onChange={handlePurposeChange}
                                        MenuProps={MenuProps}
                                    // name='purpose'
                                    // inputRef={register}
                                    // error={!!errors.purpose}
                                    >
                                        <MenuItem
                                            value=""
                                            className={styles.lastOption}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected: styles.menuItemSelected,
                                            }}
                                        >
                                            None
                                            </MenuItem>

                                        <MenuItem
                                            value="Sales mới"
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected: styles.menuItemSelected,
                                            }}
                                        >
                                            Sales mới
                                            </MenuItem>
                                        <MenuItem
                                            value="Theo dõi"
                                            className={styles.lastOption}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected: styles.menuItemSelected,
                                            }}
                                        >
                                            Theo dõi
                                            </MenuItem>

                                        <MenuItem
                                            value="Chăm sóc"
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected: styles.menuItemSelected,
                                            }}
                                        >
                                            Chăm sóc
                                            </MenuItem>
                                        <MenuItem
                                            value="Tái ký hợp đồng"
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected: styles.menuItemSelected,
                                            }}
                                        >
                                            Tái ký hợp đồng
                                            </MenuItem>
                                        <MenuItem
                                            value="Ký mới hợp đồng"
                                            className={styles.option}
                                            classes={{
                                                root: styles.menuItemRoot,
                                                selected: styles.menuItemSelected,
                                            }}
                                        >
                                            Ký mới hợp đồng
                                            </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant='subtitle1'>List of assigned schools:</Typography>
                        <TableContainer className={classes.container} component={Paper}>
                            <Table className={classes.table} stickyHeader size="small">
                                <TableHead>
                                    <TableRow className={classes.tHead}>
                                        {columns.map(col => (
                                            <TableCell
                                                key={col}
                                                className={classes.tHeadCell}
                                                align={col === 'no' ? 'center' : 'left'}
                                            >
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes.tBody}>
                                    {rows.map((row, index) => (
                                        <TableRow key={row.id} className={classes.tBodyRow}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell className={classes.tBodyCell}>
                                                <ListItemText
                                                    primary={row.schoolName}
                                                    secondary={row.district}
                                                    classes={{
                                                        primary: classes.itemTextPrimary,
                                                        secondary: classes.itemTextSecondary
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell className={classes.tBodyCell}>
                                                {PIC ? (
                                                    <ListItem className={classes.itemPIC}>
                                                        <ListItemAvatar><Avatar src={PIC.avatar} /></ListItemAvatar>
                                                        <ListItemText
                                                            primary={PIC.fullName}
                                                            secondary={PIC.username}
                                                            classes={{
                                                                primary: classes.itemTextPrimary,
                                                                secondary: classes.itemTextSecondary
                                                            }}
                                                        />
                                                    </ListItem>
                                                ) : ''}
                                            </TableCell>   {/**Trần Thị Xuân Tuyền */}
                                            <TableCell className={classes.tBodyCell}>
                                                {purpose || ''}
                                            </TableCell>
                                            <TableCell className={classes.tBodyCell}>
                                                {row.note || ''}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions className="">
                <Button type="submit" onClick={handleSubmit(onSubmit)} className={classes.btnSave}>
                    {operations.save}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </form>
    )
}

export default AssignMultipleForm
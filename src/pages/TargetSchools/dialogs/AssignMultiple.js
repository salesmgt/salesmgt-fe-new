import React, { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    withStyles,
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
    // ListSubheader,
    makeStyles,
    Paper,
} from '@material-ui/core'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { useTargetSchool } from '../hooks/TargetSchoolContext'
import classes from './AssignMultiple.module.scss'

const clientSchema = yup.object().shape({
    // title: yup.string().trim().max(30).required(),
    // remark: yup.string().trim().max(50).required(),
    PIC: yup.string().required(),
    // purpose: yup.string().required()
})

const stylesTitle = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

// const StyledTableContainer = withStyles((theme) => ({
//     root: {
//         width: "max-content"
//     }
// }))(TableContainer);

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

function AssignMultiple(props) {
    const styles = useStyles();
    const { open, onClose, rows } = props

    const { register, handleSubmit, errors } = useForm({  // getValues, , setError
        resolver: yupResolver(clientSchema),
    })

    const { PICs } = useTargetSchool()

    // const columns = [
    //     { key: "no", name: 'No' },
    //     { key: "schoolName", name: 'School Name' },
    //     { key: "user.fullName", name: 'PIC' },
    //     { key: "targetPurposeName", name: 'Purpose' }
    // ]
    // const [open, setOpen] = useToggle()
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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth component="form" className={classes.dialog}>
            <DialogTitleWithIconClose onClose={onClose}>
                Assign Salesman to Target School
            </DialogTitleWithIconClose>
            {/* <Divider /> */}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <Autocomplete
                                        autoComplete
                                        autoSelect
                                        autoHighlight
                                        clearOnEscape
                                        options={PICs}
                                        getOptionLabel={(pic) => pic.fullName}
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
                                                <ListItem className={classes.itemPIC}>
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
                                <Grid item xs={12} sm={12} md={6} lg={4}>
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
                                            {/* {columns.map(col => (
                                                <TableCell
                                                    key={col.key}
                                                    className={classes.tHeadCell}
                                                    align={col.key === 'no' ? 'center' : 'left'}
                                                >
                                                    {col.name}
                                                </TableCell>
                                            ))} */}
                                            <TableCell className={classes.tHeadCell} align='center'>#</TableCell>
                                            <TableCell className={classes.tHeadCell}>School Name</TableCell>
                                            <TableCell className={classes.tHeadCell}>PIC</TableCell>
                                            <TableCell className={classes.tHeadCell}>Purpose</TableCell>
                                            <TableCell className={classes.tHeadCell}>Note</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className={classes.tBody}>
                                        {rows.map((row, index) => (
                                            <TableRow key={row.id} className={classes.tBodyRow}>
                                                <TableCell align="center">
                                                    {index + 1}
                                                </TableCell>
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
                                                    {PIC && (
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
                                                    )}
                                                </TableCell>   {/**Trần Thị Xuân Tuyền */}
                                                <TableCell className={classes.tBodyCell}>
                                                    {purpose}
                                                </TableCell>
                                                <TableCell className={classes.tBodyCell}> {/*contentEditable */}
                                                    {row.note}
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
                    <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} className={classes.btnSave}>
                        Save
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AssignMultiple
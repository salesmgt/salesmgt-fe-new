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
    ListSubheader,
    makeStyles,
    Paper,
} from '@material-ui/core'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { useTargetSchool } from '../hooks/TargetSchoolContext'
import classes from './AssignDialog.module.scss'

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

const StyledTableContainer = withStyles((theme) => ({
    root: {
        width: "max-content"
    }
}))(TableContainer);

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
        minWidth: 160,
        // maxWidth: 180
    }
}));

function AssignDialog(props) {
    const styles = useStyles();
    const { open, onClose, rows } = props

    const { register, handleSubmit, errors } = useForm({  // getValues, , setError
        resolver: yupResolver(clientSchema),
    })

    const { PICs } = useTargetSchool()

    const columns = [
        { key: "no", name: 'No' },
        { key: "schoolName", name: 'School Name' },
        { key: "user.fullName", name: 'PIC' },
        { key: "targetPurposeName", name: 'Purpose' }
    ]
    // const [open, setOpen] = useToggle()
    const [PIC, setPIC] = useState(null)
    const [purpose, setPurpose] = useState({})    // Hiện tại chỉ lưu đc purpose của 1 trường
    // Tức là mỗi lần chọn nó sẽ đè gtri mới lên nhau. Sau này update lên là 1 [] các purpose hoặc
    // cứ để 1 obj cũng đc nhưng cần ghi lại cái trường này vao đâu đó luôn để gửi cho API còn Assign.

    const onSubmit = (data) => {
        console.log(data)
        onClose()
    }

    const handlePICChange = (event, newPIC) => {
        setPIC(newPIC);
    };

    const handlePurposeChange = (event, target) => {
        target.purpose = event.target.value;
        // console.log('event.target.value = ', event.target.value);
        // console.log('target = ', target);
        setPurpose({
            id: target.id,
            value: target.purpose
        });
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
            <Divider />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                    // inputProps={{ style: { fontSize: '0.875rem' }}}
                                    />
                                }
                                renderOption={(option) => {
                                    return (
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar src={option.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText primary={option.fullName} primaryTypographyProps={{ style: { fontSize: '0.875rem' } }} />
                                        </ListItem>
                                    );
                                }}
                                style={{ width: 250, marginLeft: '0.52rem' }}
                                onChange={(event, newPIC) => handlePICChange(event, newPIC)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant='subtitle1'>List of assigned schools:</Typography>
                            <StyledTableContainer className={classes.container} component={Paper}>
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
                                            <TableCell className={classes.tHeadCellNo} align='center'>No.</TableCell>
                                            <TableCell className={classes.tHeadCellName}>School Name</TableCell>
                                            <TableCell className={classes.tHeadCellPic}>PIC</TableCell>
                                            <TableCell className={classes.tHeadCellPurpose}>Purpose</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className={classes.tBody}>
                                        {rows.map((row, index) => (
                                            <TableRow key={row.id} className={classes.tBodyRow}>
                                                <TableCell align="center" width="1rem">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className={classes.tBodyCell}>
                                                    <ListItemText
                                                        primary={row.schoolName}
                                                        primaryTypographyProps={{ style: { fontSize: '0.875rem' } }}
                                                        secondary={row.district}
                                                        secondaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.tBodyCell}>
                                                    {PIC && (
                                                        <ListItem
                                                            style={{ padding: 0, margin: 0 }}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar src={PIC.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={PIC.fullName}
                                                                primaryTypographyProps={{
                                                                    style: {
                                                                        fontSize: '0.875rem',
                                                                    },
                                                                }}
                                                                secondary={PIC.username}
                                                                secondaryTypographyProps={{
                                                                    style: {
                                                                        fontSize: '0.8rem',
                                                                    },
                                                                }}
                                                            />
                                                        </ListItem>
                                                    )}
                                                </TableCell>   {/**Trần Thị Xuân Tuyền */}
                                                <TableCell className={classes.tBodyCell}>
                                                    <FormControl className={styles.formControl}>
                                                        <InputLabel>Purposes</InputLabel>
                                                        <Select
                                                            // value={purpose.schoolIndex === index ? purpose.purpose : ''}
                                                            // value={purpose.schoolIndex === index && purpose.purpose}
                                                            // value={purpose.purpose}
                                                            value={purpose.value}
                                                            onChange={(event, school) => handlePurposeChange(event, row)}
                                                            // onChange={handlePurposeChange}
                                                            // inputProps={{ style: { fontSize: '0.3rem'}}}
                                                            MenuProps={MenuProps}
                                                        // name='purpose'
                                                        // inputRef={register}
                                                        // error={!!errors.purpose}
                                                        >
                                                            <MenuItem value="" className={classes.option} style={{ borderBottom: '0.5px solid #e0e0e0' }}>None</MenuItem>
                                                            <ListSubheader className={classes.option}><em>Leads</em></ListSubheader>
                                                            <MenuItem value="Sales mới" className={classes.option}>Sales mới</MenuItem>
                                                            <MenuItem value="Theo dõi" className={classes.option} style={{ borderBottom: '0.5px solid #e0e0e0' }}>Theo dõi</MenuItem>
                                                            <ListSubheader className={classes.option}><em>Customers</em></ListSubheader>
                                                            <MenuItem value="Chăm sóc" className={classes.option}>Chăm sóc</MenuItem>
                                                            <MenuItem value="Tái ký hợp đồng" className={classes.option}>Tái ký hợp đồng</MenuItem>
                                                            <MenuItem value="Ký mới hợp đồng" className={classes.option} style={{ borderBottom: '0.5px solid #e0e0e0' }}>Ký mới hợp đồng</MenuItem>
                                                            <ListSubheader className={classes.option}><em>Ngưng hợp tác</em></ListSubheader>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        </Grid>
                    </Grid>


                </DialogContent>
                <Divider />
                <DialogActions className="">
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} className={classes.btnSave}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AssignDialog


//     < TextField
// label = "Title"
// name = "title"
// className = ""
// variant = "outlined"
// autoFocus
// required
// fullWidth
// InputLabelProps = {{
//     shrink: true,
//                         }}
// inputRef = { register }
// error = {!!errors.title}
// helperText = { errors?.title?.message }
//     />
//                     <FormControlLabel
//                         className=""
//                         label="All Day"
//                         control={
//                             <Switch
//                                 // checked={form.allDay}
//                                 id="allDay"
//                                 name="allDay"
//                             // onChange={handleChange}
//                             />
//                         }
//                     />

//                     <TextField
//                         label="Remark"
//                         name="remark"
//                         className=""
//                         variant="outlined"
//                         fullWidth
//                         inputRef={register}
//                         error={!!errors.remark}
//                         helperText={errors?.remark?.message}
//                     />
//                     <TextField
//                         label="Description"
//                         name="des"
//                         className=""
//                         variant="outlined"
//                         type="text"
//                         multiline
//                         rows={5}
//                         fullWidth
//                         inputRef={register}
//                     // error={!!errors.des}
//                     // helperText={errors?.des?.message}
//                     />
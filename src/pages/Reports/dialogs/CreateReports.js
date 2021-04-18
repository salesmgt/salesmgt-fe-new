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
    makeStyles,
    ListItem,
    ListItemText,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Box,
} from '@material-ui/core'
import { MdAdd, MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import * as moment from 'moment'
import classes from './CreateReports.module.scss'

const clientSchema = yup.object().shape({
    username: yup.string().trim().min(8).max(30).required(),
    fullName: yup.string().trim().max(50).required(),
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
})

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

const ITEM_HEIGHT = 120
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT,
        },
    },
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    getContentAnchorEl: null,
}

const useStyles = makeStyles((theme) => ({
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
        margin: 0,
        padding: 0,
    },
    item: {
        padding: 0,
        margin: 0,
    },
    itemTextPrimary: {
        fontSize: '0.875rem',
    },
    itemTextSecondary: {
        fontSize: '0.8rem',
    },
    chipDate: {
        padding: '0.25rem',
        fontSize: '1.35rem',
        color: '#fff',
        backgroundColor: '#4caf50',
        // borderRadius: "0.5rem"
    },
}))

function CreateReports(props) {
    const styles = useStyles()
    const { open, onClose } = props

    const { control, register, handleSubmit, errors, formState } = useForm({
        // getValues, , setError
        resolver: yupResolver(clientSchema),
    })
    // const [open, setOpen] = useToggle()

    // const defaultValue = {
    // }

    const onSubmit = (data) => {
        console.log(data)
    }

    const [target, setTarget] = useState({})
    const targets = [
        {
            id: 10,
            schoolName: 'THCS Hiệp Thành',
            district: 'Quận 4',
        },
        {
            id: 12,
            schoolName: 'Tiểu học Xuân Thu',
            district: 'Quận Bình Tân',
        },
        {
            id: 13,
            schoolName: 'THCS Võ Trường Toản',
            district: 'Quận 1',
        },
        {
            id: 16,
            schoolName: 'THPT Nguyễn Thượng Hiền',
            district: 'Quận Phú Nhuận',
        },
        {
            id: 20,
            schoolName: 'THPT Marie Cuire',
            district: 'Quận 10',
        },
        {
            id: 21,
            schoolName: 'Tiểu học Đặng Trần Côn',
            district: 'Quận 12',
        },
        {
            id: 30,
            schoolName: 'THPT Nguyễn Trãi',
            district: 'Quận 3',
        },
        {
            id: 34,
            schoolName: 'Tiểu học Nguyễn Văn Cừ',
            district: 'Quận 5',
        },
    ] // Giờ để tạm ở đây để test trước chứ đúng ra là gọi API đổ vào

    // const handleTargetChange = (event, newTarget) => {
    //     setTarget(newTarget)
    // }

    const rows = [
        {
            id: 10,
            schoolName: 'THCS Hiệp Thành',
            district: 'Quận 4',
            result: 'OK',
            des: 'Đã giới thiệu về Major Education',
            positivity: 'Thầy rất thiện chí',
            difficulty: '',
            plan: 'Giới thiệu thêm chương trình Toán Khoa cho Thầy',
        },
        {
            id: 12,
            schoolName: 'Tiểu học Xuân Thu',
            district: 'Quận Bình Tân',
            result: 'Không gặp được HT',
            des: 'Thầy đi công tác. Đã gửi quà cho Thầy Hiệu phó.',
            positivity: 'Thầy rất thiện chí',
            difficulty: '',
            plan: '',
        },
    ]

    const truncateString = (str) => {
        if (str) return str.length > 30 ? str.substring(0, 27) + '...' : str
        else return ''
    }

    const parseDateToString = () => {
        const today = new Date()
        return moment(today).format('dddd, DD-MM-YYYY')
        // console.log('Today is: ', displayDate);
    }
    // parseDateToString()

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            component="form"
            className={classes.dialog}
        >
            <DialogTitleWithIconClose onClose={onClose}>
                Create Report
            </DialogTitleWithIconClose>
            <Divider />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Autocomplete
                                        autoComplete
                                        autoSelect
                                        autoHighlight
                                        clearOnEscape
                                        // multiple
                                        options={targets}
                                        getOptionLabel={(target) =>
                                            target.schoolName
                                        }
                                        value={target}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Target School Name"
                                                variant="outlined"
                                                name="target"
                                                required
                                                inputRef={register}
                                                error={!!errors.target}
                                                helperText={
                                                    errors?.target?.message
                                                }
                                                className={styles.autoComplete}
                                            />
                                        )}
                                        renderOption={(target) => {
                                            return (
                                                <ListItem
                                                    className={styles.item}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            target.schoolName
                                                        }
                                                        secondary={
                                                            target.district
                                                        }
                                                        classes={{
                                                            primary:
                                                                styles.itemTextPrimary,
                                                            secondary:
                                                                styles.itemTextSecondary,
                                                        }}
                                                    />
                                                </ListItem>
                                            )
                                        }}
                                        onChange={(event, newPIC) =>
                                            setTarget(newPIC)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label="Result"
                                        name="result"
                                        className=""
                                        variant="outlined"
                                        required
                                        fullWidth
                                        inputRef={register}
                                        error={!!errors.result}
                                        helperText={errors?.result?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label="Description"
                                        name="des"
                                        className=""
                                        variant="outlined"
                                        type="text"
                                        required
                                        multiline
                                        rows={3}
                                        fullWidth
                                        inputRef={register}
                                        error={!!errors.des}
                                        helperText={errors?.des?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label="Positivity"
                                        name="positivity"
                                        variant="outlined"
                                        fullWidth
                                        // inputRef={register}
                                        // error={!!errors.positivity}
                                        // helperText={errors?.positivity?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label="Difficulty"
                                        name="difficulty"
                                        variant="outlined"
                                        fullWidth
                                        // inputRef={register}
                                        // error={!!errors.difficulty}
                                        // helperText={errors?.difficulty?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label="Future Plan"
                                        name="plan"
                                        variant="outlined"
                                        fullWidth
                                        // inputRef={register}
                                        // error={!!errors.plan}
                                        // helperText={errors?.plan?.message}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        flexWrap="nowrap"
                                    >
                                        <Box flexGrow={1}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                            >
                                                <MdAdd fontSize="large" />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Chip
                                                label={parseDateToString()}
                                                variant="default"
                                                className={styles.chipDate}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6">
                                        Preview:
                                    </Typography>
                                    <TableContainer
                                        className={classes.container}
                                        component="div"
                                    >
                                        <Table
                                            className={classes.table}
                                            stickyHeader
                                            size="small"
                                        >
                                            <TableHead>
                                                <TableRow
                                                    className={classes.tHead}
                                                >
                                                    <TableCell
                                                        align="left"
                                                        className={
                                                            classes.tHeadCell
                                                        }
                                                    >
                                                        #
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            classes.tHeadCell
                                                        }
                                                    >
                                                        School Name
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            classes.tHeadCell
                                                        }
                                                    >
                                                        Result
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            classes.tHeadCell
                                                        }
                                                    >
                                                        Description
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow
                                                        key={row.id}
                                                        className={
                                                            classes.tBodyRow
                                                        }
                                                    >
                                                        <TableCell
                                                            align="left"
                                                            className={
                                                                classes.tBodyCell
                                                            }
                                                        >
                                                            {index}
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                classes.tBodyCell
                                                            }
                                                        >
                                                            {row.schoolName}
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                classes.tBodyCell
                                                            }
                                                        >
                                                            {row.result}
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                classes.tBodyCell
                                                            }
                                                        >
                                                            {truncateString(
                                                                row.des
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider />
                <DialogActions className="">
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        className={classes.btnSave}
                        variant="contained"
                        type="submit"
                        disabled={!formState.isDirty}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateReports

// < FormControlLabel
//     className = ""
//     label = "isMale"
//     control = {
//         < Switch
//         // checked={form.allDay}
//         id = "isMale"
//         name = "isMale"
//         // onChange={handleChange}
//         />
//     }
// />
//  <TextField
//     label="Description"
//     name="des"
//     className=""
//     variant="outlined"
//     type="text"
//     multiline
//     rows={5}
//     fullWidth
//     inputRef={register}
// // error={!!errors.des}
// // helperText={errors?.des?.message}
// />

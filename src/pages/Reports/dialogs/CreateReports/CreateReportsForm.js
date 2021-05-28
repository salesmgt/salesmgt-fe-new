import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    TextField,
    DialogContent,
    DialogActions,
    IconButton,
    Grid,
    Typography,
    ListItemText,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    makeStyles,
} from '@material-ui/core'
import { MdAdd, MdDelete } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { parseDateToString } from '../../../../utils/DateTimes'
import * as ReportsServices from '../../ReportsServices'
import { useHistory } from 'react-router'
import * as ArrayUtils from '../../../../utils/Arrays'
import { calculateSchoolYear } from '../../../../utils/DateTimes'
import { useAuth } from '../../../../hooks/AuthContext'
import {
    Consts,
    columns,
    IS_SUCCESS,
    DESCRIPTION,
    POSITIVITY,
    DIFFICULTY,
    FUTURE_PLAN,
} from '../DialogConfig'
import { useReport } from '../../hooks/ReportContext'
import classes from './CreateReports.module.scss'

const clientSchema = yup.object().shape({
    // username: yup.string().trim().min(8).max(30).required(),
    // fullName: yup.string().trim().max(50).required(),
})

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

function CreateReportsForm(props) {
    const styles = useStyles()
    const { onClose, refreshAPI, setNotify } = props
    const { headers, operations, fields } = Consts

    const { user } = useAuth()
    const history = useHistory()

    const { params } = useReport()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const typingTimeoutRef = useRef({})

    const { register, errors } = useForm({
        // getValues, , setError, control, handleSubmit, formState
        resolver: yupResolver(clientSchema),
    })

    // const onSubmit = (data) => {
    //     console.log(data)
    // }

    const defaultTask = {
        avatar: '',
        district: '',
        fullName: '',
        id: -1,
        level: '',
        note: '',
        noteBy: '',
        purpose: '',
        reprEmail: '',
        reprIsMale: false,
        reprName: '',
        reprPhone: '',
        schoolAddress: '',
        schoolId: -1,
        schoolName: '',
        // schoolScale: '',
        schoolStatus: '',
        schoolType: '',
        schoolYear: '',
        userEmail: '',
        userPhone: '',
        username: '',
    }
    const defaultFormValue = {
        isSuccess: true,
        description: '',
        positivity: '',
        difficulty: '',
        futurePlan: '',
    }
    const [task, setTask] = useState(defaultTask)
    const [tasks, setTasks] = useState([])
    const [formValue, setFormValue] = useState(defaultFormValue)

    const getListTasks = (searchKey) => {
        ReportsServices.getTasks({
            username: user.username,
            schoolYear: calculateSchoolYear(),
            key: searchKey,
        })
            .then((data) => {
                setTasks(data)
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
        getListTasks()
        // return () => setTasks([])
    }, [])

    const onSearchTaskChange = (event) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const searchKey = event.target.value
            // console.log('searchKey = ', searchKey)
            if (searchKey) {
                // setTask(searchKey);
                getListTasks(searchKey)
            } else {
                getListTasks()
            }
        }, 300)
    }

    // console.log('initial value for task: ', task);

    const handleTaskChange = (event, newTask) => {
        // console.log('handleTaskChange - event: ', event);
        if (newTask) {
            // console.log('ko null');
            setTask(newTask)
        } else {
            // console.log('null roi');
            setTask(defaultTask)
        }
        // console.log('newTask: ', newTask)
    }

    const [listReports, setListReports] = useState([])

    // const listReportsData = () => {
    //     console.log('listReportsData - form value: ', formValue);
    //     console.log('listReportsData - task: ', task);

    //     const report = {
    //         username: user.username,
    //         date: parseDateToString(new Date(), 'YYYY-MM-DD'),
    //         schoolYear: calculateSchoolYear(),
    //         taskId: parseInt(task.id),
    //         schoolName: task.schoolName,
    //         level: task.level,
    //         result: formValue.result,
    //         description: formValue.description,
    //         positivity: formValue.positivity,
    //         difficulty: formValue.difficulty,
    //         futurePlan: formValue.futurePlan,
    //     }

    //     listReports.forEach(re => {
    //         if (re.taskId === report.taskId) {
    //             removeReport(re.taskId)
    //         }
    //     });
    //     setListReports([...listReports, report])
    //     resetForm()
    // }

    const addReports = (event) => {
        event.preventDefault()
        // const e = event.target;

        // const report = {
        //     username: user.username,
        //     date: parseDateToString(new Date(), 'YYYY-MM-DD'),
        //     schoolYear: calculateSchoolYear(),
        //     taskId: parseInt(e.taskId.value),
        //     schoolName: e.targetName.value,
        //     level: e.level.value,
        //     result: e.result.value,
        //     description: e.description.value,
        //     positivity: e.positivity.value,
        //     difficulty: e.difficulty.value,
        //     futurePlan: e.futurePlan.value,
        // }

        const report = {
            // username: user.username,
            date: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            // schoolYear: calculateSchoolYear(),
            taskId: parseInt(task.id),
            schoolName: task.schoolName,
            level: task.level,
            isSuccess: formValue.isSuccess,
            description: formValue.description,
            positivity: formValue.positivity,
            difficulty: formValue.difficulty,
            futurePlan: formValue.futurePlan,
        }

        listReports.forEach((re) => {
            if (re.taskId === report.taskId) {
                // Remove task cũ, ghi đè bằng task đó bản chỉnh sửa
                // console.log('Remove duplicate task ', re.taskId)
                // setListReports([
                //     ...ArrayUtils.removeItem(listReports, 'taskId', re.taskId),
                // ])
                removeReport(re.taskId) // tại sao phải viết lại 3 dòng code trên trong khi có thể gọi lại hàm này?
                // setListReports([...listReports, report])
            }
        })
        setListReports([...listReports, report]) // Để ngoài này vì có trùng hay ko thì cũng vẫn add vô list
        resetForm()

        // listReportsData()
    }

    const removeReport = (taskId) => {
        setListReports([
            ...ArrayUtils.removeItem(listReports, 'taskId', taskId),
        ])
        resetForm()
        // console.log('Remove task ', taskId)
    }

    const resetForm = () => {
        setTask(defaultTask)
        setFormValue(defaultFormValue)
    }

    const handleFormChange = (event, key) => {
        const value = event.target.value

        switch (key) {
            case IS_SUCCESS:
                setFormValue({
                    ...formValue,
                    isSuccess: value,
                })
                break
            case DESCRIPTION:
                setFormValue({
                    ...formValue,
                    description: value,
                })
                break
            case POSITIVITY:
                setFormValue({
                    ...formValue,
                    positivity: value,
                })
                break
            case DIFFICULTY:
                setFormValue({
                    ...formValue,
                    difficulty: value,
                })
                break
            case FUTURE_PLAN:
                setFormValue({
                    ...formValue,
                    futurePlan: value,
                })
                break
            default:
                break
        }
    }

    // console.log('form value: ', formValue);

    // Click on a row in the preview table --> data is displayed in form
    const handleShowClickedRow = (event, row) => {
        const foundTask = searchTasksSchoolById(row.taskId)
        setTask(foundTask)

        setFormValue({
            isSuccess: row?.isSuccess,
            description: row?.description,
            positivity: row?.positivity,
            difficulty: row?.difficulty,
            futurePlan: row?.futurePlan,
        })

        // console.log('foundTask: ', foundTask);
        // console.log('Data of row: ', row);
    }

    const searchTasksSchoolById = (id) => {
        let foundTask = { ...defaultTask }

        tasks.forEach((aTask) => {
            if (aTask.id === id) {
                foundTask = { ...aTask }
            }
        })

        return foundTask
    }

    const handleCreateReport = (event) => {
        // Add to list
        // listReportsData()
        // console.log('handleCreateReport - listReports: ', listReports);
        let reports = []
        if (listReports.length === 0) {
            const report = {
                // username: user.username,
                date: parseDateToString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                // schoolYear: calculateSchoolYear(),
                taskId: parseInt(task?.id),
                // schoolName: task.schoolName,
                // level: task.level,
                isSuccess: formValue?.isSuccess,
                description: formValue?.description,
                positivity: formValue?.positivity,
                difficulty: formValue?.difficulty,
                futurePlan: formValue?.futurePlan,
            }
            reports.push(report)
        } else {
            reports = [...listReports]
        }

        ReportsServices.addReport(reports)
            .then((data) => {
                // console.log('data: ', data);               

                // Chưa báo đc snackbars chỗ này
                if (!String(data).includes('already submitted') && !String(data).includes('Created 0 records')) {
                    setNotify({
                        isOpen: true,
                        message: 'Created successfully.',
                        type: 'success',
                    })
                } else if (String(data).includes('already submitted')) {
                    setNotify({
                        isOpen: true,
                        message: `Created failed. ${data} today.`,
                        type: 'error',
                    })
                } else {
                    setNotify({
                        isOpen: true,
                        message: 'Created failed.',
                        type: 'error',
                    })
                }
                refreshAPI(page, limit, column, direction, searchKey, listFilters)

                handleCloseDialog()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
                setNotify({
                    isOpen: true,
                    message: 'Created failed.',
                    type: 'error',
                })
                handleCloseDialog()
            })
    }

    const truncateString = (str) => {
        if (str) return str.length > 30 ? str.substring(0, 27) + '...' : str
        else return ''
    }

    const handleCloseDialog = () => {
        setListReports([])
        onClose()
    }

    // console.log('formvalue: ', formValue);

    return (
        <>
            <form onSubmit={addReports}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8} md={7} lg={12}>
                                    <Autocomplete
                                        autoComplete
                                        autoSelect
                                        autoHighlight
                                        clearOnEscape
                                        options={tasks ? tasks : []}
                                        // getOptionLabel={(task) => task.schoolName}
                                        getOptionLabel={(task) =>
                                            task?.schoolName
                                                ? `${task?.level} ${task?.schoolName}`
                                                : ''
                                        }
                                        value={task || defaultTask}
                                        // value={task || {}}
                                        renderInput={(params) => (
                                            <>
                                                <TextField
                                                    {...params}
                                                    label={
                                                        fields.task.label
                                                    }
                                                    variant="outlined"
                                                    name={
                                                        fields.task.name
                                                    }
                                                    // value={task}
                                                    required
                                                    inputRef={register}
                                                    error={!!errors.task}
                                                    helperText={
                                                        errors?.task?.message
                                                    }
                                                    className={
                                                        classes.autoComplete
                                                    }
                                                    onChange={
                                                        onSearchTaskChange
                                                    }
                                                />
                                                <input
                                                    type="hidden"
                                                    name={fields.level.name}
                                                    value={task?.level}
                                                />
                                            </>
                                        )}
                                        renderOption={(task) => {
                                            return (
                                                <div className={classes.item}>
                                                    <ListItemText
                                                        primary={
                                                            task?.schoolName
                                                                ? `${task?.level} ${task?.schoolName}`
                                                                : ''
                                                        }
                                                        secondary={
                                                            task?.district
                                                                ? task?.district
                                                                : ''
                                                        }
                                                        classes={{
                                                            primary:
                                                                classes.itemTextPrimary,
                                                            secondary:
                                                                classes.itemTextSecondary,
                                                        }}
                                                    />
                                                </div>
                                            )
                                        }}
                                        onChange={(event, newTask) =>
                                            handleTaskChange(event, newTask)
                                        }
                                    />
                                    <input
                                        type="hidden"
                                        name={fields.id.name}
                                        value={task?.id}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={8} md={6} lg={8}>
                                    <FormControl variant="outlined" fullWidth required>
                                        <InputLabel id="isSuccess-label">{fields.isSuccess.label}</InputLabel>
                                        <Select
                                            labelId="isSuccess-label"
                                            label={fields.isSuccess.label}
                                            value={formValue.isSuccess || false}
                                            onChange={(e, key) => handleFormChange(e, IS_SUCCESS)}
                                            MenuProps={MenuProps}
                                        // fullWidth
                                        // inputRef={register}
                                        // error={!!errors.isSuccess}
                                        // helperText={errors?.isSuccess?.message}
                                        >
                                            <MenuItem
                                                value={true}
                                                className={styles.option}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected: styles.menuItemSelected,
                                                }}
                                            >
                                                Đã gặp người đại diện (HT/HP)
                                            </MenuItem>
                                            <MenuItem
                                                value={false}
                                                className={styles.option}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected: styles.menuItemSelected,
                                                }}
                                            >
                                                Chưa gặp người đại diện (HT/HP)
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label={fields.description.label}
                                        name={fields.description.name}
                                        className=""
                                        variant="outlined"
                                        type="text"
                                        required
                                        multiline
                                        rows={3}
                                        fullWidth
                                        value={formValue.description || ''}
                                        onChange={(e, key) =>
                                            handleFormChange(e, DESCRIPTION)
                                        }
                                        inputRef={register}
                                        error={!!errors.description}
                                        helperText={
                                            errors?.description?.message
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label={fields.positivity.label}
                                        name={fields.positivity.name}
                                        variant="outlined"
                                        fullWidth
                                        value={formValue.positivity || ''}
                                        onChange={(e, key) =>
                                            handleFormChange(e, POSITIVITY)
                                        }
                                    // inputRef={register}
                                    // error={!!errors.positivity}
                                    // helperText={errors?.positivity?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label={fields.difficulty.label}
                                        name={fields.difficulty.name}
                                        variant="outlined"
                                        fullWidth
                                        value={formValue.difficulty || ''}
                                        onChange={(e, key) =>
                                            handleFormChange(e, DIFFICULTY)
                                        }
                                    // inputRef={register}
                                    // error={!!errors.difficulty}
                                    // helperText={errors?.difficulty?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        label={fields.futurePlan.label}
                                        name={fields.futurePlan.name}
                                        variant="outlined"
                                        fullWidth
                                        value={formValue.futurePlan || ''}
                                        onChange={(e, key) =>
                                            handleFormChange(e, FUTURE_PLAN)
                                        }
                                    // inputRef={register}
                                    // error={!!errors.futurePlan}
                                    // helperText={errors?.futurePlan?.message}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <Grid container spacing={2}>
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
                                                type="submit"
                                                disabled={formValue === defaultFormValue}
                                            // onClick={addReports}
                                            >
                                                <MdAdd fontSize="large" />
                                            </Button>
                                        </Box>
                                        <Box>
                                            {/* <Chip
                                                label={parseDateToString(
                                                    new Date(),
                                                    'dddd, DD/MM/YYYY'
                                                )}
                                                variant="outlined"
                                                className={classes.chipDate}
                                            /> */}
                                            <Typography
                                                variant="subtitle1"
                                                className={classes.title}
                                            >
                                                {parseDateToString(
                                                    new Date(),
                                                    'dddd, DD/MM/YYYY'
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {/* <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                    >
                                        <Typography variant="subtitle1">
                                            {`${
                                                headers.child1
                                            } ${parseDateToString(
                                                new Date(),
                                                'dddd, DD/MM/YYYY'
                                            )}`}
                                        </Typography>
                                    </Box> */}
                                    <Typography variant="subtitle1">
                                        {headers.child1}
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
                                                    {columns.map((col) => (
                                                        <TableCell
                                                            key={col}
                                                            className={
                                                                classes.tHeadCell
                                                            }
                                                        >
                                                            {col}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listReports.map(
                                                    (row, index) => (
                                                        <TableRow
                                                            key={row.taskId}
                                                            className={
                                                                classes.tBodyRow
                                                            }
                                                        >
                                                            <TableCell
                                                                className={
                                                                    classes.tBodyCell
                                                                }
                                                                onClick={(
                                                                    e,
                                                                    data
                                                                ) =>
                                                                    handleShowClickedRow(
                                                                        e,
                                                                        row
                                                                    )
                                                                }
                                                            >
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell
                                                                className={
                                                                    classes.tBodyCell
                                                                }
                                                                onClick={(
                                                                    e,
                                                                    data
                                                                ) =>
                                                                    handleShowClickedRow(
                                                                        e,
                                                                        row
                                                                    )
                                                                }
                                                            >
                                                                {`${row.level} ${row.schoolName}`}
                                                            </TableCell>
                                                            <TableCell
                                                                className={
                                                                    classes.tBodyCell
                                                                }
                                                                onClick={(e, data) =>
                                                                    handleShowClickedRow(
                                                                        e, row)
                                                                }
                                                            >
                                                                {row?.isSuccess ? 'Đã gặp người đại diện (HT/HP)' : 'Chưa gặp người đại diện (HT/HP)'}
                                                            </TableCell>
                                                            <TableCell
                                                                className={classes.tBodyCell}
                                                                onClick={(e, data) => handleShowClickedRow(e, row)}
                                                            >
                                                                {truncateString(
                                                                    row.description
                                                                )}
                                                            </TableCell>
                                                            <TableCell
                                                                className={
                                                                    classes.tBodyCell
                                                                }
                                                                align="right"
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={(
                                                                        id
                                                                    ) =>
                                                                        removeReport(
                                                                            row.taskId
                                                                        )
                                                                    }
                                                                >
                                                                    <MdDelete />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <Divider /> */}
                <DialogActions className="">
                    <Button
                        className={classes.btnSave}
                        // type="submit"
                        // onSubmit={handleCreateReport}
                        // disabled={!formState.isDirty}
                        // onClick={handleSubmit(onSubmit)}
                        disabled={listReports.length < 1}
                        onClick={handleCreateReport}
                    >
                        {operations.save}
                    </Button>
                    <Button onClick={handleCloseDialog}>
                        {operations.cancel}
                    </Button>
                </DialogActions>
            </form>
        </>
    )
}

export default CreateReportsForm

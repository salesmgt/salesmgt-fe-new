import React, { useEffect, useRef, useState } from 'react'
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
import { MdAdd, MdClose, MdDelete } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { parseDateToString } from '../../../utils/DateTimes'
import { Consts } from './FormConfig'
import * as ReportsServices from '../ReportsServices'
import { useHistory } from 'react-router'
import * as ArrayUtils from '../../../utils/Arrays'
import { } from '../../../utils/DateTimes'
import { useAuth } from '../../../hooks/AuthContext'
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

function CreateReports(props) {
    // const styles = useStyles();
    const { open, onClose } = props
    const { headers, operations } = Consts

    const { user } = useAuth()
    const history = useHistory()

    const typingTimeoutRef = useRef(null);

    const { register, errors } = useForm({
        // getValues, , setError, control, handleSubmit, formState
        resolver: yupResolver(clientSchema),
    })
    // const [open, setOpen] = useToggle()

    // const defaultValue = {
    // }

    // const onSubmit = (data) => {
    //     console.log(data)
    // }

    const [target, setTarget] = useState({})
    const [targets, setTargets] = useState([])

    const getListTargets = (searchKey) => {
        ReportsServices.getTargetSchools({ username: user.username, schoolYear: calculateSchoolYear(), key: searchKey }).then(data => {
            setTargets(data);
            console.log('list targets = ', data);
            // Tại sao có 1 số searchKey (VD: tohu) bị văng lỗi "TypeError: Cannot read property 'filter' of null"???
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }
    // useEffect(() => {
    //     getListTargets()
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    useEffect(getListTargets, []);

    const onSearchTargetChange = (event) => {
        typingTimeoutRef.current = setTimeout(() => {
            const searchKey = event.target.value;
            console.log('searchKey = ', searchKey);
            if (searchKey) {
                // setTarget(searchKey);
                getListTargets(searchKey);
            }
        }, 300);
    }

    // console.log('target nè: ', target)

    const handleTargetChange = (newTarget) => {
        setTarget(newTarget)
        console.log('newTarget: ', newTarget);
    }

    const [listReports, setListReports] = useState([])
    const addReports = (event) => {
        event.preventDefault();
        const e = event.target;
        // console.log('event.target: ', event.target);

        const report = {
            username: user.username,
            date: parseDateToString(new Date(), 'YYYY-MM-DD'),
            schoolYear: calculateSchoolYear(),
            targetId: parseInt(e.targetId.value),
            schoolName: e.targetName.value,
            level: e.level.value,
            result: e.result.value,
            description: e.des.value,
            positivity: e.pos.value,
            difficulty: e.dif.value,
            futurePlan: e.plan.value, //=================
            // address: '',
            // avatar: '',
            // commentedPerson: null,
            // contextComments: null,
            // district: '',
            // fullName: '',
            // purpose: 'Sales mới',
            // reprIsMale: true,
            // reprName: ''
        }

        // if (!ArrayUtils.checkDuplicate(listReports, report.targetId)) {
        // setListReports([...listReports, report])
        // }
        // let countDuplicate = 0;
        listReports.forEach(re => {
            console.log('re.targetId = ', re.targetId);
            console.log('this ID = ', report.targetId);
            if (re.targetId === report.targetId) {
                // Remove target cũ, ghi đè bằng target đó bản chỉnh sửa
                console.log('Remove duplicate target ', re.targetId);
                setListReports([...ArrayUtils.removeItem(listReports, 'targetId', re.targetId)]);
                // setListReports([...listReports, report])
            }
            // countDuplicate++;
        });
        setListReports([...listReports, report])    // Để ngoài này vì có trùng hay ko thì cũng vẫn add vô list 
        // if (countDuplicate === 0) {
        //     setListReports([...listReports, report])
        // }

        console.log('==============Report value==============');
        console.log('Target School name: ', report.schoolName);
        console.log('Target ID: ', report.targetId);
        console.log('Result: ', report.result);
        console.log('Des: ', report.description);
        console.log('Pos: ', report.positivity);
        console.log('Dif: ', report.difficulty);
        console.log('Future plan: ', report.futurePlan);

        // Ko hiểu rõ lắm tại sao kiểu index này bị lệch gtrị, cái lấy đc cái ko
        // console.log('Target ID: ', event.target[0].value);
        // // console.log('Target ID: ', event.target[0].value.id);
        // console.log('Result: ', event.target[1].value);
        // console.log('Des: ', event.target[2].value);
        // console.log('Pos: ', event.target[3].value);
        // console.log('Dif: ', event.target[4].value);
        // console.log('Future: ', event.target[5].value);
        // console.log('event: ', event);
        // console.log('targetSchool: ', event.target.targetSchool.value);
    }

    const removeReport = (event, targetId) => {
        setListReports([...ArrayUtils.removeItem(listReports, 'targetId', targetId)]);
        console.log('Remove target ', targetId);
    }

    console.log('-----------------------------------------------------');
    console.log('listReports: ', listReports);

    // Click on a row in the preview table --> data is displayed in form
    // const handleShowClickedRow = () => {
    // }

    const handleCreateReport = () => {
        ReportsServices.addReport(listReports).then(data => {
            console.log('Add thành công rồi này!!!', data);
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }

    const calculateSchoolYear = () => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();
        console.log(`${thisMonth}/${thisYear}`);
        console.log(`This school year: ${thisYear - 1}-${thisYear}`);

        if (thisMonth < 7)
            return `${thisYear - 1}-${thisYear}`;
        else return `${thisYear}-${thisYear + 1}`
    }

    const truncateString = (str) => {
        if (str) return str.length > 30 ? str.substring(0, 27) + '...' : str
        else return ''
    }

    const handleCloseDialog = () => {
        setListReports([]);
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth
            component="form"
            className={classes.dialog}
        >
            <DialogTitleWithIconClose onClose={handleCloseDialog}>
                {headers.child1}
            </DialogTitleWithIconClose>
            <Divider />
            {/* <form noValidate onSubmit={handleSubmit(onSubmit)}> */}
            <DialogContent className={classes.wrapper}>
                <form onSubmit={addReports}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Autocomplete
                                        autoComplete
                                        autoSelect
                                        autoHighlight
                                        clearOnEscape
                                        options={targets ? targets : []}
                                        // getOptionLabel={(target) => target.schoolName}
                                        getOptionLabel={(target) => target?.schoolName ? `${target?.level} ${target?.schoolName}` : null}
                                        value={target}
                                        renderInput={(params) => (
                                            <>
                                                <TextField
                                                    {...params}
                                                    label="Target School Name"
                                                    variant="outlined"
                                                    name="targetName"
                                                    value={target}
                                                    required
                                                    inputRef={register}
                                                    error={!!errors.target}
                                                    helperText={errors?.target?.message}
                                                    className={classes.autoComplete}
                                                    onChange={onSearchTargetChange}
                                                />
                                                <input type="hidden" name="level" value={target?.level} />
                                            </>
                                        )}
                                        renderOption={(target) => {
                                            return (
                                                <ListItem className={classes.item}>
                                                    <ListItemText
                                                        primary={
                                                            target?.schoolName
                                                                ? `${target?.level} ${target?.schoolName}`
                                                                : null
                                                        }
                                                        secondary={
                                                            target?.district ? target?.district : null
                                                        }
                                                        classes={{
                                                            primary: classes.itemTextPrimary,
                                                            secondary: classes.itemTextSecondary
                                                        }}
                                                    />
                                                </ListItem>
                                            )
                                        }}
                                        onChange={(event, newTarget) => handleTargetChange(newTarget)}
                                    />
                                    <input type="hidden" name="targetId" value={target?.id} />
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
                                        name="pos"
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
                                        name="dif"
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
                                                type="submit"
                                            // onClick={addReports}
                                            >
                                                <MdAdd fontSize="large" />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Chip
                                                label={parseDateToString(new Date(), 'dddd, DD/MM/YYYY')}
                                                variant="default"
                                                className={classes.chipDate}
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
                                                    <TableCell className={classes.tHeadCell}></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listReports.map((row, index) => (
                                                    <TableRow
                                                        key={row.targetId}
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
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                classes.tBodyCell
                                                            }
                                                        >
                                                            {`${row.level} ${row.schoolName}`}
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
                                                                row.description
                                                            )}
                                                        </TableCell>
                                                        <TableCell className={classes.tBodyCell} align="right">
                                                            <IconButton size="small" onClick={(event, id) => removeReport(event, row.targetId)}>
                                                                <MdDelete />
                                                            </IconButton>
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
                </form>
            </DialogContent>
            <Divider />
            <DialogActions className="">
                <Button variant="contained" onClick={handleCloseDialog}>
                    {operations.cancel}
                </Button>
                <Button
                    className={classes.btnSave}
                    variant="contained"
                    // type="submit"
                    // disabled={!formState.isDirty}
                    // onClick={handleSubmit(onSubmit)}
                    onClick={handleCreateReport}
                >
                    {operations.save}
                </Button>
            </DialogActions>
            {/* </form> */}
        </Dialog>
    )
}

export default CreateReports

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Grid,
    Typography,
    Avatar,
    Button,
    TextField,
    makeStyles,
    Select,
    MenuItem,
    Chip,
    Box,
} from '@material-ui/core'
import { MdWarning } from 'react-icons/md'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '../../../../hooks/AppContext'
import * as Milk from '../../../../utils/Milk'
import { milkNames, purposeNames, serviceStatusNames, taskResultNames, taskStatusNames } from '../../../../constants/Generals'
import { Snackbars, Loading, NotFound, LinearProgressBars } from '../../../../components'
import { Consts } from './AssignInfoConfig'
import { useAuth } from '../../../../hooks/AuthContext'
import { roleNames, statusNames } from '../../../../constants/Generals'
import * as TasksServices from '../../TasksServices'
import { getPurpsByStatus, handleMatchPurps } from '../../../../utils/Sortings'
// import { parseDateToString, calculateDatesGap } from '../../../../utils/DateTimes';
import UpdateSchStatus from '../../dialogs/UpdateSchStatus/UpdateSchStatus';
import ConfirmTaskFail from '../../dialogs/ConfirmTaskFail/ConfirmTaskFail';
import ConfirmTaskComplete from '../../dialogs/ConfirmTaskComplete/ConfirmTaskComplete';
import { useSnackbar } from 'notistack'
import classes from './AssignInfo.module.scss'
import { parseDateToString } from '../../../../utils/DateTimes'

const clientSchema = yup.object().shape({
    note: yup.string().trim(),
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
    // disabledInput: {
    //     '& .MuiInputBase-root.Mui-disabled': {
    //         color: 'black',
    //     },
    // },
    inputRoot: {
        '&$disabled': {
            color: '#616161',   // $text-icon
        },
    },
    disabled: {},
}))

function AssignInfo(props) {
    const { task, refreshPage } = props
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const { user } = useAuth()

    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    const [openConfirmCompleteDialog, setOpenConfirmCompleteDialog] = useState(false);
    const [openConfirmCompleteDialog2, setOpenConfirmCompleteDialog2] = useState(false);
    const [openConfirmFailDialog, setOpenConfirmFailDialog] = useState(false);

    // const [notify, setNotify] = useState({
    //     isOpen: false,
    //     message: '',
    //     type: '',
    // })
    // console.log('AssignInfo ------- task: ', task);

    const { salesPurps } = useApp()
    const bakSalesPurps = salesPurps
        ? salesPurps
        : Milk.getMilk(milkNames.salesPurps)

    const purpsByStatus = getPurpsByStatus(task?.schoolStatus, bakSalesPurps)

    const isMatch = handleMatchPurps(task?.purpose, purpsByStatus)

    const defaultValues = {
        // id: task?.id,
        // schoolYear: task?.schoolYear ? task?.schoolYear : schYears[0],
        purpose: task?.purpose ? task?.purpose : purpsByStatus[0],
        note: task?.note ? task?.note : '',
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        reset({
            // id: task?.id,
            // schoolYear: task?.schoolYear ? task?.schoolYear : schYears[0],
            purpose: task?.purpose ? task?.purpose : purpsByStatus[0],
            note: task?.note ? task?.note : '',
        })
    }, [task])

    if (!task) {
        return <Loading />
    }

    if (!task?.username) {
        return <NotFound title={operations.empty} />
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            noteBy: user.username,
        }

        TasksServices.updateTask(task?.id, model)
            .then((res) => {
                refreshPage(task?.id)
                enqueueSnackbar('Updated task successfully', { variant: 'success' })
                // setNotify({
                //     isOpen: true,
                //     message: 'Updated Successfully',
                //     type: 'success',
                // })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
                enqueueSnackbar('Updated task failed', { variant: 'error' })
                // setNotify({
                //     isOpen: true,
                //     message: 'Updated failed',
                //     type: 'error',
                // })
            })

        // alert(JSON.stringify(model))
    }

    const setPurposeChipColor = (purpose) => {
        switch (purpose) {
            case purposeNames.purp1:
                return <Chip label={purpose} className={classes.chipSalesMoi} />
            // case purposeNames.purp2:
            //     return <Chip label={purpose} className={classes.chipTheoDoi} />
            case purposeNames.purp3:
                return <Chip label={purpose} className={classes.chipChamSoc} />
            case purposeNames.purp4:
                return <Chip label={purpose} className={classes.chipTaiKy} />
            case purposeNames.purp5:
                return <Chip label={purpose} className={classes.chipKyMoi} />
            default:
                return <Chip label={purpose} /> // #5c21f3
        }
    }

    const generateTaskStatusChip = (result) => {    //, endDate
        // const today = new Date()
        // const deadline = new Date(endDate)
        switch (result) {
            case taskResultNames.successful:
                return <Chip label={taskStatusNames.success} variant="outlined" className={classes.chipSuccess} />
            case taskResultNames.tbd:
                // if (today <= deadline)
                return <Chip label={taskStatusNames.ongoing} variant="outlined" className={classes.chipOnGoing} />
            // else
            case taskResultNames.failed:
                return <Chip label={taskStatusNames.failed} variant="outlined" className={classes.chipFailed} />
            default:
                break   // ko hi???n g??
            // return <Chip label={result} /> // #5c21f3
        }
    }

    // console.log('Task Info --- task: ', task);

    const handleMarkComplete = (purpose) => {
        switch (purpose) {
            case purposeNames.purp1:  // Sales m???i
            case purposeNames.purp4:  // T??i k??
            case purposeNames.purp5:  // K?? m???i
                if (openConfirmCompleteDialog) {
                    return (
                        <UpdateSchStatus
                            open={openConfirmCompleteDialog}
                            onClose={() => setOpenConfirmCompleteDialog(false)}
                            task={task}
                            refreshPage={refreshPage}
                        // resetStatus={resetStatus}
                        // currStatus={currStatus}
                        />
                    )
                }
            // case purposeNames.purp2:  // Theo d??i
            case purposeNames.purp3:  // Ch??m s??c
                if (openConfirmCompleteDialog2) {
                    return (
                        <ConfirmTaskComplete
                            open={openConfirmCompleteDialog2}
                            onClose={() => setOpenConfirmCompleteDialog2(false)}
                            taskId={task?.id}
                            refreshPage={refreshPage}
                        />
                    )
                }
            default:
                break;
        }
    }

    const handleMarkFail = () => {
        if (openConfirmFailDialog) {
            return (
                <ConfirmTaskFail
                    open={openConfirmFailDialog}
                    onClose={() => setOpenConfirmFailDialog(false)}
                    taskId={task?.id}
                    refreshPage={refreshPage}
                />
            )
        }
    }

    const renderButtonName = (purpose, listServices) => {
        // const listServices = [...task?.services];
        let buttonName = 'Submit a service'
        if (purpose === purposeNames.purp1 || purpose === purposeNames.purp4 || purpose === purposeNames.purp5) {
            if (listServices) {
                const countPendingServices = listServices.filter((obj) => obj.status === serviceStatusNames.pending).length;
                console.log('count = ', countPendingServices);
                if (countPendingServices > 0) {
                    buttonName = 'Submit more services'
                }
            }
        } else {
            buttonName = 'Mark as completed'
        }
        return buttonName
    }

    const renderServiceCountMessage = (listServices) => {
        if (listServices) {
            const countPendingServices = listServices.filter((obj) => obj.status === serviceStatusNames.pending).length;
            if (countPendingServices > 0) {
                return `You are having ${countPendingServices} pending services`
            }
        }
    }

    // const renderConfirmFailedDialog = (taskStatus) => {
    //     return (
    //         <ConfirmTaskFail
    //             open={openConfirmFailDialog}
    //             onClose={() => setOpenConfirmFailDialog(false)}
    //             taskStatus={taskStatus}
    //             refreshPage={refreshPage}
    //             setNotify={setNotify}
    //         />
    //     )
    // }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Assign Info*/}
                {task?.schoolStatus !== statusNames.pending ? (
                    //=======================Task status: "Ongoing"========================
                    user.roles[0] !== roleNames.salesman ? (
                        //---------------------Role Manager/Supervisor---------------------
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className={classes.content}
                        >
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.wrapper}
                                >
                                    <Grid
                                        item container
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                    >
                                        <Grid item xs={6} sm={4} md={4} lg={3}>
                                            <Typography color="inherit" className={classes.header}>
                                                {headers.child1}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={8} md={8} lg={6}>
                                            <Box display="flex" flexDirection="row-reverse">
                                                {generateTaskStatusChip(task?.result)}
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                    >
                                        <Grid
                                            container
                                            spacing={0}
                                            className={classes.rowx}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={3}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.pic.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                className={classes.rowx}
                                            >
                                                <Typography color="inherit">
                                                    <div
                                                        className={classes.user}
                                                    >
                                                        {task?.avatar ? (
                                                            <Avatar
                                                                className={
                                                                    classes.avatar
                                                                }
                                                                alt="user avatar"
                                                                src={
                                                                    task?.avatar
                                                                }
                                                            />
                                                        ) : (
                                                            <Avatar
                                                                className={
                                                                    classes.avatar
                                                                }
                                                            >
                                                                {
                                                                    task?.fullName
                                                                        .split(
                                                                            ' '
                                                                        )
                                                                        .pop()[0]
                                                                }
                                                            </Avatar>
                                                        )}

                                                        <div
                                                            className={
                                                                classes.info
                                                            }
                                                        >
                                                            <Typography
                                                                component="span"
                                                                className={
                                                                    classes.fullName
                                                                }
                                                            >
                                                                {
                                                                    task?.fullName
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                className={
                                                                    classes.username
                                                                }
                                                            >
                                                                {
                                                                    task?.username
                                                                }
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                    >
                                        <Grid
                                            container
                                            spacing={0}
                                            className={classes.rowx}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={3}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.schlYear.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                className={classes.rowx}
                                            >
                                                <Typography color="inherit">
                                                    {task?.schoolYear}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Grid container spacing={0} className={classes.rowx}>
                                            <Grid item xs={12} sm={12} md={4} lg={3} className={classes.rowx}>
                                                <Typography color="inherit" className={classes.title}>
                                                    {fields.duration.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={8} lg={6} className={classes.rowx}>
                                                {task?.result === taskResultNames.tbd ? (
                                                    <LinearProgressBars
                                                        startDate={task?.assignDate}
                                                        endDate={task?.endDate}
                                                        marker={new Date()}
                                                        type="task"
                                                    />
                                                ) : (
                                                    <Typography color="inherit">
                                                        {parseDateToString(task?.assignDate, 'DD-MM-YYYY')}
                                                    &nbsp; ??? &nbsp;
                                                        {parseDateToString(task?.endDate, 'DD-MM-YYYY')}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                    >
                                        <Grid
                                            container
                                            spacing={0}
                                            className={classes.rowx}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={3}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.purpose.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                className={classes.rowx}
                                            >
                                                <Controller
                                                    name="purpose"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <Select
                                                            value={value}
                                                            onChange={onChange}
                                                            MenuProps={
                                                                MenuProps
                                                            }
                                                            disableUnderline
                                                        >
                                                            {purpsByStatus.map(
                                                                (data) => (
                                                                    <MenuItem
                                                                        key={
                                                                            data
                                                                        }
                                                                        value={
                                                                            data
                                                                        }
                                                                        classes={{
                                                                            root:
                                                                                styles.menuItemRoot,
                                                                            selected:
                                                                                styles.menuItemSelected,
                                                                        }}
                                                                    >
                                                                        {data}
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    )}
                                                />
                                                {!isMatch && (
                                                    <Chip
                                                        variant="outlined"
                                                        icon={
                                                            <MdWarning color="#d9534f" />
                                                        }
                                                        label={
                                                            operations.purpWarning
                                                        }
                                                        className={
                                                            classes.purpWarning
                                                        }
                                                    />
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                    >
                                        <Grid
                                            container
                                            spacing={0}
                                            className={classes.rowx}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={3}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.note.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                className={classes.rowx}
                                            >
                                                <Controller
                                                    name="note"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                task?.noteBy
                                                                    ? `${fields.note.hasNote} ${task?.noteBy}`
                                                                    : fields.note.noNote
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!errors.note}
                                                            helperText={errors?.note?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                    >
                                        <Grid
                                            container
                                            spacing={0}
                                            className={classes.rowx}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={3}
                                            // className={classes.row}
                                            />
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                className={classes.action}
                                            >
                                                <Button
                                                    className={classes.submit}
                                                    variant="contained"
                                                    disabled={
                                                        !formState.isDirty
                                                    }
                                                    type="submit"
                                                >
                                                    {operations.save}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    ) : user.username === task?.username ? (
                        //--------------------Salesman ??ang s??? d???ng app--------------------
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.content}>
                            <Grid
                                container
                                spacing={0}
                                className={classes.wrapper}
                            >
                                <Grid
                                    item container
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.row}
                                >
                                    <Grid item xs={6} sm={4} md={4} lg={3}>
                                        <Typography color="inherit" className={classes.header}>
                                            {headers.child1}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={8} md={8} lg={6}>
                                        <Box display="flex" flexDirection="row-reverse">
                                            {generateTaskStatusChip(task?.result, task?.endDate)}
                                        </Box>
                                    </Grid>
                                </Grid>

                                {/* <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.row}
                                >
                                    <Grid
                                        container
                                        spacing={0}
                                        className={classes.rowx}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            md={4}
                                            lg={3}
                                            className={classes.rowx}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.pic.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={8}
                                            md={8}
                                            lg={6}
                                            className={classes.rowx}
                                        >
                                            <div className={classes.user}>
                                                {task?.avatar ? (
                                                    <Avatar
                                                        className={
                                                            classes.avatar
                                                        }
                                                        alt="user avatar"
                                                        src={task?.avatar}
                                                    />
                                                ) : (
                                                    <Avatar
                                                        className={
                                                            classes.avatar
                                                        }
                                                    >
                                                        {
                                                            task?.fullName
                                                                .split(' ')
                                                                .pop()[0]
                                                        }
                                                    </Avatar>
                                                )}

                                                <div className={classes.info}>
                                                    <Typography
                                                        component="span"
                                                        className={
                                                            classes.fullName
                                                        }
                                                    >
                                                        {task?.fullName}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            classes.username
                                                        }
                                                    >
                                                        {task?.username}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid> */}

                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.row}
                                >
                                    <Grid
                                        container
                                        spacing={0}
                                        className={classes.rowx}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            md={4}
                                            lg={3}
                                            className={classes.rowx}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.schlYear.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={8}
                                            md={8}
                                            lg={6}
                                            className={classes.rowx}
                                        >
                                            <Typography color="inherit">
                                                {task?.schoolYear}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                    <Grid container spacing={0} className={classes.rowx}>
                                        <Grid item xs={12} sm={12} md={4} lg={3} className={classes.rowx}>
                                            <Typography color="inherit" className={classes.title}>
                                                {fields.duration.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8} lg={6} className={classes.rowx}>
                                            {task?.result === taskResultNames.tbd ? (
                                                <LinearProgressBars
                                                    startDate={task?.assignDate}
                                                    endDate={task?.endDate}
                                                    marker={new Date()}
                                                    type="task"
                                                />
                                            ) : (
                                                <Typography color="inherit">
                                                    {parseDateToString(task?.assignDate, 'DD-MM-YYYY')}
                                                    &nbsp; ??? &nbsp;
                                                    {parseDateToString(task?.endDate, 'DD-MM-YYYY')}
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    className={classes.row}
                                >
                                    <Grid
                                        container
                                        spacing={0}
                                        className={classes.rowx}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            md={4}
                                            lg={3}
                                            className={classes.rowx}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.purpose.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={8}
                                            md={8}
                                            lg={6}
                                            className={classes.rowx}
                                        >
                                            <Typography color="inherit">
                                                {task?.purpose && setPurposeChipColor(task?.purpose)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                    <Grid
                                        container
                                        spacing={0}
                                        className={classes.rowx}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={4}
                                            lg={3}
                                            className={classes.rowx}
                                        >
                                            <Typography
                                                color="inherit"
                                                className={classes.title}
                                            >
                                                {fields.note.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={8}
                                            lg={6}
                                            className={classes.rowx}
                                        >
                                            <Controller
                                                name="note"
                                                control={control}
                                                render={({ value }) => (
                                                    <TextField
                                                        label={
                                                            task?.noteBy
                                                                ? `${fields.note.hasNote} ${task?.noteBy}`
                                                                : fields.note
                                                                    .noNote
                                                        }
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={5}
                                                        disabled
                                                        InputProps={{
                                                            classes: {
                                                                root: styles.inputRoot,
                                                                disabled: styles.disabled,
                                                            },
                                                        }}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {(task?.result === taskResultNames.tbd) && (new Date() <= new Date(task?.endDate)) && (
                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                        <Grid container spacing={0} className={classes.rowx}>
                                            <Grid item xs={12} sm={12} md={4} lg={3} className={classes.rowx}></Grid>
                                            <Grid item xs={12} sm={12} md={8} lg={6} className={classes.rowx}>
                                                <Box display="flex" flexDirection="row" justifyContent="flex-end"
                                                    className={classes.btnChangeTaskStatus}
                                                >
                                                    <Button order={1} variant="contained" className={classes.btnComplete}
                                                        onClick={() => {
                                                            if (task?.purpose === purposeNames.purp1 ||
                                                                task?.purpose === purposeNames.purp4 ||
                                                                task?.purpose === purposeNames.purp5
                                                            ) {
                                                                setOpenConfirmCompleteDialog(true)
                                                            } else {
                                                                setOpenConfirmCompleteDialog2(true)
                                                            }
                                                        }}
                                                    >
                                                        {renderButtonName(task?.purpose, task?.services)}
                                                    </Button>
                                                    {/* {renderConfirmTaskCompleteDialog()} */}
                                                    {/* {!task?.services || task?.services?.length === 0 && ( */}
                                                    <Button order={2} variant="contained" className={classes.btnFail}
                                                        onClick={() => setOpenConfirmFailDialog(true)}
                                                    >
                                                        Mark as failed
                                                        </Button>
                                                    {/* )} */}
                                                    {handleMarkComplete(task?.purpose)}
                                                    {handleMarkFail()}
                                                </Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    style={{ textAlign: 'right', fontStyle: 'italic' }}
                                                    color="textSecondary"
                                                >
                                                    {renderServiceCountMessage(task?.services)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                                }
                            </Grid>
                        </Grid>
                    ) : (
                        //------------------Salesman coi c???a Salesman kh??c-----------------
                        <div className={classes.notFound}>
                            <NotFound title={operations.restriction} />
                        </div>
                    )
                ) : (
                    //==========Role b???t k???, task status: "Failed" / "Successful"==========
                    // Role Manager/Supervisor th?? ph???i
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={classes.content}
                    >
                        <Grid container spacing={0} className={classes.wrapper}>
                            <Grid
                                item container
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Typography color="inherit" className={classes.header}>
                                        {headers.child1}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={8} md={8} lg={6}>
                                    <Box display="flex" flexDirection="row-reverse">
                                        {generateTaskStatusChip(task?.result, task?.endDate)}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.rowx}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        md={4}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.pic.title}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={8}
                                        md={8}
                                        lg={6}
                                        className={classes.rowx}
                                    >
                                        {/* <Typography color="inherit"> */}
                                        <div className={classes.user}>
                                            {task?.avatar ? (
                                                <Avatar
                                                    className={classes.avatar}
                                                    alt="user avatar"
                                                    src={task?.avatar}
                                                />
                                            ) : (
                                                <Avatar
                                                    className={classes.avatar}
                                                >
                                                    {
                                                        task?.fullName
                                                            .split(' ')
                                                            .pop()[0]
                                                    }
                                                </Avatar>
                                            )}

                                            <div className={classes.info}>
                                                <Typography
                                                    component="span"
                                                    className={classes.fullName}
                                                >
                                                    {task?.fullName}
                                                </Typography>
                                                <Typography
                                                    className={classes.username}
                                                >
                                                    {task?.username}
                                                </Typography>
                                            </div>
                                        </div>
                                        {/* </Typography> */}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.rowx}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        md={4}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.schlYear.title}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={8}
                                        md={8}
                                        lg={6}
                                        className={classes.rowx}
                                    >
                                        <Typography color="inherit">
                                            {task?.schoolYear}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.row}>
                                <Grid container spacing={0} className={classes.rowx}>
                                    <Grid item xs={12} sm={12} md={4} lg={3} className={classes.rowx}>
                                        <Typography color="inherit" className={classes.title}>
                                            {fields.duration.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={6} className={classes.rowx}>
                                        {task?.result === taskResultNames.tbd ? (
                                            <LinearProgressBars
                                                startDate={task?.assignDate}
                                                endDate={task?.endDate}
                                                marker={new Date()}
                                                type="task"
                                            />
                                        ) : (
                                            <Typography color="inherit">
                                                {parseDateToString(task?.assignDate, 'DD-MM-YYYY')}
                                                &nbsp; ??? &nbsp;
                                                {parseDateToString(task?.endDate, 'DD-MM-YYYY')}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.rowx}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        md={4}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.purpose.title}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={8}
                                        md={8}
                                        lg={6}
                                        className={classes.rowx}
                                    >
                                        <Typography color="inherit">
                                            {task?.purpose}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.rowx}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.note.title}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={6}
                                        className={classes.rowx}
                                    >
                                        <Controller
                                            name="note"
                                            control={control}
                                            render={({ value }) => (
                                                <TextField
                                                    label={
                                                        task?.noteBy
                                                            ? `${fields.note.hasNote} ${task?.noteBy}`
                                                            : fields.note.noNote
                                                    }
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    rows={5}
                                                    disabled
                                                    InputProps={{
                                                        classes: {
                                                            root:
                                                                styles.inputRoot,
                                                            disabled:
                                                                styles.disabled,
                                                        },
                                                    }}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {/* Another content */}
            </Grid>
            {/* <Snackbars notify={notify} setNotify={setNotify} /> */}
        </div >
    )
}

export default AssignInfo

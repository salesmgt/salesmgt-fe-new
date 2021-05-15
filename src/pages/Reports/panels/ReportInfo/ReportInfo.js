import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    Grid,
    TextField,
    Typography,
    makeStyles,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Snackbars, Loading } from '../../../../components'
import { Consts } from './ReportInfoConfig'
import * as ReportsServices from '../../ReportsServices'
import { useAuth } from '../../../../hooks/AuthContext'
import { roleNames } from '../../../../constants/Generals'
import { app as FirebaseApp } from '../../../../services/firebase'
import { useApp } from '../../../../hooks/AppContext'
import moment from 'moment'
import { parseDateToString } from '../../../../utils/DateTimes';
import classes from './ReportInfo.module.scss'

const rpSchema = yup.object().shape({
    isSuccess: yup.string().trim().required('Result is required'),
    description: yup.string().trim().required('Description is required'),
    positivity: yup.string().trim(),
    difficulty: yup.string().trim(),
    futurePlan: yup.string().trim(),
})

const cmtSchema = yup.object().shape({
    contextComments: yup.string().trim(),
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

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         // minWidth: 160,
//     },
// }))

const useStyles = makeStyles((theme) => ({
    // disabledInput: {
    //     '& .MuiInputBase-root.Mui-disabled': {
    //         color: 'black',
    //     },
    // },
    inputRoot: {
        '&$disabled': {
            color: 'black',
        },
    },
    disabled: {},
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

function RepInfo(props) {
    const styles = useStyles()
    const { report, refreshPage } = props
    const { headers, operations, fields } = Consts

    const { user } = useAuth()
    const { userInfo } = useApp()

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const rpValues = {
        id: report?.id,
        isSuccess: report?.isSuccess,
        description: report?.description ? report?.description : '',
        positivity: report?.positivity ? report?.positivity : '',
        difficulty: report?.difficulty ? report?.difficulty : '',
        futurePlan: report?.futurePlan ? report?.futurePlan : '',
    }

    // console.log('rpValues: ', rpValues);

    const cmtValues = {
        id: report?.id,
        contextComments: report?.contextComments ? report?.contextComments : '',
    }

    const {
        control: rpControl,
        errors: rpErrors,
        handleSubmit: rpSubmit,
        formState: rpState,
        reset: rpReset,
    } = useForm({
        resolver: yupResolver(rpSchema),
        defaultValues: rpValues,
    })

    const {
        control: cmtControl,
        errors: cmtErrors,
        handleSubmit: cmtSubmit,
        formState: cmtState,
        reset: cmtReset,
    } = useForm({
        resolver: yupResolver(cmtSchema),
        defaultValues: cmtValues,
    })

    useEffect(() => {
        rpReset({
            id: report?.id,
            isSuccess: report?.isSuccess,
            description: report?.description ? report?.description : '',
            positivity: report?.positivity ? report?.positivity : '',
            difficulty: report?.difficulty ? report?.difficulty : '',
            futurePlan: report?.futurePlan ? report?.futurePlan : '',
        })
    }, [report])

    useEffect(() => {
        cmtReset({
            id: report?.id,
            contextComments: report?.contextComments
                ? report.contextComments
                : '',
        })
    }, [report])

    if (!report) {
        return <Loading />
    }

    const onRpSubmit = (data) => {
        const model = {
            ...data,
            date: parseDateToString(report?.date, 'YYYY-MM-DD HH:mm:ss'),
            isSuccess: data?.isSuccess === '' ? false : (data?.isSuccess === "true" ? true : false)

            // schoolName: report?.name,
            // address: report?.address,
            // district: report?.district,
            // reprName: report?.reprName,
            // reprIsMale: report?.reprIsMale,

            // taskId: report?.taskId,
            // schoolYear: report?.schoolYear,
            // purpose: report?.schoolYear,

            // avatar: report?.avatar,
            // username: report?.username,
            // fullName: report?.fullName,
        }

        ReportsServices.updateReport(data.id, model)
            .then((res) => {
                refreshPage(data.id)
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })
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
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })

        alert(JSON.stringify(model))
    }

    const createNotify = (value) => {
        new Promise((resolve, reject) => {
            const noti = FirebaseApp
                .database()
                .ref('notify')
                .child(report.username).push({
                    avatar: userInfo.avatar,
                    actor: user.username,
                    type: "report",
                    timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    content: "You've just received a message from Manager.",
                    // content: `${user.fullName} has just commented on your report.`,
                    uid: value.id,
                    isSeen: false
                })
        }
        )
    }

    const onCmtSubmit = (data) => {
        const model = {
            ...data,
            commentedPerson: user.username,
        }

        ReportsServices.updateComment(data.id, model)
            .then((res) => {
                refreshPage(data.id)
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success',
                })

                createNotify(data);
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
                    message: 'Update Unsuccessful',
                    type: 'error',
                })
            })

        // alert(JSON.stringify(model))
    }

    const setResultChipColor = (result) => {
        if (result === true) {
            return <Chip label='Đã gặp người đại diện (HT/HP)' className={classes.chipSuccess} />
        } else if (result === false) {
            return <Chip label='Chưa gặp người đại diện (HT/HP)' className={classes.chipFailed} />
        }
    }

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* Content Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    {user.username === report?.username &&
                        report?.commentedPerson === null &&
                        report?.contextComments === null ? (
                        <form onSubmit={rpSubmit(onRpSubmit)} noValidate>
                            {/* Report Detail */}
                            <Grid
                                container
                                spacing={0}
                                className={classes.wrapper}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.row}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.header}
                                    >
                                        {headers.child1}
                                    </Typography>
                                </Grid>
                                {/* Detail */}
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.row}
                                >
                                    <Grid container spacing={0}>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.row}
                                        >
                                            <Controller
                                                name="id"
                                                control={rpControl}
                                                render={({ value }) => (
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            <FormControl variant="outlined" fullWidth required>
                                                <InputLabel id="isSuccess-label">{fields.rs.title}</InputLabel>
                                                <Controller
                                                    name="isSuccess"
                                                    control={rpControl}
                                                    render={({ value, onChange }) => (
                                                        <Select
                                                            labelId="isSuccess-label"
                                                            label={fields.rs.title}
                                                            value={value}
                                                            onChange={onChange}
                                                            MenuProps={MenuProps}
                                                        // fullWidth
                                                        // variant="outlined"
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
                                                        // <TextField
                                                        //     label={fields.rs.title}
                                                        //     variant="outlined"
                                                        //     required
                                                        //     fullWidth
                                                        //     autoFocus
                                                        //     value={value}
                                                        //     onChange={onChange}
                                                        //     error={
                                                        //         !!rpErrors.isSuccess
                                                        //     }
                                                        //     helperText={
                                                        //         rpErrors?.isSuccess
                                                        //             ?.message
                                                        //     }
                                                        // />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.row}
                                        >
                                            <Controller
                                                name="description"
                                                control={rpControl}
                                                render={({
                                                    value,
                                                    onChange,
                                                }) => (
                                                    <TextField
                                                        label={fields.des.title}
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        error={
                                                            !!rpErrors.description
                                                        }
                                                        helperText={
                                                            rpErrors
                                                                ?.description
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.row}
                                        >
                                            <Controller
                                                name="positivity"
                                                control={rpControl}
                                                render={({
                                                    value,
                                                    onChange,
                                                }) => (
                                                    <TextField
                                                        label={fields.pos.title}
                                                        variant="outlined"
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        error={
                                                            !!rpErrors.positivity
                                                        }
                                                        helperText={
                                                            rpErrors?.positivity
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.row}
                                        >
                                            <Controller
                                                name="difficulty"
                                                control={rpControl}
                                                render={({
                                                    value,
                                                    onChange,
                                                }) => (
                                                    <TextField
                                                        label={
                                                            fields.diffic.title
                                                        }
                                                        variant="outlined"
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        error={
                                                            !!rpErrors.difficulty
                                                        }
                                                        helperText={
                                                            rpErrors?.difficulty
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.row}
                                        >
                                            <Controller
                                                name="futurePlan"
                                                control={rpControl}
                                                render={({
                                                    value,
                                                    onChange,
                                                }) => (
                                                    <TextField
                                                        label={
                                                            fields.futPl.title
                                                        }
                                                        variant="outlined"
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        error={
                                                            !!rpErrors.futurePlan
                                                        }
                                                        helperText={
                                                            rpErrors?.futurePlan
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        {/* Action */}
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.action}
                                        >
                                            <Button
                                                className={classes.submit}
                                                // variant="contained"
                                                disabled={!rpState.isDirty}
                                                type="submit"
                                            >
                                                {operations.save}
                                            </Button>
                                        </Grid>
                                        {/* End action */}
                                    </Grid>
                                </Grid>
                                {/* End Detail */}
                            </Grid>
                        </form>
                    ) : (
                        <Grid container spacing={0} className={classes.wrapper}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Typography
                                    color="inherit"
                                    className={classes.header}
                                >
                                    {headers.child1}
                                </Typography>
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
                                        md={3}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.rs.title}
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
                                            {setResultChipColor(report?.isSuccess)}
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
                                        md={3}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.des.title}
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
                                            {report?.description}
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
                                        md={3}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.pos.title}
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
                                            {report?.positivity}
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
                                        md={3}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.diffic.title}
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
                                            {report?.difficulty}
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
                                        md={3}
                                        lg={3}
                                        className={classes.rowx}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {fields.futPl.title}
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
                                            {report?.futurePlan}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                {/* Another Sector */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.content}
                >
                    {user.roles[0] === roleNames.salesman ||
                        (user.roles[0] !== roleNames.salesman &&
                            user.username === report?.username) ? (
                        <Grid container spacing={0} className={classes.wrapper}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.row}
                            >
                                <Typography
                                    color="inherit"
                                    className={classes.header}
                                >
                                    {headers.child2}
                                </Typography>
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
                                        md={8}
                                        lg={6}
                                        className={classes.row}
                                    >
                                        {/* <Typography color="inherit"> */}
                                        <Controller
                                            name="contextComments"
                                            control={cmtControl}
                                            render={({ value }) => (
                                                <TextField
                                                    label={
                                                        report?.commentedPerson
                                                            ? `${fields.cmt.hasCmt} ${report?.commentedPerson}`
                                                            : fields.cmt.noCmt
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
                                        {/* </Typography> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <form onSubmit={cmtSubmit(onCmtSubmit)} noValidate>
                            {/* Comment Detail */}
                            <Grid
                                container
                                spacing={0}
                                className={classes.wrapper}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    className={classes.row}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.header}
                                    >
                                        {headers.child2}
                                    </Typography>
                                </Grid>
                                {/* Detail */}
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    className={classes.row}
                                >
                                    <Grid container spacing={0}>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.row}
                                        >
                                            <Controller
                                                name="id"
                                                control={cmtControl}
                                                render={({ value }) => (
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={value}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="contextComments"
                                                control={cmtControl}
                                                render={({
                                                    value,
                                                    onChange,
                                                }) => (
                                                    <TextField
                                                        label={
                                                            report?.commentedPerson
                                                                ? `${fields.cmt.hasCmt} ${report?.commentedPerson}`
                                                                : fields.cmt
                                                                    .noCmt
                                                        }
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={5}
                                                        value={value}
                                                        onChange={onChange}
                                                        error={
                                                            !!cmtErrors.contextComments
                                                        }
                                                        helperText={
                                                            cmtErrors
                                                                ?.contextComments
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        {/* Action */}
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.action}
                                        >
                                            <Button
                                                className={classes.submit}
                                                variant="contained"
                                                disabled={!cmtState.isDirty}
                                                type="submit"
                                            >
                                                {operations.save}
                                            </Button>
                                        </Grid>
                                        {/* End Action */}
                                    </Grid>
                                </Grid>
                                {/* End Detail */}
                            </Grid>
                        </form>
                    )}
                </Grid>
            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default RepInfo

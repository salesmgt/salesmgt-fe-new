import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Grid,
    Typography,
    Button,
    TextField,
    makeStyles,
    FormControlLabel,
    RadioGroup,
    Radio,
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '../../../../hooks/AppContext'
import { Snackbars, Loading, NotFound } from '../../../../components'
import { Consts } from './MOUInfoConfig'
import { useAuth } from '../../../../hooks/AuthContext'
import { roleNames } from '../../../../constants/Generals'
import * as TargetSchoolsServices from '../../TargetSchoolsServices'
import classes from './MOUInfo.module.scss'

const clientSchema = yup.object().shape({
    // note: yup.string().trim(),
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
            color: 'black',
        },
    },
    disabled: {},
}))

function MOUInfo(props) {
    const { target, refreshPage } = props
    const memos = target?.memorandums

    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const { user } = useAuth()

    const [memoDets, setMemoDets] = useState(memos ? memos[0] : null)

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        id: memoDets?.id,
        duration: memoDets?.duration,
        revenueCriteria: memoDets?.revenueCriteria,
        service: memoDets?.service,
        note: memoDets?.note,
    }

    const {
        control,
        errors,
        handleSubmit,
        formState,
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    // useEffect(() => {
    //     setValue('id', memoDets?.id, { shouldDirty: false })
    //     setValue('duration', memoDets?.duration, { shouldDirty: false })
    //     setValue('revenueCriteria', memoDets?.revenueCriteria, {
    //         shouldDirty: false,
    //     })
    //     setValue('service', memoDets?.service, { shouldDirty: false })
    //     setValue('note', memoDets?.note, { shouldDirty: false })
    // }, [memoDets])

    useEffect(() => {
        reset({
            id: memoDets?.id,
            duration: memoDets?.duration,
            revenueCriteria: memoDets?.revenueCriteria,
            service: memoDets?.service,
            note: memoDets?.note,
        })
    }, [memoDets])

    // useEffect(() => {
    //     reset({
    //         id: memoDets?.id,
    //         duration: memoDets?.duration,
    //         revenueCriteria: memoDets?.revenueCriteria,
    //         service: memoDets?.service,
    //         note: memoDets?.note,
    //     })
    // }, [target])

    // console.log(formState.isDirty)
    // console.log(formState.dirtyFields)

    if (!target) {
        return <Loading />
    }

    if (!memos) {
        return <NotFound title={operations.empty} />
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            date: moment(memoDets?.date).format('YYYY-MM-DD'),
        }

        TargetSchoolsServices.updateMOU(data?.id, model)
            .then((res) => {
                refreshPage(target?.id)
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

    return (
        <div className={classes.panel}>
            <Grid container spacing={0} className={classes.body}>
                {/* MOU Info*/}
                {user.roles[0] === roleNames.salesman ? (
                    target?.username === user.username ? (
                        <>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={5}
                                lg={4}
                                className={classes.scrollCnt}
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.wrapper}
                                >
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
                                    {memos.map((memo, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            key={index}
                                            className={classes.row}
                                        >
                                            <Card className={classes.card}>
                                                <CardContent
                                                    className={classes.cardCnt}
                                                >
                                                    <Grid container spacing={0}>
                                                        <Grid
                                                            item
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            lg={6}
                                                        >
                                                            <Typography
                                                                color="inherit"
                                                                variant="subtitle1"
                                                                className={
                                                                    classes.cardSubtitle1
                                                                }
                                                            >
                                                                {memo?.service}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            lg={6}
                                                        >
                                                            <Typography
                                                                color="inherit"
                                                                variant="subtitle2"
                                                                className={
                                                                    classes.cardSubtitle2
                                                                }
                                                            >
                                                                {moment(
                                                                    memo?.date
                                                                ).format(
                                                                    'DD/MM/YYYY'
                                                                )}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Typography
                                                        color="inherit"
                                                        noWrap
                                                        variant="body1"
                                                    >
                                                        {memo?.note}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions
                                                    className={classes.cardAct}
                                                >
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            setMemoDets(memo)
                                                        }
                                                    >
                                                        {operations.view}
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={7}
                                lg={8}
                                className={classes.content}
                            >
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    {/* Memo Detail */}
                                    <Grid
                                        container
                                        spacing={0}
                                        className={classes.wrapper}
                                    >
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
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {fields.term.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Controller
                                                        name="id"
                                                        control={control}
                                                        render={({ value }) => (
                                                            <input
                                                                type="hidden"
                                                                name="id"
                                                                value={value}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name="duration"
                                                        control={control}
                                                        render={({
                                                            value,
                                                            onChange,
                                                        }) => (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                autoFocus
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                error={
                                                                    !!errors.duration
                                                                }
                                                                helperText={
                                                                    errors
                                                                        ?.duration
                                                                        ?.message
                                                                }
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
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {fields.service.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Controller
                                                        name="service"
                                                        control={control}
                                                        render={({
                                                            value,
                                                            onChange,
                                                        }) => (
                                                            <RadioGroup
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                row
                                                            >
                                                                <FormControlLabel
                                                                    label="ESL"
                                                                    value="ESL"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                />
                                                                <FormControlLabel
                                                                    label="SEL"
                                                                    value="SEL"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                />
                                                                <FormControlLabel
                                                                    label="Toán khoa"
                                                                    value="Toán khoa"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                />
                                                                <FormControlLabel
                                                                    label="Stem"
                                                                    value="Stem"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                />
                                                            </RadioGroup>
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
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {fields.revenue.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Controller
                                                        name="revenueCriteria"
                                                        control={control}
                                                        render={({
                                                            value,
                                                            onChange,
                                                        }) => (
                                                            <RadioGroup
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                row
                                                            >
                                                                <FormControlLabel
                                                                    label="Học sinh"
                                                                    value="Học sinh"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                />
                                                                <FormControlLabel
                                                                    label="Tiết"
                                                                    value="Tiết"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                />
                                                            </RadioGroup>
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
                                                    md={12}
                                                    lg={12}
                                                    className={classes.rowx}
                                                >
                                                    <Typography
                                                        color="inherit"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {fields.note.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
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
                                                                variant="outlined"
                                                                fullWidth
                                                                multiline
                                                                rows={5}
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                error={
                                                                    !!errors.note
                                                                }
                                                                helperText={
                                                                    errors?.note
                                                                        ?.message
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* Action */}
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
                                                    md={12}
                                                    lg={12}
                                                    // className={classes.rowx}
                                                />

                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    className={classes.action}
                                                >
                                                    <Button
                                                        className={
                                                            classes.submit
                                                        }
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
                                        {/* End Action */}
                                    </Grid>
                                </form>
                            </Grid>
                        </>
                    ) : (
                        <div className={classes.notFound}>
                            <NotFound title={operations.restriction} />
                        </div>
                    )
                ) : (
                    <>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={5}
                            lg={4}
                            className={classes.scrollCnt}
                        >
                            <Grid
                                container
                                spacing={0}
                                className={classes.wrapper}
                            >
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
                                {memos.map((memo, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.row}
                                        key={index}
                                    >
                                        <Card className={classes.card}>
                                            <CardContent
                                                className={classes.cardCnt}
                                            >
                                                <Grid container spacing={0}>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        lg={6}
                                                    >
                                                        <Typography
                                                            className={
                                                                classes.cardSubtitle1
                                                            }
                                                        >
                                                            {memo?.service}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        lg={6}
                                                    >
                                                        <Typography
                                                            className={
                                                                classes.cardSubtitle2
                                                            }
                                                        >
                                                            {moment(
                                                                memo?.date
                                                            ).format(
                                                                'DD/MM/YYYY'
                                                            )}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Typography
                                                    color="inherit"
                                                    noWrap
                                                    variant="body1"
                                                >
                                                    {memo?.note}
                                                </Typography>
                                            </CardContent>
                                            <CardActions
                                                className={classes.cardAct}
                                            >
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        setMemoDets(memo)
                                                    }
                                                >
                                                    {operations.view}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={7}
                            lg={8}
                            className={classes.content}
                        >
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                {/* Memo Detail */}
                                <Grid
                                    container
                                    spacing={0}
                                    className={classes.wrapper}
                                >
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
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.term.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Typography color="inherit">
                                                    {memoDets?.duration}
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
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.service.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Typography color="inherit">
                                                    {memoDets?.service}
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
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Typography
                                                    color="inherit"
                                                    className={classes.title}
                                                >
                                                    {fields.revenue.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Typography color="inherit">
                                                    {memoDets.revenueCriteria}
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
                                                md={12}
                                                lg={12}
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
                                                md={12}
                                                lg={12}
                                                className={classes.rowx}
                                            >
                                                <Controller
                                                    name="note"
                                                    control={control}
                                                    render={({ value }) => (
                                                        <TextField
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
                            </form>
                        </Grid>
                    </>
                )}
            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default MOUInfo

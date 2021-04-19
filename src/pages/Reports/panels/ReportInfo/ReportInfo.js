import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Snackbars, Loading } from '../../../../components'
import { Consts } from './ReportInfoConfig'
import * as ReportsServices from '../../ReportsServices'
import classes from './ReportInfo.module.scss'

const clientSchema = yup.object().shape({
    // reprName: yup
    //     .string()
    //     .trim()
    //     .min(4, 'Name must be at least 4 characters')
    //     .max(30, 'Name must be at most 30 characters')
    //     .required('Name is required'),
    // reprPhone: yup
    //     .string()
    //     .max(10, 'Phone must be at most 10 digits')
    //     .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    // reprEmail: yup.string().trim().email('Invalid email'),
    // result: yup.string().trim(),
    // description: yup.string().trim(),
    // positivity: yup.string().trim(),
    // difficulty: yup.string().trim(),
    // futurePlan: yup.string().trim(),
    // contextComments: yup.string().trim(),
})

function RepInfo(props) {
    const { report, refreshPage } = props
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        id: report?.id,
        result: report?.result,
        description: report?.description,
        positivity: report?.positivity,
        difficulty: report?.difficulty,
        futurePlan: report?.futurePlan,

        // commentedPerson: report.comment.fullName,
        contextComments: report.comment.content,
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        reset({
            id: report?.id,
            result: report?.result,
            description: report?.description,
            positivity: report?.positivity,
            difficulty: report?.difficulty,
            futurePlan: report?.futurePlan,

            // commentedPerson: report.comment.fullName,
            contextComments: report.comment.content,
        })
    }, [report])

    if (!report) {
        return <Loading />
    }

    const onSubmit = (data) => {
        const model = {
            ...data,

            date: report.date,

            schoolName: report?.name,
            address: report?.address,
            district: report?.district,
            reprName: report?.reprName,
            reprIsMale: report?.reprIsMale,

            // targetId: report?.targetId,
            schoolYear: report?.schoolYear,
            purpose: report?.schoolYear,

            // avatar: report?.avatar,
            // username: report?.username,
            // fullName: report?.fullName,
        }

        // ReportsServices.updateSchool(data.id, model)
        //     .then((res) => {
        //         refreshPage(data.id)
        //         setNotify({
        //             isOpen: true,
        //             message: 'Updated Successfully',
        //             type: 'success',
        //         })
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error)
        //             history.push({
        //                 pathname: '/errors',
        //                 state: { error: error.response.status },
        //             })
        //         }
        //         setNotify({
        //             isOpen: true,
        //             message: 'Update Unsuccessful',
        //             type: 'error',
        //         })
        //     })

        alert(JSON.stringify(model))
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
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={0}>
                            {/* First child - Principal Detail*/}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.child}
                            >
                                <Grid container spacing={0}>
                                    {/* Child header */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={3}
                                        lg={3}
                                        className={classes.titleZone}
                                    >
                                        <Typography
                                            color="inherit"
                                            className={classes.title}
                                        >
                                            {headers.child1}
                                        </Typography>
                                    </Grid>
                                    {/* Child body */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                        lg={6}
                                        className={classes.detailZone}
                                    >
                                        <Grid container spacing={3}>
                                            {/* Detail */}
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
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
                                                    name="result"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.rs.title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.result
                                                            }
                                                            helperText={
                                                                errors?.result
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
                                            >
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.des.title
                                                            }
                                                            variant="outlined"
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.description
                                                            }
                                                            helperText={
                                                                errors
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
                                            >
                                                <Controller
                                                    name="positivity"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.pos.title
                                                            }
                                                            variant="outlined"
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.positivity
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.positivity
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
                                            >
                                                <Controller
                                                    name="difficulty"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.diffic
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.difficulty
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.difficulty
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
                                            >
                                                <Controller
                                                    name="futurePlan"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.futPl
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.futurePlan
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.futurePlan
                                                                    ?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Action */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={10}
                                lg={9}
                                className={classes.action}
                            >
                                <Button
                                    className={classes.submit}
                                    variant="contained"
                                    disabled={!formState.isDirty}
                                    type="submit"
                                >
                                    {operations.save}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
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
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid
                                container
                                spacing={0}
                                className={classes.titleZone}
                            >
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Typography
                                        color="inherit"
                                        // className={classes.detail}
                                    >
                                        Manager Comment
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9} md={7} lg={6}>
                                    <Typography
                                        color="inherit"
                                        // className={classes.detail}
                                    >
                                        <Controller
                                            name="contextComments"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <TextField
                                                    label={
                                                        report.comment.fullName
                                                    }
                                                    variant="outlined"
                                                    // required
                                                    fullWidth
                                                    value={value}
                                                    onChange={onChange}
                                                    error={
                                                        !!errors.contextComments
                                                    }
                                                    helperText={
                                                        errors?.contextComments
                                                            ?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid
                                container
                                spacing={0}
                                className={classes.titleZone}
                            >
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Typography
                                        color="inherit"
                                        // className={classes.detail}
                                    >
                                        Title 2
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9} md={7} lg={6}>
                                    <Typography
                                        color="inherit"
                                        // className={classes.detail}
                                    >
                                        Child 2
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default RepInfo

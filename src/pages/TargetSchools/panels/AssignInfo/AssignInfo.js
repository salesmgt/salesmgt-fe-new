import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Typography, Icon, Avatar } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '../../../../hooks/AppContext'
import { Snackbars, Loading } from '../../../../components'
import { Consts } from './AssignInfoConfig'
import * as TargetSchoolsServices from '../../TargetSchoolsServices'
import classes from './AssignInfo.module.scss'

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
})

function AssignInfo(props) {
    const { target, refreshPage } = props
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { schYears, salesPurps } = useApp()

    const defaultValues = {
        id: target?.id,
        schoolYear: target?.schoolYear ? target?.schoolYear : schYears[0],
        purpose: target?.purpose ? target?.purpose : salesPurps[0],
        username: target?.username ? target?.username : '',
        note: target?.note ? target?.note : '',
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        reset({
            id: target?.id,
            schoolYear: target?.schoolYear ? target?.schoolYear : schYears[0],
            purpose: target?.purpose ? target?.purpose : salesPurps[0],
            username: target?.username ? target?.username : '',
            note: target?.note ? target?.note : '',
        })
    }, [target])

    if (!target) {
        return <Loading />
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            // reprIsMale: data.isMale === 'true' ? true : false,

            // name: school?.name,
            // address: school?.address,
            // district: school?.district,

            // educationalLevel: school?.educationalLevel,
            // type: school?.type,
            // scale: school?.scale,
            // phone: school?.phone,

            // description: school?.description,
            // status: school?.status,

            // active: school?.active,
        }

        // TargetSchoolsServices.updateTarget(data.id, model)
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
                {/* Assign Info*/}
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
                                    xs={5}
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
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        <div className={classes.user}>
                                            {target?.avatar ? (
                                                <Avatar
                                                    className={classes.avatar}
                                                    alt="user avatar"
                                                    src={target?.avatar}
                                                />
                                            ) : (
                                                <Avatar
                                                    className={classes.avatar}
                                                >
                                                    {
                                                        target?.fullName
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
                                                    {target?.fullName}
                                                </Typography>
                                                <Typography
                                                    className={classes.username}
                                                >
                                                    {target?.username}
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
                                    xs={5}
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
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.schoolYear}
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
                                    xs={5}
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
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.purpose}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* end wrapper */}
                </Grid>
                {/* end content */}

                {/*School Info */}
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
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.name.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.schoolName}
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
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.addr.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.address}
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
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.dist.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.district}
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
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.eduLvl.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.level}
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
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.reprName.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <Typography color="inherit">
                                        {target?.reprName}
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
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    className={classes.rowx}
                                >
                                    <Typography
                                        color="inherit"
                                        className={classes.title}
                                    >
                                        {fields.reprIsMale.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    sm={8}
                                    md={6}
                                    lg={7}
                                    className={classes.rowx}
                                >
                                    <div className={classes.genderZone}>
                                        <Typography
                                            color="inherit"
                                            className={classes.gender}
                                        >
                                            {target?.reprIsMale
                                                ? 'Male'
                                                : 'Female'}
                                        </Typography>
                                        <Icon>
                                            {target?.reprIsMale ? (
                                                <AiOutlineMan color="#005BB5" />
                                            ) : (
                                                <AiOutlineWoman color="#E26A89" />
                                            )}
                                        </Icon>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* end wrapper */}
                </Grid>
                {/* end content */}
            </Grid>
        </div>
    )
}

export default AssignInfo

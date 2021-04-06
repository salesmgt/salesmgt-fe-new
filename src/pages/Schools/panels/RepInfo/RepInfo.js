import React, { useState } from 'react'
import {
    Button,
    FormControlLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Notifications } from '../../../../components'
import { Consts } from './RepInfoConfig'
import classes from './RepInfo.module.scss'

const clientSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    phone: yup
        .string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    email: yup.string().email('Invalid email').trim(),
})

const serverSchema = [
    // {
    //     type: 'server',
    //     name: 'name',
    //     message: null,
    // },
    // {
    //     type: 'server',
    //     name: 'credential',
    //     message: 'Invalid username or password',
    // },
]

function RepInfo(props) {
    const { headers, operations, fields } = Consts

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { data } = props

    const defaultValues = {
        name: data.name,
        gender: String(data.gender),
        phone: data.phone,
        email: data.email,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = (data) => {
        const rs = { ...data, gender: data.gender === 'true' ? true : false }
        alert(JSON.stringify(rs))
        setNotify({
            isOpen: true,
            message: 'Updated Successfully',
            type: 'success',
        })
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
                                        lg={7}
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
                                                    name="name"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.fullName
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.name
                                                            }
                                                            helperText={
                                                                errors?.name
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
                                                <InputLabel>
                                                    {fields.gender.title}
                                                </InputLabel>
                                                <Controller
                                                    name="gender"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <RadioGroup
                                                            value={value}
                                                            onChange={onChange}
                                                            row
                                                        >
                                                            <FormControlLabel
                                                                label="Male"
                                                                value="true"
                                                                control={
                                                                    <Radio />
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                label="Female"
                                                                value="false"
                                                                control={
                                                                    <Radio />
                                                                }
                                                            />
                                                        </RadioGroup>
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
                                                    name="phone"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.phone
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.phone
                                                            }
                                                            helperText={
                                                                errors?.phone
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
                                                    name="email"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.email
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.email
                                                            }
                                                            helperText={
                                                                errors?.email
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
                                lg={10}
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
            </Grid>
            <Notifications notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default RepInfo

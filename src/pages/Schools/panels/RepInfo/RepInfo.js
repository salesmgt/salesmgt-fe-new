import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
import { Snackbars } from '../../../../components'
import { Consts } from './RepInfoConfig'
import * as SchoolsServices from '../../SchoolsServices'
import classes from './RepInfo.module.scss'

const clientSchema = yup.object().shape({
    reprName: yup
        .string()
        .trim()
        .min(4, 'Name must be at least 4 characters')
        .max(30, 'Name must be at most 30 characters')
        .required('Name is required'),
    reprPhone: yup
        .string()
        .max(10, 'Phone must be at most 10 digits')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    reprEmail: yup.string().trim().email('Invalid email'),
})

const serverSchema = [
    // {
    //     type: 'server',
    //     name: 'name',
    //     message: null,
    // },
]

function RepInfo(props) {
    const { schData } = props
    const { headers, operations, fields } = Consts

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        id: schData?.id,
        reprName: schData?.reprName,
        reprIsMale: String(schData?.reprIsMale),
        reprPhone: schData?.reprPhone,
        reprEmail: schData?.reprEmail,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = (data) => {
        const model = {
            ...data,
            reprIsMale: data.isMale === 'true' ? true : false,

            name: schData?.name,
            address: schData?.address,
            district: schData?.district,

            educationalLevel: schData?.educationalLevel,
            type: schData?.type,
            scale: schData?.scale,
            phone: schData?.phone,

            description: schData?.description,
            status: schData?.status,

            active: schData?.active,
        }

        SchoolsServices.updateSchool(data.id, model)
            .then((data) => {
                // refreshPage()
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
                                        lg={5}
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
                                                    name="reprName"
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
                                                                !!errors.reprName
                                                            }
                                                            helperText={
                                                                errors?.reprName
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
                                                    {fields.isMale.title}
                                                </InputLabel>
                                                <Controller
                                                    name="reprIsMale"
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
                                                    name="reprPhone"
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
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.reprPhone
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.reprPhone
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
                                                    name="reprEmail"
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
                                                            // required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.reprEmail
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.reprEmail
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
                                lg={8}
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
            <Snackbars notify={notify} setNotify={setNotify} />
        </div>
    )
}

export default RepInfo

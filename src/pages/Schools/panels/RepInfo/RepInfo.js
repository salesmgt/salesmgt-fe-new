import React, { useEffect } from 'react'
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
import { Snackbars, Loading } from '../../../../components'
import { Consts } from './RepInfoConfig'
import * as SchoolsServices from '../../SchoolsServices'
import { PHONE_RGX } from '../../../../utils/Regex'
import { useSnackbar } from 'notistack'
import classes from './RepInfo.module.scss'

const clientSchema = yup.object().shape({
    reprName: yup
        .string()
        .trim()
        .min(4, 'Name must be at least 4 characters')
        .max(30, 'Name must be at most 30 characters'),
    reprPhone: yup
        .string()
        .max(10, 'Phone must be at most 10 digits and has the correct format')
        .matches(PHONE_RGX, {
            message: 'Phone number is in wrong format (03|5|7|9xxxxxxxx)',
            excludeEmptyString: true,
        }),
    reprEmail: yup.string().trim().email('Invalid email'),
})

function RepInfo(props) {
    const { school, refreshPage } = props
    const { headers, operations, fields, messages } = Consts

    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar()

    const defaultValues = {
        id: school?.schoolId,
        reprName: school?.reprName ? school?.reprName : '',
        reprIsMale: String(school?.reprIsMale)
            ? String(school?.reprIsMale)
            : String(true),
        reprPhone: school?.reprPhone ? school?.reprPhone : '',
        reprEmail: school?.reprEmail ? school?.reprEmail : '',
    }

    const { control, errors, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        reset(defaultValues)
    }, [school])

    if (!school) {
        return <Loading />
    }

    const onSubmit = (data) => {
        const model = {
            ...data,
            reprPhone: data?.reprPhone ? data?.reprPhone : null,
            reprEmail: data?.reprEmail ? data?.reprEmail : null,
            reprIsMale: data?.reprIsMale === 'true' ? true : false,

            id: school?.schoolId,
            name: school?.name,
            address: school?.address,
            district: school?.district,
            latitude: school?.latitude ? school?.latitude : 0.0,
            longitude: school?.longitude ? school?.longitude : 0.0,

            educationalLevel: school?.educationalLevel,
            type: school?.type,
            // scale: school?.scale,
            phone: school?.phone,

            // description: school?.description,
            status: school?.status,

            active: school?.active,
        }

        // console.log('data.id: ', data.id);
        // console.log('model: ', model);

        SchoolsServices.updateSchool(data.id, model)
            .then((res) => {
                refreshPage(data.id)
                enqueueSnackbar(messages.success, { variant: 'success' })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
                enqueueSnackbar(messages.error, { variant: 'error' })
            })

        // alert(JSON.stringify(model))
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
                        {/* Principal Detail */}
                        <Grid container spacing={0} className={classes.wrapper}>
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
                                md={9}
                                lg={8}
                                className={classes.row}
                            >
                                <Grid container spacing={0}>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        className={classes.row}
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
                                            render={({ value, onChange }) => (
                                                <TextField
                                                    label={
                                                        fields.fullName.title
                                                    }
                                                    variant="outlined"
                                                    fullWidth
                                                    autoFocus
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!errors.reprName}
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
                                        className={classes.row}
                                    >
                                        <InputLabel>
                                            {fields.reprIsMale.title}
                                        </InputLabel>
                                        <Controller
                                            name="reprIsMale"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <RadioGroup
                                                    value={value}
                                                    onChange={onChange}
                                                    row
                                                >
                                                    <FormControlLabel
                                                        label={
                                                            fields.reprIsMale
                                                                .male.lb
                                                        }
                                                        value={
                                                            fields.reprIsMale
                                                                .male.value
                                                        }
                                                        control={<Radio />}
                                                    />
                                                    <FormControlLabel
                                                        label={
                                                            fields.reprIsMale
                                                                .female.lb
                                                        }
                                                        value={
                                                            fields.reprIsMale
                                                                .female.value
                                                        }
                                                        control={<Radio />}
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
                                        className={classes.row}
                                    >
                                        <Controller
                                            name="reprPhone"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <TextField
                                                    label={fields.phone.title}
                                                    variant="outlined"
                                                    // required
                                                    // fullWidth
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!errors.reprPhone}
                                                    helperText={
                                                        errors?.reprPhone
                                                            ?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        className={classes.row}
                                    >
                                        <Controller
                                            name="reprEmail"
                                            control={control}
                                            render={({ value, onChange }) => (
                                                <TextField
                                                    label={fields.email.title}
                                                    variant="outlined"
                                                    // required
                                                    fullWidth
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!errors.reprEmail}
                                                    helperText={
                                                        errors?.reprEmail
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
                                            disabled={!formState.isDirty}
                                            type="submit"
                                        >
                                            {operations.save}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* End Detail */}
                        </Grid>
                    </form>
                </Grid>
                {/* Another Sector */}
            </Grid>
        </div>
    )
}

export default RepInfo

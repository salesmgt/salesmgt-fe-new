import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    TextField,
    DialogContent,
    DialogActions,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    makeStyles,
    RadioGroup,
    Radio,
    Checkbox,
    FormLabel,
    FormControlLabel,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Snackbars } from '../../../../components'
import { useApp } from '../../../../hooks/AppContext'
import * as SchoolsServices from '../../SchoolsServices'
import { Consts } from '../FormConfig'
import classes from './CreateSchool.module.scss'

const clientSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    address: yup.string().trim().required('Address is required'),
    phone: yup
        .string()
        .max(11, 'Tel must be at most 11 digits')
        .matches(/(02)+([0-9]{9})\b/g, 'Incorrect entry'),
    reprName: yup
        .string()
        .trim()
        .min(4, 'Name must be at least 4 characters')
        .max(30, 'Name must be at most 30 characters'),
    // .required('Name is required'),
    reprPhone: yup
        .string()
        .max(10, 'Phone must be at most 10 digits')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
    reprEmail: yup.string().trim().email('Invalid email'),
})

// const serverSchema = [
//     {
//         type: 'server',
//         name: 'username',
//         message: 'Username already exists',
//     },
// ]

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
    formControl: {
        width: 200,
    },
}))

function CreateSchoolForm(props) {
    const { onClose } = props
    const { operations, fields } = Consts
    const styles = useStyles()

    const { dists, schEduLvls, schTypes, schScales, schStatus } = useApp()

    const history = useHistory()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const defaultValues = {
        name: '',
        address: '',
        district: dists[0],
        phone: '',
        educationalLevel: schEduLvls[0],
        type: schTypes[0],
        scale: schScales[0],

        showRep: false,
    }

    const { control, handleSubmit, errors, formState, reset, watch } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    const repWatch = watch('showRep')

    const onSubmit = (data) => {
        const model = { ...data, status: schStatus[0] }
        delete model.showRep

        SchoolsServices.createSchool(model)
            .then((res) => {
                setNotify({
                    isOpen: true,
                    message: 'Created Successfully',
                    type: 'success',
                })
                reset({
                    name: '',
                    address: '',
                    district: dists[0],
                    phone: '',
                    educationalLevel: schEduLvls[0],
                    type: schTypes[0],
                    scale: schScales[0],

                    showRep: false,
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
                    message: 'Create Unsuccessful',
                    type: 'error',
                })
            })

        alert(JSON.stringify(model))
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.dialogCont}>
                    <Grid container spacing={2} className={classes.wrapper}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.name.title}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        autoFocus
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.name}
                                        helperText={errors?.name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7} md={7} lg={7}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.addr.title}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.address}
                                        helperText={errors?.address?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <InputLabel>{fields.dist.title}</InputLabel>
                            <Controller
                                name="district"
                                control={control}
                                render={({ value, onChange }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        MenuProps={MenuProps}
                                        disableUnderline
                                    >
                                        {dists.map((data) => (
                                            <MenuItem
                                                key={data}
                                                value={data}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected:
                                                        styles.menuItemSelected,
                                                }}
                                            >
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ value, onChange }) => (
                                    <TextField
                                        label={fields.tel.title}
                                        variant="outlined"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.phone}
                                        helperText={errors?.phone?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <InputLabel>{fields.eduLvl.title}</InputLabel>
                            <Controller
                                name="educationalLevel"
                                control={control}
                                render={({ value, onChange }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        MenuProps={MenuProps}
                                        disableUnderline
                                    >
                                        {schEduLvls.map((data) => (
                                            <MenuItem
                                                key={data}
                                                value={data}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected:
                                                        styles.menuItemSelected,
                                                }}
                                            >
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <InputLabel>{fields.type.title}</InputLabel>
                            <Controller
                                name="type"
                                control={control}
                                render={({ value, onChange }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        MenuProps={MenuProps}
                                        disableUnderline
                                    >
                                        {schTypes.map((data) => (
                                            <MenuItem
                                                key={data}
                                                value={data}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected:
                                                        styles.menuItemSelected,
                                                }}
                                            >
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <InputLabel>{fields.scale.title}</InputLabel>
                            <Controller
                                name="scale"
                                control={control}
                                render={({ value, onChange }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        MenuProps={MenuProps}
                                        disableUnderline
                                    >
                                        {schScales.map((data) => (
                                            <MenuItem
                                                key={data}
                                                value={data}
                                                classes={{
                                                    root: styles.menuItemRoot,
                                                    selected:
                                                        styles.menuItemSelected,
                                                }}
                                            >
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormLabel>{operations.WithData}</FormLabel>
                            <Controller
                                name="showRep"
                                control={control}
                                render={({ value, onChange }) => (
                                    <Checkbox
                                        onChange={(e) =>
                                            onChange(e.target.checked)
                                        }
                                        checked={value}
                                    />
                                )}
                            />
                        </Grid>

                        {repWatch && (
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Controller
                                        name="reprName"
                                        control={control}
                                        defaultValue=""
                                        render={({ value, onChange }) => (
                                            <TextField
                                                label={fields.repName.title}
                                                variant="outlined"
                                                fullWidth
                                                autoFocus
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.reprName}
                                                helperText={
                                                    errors?.reprName?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <InputLabel>
                                        {fields.repGender.title}
                                    </InputLabel>
                                    <Controller
                                        name="reprIsMale"
                                        control={control}
                                        defaultValue={String(true)}
                                        render={({ value, onChange }) => (
                                            <RadioGroup
                                                value={value}
                                                onChange={onChange}
                                                row
                                            >
                                                <FormControlLabel
                                                    label="Male"
                                                    value="true"
                                                    control={<Radio />}
                                                />
                                                <FormControlLabel
                                                    label="Female"
                                                    value="false"
                                                    control={<Radio />}
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Controller
                                        name="reprPhone"
                                        control={control}
                                        defaultValue=""
                                        render={({ value, onChange }) => (
                                            <TextField
                                                label={fields.repPhone.title}
                                                variant="outlined"
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.reprPhone}
                                                helperText={
                                                    errors?.reprPhone?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Controller
                                        name="reprEmail"
                                        control={control}
                                        defaultValue=""
                                        render={({ value, onChange }) => (
                                            <TextField
                                                label={fields.repEmail.title}
                                                variant="outlined"
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                error={!!errors.reprEmail}
                                                helperText={
                                                    errors?.reprEmail?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </DialogContent>

                <DialogActions className={classes.dialogAct}>
                    <Button
                        className={classes.btnSave}
                        type="submit"
                        disabled={!formState.isDirty}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {operations.save}
                    </Button>
                    <Button
                        onClick={() => {
                            reset({
                                errors: false,
                                name: '',
                                address: '',
                                district: dists[0],
                                phone: '',
                                educationalLevel: schEduLvls[0],
                                type: schTypes[0],
                                scale: schScales[0],

                                showRep: false,
                            })
                            onClose()
                        }}
                    >
                        {operations.cancel}
                    </Button>
                </DialogActions>
            </form>
            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default CreateSchoolForm

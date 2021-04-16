import React, { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    FormControlLabel,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    withStyles,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    makeStyles,
    RadioGroup,
    Radio,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from 'mui-pickers-v3'
import DateFnsUtils from '@date-io/date-fns'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classes from './CreateSchool.module.scss'
import { useApp } from '../../../hooks/AppContext'

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
});

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

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
}))

function CreateSchool(props) {
    const styles = useStyles();
    const { open, onClose } = props

    const { control, register, handleSubmit, errors, formState } = useForm({  // getValues, , setError
        resolver: yupResolver(clientSchema),
    })
    // const [open, setOpen] = useToggle()

    const { roles } = useApp()
    if (!roles) {
        return null
    }

    const defaultValue = {
        username: '',
        fullName: '',
        role: '',
        email: '',
        phone: '',
        address: '',
        gender: 1,
        dob: null,
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth component="form" className={classes.dialog}>
            <DialogTitleWithIconClose onClose={onClose}>
                Create Account
            </DialogTitleWithIconClose>
            <Divider />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <TextField
                                label="Username"
                                name="username"
                                className=""
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={register}
                                error={!!errors.username}
                                helperText={errors?.username?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <FormControl variant="outlined" fullWidth className={styles.formControl}>
                                <InputLabel>Roles</InputLabel>
                                <Controller name="role" control={control}
                                    render={({ value, onChange, }) => (
                                        <Select
                                            label="Roles"
                                            value={value}
                                            onChange={onChange}
                                            MenuProps={MenuProps}
                                            disableUnderline
                                        >
                                            {roles.map(
                                                (data) => (
                                                    <MenuItem
                                                        key={data}
                                                        value={data}
                                                        classes={{
                                                            root: styles.menuItemRoot,
                                                            selected: styles.menuItemSelected,
                                                        }}
                                                    >
                                                        {data}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                label="Full name"
                                name="fullName"
                                className=""
                                variant="outlined"
                                required
                                fullWidth
                                inputRef={register}
                                error={!!errors.fullName}
                                helperText={errors?.fullName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <TextField
                                label="Email"
                                name="email"
                                className={classes.email}
                                variant="outlined"
                                required
                                fullWidth
                                inputRef={register}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <TextField
                                label="Phone"
                                name="phone"
                                className=""
                                variant="outlined"
                                required
                                fullWidth
                                inputRef={register}
                                error={!!errors.phone}
                                helperText={errors?.phone?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                label="Address"
                                name="address"
                                className=""
                                variant="outlined"
                                inputRef={register}
                            // error={!!errors.address}
                            // helperText={errors?.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <InputLabel>Gender</InputLabel> {/*fields.gender.title*/}
                            <Controller
                                name="gender"
                                control={control}
                                render={({
                                    value,
                                    onChange,
                                }) => (
                                    <RadioGroup value={value} onChange={onChange} row>
                                        <FormControlLabel label="Male" value="true" control={<Radio />} />
                                        <FormControlLabel label="Female" value="false" control={<Radio />} />
                                    </RadioGroup>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                            >
                                <Controller
                                    name="dob"
                                    control={control}
                                    render={({ ref, ...rest }) => (
                                        <KeyboardDatePicker
                                            label="Birth date"
                                            format="dd/MM/yyyy"
                                            allowKeyboardControl
                                            disableFuture
                                            defaultValue={new Date("01/01/1990")}
                                            {...rest}
                                        />
                                    )}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                        </Grid>
                    </Grid>


                </DialogContent>
                <Divider />
                <DialogActions className="">
                    <Button
                        className={classes.btnSave}
                        variant="contained"
                        type="submit"
                        disabled={!formState.isDirty}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateSchool

                        // < FormControlLabel
                        //     className = ""
                        //     label = "Gender"
                        //     control = {
                        //         < Switch
                        //         // checked={form.allDay}
                        //         id = "gender"
                        //         name = "gender"
                        //         // onChange={handleChange}
                        //         />
                        //     }
                        // />
//                      <TextField
//                         label="Description"
//                         name="des"
//                         className=""
//                         variant="outlined"
//                         type="text"
//                         multiline
//                         rows={5}
//                         fullWidth
//                         inputRef={register}
//                     // error={!!errors.des}
//                     // helperText={errors?.des?.message}
//                     />
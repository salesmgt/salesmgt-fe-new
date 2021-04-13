import React, { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    FormControlLabel,
    Switch,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    withStyles,
    InputAdornment,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar,
    TableHead,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    ListSubheader,
    makeStyles,
    Paper,
} from '@material-ui/core'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { useTargetSchool } from '../hooks/TargetSchoolContext'
import classes from './CreateDialog.module.scss'

const clientSchema = yup.object().shape({
    // title: yup.string().trim().max(30).required(),
    // remark: yup.string().trim().max(50).required(),
    PIC: yup.string().required(),
    // purpose: yup.string().required()
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

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 160,
        // maxWidth: 180
    }
}));

function CreateDialog(props) {
    const styles = useStyles();
    const { open, onClose } = props

    const { register, handleSubmit, errors } = useForm({  // getValues, , setError
        resolver: yupResolver(clientSchema),
    })
    // const [open, setOpen] = useToggle()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth component="form" className={classes.dialog}>
            <DialogTitleWithIconClose onClose={onClose}>
                Assign Salesman to Target School
            </DialogTitleWithIconClose>
            <Divider />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                        </Grid>
                    </Grid>


                </DialogContent>
                <Divider />
                <DialogActions className="">
                    <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} className={classes.btnSave}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateDialog


//     < TextField
// label = "Title"
// name = "title"
// className = ""
// variant = "outlined"
// autoFocus
// required
// fullWidth
// InputLabelProps = {{
//     shrink: true,
//                         }}
// inputRef = { register }
// error = {!!errors.title}
// helperText = { errors?.title?.message }
//     />
//                     <FormControlLabel
//                         className=""
//                         label="All Day"
//                         control={
//                             <Switch
//                                 // checked={form.allDay}
//                                 id="allDay"
//                                 name="allDay"
//                             // onChange={handleChange}
//                             />
//                         }
//                     />

//                     <TextField
//                         label="Remark"
//                         name="remark"
//                         className=""
//                         variant="outlined"
//                         fullWidth
//                         inputRef={register}
//                         error={!!errors.remark}
//                         helperText={errors?.remark?.message}
//                     />
//                     <TextField
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
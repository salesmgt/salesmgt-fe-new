import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    withStyles,
    makeStyles,
    MenuItem,
    FormControl,
    Select,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Autocomplete } from '@material-ui/lab'
import { columns } from './CreateTargetSchoolsConfig'
import { useHistory } from "react-router"
import { getAllSchools } from '../TargetSchoolsServices'
import classes from './CreateTargetSchools.module.scss'

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

function CreateTargetSchools(props) {
    const styles = useStyles();
    const { open, onClose } = props

    const { register, handleSubmit, errors } = useForm({  // getValues, , setError
        resolver: yupResolver(clientSchema),
    })
    // const [open, setOpen] = useToggle()
    const history = useHistory()

    const [rows, setRows] = useState([])
    const getListSchools = () => {
        getAllSchools().then((data) => {
            setRows(data.list)
            console.log('rows schools: ', data.list[0]);
        })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

    useEffect(getListSchools, [])

    // if (!rows) {
    //     return null
    // }

    const onSubmit = (data) => {
        console.log(data)
    }

    const calculateSchoolYear = () => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();
        // console.log(`${thisMonth}/${thisYear}`);
        // console.log(`This school year: ${thisYear - 1}-${thisYear}`);

        if (thisMonth < 7)
            return `${thisYear - 1}-${thisYear}`;
        else return `${thisYear}-${thisYear + 1}`
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth component="form" className={classes.dialog}>
            <DialogTitleWithIconClose onClose={onClose}>
                Create Target Schools
            </DialogTitleWithIconClose>
            {/* <Divider /> */}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.wrapper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs>
                                <Typography variant="subtitle1">Choose target schools from the list below:</Typography>
                                <Typography variant="subtitle2" className={classes.schoolYear}>School year: {calculateSchoolYear()}</Typography>
                            </Grid>
                            <Grid item xs>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <Divider /> */}
                <DialogActions className="">
                    <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} className={classes.btnSave}>
                        Save
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateTargetSchools
import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApp } from '../../../../hooks/AppContext'
import { Notifications } from '../../../../components'
import { Consts } from './GenInfoConfig'
import classes from './GenInfo.module.scss'

const clientSchema = yup.object().shape({
    schName: yup.string().trim().required('Name is required'),
    repName: yup.string().trim().required('Name is required'),
    repEmail: yup.string().email('Invalid email').trim(),
    repPhone: yup
        .string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Incorrect entry'),
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

function GenInfo(props) {
    const { headers, operations, fields } = Consts
    const styles = useStyles()

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const { dists } = useApp()

    const { data } = props

    const defaultValues = {
        schName: data?.schName,
        dist: data?.dist,
        repName: data?.repName,
        repGender: String(data?.repGender),
        repPhone: data?.repPhone,
        repEmail: data?.repEmail,
    }

    const { control, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: defaultValues,
    })

    if (!dists) {
        return null
    }

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
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
                            {/* First child - School Detail*/}
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
                                                    name="schName"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.sch.name
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.schName
                                                            }
                                                            helperText={
                                                                errors?.schName
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
                                                    {fields.sch.dist.title}
                                                </InputLabel>
                                                <Controller
                                                    name="dist"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <Select
                                                            value={value}
                                                            onChange={onChange}
                                                            MenuProps={
                                                                MenuProps
                                                            }
                                                            disableUnderline
                                                        >
                                                            {dists.map(
                                                                (data) => (
                                                                    <MenuItem
                                                                        key={
                                                                            data
                                                                        }
                                                                        value={
                                                                            data
                                                                        }
                                                                        classes={{
                                                                            root:
                                                                                styles.menuItemRoot,
                                                                            selected:
                                                                                styles.menuItemSelected,
                                                                        }}
                                                                    >
                                                                        {data}
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Second child - Rep detail*/}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className={classes.child}
                            >
                                <Grid container spacing={0}>
                                    {/* Child title */}
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
                                            {headers.child2}
                                        </Typography>
                                    </Grid>
                                    {/* Child detail */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                        lg={7}
                                        className={classes.detailZone}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                            >
                                                <Controller
                                                    name="repName"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.rep.name
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.repName
                                                            }
                                                            helperText={
                                                                errors?.repName
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
                                                    {fields.rep.gender.title}
                                                </InputLabel>
                                                <Controller
                                                    name="repGender"
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
                                                    name="repPhone"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.rep.phone
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.repPhone
                                                            }
                                                            helperText={
                                                                errors?.repPhone
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
                                                    name="repEmail"
                                                    control={control}
                                                    render={({
                                                        value,
                                                        onChange,
                                                    }) => (
                                                        <TextField
                                                            label={
                                                                fields.rep.email
                                                                    .title
                                                            }
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            value={value}
                                                            onChange={onChange}
                                                            error={
                                                                !!errors.repEmail
                                                            }
                                                            helperText={
                                                                errors?.repEmail
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

export default GenInfo

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Grid,
    InputBase,
    TextField,
    Typography,
    withStyles,
} from '@material-ui/core'
import { MdEdit } from 'react-icons/md'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classes from './ContentAccordions.module.scss'

const validationSchema = yup.object().shape({
    // avatar: yup
    //     .mixed()
    //     .test(
    //         'fileSize',
    //         'The file is too large',
    //         (value) => value && value[0].size <= 2000000
    //     )
    //     .test(
    //         'type',
    //         'We only support jpeg',
    //         (value) => value && value[0].type === 'image/jpeg'
    //     ),
    oldPassword: yup
        .string()
        .min(8, 'Invalid password')
        .required('Field not null'),
    newPassword: yup
        .string()
        .min(8, 'Invalid password')
        .required('Field not null'),
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    // ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], "Password's not match")
        .required('Field not null'),
    email: yup.string().email('Invalid email'),
    phone: yup
        .string()
        .required('Field not null')
        .matches(/^0[0-9]{8}$/),
    address: yup.string(),
})

function ContentAccordions(props) {
    const { title, detail, type, data } = props

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const CustomAccordion = withStyles({
        root: {
            '&:before': {
                display: 'none',
            },
        },
    })(Accordion)

    const onSubmit = (data) => {
        return
        // alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomAccordion elevation={0} className={classes.accor}>
                <AccordionSummary
                    expandIcon={<MdEdit />}
                    className={classes.accorSum}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6}>
                            <InputBase
                                className={clsx(
                                    classes.details,
                                    classes.detailsAccor
                                )}
                                type={type}
                                defaultValue={detail}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails className={classes.accorDetails}>
                    <Grid container direction="column">
                        {data.map((datum) => {
                            return (
                                <Grid
                                    item
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    className={classes.inputZone}
                                >
                                    {/* <TextField
                                        label={datum.label}
                                        variant="outlined"
                                        type={datum.type}
                                        className={classes.inputField}
                                    /> */}
                                    <Controller
                                        control={control}
                                        name={datum.name}
                                        defaultValue=""
                                        // render={(props) => (
                                        //     <TextField
                                        //         className={classes.inputField}
                                        //         label={datum.label}
                                        //         variant="outlined"
                                        //         type={datum.type}
                                        //     />
                                        // )}
                                        as={TextField}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>

                    {/* <Grid container direction="column">
                        {labels.map((label) => {
                            return (
                                <Grid
                                    item
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    className={classes.inputZone}
                                >
                                    <TextField
                                        label={label}
                                        variant="outlined"
                                        type={type}
                                        className={classes.inputField}
                                    />
                                    <Controller
                                        control={control}
                                        name={}
                                        render={(props) => (
                                            <TextField
                                                className={classes.inputField}
                                                label={label}
                                                variant="outlined"
                                                type={type}
                                                helperText
                                            />
                                        )}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid> */}
                </AccordionDetails>
                <Divider />
                <AccordionActions className={classes.accorActions}>
                    <Button size="small" className={classes.cancelBtn}>
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        className={classes.saveBtn}
                        type="submit"
                    >
                        Save
                    </Button>
                </AccordionActions>
            </CustomAccordion>
        </form>
    )
}

export default React.memo(ContentAccordions)

ContentAccordions.propTypes = {
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    type: PropTypes.string,
}

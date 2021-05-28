import React, { useState } from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
    Button,
    DialogContent,
    DialogActions,
    makeStyles,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Consts } from '../DialogConfig'
// import CreateKPISheetForm from './CreateKPISheetForm'
import { steps, getStepContent } from './CreateKPISheetConfig'
import { calculateSchoolYear } from '../../../../utils/DateTimes'
import classes from './CreateKPISheet.module.scss'

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
})

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

const useStyles = makeStyles((theme) => ({
    // Stepper
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    // instructions: {
    //     marginTop: theme.spacing(1),
    //     marginBottom: theme.spacing(1),
    // },
    completedStep: {
        color: '#4caf50 !important'
    },
}))

function CreateKPISheet(props) {
    const styles = useStyles()
    const { open, onClose, refreshAPI } = props     //, setNotify
    const { headers, operations } = Consts

    const defaultKPI = {
        groupName: `KPI mùa Sales hè <${calculateSchoolYear()}>`,
        description: '',
        criteria: [],
        startDate: new Date(),
        endDate: new Date(),
        users: [{ username: '' }],
        kpis: [{
            actualValue: 0,
            floorValue: 0,
            weight: 0
        }]
    }
    const [KPI, setKPI] = useState(defaultKPI)

    //========================Stepper handler========================
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    //================================================================

    const handleCloseDialog = () => {
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            // component="form"
            className={classes.dialog}
        >
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.create}
            </DialogTitleWithIconClose>
            <DialogContent className={classes.wrapper}>
                <div className={styles.root}>
                    <Stepper activeStep={activeStep} >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconProps={{
                                    classes: { completed: styles.completedStep }
                                }}>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                {getStepContent(activeStep, KPI, setKPI)}
                                {/* <Typography className={classes.instructions}>{ }</Typography> */}
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="">
                <Button
                    className={classes.btnSave}
                    // type="submit"
                    // onSubmit={handleCreateReport}
                    // disabled={!formState.isDirty}
                    // onClick={handleSubmit(onSubmit)}
                    onClick={() => { }}
                >
                    {operations.save}
                </Button>
                <Button onClick={handleCloseDialog}>
                    {operations.cancel}
                </Button>
            </DialogActions>
            {/* <CreateKPISheetForm
                onClose={onClose}
                refreshAPI={refreshAPI}
            // setNotify={setNotify}
            /> */}
        </Dialog>
    )
}

export default CreateKPISheet

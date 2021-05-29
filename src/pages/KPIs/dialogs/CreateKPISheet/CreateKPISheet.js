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
import ConfirmSave from '../ConfirmSave/ConfirmSave'

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
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    // Object KPI này chỉ phục vụ cho việc lưu trữ state truyền qua lại xử lý trên form này,
    // nó ko phải là object để truyền xuống API. Để gửi trong API cần customise lại.
    const defaultKPI = {
        groupName: `KPI mùa Sales hè <${calculateSchoolYear()}>`,
        description: '',
        criteria: [],
        startDate: new Date(),
        endDate: new Date(new Date().getFullYear(), 8, 30), //30-09-2021
        users: [],  // { username: '' }
        kpis: []
        // kpis: [{
        //     criteria: [{
        //         criteriaId: 0,
        //         actualValue: 0,
        //         targetValue: 0,
        //         weight: 0
        //     }],
        //     username: ''
        // }]
    }
    const [KPI, setKPI] = useState(defaultKPI)

    //========================Stepper handler========================
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log('Next button: KPI = ', KPI);
        // setKPI(KPI)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        console.log('Back button: KPI = ', KPI);
        // setKPI(KPI)
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setKPI(defaultKPI)
    // };
    //================================================================

    // const handleCloseDialog = () => {
    //     onClose()
    //     setActiveStep(0)
    //     setKPI(defaultKPI)
    // }

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
                        {activeStep < steps.length && (
                            <div>
                                {getStepContent(activeStep, KPI, setKPI)}
                                {/* <Typography className={classes.instructions}>{ }</Typography> */}
                                {/* <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    {activeStep === steps.length - 1 ? (    //activeStep === steps[2]
                                        <Button variant="contained" color="secondary" onClick={handleNext} setOpenConfirmDialog={() => setOpenConfirmDialog(true)}>
                                            Finish
                                        </Button>
                                    ) : activeStep === steps[0] ? (
                                        <Button variant="contained" color="secondary" onClick={handleNext} disabled={KPI.criteria.length === 0}>
                                            Next
                                        </Button>
                                    ) : (   //activeStep === steps[1]
                                        <Button variant="contained" color="secondary" onClick={handleNext}>
                                            Next
                                        </Button>
                                    )}
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            {/* <Typography className={classes.instructions}>
                            Please click on "Save" button below to
                            </Typography> */}
                            <Button variant="text" onClick={() => setActiveStep(0)}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (    //activeStep === steps[2]
                                <>
                                    <Button variant="contained" color="secondary" onClick={() => setOpenConfirmDialog(true)}>
                                        Finish
                                    </Button>
                                    <ConfirmSave
                                        open={openConfirmDialog}
                                        onClose={() => setOpenConfirmDialog(false)}
                                        KPI={KPI}
                                        refreshPage={refreshAPI}
                                    />
                                </>
                            ) : activeStep === steps[0] ? (
                                <Button variant="contained" color="secondary" onClick={handleNext} disabled={KPI.criteria.length === 0}>
                                    Next
                                </Button>
                            ) : (   //activeStep === steps[1]
                                <Button variant="contained" color="secondary" onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </div>
                    )}
                </div>


                {/* <Button
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
                </Button> */}
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

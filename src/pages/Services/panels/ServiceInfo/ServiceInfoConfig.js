import classes from "./ServiceInfo.module.scss"
import { schoolLevelNames, serviceNames } from "../../../../constants/Generals"
import { Divider, Grid, Typography } from "@material-ui/core"

export const Consts = {
    headers: {
        child1: 'Service Detail',
        child2: 'Submission Detail',
        child3: 'Evaluation Criteria',
    },
    operations: {
        // cancel: 'Cancel',
        save: 'Save',
        approve: 'Approve',
        reject: 'Reject',
        restriction: 'You are not allowed to view this',
    },
    fields: {
        serviceType: {
            title: 'Service type',
        },
        duration: {
            title: 'Duaration',
        },
        submitedDate: {
            title: 'Submited on',
        },
        submitedBy: {
            title: 'Submited by',
        },
        note: {
            title: 'Note',
        },
        classNo: {
            title: 'No. of applied classes',
            suffix: 'classes',
        },
        price: {
            title: 'Price floor',
            suffix: '/period',
            helper: '100.000VND - 5.000.000VND',
        },
        note: {
            title: 'Note',
            noNote: 'No notes yet',
        },
        serviceStatus: {
            title: 'Status',
        },
        rejectedReason: {
            title: 'Rejected reason',
            placeholder: 'The reason I rejected this service is...?',
            noReason: 'N/A',
        },
        revenue: {
            formula: 'Price per period * Total of periods'
        }
    },
}

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND',
});
export const getCriteriaInfo = () => {
    return (
        <div className={classes.criInfoPanel}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="overline">Criteria description</Typography>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        1/ Price floor (per period)
                    </Typography>
                    <div className={classes.txtCriInfo}>
                        <span className={classes.txtCriInfoHeader}>{serviceNames.svc1}:</span>
                        <Grid container spacing={2}>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.th}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(700000)}/period</Grid>
                            </Grid>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.thcs} &amp; {schoolLevelNames.thpt}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(800000)}/period</Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <p className={classes.txtCriInfo}>
                        <span className={classes.txtCriInfoHeader}>{serviceNames.svc2}:</span>
                        <Grid container spacing={2}>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.th}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(600000)}/period</Grid>
                            </Grid>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.thcs} &amp; {schoolLevelNames.thpt}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(700000)}/period</Grid>
                            </Grid>
                        </Grid>
                    </p>
                    <p className={classes.txtCriInfo}>
                        <span className={classes.txtCriInfoHeader}>{serviceNames.svc3}:</span>
                        <Grid container spacing={2}>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.th}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(1500000)}/period</Grid>
                            </Grid>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.thcs} &amp; {schoolLevelNames.thpt}:</Grid>
                                <Grid item xs={12}> &nbsp; (N/A)</Grid>
                            </Grid>
                        </Grid>
                    </p>
                    <p className={classes.txtCriInfo}>
                        <span className={classes.txtCriInfoHeader}>{serviceNames.svc4}:</span>
                        <Grid container spacing={2}>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.th}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(1000000)}/period</Grid>
                            </Grid>
                            <Grid item container xs={6}>
                                <Grid item xs={12}> - {schoolLevelNames.thcs} &amp; {schoolLevelNames.thpt}:</Grid>
                                <Grid item xs={12}> &nbsp; {currencyFormatter.format(1800000)}/period</Grid>
                            </Grid>
                        </Grid>
                    </p>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        2/ Number of classes
                    </Typography>
                    <div className={classes.txtCriInfo}>
                        <i>Number of classes applying this service</i>
                        <br />  ≥ 10 classes
                    </div>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        3/ Average class size
                    </Typography>
                    <p className={classes.txtCriInfo}>
                        <i>Average number of students per class</i>
                        <br /> ≥ 40 students
                    </p>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        4/ Total number of periods
                    </Typography>
                    <p className={classes.txtCriInfo}>
                        <i>Total number of periods in the whole duration</i>
                    </p>
                </Grid>
                {/* <Divider style={{ color: 'white' }} /> */}
                <hr style={{ width: '70%', height: '0%', textAlign: 'center', margin: '0 auto' }} />
                <Grid item>
                    <Typography variant="overline">Revenue estimation formula</Typography>
                    <br />
                    <div style={{ border: '1px solid', textAlign: 'center', margin: '0 0.15rem', padding: '0 0.4rem' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 100 }}>
                            Revenue = Price per period * Total periods
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export const getCriteria = (serviceType, schoolLevel) => {
    switch (serviceType) {
        case serviceNames.svc1: // ESL
            if (schoolLevel === schoolLevelNames.th) {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 700000 }, // >= 700.000VND/period
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 }, // >= 10 classes
                    { key: 'student', name: 'Number of students per class', standardValue: 40 }, // >= 40 students
                    { key: 'duration', name: "Duration", standardValue: 7 }, // >= 7 months
                ]
            } else {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 800000 },
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 },
                    { key: 'student', name: 'Number of students per class', standardValue: 40 },
                    { key: 'duration', name: "Duration", standardValue: 7 },
                ]
            }
        case serviceNames.svc2: // SEL
            if (schoolLevel === schoolLevelNames.th) {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 600000 },
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 },
                    { key: 'student', name: 'Number of students per class', standardValue: 40 },
                    { key: 'duration', name: "Duration", standardValue: 7 },
                ]
            } else {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 700000 },
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 },
                    { key: 'student', name: 'Number of students per class', standardValue: 40 },
                    { key: 'duration', name: "Duration", standardValue: 7 },
                ]
            }
        case serviceNames.svc3: // Toán Khoa
            if (schoolLevel === schoolLevelNames.th) {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 1500000 },
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 },
                    { key: 'student', name: 'Number of students per class', standardValue: 40 },
                    { key: 'duration', name: "Duration", standardValue: 7 },
                ]
            }
        case serviceNames.svc4: // STEAM
            if (schoolLevel === 'Tiểu học') {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 1000000 },
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 },
                    { key: 'student', name: 'Number of students per class', standardValue: 40 },
                    { key: 'duration', name: "Duration", standardValue: 7 },
                ]
            } else {
                return [
                    { key: 'price', name: 'Price Floor', standardValue: 1800000 },
                    { key: 'class', name: 'Number of applied classes', standardValue: 10 },
                    { key: 'student', name: 'Number of students per class', standardValue: 40 },
                    { key: 'duration', name: "Duration", standardValue: 7 },
                ]
            }

        default:
            break;
    }
}

// export const criteria = [
//     { key: 'price', name: 'Price Floor >= 1.000.000VND/period', standardValue: 1000000 },
//     { key: 'class', name: 'Number of applied classes', standardValue: 10 },
//     { key: 'student', name: 'Number of students per class', standardValue: 40 },
//     { key: 'duration', name: "Duration", standardValue: 7 },
// ]
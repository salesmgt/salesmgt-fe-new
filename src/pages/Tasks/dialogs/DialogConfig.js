import { Grid, Typography } from "@material-ui/core";
import { schoolLevelNames, serviceNames } from "../../../constants/Generals";
import classes from './DialogConfig.module.scss';

export const Consts = {
    headers: {
        create: 'Create Tasks',
        assign: 'Assign Salesmen to Tasks',
        confirmUnassign: 'Confirm Unassign',
        confirm: 'Confirm Remove',
        cannot: 'Cannot Remove',
        // child1: 'Preview: ',
        updateStatus: 'Confirm Update Status',  // from 'Chưa HT' to 'Đang HT'
        confirmUpdate: 'Confirm Update School Status',  // from 'Đang HT' to 'Ngưng HT'
        createServices: 'Services for', //Submit 
        confirmCreateTask: 'Confirm Create Tasks',
        confirmCompleteTask: 'Confirm Complete Task'  // from 'Đang HT' to 'Ngưng HT'
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        remove: 'Remove',
        ok: 'OK, I understood',
        yes: 'OK',
        showCreate: 'Submit a Service?',
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
    },
    filters: {
        district: {
            title: 'Districts',
        },
        purpose: {
            title: 'Purposes',
        },
        schoolStatus: {
            title: 'School Status',
        },
        schoolType: {
            title: 'School Types',
        },
        schoolLevel: {
            title: 'School Levels',
        },
        // schoolScale: {
        //     title: 'School Scales',
        // },
    },
    fields: {
        purpose: {
            name: 'purpose',
            label: 'Purposes',
            options: { none: 'None' },
        },
        // For Services
        duration: {
            title: 'Duaration',
            // adornment: 'Month(s)',
        },
        // term: {
        //     title: 'Contract Term',
        //     titleReq: 'Contract Term *',
        // },
        date: {
            tittle: 'Created date:',
        },
        service: {
            title: 'Service types *',
            // svc1: {
            //     lb: 'ESL',
            //     value: 'ESL',
            // },
            // svc2: {
            //     lb: 'SEL',
            //     value: 'SEL',
            // },
            // svc3: {
            //     lb: 'Toán khoa',
            //     value: 'Toán khoa',
            // },
            // svc4: {
            //     lb: 'Stem',
            //     value: 'Stem',
            // },
        },
        // revenue: {
        //     title: ' Revenue Criteria',
        //     rev1: {
        //         lb: 'Học sinh',
        //         value: 'Học sinh',
        //     },
        //     rev2: {
        //         lb: 'Tiết',
        //         value: 'Tiết',
        //     },
        // },
        note: {
            title: 'Note',
        },
        classNo: {
            title: 'No. of applied classes',
            adornment: 'classes',
            helper: 'Min: 1 class.  Max: 100 classes'
        },
        studentNumber: {
            title: 'Students per classes',
            adornment: 'students/class',
            helper: 'Min: 1 student.  Max: 100 students'
        },
        slotNumber: {
            title: 'Periods per week',
            adornment: 'periods/week',
            helper: 'Min: 1 period. Max: 10 periods'
        },
        price: {
            title: 'Price floor',
            adornment: 'VND/period',
            helper: '100.000VND - 2.000.000VND'
        },
        revenue: {
            formula: 'Price floor * Periods per week * 4 weeks'
        }
        // End for Services
    },
    messages: {
        notFound: 'No records found.',
    }
}

// export const columnsTableAssign = ['#', 'School Name', 'PIC', 'Note', '']
export const columnsTableAssign = [
    { key: 'no', name: 'No', width: '1%', align: 'center' },
    { key: 'schoolName', name: 'School Name', width: '30%', align: 'left' },
    { key: 'pic', name: 'PIC', width: '35%', align: 'left' },
    { key: 'note', name: 'Note', width: '25%', align: 'left' },
    { key: '', name: '', width: '1%', align: 'left' },
]

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
                        1/ Price floor per period
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
                        2/ Number of periods per week
                    </Typography>
                    <div className={classes.txtCriInfo}>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc1}:</span>
                                &emsp;2 periods/week
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc2}:</span>
                                &emsp;1 period/week
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc3}:</span>
                                &emsp;2 periods/week
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc4}:</span>
                                &emsp;2 periods/week
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        3/ Number of classes
                    </Typography>
                    <div className={classes.txtCriInfo}>
                        <i>Number of classes applying this service</i>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc1}:</span>
                                &emsp;≥ 8 classes
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc2}:</span>
                                &emsp;≥ 8 classes
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc3}:</span>
                                &emsp;≥ 2 classes
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <span className={classes.txtCriInfoHeader}>• &nbsp;{serviceNames.svc4}:</span>
                                &emsp;≥ 2 classes
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        4/ Average class size
                    </Typography>
                    <p className={classes.txtCriInfo}>
                        <i>Average number of students per class:</i>
                        <br /> &nbsp; &nbsp; &nbsp; <strong>≥ 40</strong> students
                    </p>
                    <br />
                    <Typography variant="caption" className={classes.txtCriInfoHeader}>
                        5/ Duration
                    </Typography>
                    <p className={classes.txtCriInfo}>
                        <i>Amount of time the service takes effective:</i>
                        <br /> &nbsp; &nbsp; &nbsp; <strong>≥ 7</strong> months
                    </p>
                    <br />
                </Grid>
                {/* <Divider style={{ color: 'white' }} /> */}
                <hr style={{ width: '85%', height: '0%', textAlign: 'center', margin: '0 auto' }} />
                <Grid item>
                    <Typography variant="overline">Revenue estimation formula</Typography>
                    <br />
                    <div style={{ border: '1px solid', textAlign: 'center', margin: '0 0 0 0.35rem', padding: '0 0.5rem' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 100 }}>
                            Revenue = <br />Price floor * Periods per week * 4 weeks
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export const confirmMessage = (schoolLevel, schoolName, schoolYear) => {
    return (
        <>
            Do you really want to remove
            <strong>
                <em>
                    {' '}
                    {schoolLevel} {schoolName}{' '}
                </em>
            </strong>
            from list of tasks in <strong>{schoolYear}</strong>?
            <br />
            This process cannot be undone.
        </>
    )
}
export const confirmUnassignMsg = (PIC, schoolLevel, schoolName) => {
    return (
        <>
            Do you really want to unassign
            <strong> {PIC} </strong> for
            <strong>
                <em>
                    {' '}
                    {schoolLevel} {schoolName}{' '}
                </em>
            </strong>
            ?
            <br /><br />
            This process cannot be undone.
        </>
    )
}
export const cannotMessage = (schoolLevel, schoolName, schoolYear, PIC) => {
    return (
        <>
            You cannot remove
            <strong>
                <em>
                    {' '}
                    {schoolLevel} {schoolName}{' '}
                </em>
            </strong>
            from list of tasks in <strong>{schoolYear}</strong>.
            <br />
            This task has been assigning to <strong>{PIC}</strong>.
        </>
    )
}
export const confirmTaskCompleteMessage = () => {
    return (
        <>
            To complete this task, please submit a
            <strong><em> Service</em></strong> in the form below.
        </>
    )
}
// export const updateStatusMessage = () => {
//     return (
//         <>
//             If you want to update this status, please submit a
//             <strong><em> Service</em></strong> in the form below.
//         </>
//     )
// }
export const confirmUpdateSchoolStatus = (schoolLevel, schoolName, currentStatus, newStatus) => {
    return (
        <>
            Do you really want to update status of
            <strong><em> {schoolLevel} {schoolName} </em></strong>
            from <strong>{currentStatus}</strong> to <strong>{newStatus}</strong>?
            <br /><br />
            This process cannot be undone.
        </>
    )
}
export const schoolYearSubTitle = (schoolYear) => {
    return (
        <>
            <b><i>School Year: </i></b>&nbsp;{schoolYear}
        </>
    )
}
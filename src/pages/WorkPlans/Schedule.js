import React, { useState, useRef } from 'react'
import {
    Avatar,
    Grid,
    InputAdornment,
    InputBase,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core'
import {
    Inject,
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Day,
    Week,
    Month,
    DragAndDrop,
    Resize,
} from '@syncfusion/ej2-react-schedule'
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations'
import { L10n, closest, addClass } from '@syncfusion/ej2-base'
import { CheckBox } from '@syncfusion/ej2-react-buttons'
import { Input } from '@syncfusion/ej2-inputs'
import { fade, makeStyles } from '@material-ui/core/styles'
import { MdAccountCircle, MdSearch } from 'react-icons/md'
import { Autocomplete } from '@material-ui/lab'
import { getAccount } from '../Accounts/AccountsServices'
import { useAuth } from '../../hooks/AuthContext'
import { Consts } from './WorkPlansConfig'
import './WorkPlans.scss'
import styles from './WorkPlans.module.scss'

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.05),
        },
        marginLeft: 0,
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
        transition: theme.transitions.create('width'),
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    autoComplete: {
        width: 260,
    },
    itemPIC: {
        padding: 0,
        margin: 0,
    },
    itemTextPrimary: {
        fontSize: '0.875rem',
    },
    itemTextSecondary: {
        fontSize: '0.8rem',
    },
}))
L10n.load({
    'en-US': {
        schedule: {
            newEvent: 'Add New Activity',
            editEvent: 'Edit Activity',
            deleteEvent: 'Delete Activity',
            deleteMultipleEvent: 'Delete Multiple Activities',
            sameDayAlert:
                'The activity cannot be beyond its boundary.',
            editRecurrence: 'Edit Recurrence',
            edit: 'Edit',
        },
    },
})

const Schedule = (props) => {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [key, setKey] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [PIC, setPIC] = useState(null)
    let schedule = useRef(null)
    let tree = useRef(null)
    const typingTimeoutRef = useRef(null)
    const { user } = useAuth()

    const localDate = {
        dataSource: props.data,
        fields: {
            id: 'id',
            subject: {
                default: 'No title',
                name: 'title',
            },
            startTime: { name: 'startTime' },
            endTime: { name: 'endTime' },
            location: { name: 'location' },
            description: {
                name: 'description',
            },
            remark: {
                name: 'remark',
            },
            isCompleted: {
                name: 'isCompleted',
            },
            isAllDay: {
                name: 'isAllDay',
                default: false,
            },
            recurrenceException: {
                name: 'recurrenceException',
            },
            recurrenceRule: {
                name: 'recurrenceRule',
            },
            recurrenceID: {
                name: 'recurrenceID',
            },
        },
        /* template: eventTemplate*/
    }
    const switchDate = (e) => {
        if (props.data === undefined) return
        if (e.previousDate) if (e.previousDate === e.currentDate) return
        if (props.data) props.handleChangeView(e)
    }

    const onPopupOpen = (args) => {
        const stringDelete = 'Edit Event'
        if (args.type === 'RecurrenceAlert')
            if (
                args.element.querySelector('.e-dlg-header').textContent ===
                stringDelete
            ) {
                args.element.querySelector('.e-dlg-header').innerHTML =
                    'Edit Activity'
            }
        if (args.type === 'RecurrenceValidationAlert') {
            const string =
                'Do you want to cancel the changes made to specific instances of this series and match it to the whole series again?'
            if (
                args.element.querySelector('.e-dlg-content').textContent ===
                string &&
                args.element.querySelector('.e-quick-dialog-alert-btn')
                    .textContent === 'Yes'
            ) {
                const yesButton = args.element.querySelector(
                    '.e-quick-dialog-alert-btn'
                )
                yesButton.style.display = 'none'
                const noButton = args.element.querySelector(
                    '.e-quick-alertcancel'
                )
                noButton.innerHTML = 'Save'
                noButton.style.color = '#e3165b'
                args.element.querySelector('.e-dlg-content').innerHTML =
                    'Your changes shall only be applied to unchanged instances of this series. Are you sure?'
            }
        }
        if (args.type === 'Editor') {
            if (args.element.querySelector('.e-time-zone-container')) {
                const timezone = args.element.querySelector(
                    '.e-time-zone-container'
                )
                timezone.style.display = 'none'
            }
            if (!args.element.querySelector('.custom-field-row')) {
                //var row =  HTMLElement.createElement('div', { className: 'custom-field-row' });
                const row = document.createElement('div')
                row.className = 'custom-field-row'
                const formElement = args.element.querySelector(
                    '.e-schedule-form'
                )
                formElement.firstChild.insertBefore(
                    row,
                    args.element.querySelector('.e-description-row')
                )
                args.element.querySelector('.e-dialog-parent').appendChild(row)
                const container = document.createElement('div')
                container.className = 'custom-field-container'
                const inputEle = document.createElement('textarea')
                inputEle.className = 'e-field e-custom-remark'
                inputEle.setAttribute('name', 'remark')
                container.appendChild(inputEle)
                row.appendChild(container)
                Input.createInput({
                    element: inputEle,
                    floatLabelType: 'Always',
                    properties: { placeholder: 'Remark' },
                })
                const row2 = document.createElement('div')
                row2.className = 'custom-field-isCompleted'
                formElement.firstChild.insertBefore(
                    row2,
                    args.element.querySelector('.custom-field-row')
                )
                args.element.querySelector('.e-dialog-parent').appendChild(row2)
                const container2 = document.createElement('div')
                container2.className = 'custom-field-container2'
                const inputEle2 = document.createElement('input')
                inputEle2.className = 'e-field e-custom-isCompleted'
                inputEle2.setAttribute('name', 'isCompleted')
                container2.appendChild(inputEle2)
                row2.appendChild(container2)
                const checkbox = new CheckBox({ label: 'Completed' })
                checkbox.appendTo(inputEle2)
            }
        }
    }

    const onItemDrag = (e) => {
        if (schedule.isAdaptive) {
            const classElement = schedule.element.querySelector(
                '.e-device-hover'
            )
            if (classElement) {
                classElement.classList.remove('e-device-hover')
            }
            if (e.target.classList.contains('e-work-cells')) {
                addClass([e.target], 'e-device-hover')
            }
        }

        if (document.body.style.cursor === 'not-allowed') {
            document.body.style.cursor = ''
        }
        if (e.name === 'nodeDragging') {
            const dragElementIcon = document.querySelectorAll(
                '.e-drag-item.treeview-external-drag .e-icon-expandable'
            )
            for (let i = 0; i < dragElementIcon.length; i++) {
                dragElementIcon[i].style.display = 'none'
            }
        }
    }

    const onDrag = (e) => setStartTime(e.data?.startTime)

    const onActionBegin = (e) => {
        if (
            e.requestType === 'eventCreate' ||
            e.requestType === 'eventRemove' ||
            e.requestType === 'eventChange'
        ) {
            props.handleRequestType(e, startTime)
            setStartTime(null)
        }
    }

    const onResize = (e) => {
        setStartTime(e.data?.startTime)
    }

    //====================Location tree====================
    // const treeTemplate = (prop) => {
    //     return (
    //         <div id="waiting">
    //             <div id="waitdetails">
    //                 <div id="waitlist">aaa</div>
    //                 <div id="waitcategory"> aa
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    const onTreeDragStop = (e) => {
        const treeElement = closest(e.target, '.e-treeview')
        if (!treeElement) {
            e.cancel = true
            const scheduleElement = closest(e.target, '.e-content-wrap')
            if (scheduleElement) {
                const treeviewData = tree.fields.dataSource
                if (e.target.classList.contains('e-work-cells')) {
                    const filteredData = treeviewData.filter(
                        (item) => item.id === parseInt(e.draggedNodeData.id, 10)
                    )
                    const cellData = schedule.getCellDetails(e.target)
                    let schoolName = filteredData[0].schoolName
                    if (schoolName.includes('(default)'))
                        schoolName = schoolName.replace(' (default)', '')
                    const eventData = {
                        startTime: cellData.startTime,
                        endTime: cellData.endTime,
                        allDay: cellData.isAllDay,
                        location: filteredData[0].district ?
                            schoolName + ' (' + filteredData[0].district + ')' : schoolName,
                    }
                    schedule.openEditor(eventData, 'Add', true)
                }
            }
        }
    }

    const onSearchChange = (e) => {
        setKey(e.target.value)
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef)
        typingTimeoutRef.current = setTimeout(() => {
            props.onSubmit(e.target.value)
        }, 300)
    }

    const onPopupClose = (e) => {
        if (e.element.querySelector('.e-quick-dialog-alert-btn')) {
            const yesButton = e.element.querySelector(
                '.e-quick-dialog-alert-btn'
            )
            yesButton.style.display = 'inline'
            const noButton = e.element.querySelector('.e-quick-alertcancel')
            noButton.style.color = 'rgba(0,0,0,0.87)'
        }
    }

    const onEventRender = (e) => {
        const data = e.data
        e.element.style.backgroundColor = 'rgba(54, 162, 235)'
        if (
            data.startTime.getTime() < new Date().getTime() &&
            data.endTime.getTime() < new Date().getTime() &&
            !data.isCompleted
        ) {
            e.element.style.backgroundColor = 'rgb(255, 99, 132)'
        }
        if (data.isCompleted) {
            e.element.style.backgroundColor = 'rgba(0, 150, 136)'
        }
    }

    // Search other's workplan
    const handleSearchNameChange = (e, newPIC) => {
        if (newPIC) {
            setPIC(newPIC)
            props.handleOnSearchFieldChange(newPIC.username)
        } else {
            getAccount(user.username).then((res) => {
                setPIC(res)
            })
            props.handleOnSearchFieldChange(user.username)
        }
    }

    const onChange = (e) => {
        if (e.target.value) {
            setUsername(e.target.value)
            props.handleInputChange(e.target.value)
        }
    }

    return (
        <div className="schedule-control-section">
            <div className="col-lg-12 control-section">
                <div className="control-wrapper drag-sample-wrapper">
                    <div className="schedule-container">
                        <div className="my-header">
                            {/* <h1 className="title-text">My Workplan</h1> */}
                            <Autocomplete
                                autoHighlight
                                clearOnEscape
                                // clearOnBlur
                                options={props.listPICs ? props.listPICs : []}
                                getOptionLabel={(pic) =>
                                    pic.fullName ? pic.fullName : ''
                                }
                                value={PIC}
                                renderInput={(params) => (
                                    <TextField
                                        value={username}
                                        {...params}
                                        onChange={onChange}
                                        label="Person"
                                        margin="normal"
                                        placeholder="Search workplan of...?"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start">
                                                        <MdAccountCircle />
                                                    </InputAdornment>
                                                    {
                                                        params?.InputProps
                                                            .startAdornment
                                                    }
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                                renderOption={(option) => {
                                    return (
                                        <ListItem className={classes.itemPIC}>
                                            <ListItemAvatar>
                                                <Avatar src={option.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={option?.fullName ? option.fullName : ''}
                                                secondary={option?.username
                                                    ? `${option?.username} • ${option?.roleName}` : ''}
                                                classes={{
                                                    primary: classes.itemTextPrimary,
                                                    secondary: classes.itemTextSecondary,
                                                }}
                                            />
                                        </ListItem>
                                    )
                                }}
                                className={classes.autoComplete}
                                onChange={(event, newPIC) =>
                                    handleSearchNameChange(event, newPIC)
                                }
                            // onBlur={(event, pic) =>
                            //     handleSearchNameChange(event, pic)
                            // }
                            />
                        </div>
                        <ScheduleComponent
                            currentView="Week"
                            readonly={props.isEdit}
                            popupClose={onPopupClose}
                            height="550px"
                            resizeStart={onResize}
                            cssClass="schedule-drag-drop"
                            ref={(e) => (schedule = e)}
                            actionBegin={onActionBegin}
                            dateFormat="dd MMM yyyy"
                            allowResizing
                            timezone="Asia/Saigon"
                            drag={onDrag}
                            eventRendered={onEventRender}
                            navigating={switchDate}
                            popupOpen={onPopupOpen}
                            selectedDate={props.filter.currentDate}
                            eventSettings={localDate}
                            showWeekNumber
                        >
                            <ViewsDirective>
                                <ViewDirective option="Day" />
                                <ViewDirective
                                    option="Week" /* eventTemplate={eventWeekTemplate}*/
                                />
                                <ViewDirective option="Month" />
                            </ViewsDirective>
                            <Inject
                                services={[
                                    Day,
                                    Week,
                                    Month,
                                    DragAndDrop,
                                    Resize,
                                ]}
                            />
                        </ScheduleComponent>
                    </div>
                    <div className="treeview-container">
                        <div className="title-container">
                            <h1 className="title-text">
                                {Consts.titleContainer}
                            </h1>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <MdSearch />
                                </div>
                                <InputBase
                                    value={key}
                                    onChange={onSearchChange}
                                    placeholder={Consts.search}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </div>
                        <div className={styles.treeviewContainer}>
                            <TreeViewComponent
                                allowDragAndDrop={!props.isEdit}
                                ref={(e) => (tree = e)}
                                cssClass="treeview-external-drag"
                                // allowDragAndDrop
                                fields={{
                                    dataSource: props?.tree,
                                    id: 'id',
                                    text: 'schoolName',
                                }}
                                nodeDragStop={onTreeDragStop}
                                // nodeTemplate={treeTemplate}
                                nodeDragging={onItemDrag}
                            />
                        </div>
                        <div className={styles.noteView}>
                            {/* <Grid container>
                                <Grid item xs={12} sm={4} md={3} lg={3} className="note-box">
                                    <div id="note-completed" ></div>
                                    <div id="note-failed"></div>
                                    <div id="note-pending"></div>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9} lg={9} className="note-box">
                                    <span className="note-completed">Completed</span>
                                    <div className="note-failed">Failed</div>
                                    <div className="note-pending">Pending</div>
                                </Grid>
                            </Grid> */}
                            <Paper elevation={0}>
                                <Grid
                                    container
                                    spacing={0}
                                    className={styles.statusContainer}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={styles.statusNote}
                                    >
                                        <div className={styles.colorComplete} />
                                        <Typography className={styles.status}>
                                            {Consts.status.complete}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={styles.statusNote}
                                    >
                                        <div className={styles.colorFail} />
                                        <Typography className={styles.status}>
                                            {Consts.status.fail}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item xs={12} sm={12} md={12} lg={12}
                                        className={styles.statusNote}
                                    >
                                        <div className={styles.colorPending} />
                                        <Typography className={styles.status}>
                                            {Consts.status.pending}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Schedule

import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import { data } from './data'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
// import { makeStyles } from '@material-ui/core/styles'
// import WorkPlansHeaders from './components'
import classes from './WorkPlans.module.scss'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .rbc-header': {
//             padding: '12px 6px',
//             fontWeight: 600,
//             fontSize: 14,
//         },
//         '& .rbc-label': {
//             padding: '8px 6px',
//         },
//         '& .rbc-today': {
//             backgroundColor: 'transparent',
//         },
//         '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
//             borderBottom: `2px solid ${theme.palette.secondary.main}!important`,
//         },
//         '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
//             padding: 24,
//             [theme.breakpoints.down('sm')]: {
//                 padding: 16,
//             },
//             // ...theme.mixins.border(0),
//             border: '0px solid rgba(0, 0, 0, 0.12)',
//         },
//         '& .rbc-agenda-view table': {
//             // ...theme.mixins.border(1),
//             border: '1px solid black',
//             '& thead > tr > th': {
//                 // ...theme.mixins.borderBottom(0),
//                 borderBottom: '0px solid rgba(0, 0, 0, 0.12)',
//             },
//             '& tbody > tr > td': {
//                 padding: '12px 6px',
//                 '& + td': {
//                     // ...theme.mixins.borderLeft(1),
//                     borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
//                 },
//             },
//         },
//         '& .rbc-agenda-table': {
//             '& th': {
//                 border: 0,
//             },
//             '& th, & td': {
//                 padding: '12px 16px!important',
//             },
//         },
//         '& .rbc-time-view': {
//             '& .rbc-time-header': {
//                 // ...theme.mixins.border(1),
//                 border: '1px solid rgba(0, 0, 0, 0.12)',
//                 borderRadius: '12px 12px 0 0',
//             },
//             '& .rbc-time-content': {
//                 flex: '0 1 auto',
//                 // ...theme.mixins.border(1),
//                 border: '1px solid rgba(0, 0, 0, 0.12)',
//             },
//         },
//         '& .rbc-month-view': {
//             '& > .rbc-month-header': {
//                 borderRadius: '12px 12px 0 0',
//             },
//             '& > .rbc-row': {
//                 // ...theme.mixins.border(1),
//                 border: '1px solid rgba(0, 0, 0, 0.12)',
//             },
//             '& .rbc-month-row': {
//                 // ...theme.mixins.border(1),
//                 border: '1px solid rgba(0, 0, 0, 0.12)',
//                 borderWidth: '0 1px 1px 1px!important',
//                 minHeight: 128,
//             },
//             '& .rbc-header + .rbc-header': {
//                 // ...theme.mixins.borderLeft(1),
//                 borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
//             },
//             '& .rbc-header': {
//                 // ...theme.mixins.borderBottom(0),
//                 borderBottom: '0px solid rgba(0, 0, 0, 0.12)',
//             },
//             '& .rbc-day-bg + .rbc-day-bg': {
//                 // ...theme.mixins.borderLeft(1),
//                 borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
//             },
//         },
//         '& .rbc-day-slot .rbc-time-slot': {
//             // ...theme.mixins.borderTop(1),
//             borderTop: '1px solid rgba(0, 0, 0, 0.12)',
//             opacity: 0.5,
//         },
//         '& .rbc-time-header > .rbc-row > * + *': {
//             // ...theme.mixins.borderLeft(1),
//             borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
//         },
//         '& .rbc-time-content > * + * > *': {
//             // ...theme.mixins.borderLeft(1),
//             borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
//         },
//         '& .rbc-day-bg + .rbc-day-bg': {
//             // ...theme.mixins.borderLeft(1),
//             borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
//         },
//         '& .rbc-time-header > .rbc-row:first-child': {
//             // ...theme.mixins.borderBottom(1),
//             borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
//         },
//         '& .rbc-timeslot-group': {
//             minHeight: 64,
//             // ...theme.mixins.borderBottom(1),
//             borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
//         },
//         '& .rbc-date-cell': {
//             padding: 8,
//             fontSize: 16,
//             fontWeight: 400,
//             opacity: 0.5,
//             '& > a': {
//                 color: 'inherit',
//             },
//         },
//         '& .rbc-event': {
//             borderRadius: 4,
//             padding: '4px 8px',
//             backgroundColor: theme.palette.primary.dark,
//             color: theme.palette.primary.contrastText,
//             boxShadow: theme.shadows[0],
//             transitionProperty: 'box-shadow',
//             transitionDuration: theme.transitions.duration.short,
//             transitionTimingFunction: theme.transitions.easing.easeInOut,
//             position: 'relative',
//             '&:hover': {
//                 boxShadow: theme.shadows[2],
//             },
//         },
//         '& .rbc-row-segment': {
//             padding: '0 4px 4px 4px',
//         },
//         '& .rbc-off-range-bg': {
//             backgroundColor:
//                 theme.palette.type === 'light'
//                     ? 'rgba(0,0,0,0.03)'
//                     : 'rgba(0,0,0,0.16)',
//         },
//         '& .rbc-show-more': {
//             color: theme.palette.secondary.main,
//             background: 'transparent',
//         },
//         '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event': {
//             position: 'static',
//         },
//         '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child': {
//             left: 0,
//             top: 0,
//             bottom: 0,
//             height: 'auto',
//         },
//         '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child': {
//             right: 0,
//             top: 0,
//             bottom: 0,
//             height: 'auto',
//         },
//     },
//     addButton: {
//         position: 'absolute',
//         right: 12,
//         top: 172,
//         zIndex: 99,
//     },
// }))

const localizer = momentLocalizer(moment)
const DragAndDropCalendar = withDragAndDrop(Calendar)

// const allViews = Object.keys(Views).map((k) => Views[k])
// const myViews = allViews.filter(
//     (v) => (v === 'month') | (v === 'week') | (v === 'day')
// )

function WorkPlans() {
    const [events, setEvents] = useState(data)

    // const [headerEl, setHeaderEl] = useState(null)

    // const classes = useStyles()
    // const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)

    // const [draggedEvent, setDraggedEvent] = useState()

    // const handleDragStart = (event) => {
    //     setDraggedEvent(event)
    // }

    // const dragFromOutsideItem = () => {
    //     return draggedEvent
    // }

    // const onDropFromOutside = ({ start, end, allDay }) => {
    //     // const { draggedEvent } = this.state

    //     const event = {
    //         id: draggedEvent.id,
    //         title: draggedEvent.title,
    //         start,
    //         end,
    //         allDay: allDay,
    //     }
    //     setDraggedEvent(null)
    //     moveEvent({ event, start, end })
    // }

    // const moveEvent = ({
    //     event,
    //     start,
    //     end,
    //     isAllDay: droppedOnAllDaySlot,
    // }) => {
    //     // const { events } = this.state

    //     let allDay = event.allDay

    //     if (!event.allDay && droppedOnAllDaySlot) {
    //         allDay = true
    //     } else if (event.allDay && !droppedOnAllDaySlot) {
    //         allDay = false
    //     }

    //     const nextEvents = events.map((existingEvent) => {
    //         return existingEvent.id == event.id
    //             ? { ...existingEvent, start, end, allDay }
    //             : existingEvent
    //     })
    //     setEvents(nextEvents)
    // }

    // const handleEventResize = ({ event, start, end }) => {
    //     const nextEvents = events.map((existingEvent) => {
    //         return existingEvent.id === event.id
    //             ? { ...existingEvent, start, end }
    //             : existingEvent
    //     })

    //     setEvents(nextEvents)
    // }
    //----------------------------------------------------------------------------------------------------
    // const moveEvent = ({ event, start, end }) => {
    //     const idx = events.indexOf(event)
    //     const updatedEvent = { ...event, start, end }

    //     const nextEvents = [...events]
    //     nextEvents.splice(idx, 1, updatedEvent)

    //     setEvents(nextEvents)
    // }

    const handleEventDrop = (data) => {
        console.log(data)
    }

    const handleEventResize = (data) => {
        console.log(data)
        // const { start, end } = data

        // setEvents({
        //     start: start,
        //     end: end,
        // })
    }

    const handleSlectEvent = (data) => {
        console.log(data)
    }

    const handleSlectSlot = (data) => {
        console.log(data)
    }

    return (
        <div className={classes.wrapper}>
            {/* <div ref={(el) => setHeaderEl(el)} /> */}

            <DragAndDropCalendar
                localizer={localizer}
                defaultView={Views.MONTH}
                defaultDate={moment().toDate()}
                views={['month', 'week', 'day']}
                events={events}
                step={30}
                resizable
                selectable
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
                onSelectEvent={handleSlectEvent}
                onSelectSlot={handleSlectSlot}
                // showMultiDayTimes
                startAccessor="start"
                endAccessor="end"
                // components={{
                //     toolbar: (props) => {
                //         console.log('tam linh', headerEl)
                //         return headerEl
                //             ? ReactDOM.createPortal(
                //                   <WorkPlansHeaders {...props} />,
                //                   headerEl
                //               )
                //             : null
                //     },
                // }}

                // popup={true}
                // dragFromOutsideItem={
                //     displayDragItemInCell ? dragFromOutsideItem : null
                // }
                // onDropFromOutside={onDropFromOutside}
                // handleDragStart={handleDragStart}
            />
        </div>
    )
}

export default WorkPlans

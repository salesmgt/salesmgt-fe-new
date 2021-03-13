/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { data } from './data'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(Calendar)

const allViews = Object.keys(Views).map((k) => Views[k])
const myViews = allViews.filter(
    (v) => (v === 'month') | (v === 'week') | (v === 'day')
)

function WorkPlans() {
    const [events, setEvents] = useState(data)

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

    const resizeEvent = ({ event, start, end }) => {
        const nextEvents = events.map((existingEvent) => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        setEvents(nextEvents)
    }
    //----------------------------------------------------------------------------------------------------
    const moveEvent = ({ event, start, end }) => {
        const idx = events.indexOf(event)
        const updatedEvent = { ...event, start, end }

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        setEvents(nextEvents)
    }

    return (
        <React.Fragment>
            <DragAndDropCalendar
                selectable
                localizer={localizer}
                events={data}
                onEventDrop={moveEvent}
                resizable
                onEventResize={resizeEvent}
                defaultView={Views.MONTH}
                defaultDate={new Date()}
                // startAccessor="start"
                // endAccessor="end"
                views={myViews}
                step={30}
                // popup={true}
                // dragFromOutsideItem={
                //     displayDragItemInCell ? dragFromOutsideItem : null
                // }
                // onDropFromOutside={onDropFromOutside}
                // handleDragStart={handleDragStart}
                // showMultiDayTimes
            />
        </React.Fragment>
    )
}

export default WorkPlans

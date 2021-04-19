// Gia's

export const Data = [{
  id: 1,
  title: 'Scrum Meeting',
  startTime: new Date(2018, 0, 28, 10, 0),
  endTime: new Date(2018, 0, 28, 12, 30),
  isAllDay: false,
  recurrenceRule: 'FREQ=DAILY;INTERVAL=2;COUNT=8',
  recurrenceException: '20180130T030000Z,20180201T230000Z'
}, {
  id: 2,
  title: 'Scrum Meeting',
  startTime: new Date(2018, 0, 29, 9, 0),
  endTime: new Date(2018, 0, 29, 10, 30),
  description: "Meeting time changed based on team activities.",
  recurrenceID: 1,

},
{
  id: 3,
  title: 'Scrum Meeting',
  startTime: new Date(2018, 0, 31, 11, 0),
  endTime: new Date(2018, 0, 31, 11, 30),
  description: "Meeting time changed based on team activities.",
  recurrenceID: 1,
}]


export const data2 = [
  {
    Id: 1,
    endTime: new Date('2021-03-28T06:04:54'),
    startTime: new Date('2021-03-27T21:11:54'),
    title: '',
    remark: '',
    description: '',
  },
  {
    id: 2,
    endTime: new Date('2021-03-29T06:04:54'),
    startTime: new Date('2021-03-28T21:11:54'),
    title: 'Meeting',
    remark: 'Completed',
  }]


/*const eventWeekTemplate = (e) => (
  <div className ="template-wrap" style={{ background: e.SecondaryColor}}>
    <div className="subject" style={{ background: e.PrimaryColor}}>
    {e.subject}
    </div>
    <div className="time" style={{background: e.PrimaryColor}}>
      {schedule.getTime(e.startTime)} - {schedule.getTime(e.endTime)}
    </div>
    <div className="image">{e.isCompleted ? <}</div>
  </div>
)*/


// const eventTemplate = e => (
//   <div className="template-wrap" style={{ background: 'green' }}>{e.title}

//   </div>
// )

//=================================================================

// Nguyen's

// const now = new Date()

// export const data = [
//     {
//         id: 0,
//         title: 'All Day Event very long title',
//         allDay: true,
//         start: new Date(2021, 3, 0),
//         end: new Date(2021, 3, 1),
//     },
//     {
//         id: 1,
//         title: 'Long Event',
//         start: new Date(2021, 3, 7),
//         end: new Date(2021, 3, 10),
//     },
//     {
//         id: 2,
//         title: 'DTS STARTS',
//         start: new Date(2022, 2, 13, 0, 0, 0),
//         end: new Date(2022, 2, 20, 0, 0, 0),
//     },

//     {
//         id: 3,
//         title: 'DTS ENDS',
//         start: new Date(2022, 10, 6, 0, 0, 0),
//         end: new Date(2022, 10, 13, 0, 0, 0),
//     },

//     {
//         id: 4,
//         title: 'Some Event',
//         start: new Date(2021, 3, 9, 0, 0, 0),
//         end: new Date(2021, 3, 10, 0, 0, 0),
//     },
//     {
//         id: 5,
//         title: 'Conference',
//         start: new Date(2021, 3, 11),
//         end: new Date(2021, 3, 13),
//         desc: 'Big conference for important people',
//     },
//     {
//         id: 6,
//         title: 'Meeting',
//         start: new Date(2021, 3, 12, 10, 30, 0, 0),
//         end: new Date(2021, 3, 12, 12, 30, 0, 0),
//         desc: 'Pre-meeting meeting, to prepare for the meeting',
//     },
//     {
//         id: 7,
//         title: 'Lunch',
//         start: new Date(2021, 3, 12, 12, 0, 0, 0),
//         end: new Date(2021, 3, 12, 13, 0, 0, 0),
//         desc: 'Power lunch',
//     },
//     {
//         id: 8,
//         title: 'Meeting',
//         start: new Date(2021, 3, 12, 14, 0, 0, 0),
//         end: new Date(2021, 3, 12, 15, 0, 0, 0),
//     },
//     {
//         id: 9,
//         title: 'Happy Hour',
//         start: new Date(2021, 3, 12, 17, 0, 0, 0),
//         end: new Date(2021, 3, 12, 17, 30, 0, 0),
//         desc: 'Most important meal of the day',
//     },
//     {
//         id: 10,
//         title: 'Dinner',
//         start: new Date(2021, 3, 12, 20, 0, 0, 0),
//         end: new Date(2021, 3, 12, 21, 0, 0, 0),
//     },
//     {
//         id: 11,
//         title: 'Planning Meeting with Paige',
//         start: new Date(2021, 3, 13, 8, 0, 0),
//         end: new Date(2021, 3, 13, 10, 30, 0),
//     },
//     {
//         id: 11.1,
//         title: 'Inconvenient Conference Call',
//         start: new Date(2021, 3, 13, 9, 30, 0),
//         end: new Date(2021, 3, 13, 12, 0, 0),
//     },
//     {
//         id: 11.2,
//         title: "Project Kickoff - Lou's Shoes",
//         start: new Date(2021, 3, 13, 11, 30, 0),
//         end: new Date(2021, 3, 13, 14, 0, 0),
//     },
//     {
//         id: 11.3,
//         title: 'Quote Follow-up - Tea by Tina',
//         start: new Date(2021, 3, 13, 15, 30, 0),
//         end: new Date(2021, 3, 13, 16, 0, 0),
//     },
//     {
//         id: 12,
//         title: 'Late Night Event',
//         start: new Date(2021, 3, 17, 19, 30, 0),
//         end: new Date(2021, 3, 18, 2, 0, 0),
//     },
//     {
//         id: 12.5,
//         title: 'Late Same Night Event',
//         start: new Date(2021, 3, 17, 19, 30, 0),
//         end: new Date(2021, 3, 17, 23, 30, 0),
//     },
//     {
//         id: 13,
//         title: 'Multi-day Event',
//         start: new Date(2021, 3, 20, 19, 30, 0),
//         end: new Date(2021, 3, 22, 2, 0, 0),
//     },
//     {
//         id: 14,
//         title: 'Today',
//         start: new Date(new Date().setHours(new Date().getHours() - 3)),
//         end: new Date(new Date().setHours(new Date().getHours() + 3)),
//     },
//     {
//         id: 15,
//         title: 'Point in Time Event',
//         start: now,
//         end: now,
//     },
//     {
//         id: 16,
//         title: 'Video Record',
//         start: new Date(2021, 3, 14, 15, 30, 0),
//         end: new Date(2021, 3, 14, 19, 0, 0),
//     },
//     {
//         id: 17,
//         title: 'Dutch Song Producing',
//         start: new Date(2021, 3, 14, 16, 30, 0),
//         end: new Date(2021, 3, 14, 20, 0, 0),
//     },
//     {
//         id: 18,
//         title: 'Itaewon Halloween Meeting',
//         start: new Date(2021, 3, 14, 16, 30, 0),
//         end: new Date(2021, 3, 14, 17, 30, 0),
//     },
//     {
//         id: 19,
//         title: 'Online Coding Test',
//         start: new Date(2021, 3, 14, 17, 30, 0),
//         end: new Date(2021, 3, 14, 20, 30, 0),
//     },
//     {
//         id: 20,
//         title: 'An overlapped Event',
//         start: new Date(2021, 3, 14, 17, 0, 0),
//         end: new Date(2021, 3, 14, 18, 30, 0),
//     },
//     {
//         id: 21,
//         title: 'Phone Interview',
//         start: new Date(2021, 3, 14, 17, 0, 0),
//         end: new Date(2021, 3, 14, 18, 30, 0),
//     },
//     {
//         id: 22,
//         title: 'Cooking Class',
//         start: new Date(2021, 3, 14, 17, 30, 0),
//         end: new Date(2021, 3, 14, 19, 0, 0),
//     },
//     {
//         id: 23,
//         title: 'Go to the gym',
//         start: new Date(2021, 3, 14, 18, 30, 0),
//         end: new Date(2021, 3, 14, 20, 0, 0),
//     },
// ]

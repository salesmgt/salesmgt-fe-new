// import { MdDelete, MdDescription, MdInfo, MdPersonAdd } from "react-icons/md"
import { roleNames } from '../../constants/Generals'

const columns = [
    { key: 'no', name: 'No', sortable: false, width1: '1%', width2: '1%' },
    { key: 'schoolName', name: 'School Name', sortable: true, width1: '22%', width2: '26%' },
    // { key: 'school.reprName', name: 'Principal', sortable: true },
    { key: 'user.fullName', name: 'PIC', sortable: true, width1: '20%', width2: '0%' },
    { key: 'purpose', name: 'Purpose', sortable: true, width1: '14%', width2: '18%' },  //targetPurposeName
    // { key: 'schoolYear', name: 'School Year', sortable: true },
    { key: 'assignDate', name: 'Assign Date', sortable: true, width1: '14%', width2: '18%' },
    { key: 'endDate', name: 'Deadline', sortable: true, width1: '14%', width2: '18%' },   // Due Date
    { key: 'result', name: 'Task Status', sortable: false, width1: '14%', width2: '18%' },    // TBD, Successful, Failed =/= task status (Ongoing, not started, finished)
    { key: '', name: '', sortable: false, width1: '1%', width2: '1%' },
]

export function getColumns(role) {
    const [
        no, schoolName, pic, purposes, assignDate, endDate, status, actions,
    ] = columns

    switch (role) {
        case roleNames.manager:
        case roleNames.supervisor:
            return [
                no, schoolName, pic, purposes, assignDate, endDate, status, actions,
            ]
        case roleNames.salesman:
            return [no, schoolName, purposes, assignDate, endDate, status, actions]
        default:
            break
    }
}

export const taskConsts = {
    linkNames: {
        back: 'Tasks',
    },
    tabNames: {
        tab1: 'School Info',
        tab2: 'Assign Info',
        tab3: 'Timeline',
        // tab3: 'Services Info',
    },
    operations: {
        notFound: 'Task Not Found',
    },
}

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...',
        },
        // create: 'Create',
        // assign: 'Assign',
    },
    filters: {
        pic: {
            title: 'PICs',
            placeholder: "PIC's name",
        },
        district: {
            title: 'Districts',
            options: { all: 'All' },
        },
        schoolYear: {
            title: 'School Years',
            options: { all: 'All' },
        },
        purpose: {
            title: 'Purposes',
            options: { all: 'All' },
        },
        status: {
            title: 'School Status',
            options: { all: 'All' },
        },
        schoolType: {
            title: 'School Types',
            options: { all: 'All' },
        },
        schoolLevel: {
            title: 'School Levels',
            options: { all: 'All' },
        },
        // schoolScale: {
        //     title: 'School Scales',
        //     options: { all: 'All' },
        // },
        isAssigned: {
            title: 'Assigned status',
            options: {
                all: 'All',
                assigned: 'Assigned',
                notAssigned: 'Not assigned',
            },
        },
    },
    messages: {
        notFound: 'No records found.',
    },
    menuItems: {
        details: {
            title: 'View details',
        },
        reports: {
            title: 'View reports',
        },
        remove: {
            title: 'Remove',
        },
        services: {
            title: 'Propose Services',
        },
        assign: {
            title: 'Assign',
        },
        unassign: {
            title: 'Unassign',
        },
    },
}

// export const menuOptions = [
//     { icon: <MdInfo fontSize="large" />, text: 'View details' },
//     { icon: <MdDescription fontSize="large" />, text: 'View reports' },
//     { icon: <MdPersonAdd fontSize="large" />, text: 'Assign' },
//     { icon: <MdDelete fontSize="large" />, text: 'Remove this' },
//     // { icon: <MdAssignment fontSize="large" />, text: 'View contracts' },
// ]

// export function getMenuItems(role) {
//     const [details, reports, contracts, assign, remove] = menuOptions

//     switch (role) {
//         case 'SALES MANAGER':
//             return [details, reports, contracts, assign, remove]
//         case 'SALES SUPERVISOR':
//             return [details, reports, assign, remove]
//         case 'SALESMAN':
//             return [details, reports]
//         default:
//             break
//     }
// }

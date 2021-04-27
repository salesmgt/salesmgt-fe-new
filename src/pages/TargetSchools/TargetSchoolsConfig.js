// import { MdDelete, MdDescription, MdInfo, MdPersonAdd } from "react-icons/md"
import { roleNames } from '../../constants/Generals'

const columns = [
    // { key: "ckb", name: '', sortable: false },
    // { key: 'no', name: 'No', sortable: false },
    { key: 'schoolName', name: 'School Name', sortable: true },
    // { key: "school.district.name", name: 'District', sortable: true },
    { key: 'school.reprName', name: 'Principal', sortable: true },
    { key: 'user.fullName', name: 'PIC', sortable: true },
    { key: 'schoolYear', name: 'School Year', sortable: true },
    { key: 'targetPurposeName', name: 'Purpose', sortable: true },
    { key: '', name: '', sortable: false },
]

export function getColumns(role) {
    const [schoolName, principal, pic, schoolYear, purposes, actions] = columns

    switch (role) {
        case roleNames.manager:
        case roleNames.supervisor:
            return [schoolName, principal, pic, schoolYear, purposes, actions]
        case roleNames.salesman:
            return [schoolName, principal, schoolYear, purposes, actions]
        default:
            break
    }
}

export const Consts = {
    operations: {
        filter: 'Filters',
        search: {
            placeholder: 'Search...'
        },
        create: 'Create',
        assign: 'Assign',
    },
    filters: {
        pic: {
            title: 'PICs',
            placeholder: "PIC's name",
        },
        purpose: {
            title: 'Purposes',
            options: { all: 'All' },
        },
        district: {
            title: 'Districts',
            options: { all: 'All' },
        },
        schoolYear: {
            title: 'School Years',
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
        schoolScale: {
            title: 'School Scales',
            options: { all: 'All' },
        },
    },
    messages: {
        notFound: 'No records found.'
    },
    menuItems: {
        details: {
            title: 'View details'
        },
        reports: {
            title: 'View reports'
        },
        remove: {
            title: 'Remove'
        },
        // assign: {
        //     title: 'Assign'
        // },
    }
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

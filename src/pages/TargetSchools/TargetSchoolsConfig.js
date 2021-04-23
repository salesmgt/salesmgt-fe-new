// import { MdDelete, MdDescription, MdInfo, MdPersonAdd } from "react-icons/md"

export const columns = [
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

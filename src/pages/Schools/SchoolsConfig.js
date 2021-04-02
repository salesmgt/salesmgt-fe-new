import { MdDelete, MdEdit } from "react-icons/md"

export const columns = [
    { key: "no", name: 'No', sortable: false },
    { key: "name", name: 'School Name', sortable: true },
    { key: "district.name", name: 'District', sortable: true },
    { key: "address", name: 'Address', sortable: false },
    { key: "reprName", name: 'Principal', sortable: true },
    { key: "schoolStatus.name", name: 'Status', sortable: true },
    { key: "", name: '', sortable: false }
]

export const menuOptions = [
    { icon: <MdEdit fontSize="large" />, text: 'Edit info' },
    { icon: <MdDelete fontSize="large" />, text: 'Remove this' },
]

export function getMenuItems(role) {
    const [edit, remove] = menuOptions  // details, 

    switch (role) {
        case 'ADMIN':
            return [edit, remove]
        // case 'SALES SUPERVISOR':
        //     return []
        // case 'SALES MANAGER':
        //     return []
        // case 'SALESMAN':
        //     return []
        default:
            throw new Error()
    }
}
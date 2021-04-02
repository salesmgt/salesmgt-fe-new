import { MdEdit, MdInfo } from "react-icons/md"

export const columns = [
    { key: "no", name: 'No', sortable: false },
    { key: "fullName", name: 'Full Name', sortable: true },
    { key: "phone", name: 'Phone', sortable: false },
    { key: "email", name: 'Email', sortable: false },
    { key: "address", name: 'Address', sortable: false },
    { key: "", name: '', sortable: false }
]

export const menuOptions = [
    { icon: <MdInfo fontSize="large" />, text: 'View details' },
    { icon: <MdEdit fontSize="large" />, text: 'Edit info' },
]

export function getMenuItems(role) {
    const [details, edit] = menuOptions
    // 2 trang này lag 2 view mà tắt bật các btn hay là 2 views khác nhau nhỉ?

    switch (role) {
        case 'ADMIN':
            return [edit]
        case 'SALES SUPERVISOR':
            return [details]
        case 'SALES MANAGER':
            return [details]
        default:
            throw new Error()
    }
}
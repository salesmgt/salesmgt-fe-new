import React from 'react'
import {
    MdDashboard,
    MdPerson,
    MdAssignment,
    MdDateRange,
    MdSchool,
    // MdGroup,
    MdDescription,
    MdAccountCircle,
    MdExitToApp,
} from 'react-icons/md'

const menuItems = [
    {
        title: 'Dashboards',
        path: 'dashboards',
        icon: <MdDashboard />,
    },
    {
        title: 'Accounts',
        path: 'accounts',
        icon: <MdPerson />,
    },
    {
        title: 'Target Schools',
        path: 'target-schools',
        icon: <MdAssignment />,
    },
    {
        title: 'Work Plans',
        path: 'work-plans',
        icon: <MdDateRange />,
    },
    {
        title: 'Schools',
        path: 'schools',
        icon: <MdSchool />,
    },
    {
        title: 'Reports',
        path: 'reports',
        icon: <MdDescription />,
    },
]

export function getMenuItems(role) {
    const [
        dashboards,
        accounts,
        targetSchools,
        workPlans,
        schools,
        reports,
    ] = menuItems
    switch (role) {
        case 'ADMIN':
            return [accounts, schools]
        case 'SALES MANAGER':
            return [dashboards, workPlans, targetSchools, reports]
        case 'SALES SUPERVISOR':
            return [dashboards, workPlans, targetSchools, reports]
        case 'SALESMAN':
            return [dashboards, workPlans, targetSchools, reports]
        default:
            throw new Error()
    }
}

export const userMenuItems = {
    0: [{ title: 'My Profile', icon: <MdExitToApp /> }],
    1: [{ title: 'Log Out', icon: <MdAccountCircle /> }],
}

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
import { roleNames } from '../../utils/Constants'

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
        case roleNames.admin:
            return [accounts, schools]
        case roleNames.manager:
            return [dashboards, workPlans, targetSchools, reports]
        case roleNames.supervisor:
            return [dashboards, workPlans, targetSchools, reports]
        case roleNames.salesman:
            return [dashboards, workPlans, targetSchools, reports]
        default:
            break
    }
}

export const userMenuItems = {
    0: [{ title: 'My Profile', icon: <MdExitToApp /> }],
    1: [{ title: 'Log Out', icon: <MdAccountCircle /> }],
}

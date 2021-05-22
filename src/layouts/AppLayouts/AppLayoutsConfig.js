import React from 'react'
import {
    MdDashboard,
    // MdPerson,
    // MdAssignment,
    MdDateRange,
    // MdSchool,
    MdGroup,
    MdDescription,
    MdAccountCircle,
    MdExitToApp,
    MdAssignmentInd,
} from 'react-icons/md'
import { FaSchool, FaHandshake, FaTasks } from 'react-icons/fa'
import { roleNames } from '../../constants/Generals'

const menuItems = [
    {
        title: 'Dashboards',
        path: 'dashboards',
        icon: <MdDashboard />,
    },
    {
        title: 'Accounts',
        path: 'accounts',
        icon: <MdGroup />,
    },
    {
        title: 'Tasks',
        path: 'tasks',
        icon: <FaTasks />,
    },
    {
        title: 'Work Plans',
        path: 'work-plans',
        icon: <MdDateRange />,
    },
    {
        title: 'Schools',
        path: 'schools',
        icon: <FaSchool />,
    },
    {
        title: 'Reports',
        path: 'reports',
        icon: <MdDescription />,
    },
    {
        title: 'Services',
        path: 'services',
        icon: <FaHandshake />,
    },
    {
        title: 'Salesmen',
        path: 'salesmen',
        icon: <MdAssignmentInd />,
    },
]

export function getMenuItems(role) {
    const [
        dashboards,
        accounts,
        tasks,
        workPlans,
        schools,
        reports,
        services,
        salesmen
    ] = menuItems
    switch (role) {
        case roleNames.admin:
            return [accounts, schools]
        case roleNames.manager:
            return [dashboards, schools, tasks, reports, services, salesmen, workPlans]
        case roleNames.supervisor:
            return [dashboards, schools, tasks, reports, salesmen, workPlans]
        case roleNames.salesman:
            return [dashboards, tasks, reports, services, workPlans]
        default:
            break
    }
}

export const userMenuItems = {
    0: [{ title: 'My Profile', icon: <MdAccountCircle /> }],
    1: [{ title: 'Log Out', icon: <MdExitToApp /> }],
}

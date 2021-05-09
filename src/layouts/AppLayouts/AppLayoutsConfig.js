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
} from 'react-icons/md'
import { ImTarget } from 'react-icons/im'
import { FaSchool } from 'react-icons/fa'
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
        title: 'Targets',
        path: 'targets',
        icon: <ImTarget />,
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
]

export function getMenuItems(role) {
    const [
        dashboards,
        accounts,
        targets,
        workPlans,
        schools,
        reports,
    ] = menuItems
    switch (role) {
        case roleNames.admin:
            return [accounts, schools]
        case roleNames.manager:
            return [dashboards, schools, targets, reports, workPlans]
        case roleNames.supervisor:
            return [dashboards, schools, targets, reports, workPlans]
        case roleNames.salesman:
            return [dashboards, targets, reports, workPlans]
        default:
            break
    }
}

export const userMenuItems = {
    0: [{ title: 'My Profile', icon: <MdAccountCircle /> }],
    1: [{ title: 'Log Out', icon: <MdExitToApp /> }],
}

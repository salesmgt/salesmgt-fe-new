import React from 'react'
import {
    MdDashboard,
    MdPerson,
    MdAssignment,
    MdDateRange,
    MdSchool,
    MdGroup,
    MdDescription,
} from 'react-icons/md'
// import {
//     Dashboards,
//     Accounts,
//     TargetSchools,
//     WorkPlans,
//     Schools,
//     Salesmen,
//     Reports,
// } from '../pages'

const menuData = [
    {
        title: 'Dashboards',
        path: 'dashboards',
        icon: <MdDashboard />,
        // component: () => <Dashboards />,
        // component: <Dashboards />,
    },
    {
        title: 'Accounts',
        path: 'accounts',
        icon: <MdPerson />,
        // component: () => <Accounts />,
        // component: <Accounts />,
    },
    {
        title: 'Target Schools',
        path: 'target-schools',
        icon: <MdAssignment />,
        // component: () => <TargetSchools />,
        // component: <TargetSchools />,
    },
    {
        title: 'Work Plans',
        path: 'work-plans',
        icon: <MdDateRange />,
        // component: () => <WorkPlans />,
        // component: <WorkPlans />,
    },
    {
        title: 'Schools',
        path: 'schools',
        icon: <MdSchool />,
        // component: () => <Schools />,
        // component: <Schools />,
    },
    {
        title: 'Salesmen',
        path: 'salesmen',
        icon: <MdGroup />,
        // component: () => <Salesmen />,
        // component: <Salesmen />,
    },
    {
        title: 'Reports',
        path: 'reports',
        icon: <MdDescription />,
        // component: () => <Reports />,
        // component: <Reports />,
    },
]

export function getMenuItems(role) {
    const [
        dashboards,
        accounts,
        targetSchools,
        workPlans,
        schools,
        salesmen,
        reports,
    ] = menuData
    switch (role) {
        case 'ADMIN':
            return [accounts, schools]
        case 'SALES MANAGER':
            return [dashboards, workPlans, targetSchools, salesmen, reports]
        case 'SALESMAN':
            return [dashboards, workPlans, targetSchools, reports]
        default:
            throw new Error()
    }
}

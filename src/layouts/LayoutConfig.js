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
import {
    Dashboards,
    Accounts,
    TargetSchools,
    WorkPlans,
    Schools,
    Salesmen,
    Reports,
} from '../pages'

const rootPath = '/apps'

const data = [
    {
        title: 'Dashboards',
        path: `${rootPath}/dashboards`,
        // path: '/dashboards',
        icon: <MdDashboard />,
        component: <Dashboards />,
    },
    {
        title: 'Accounts',
        path: `${rootPath}/accounts`,
        // path: '/accounts',
        icon: <MdPerson />,
        component: <Accounts />,
    },
    {
        title: 'Target Schools',
        path: `${rootPath}/target-schools`,
        // path: '/target-schools',
        icon: <MdAssignment />,
        component: <TargetSchools />,
    },
    {
        title: 'Work Plans',
        path: `${rootPath}/work-plans`,
        // path: '/work-plans',
        icon: <MdDateRange />,
        component: <WorkPlans />,
    },
    {
        title: 'Schools',
        path: `${rootPath}/schools`,
        // path: '/schools',
        icon: <MdSchool />,
        component: <Schools />,
    },
    {
        title: 'Salesmen',
        path: `${rootPath}/salesmen`,
        // path: '/salesmen',
        icon: <MdGroup />,
        component: <Salesmen />,
    },
    {
        title: 'Reports',
        path: `${rootPath}/reports`,
        // path: '/reports',
        icon: <MdDescription />,
        component: <Reports />,
    },
]

function getMenuItems(role) {
    const [
        dashboards,
        accounts,
        targetSchools,
        workPlans,
        schools,
        salesmen,
        reports,
    ] = data
    switch (role) {
        case 'admin':
            return [dashboards, accounts, schools]
        case 'manager':
            return [dashboards, workPlans, targetSchools, salesmen, reports]
        case 'salesman':
            return [dashboards, workPlans, targetSchools, reports]
        default:
            throw new Error()
    }
}

export { getMenuItems }

import React from 'react'
import {
    MdDashboard,
    MdPerson,
    MdAssignment,
    MdDateRange,
    MdSchool,
    MdGroup,
    MdDescription,
    MdAccountCircle,
} from 'react-icons/md'
import {
    Dashboards,
    Accounts,
    TargetSchools,
    WorkPlans,
    Schools,
    Salesmen,
    Reports,
    Profiles,
} from '../pages'
import AccountProvider from '../pages/Accounts/hooks/AccountContext'
import SalesmanProvider from '../pages/Salesmen/hooks/SalesmanContext'
import SchoolProvider from '../pages/Schools/hooks/SchoolContext'
import TargetSchoolProvider from '../pages/TargetSchools/hooks/TargetSchoolContext'

const menuData = [
    {
        title: 'Dashboards',
        path: 'dashboards',
        icon: <MdDashboard />,
        component: () => <Dashboards />,
        // component: <Dashboards />,
    },
    {
        title: 'Accounts',
        path: 'accounts',
        icon: <MdPerson />,
        component: () => (
            <AccountProvider>
                <Accounts />
            </AccountProvider>
        ),
        // component: <Accounts />,
    },
    {
        title: 'Target Schools',
        path: 'target-schools',
        icon: <MdAssignment />,
        component: () => (
            <TargetSchoolProvider>
                <TargetSchools />
            </TargetSchoolProvider>
        ),
        // component: <TargetSchools />,
    },
    {
        title: 'Work Plans',
        path: 'work-plans',
        icon: <MdDateRange />,
        component: () => <WorkPlans />,
        // component: <WorkPlans />,
    },
    {
        title: 'Schools',
        path: 'schools',
        icon: <MdSchool />,
        component: () => (
            <SchoolProvider>
                <Schools />
            </SchoolProvider>
        ),
        // component: <Schools />,
    },
    {
        title: 'Salesmen',
        path: 'salesmen',
        icon: <MdGroup />,
        component: () => (
            <SalesmanProvider>
                <Salesmen />
            </SalesmanProvider>
        ),
        // component: <Salesmen />,
    },
    {
        title: 'Reports',
        path: 'reports',
        icon: <MdDescription />,
        component: () => <Reports />,
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
            return [accounts, schools, dashboards, targetSchools]
        case 'SALES MANAGER':
            return [
                dashboards,
                workPlans,
                targetSchools,
                salesmen,
                reports,
                schools,
            ]
        case 'SALESMAN':
            return [dashboards, workPlans, targetSchools, reports]
        default:
            throw new Error()
    }
}

const navData = [
    {
        title: 'Profiles',
        path: 'profiles',
        icon: <MdAccountCircle />,
        component: <Profiles />,
    },
    {
        title: 'Log out',
        path: '/',
        icon: <MdPerson />,
        component: <Accounts />,
    },
]

import React from 'react'
import {
    Dashboards,
    Account,
    Accounts,
    TargetSchool,
    TargetSchools,
    WorkPlans,
    School,
    Schools,
    Report,
    Reports,
} from '../pages'
import AccountProvider from '../pages/Accounts/hooks/AccountContext'
import ReportProvider from '../pages/Reports/hooks/ReportContext'
import SchoolProvider from '../pages/Schools/hooks/SchoolContext'
import TargetSchoolProvider from '../pages/TargetSchools/hooks/TargetSchoolContext'

export const defaultRoutes = {
    ADMIN: { route: '/apps/accounts' },
    'SALES MANAGER': { route: '/apps/dashboards' },
    'SALES SUPERVISOR': { route: '/apps/dashboards' },
    SALESMAN: { route: '/apps/dashboards' },
}

export const roleRoutes = {
    ADMIN: [
        {
            path: 'accounts',
            component: () => (
                <AccountProvider>
                    <Accounts />
                </AccountProvider>
            ),
        },
        { path: 'accounts/:id', component: () => <Account /> },
        {
            path: 'schools',
            component: () => (
                <SchoolProvider>
                    <Schools />
                </SchoolProvider>
            ),
        },
        { path: 'schools/:id', component: () => <School /> },
    ],
    'SALES MANAGER': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        // {
        //     path: 'schools',
        //     component: () => (
        //         <SchoolProvider>
        //             <Schools />
        //         </SchoolProvider>
        //     ),
        // },
        // { path: 'schools/:id', component: () => <School /> },
        {
            path: 'target-schools',
            component: () => (
                <TargetSchoolProvider>
                    <TargetSchools />
                </TargetSchoolProvider>
            ),
        },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchool />,
        },
        {
            path: 'reports',
            component: () => (
                <ReportProvider>
                    <Reports />
                </ReportProvider>
            ),
        },
        { path: 'reports/:id', component: () => <Report /> },
    ],
    'SALES SUPERVISOR': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        // {
        //     path: 'schools',
        //     component: () => (
        //         <SchoolProvider>
        //             <Schools />
        //         </SchoolProvider>
        //     ),
        // },
        // { path: 'schools/:id', component: () => <School /> },
        {
            path: 'target-schools',
            component: () => (
                <TargetSchoolProvider>
                    <TargetSchools />
                </TargetSchoolProvider>
            ),
        },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchool />,
        },
        {
            path: 'reports',
            component: () => (
                <ReportProvider>
                    <Reports />
                </ReportProvider>
            ),
        },
        { path: 'reports/:id', component: () => <Report /> },
    ],
    SALESMAN: [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        {
            path: 'target-schools',
            component: () => (
                <TargetSchoolProvider>
                    <TargetSchools />
                </TargetSchoolProvider>
            ),
        },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchool />,
        },
        {
            path: 'reports',
            component: () => (
                <ReportProvider>
                    <Reports />
                </ReportProvider>
            ),
        },
        { path: 'reports/:id', component: () => <Report /> },
    ],
}

import React from 'react'
import {
    Dashboards,
    Accounts,
    TargetSchools,
    WorkPlans,
    Schools,
    Salesmen,
    Reports,
    Account,
    School,
    TargetSchool,
    Salesman,
    Report,
} from '../pages'
import AccountProvider from '../pages/Accounts/hooks/AccountContext'
import SalesmanProvider from '../pages/Salesmen/hooks/SalesmanContext'
import SchoolProvider from '../pages/Schools/hooks/SchoolContext'
import TargetSchoolProvider from '../pages/TargetSchools/hooks/TargetSchoolContext'

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
            path: 'salesmen',
            component: () => (
                <SalesmanProvider>
                    <Salesmen />
                </SalesmanProvider>
            ),
        },
        { path: 'salesmen/:id', component: () => <Salesman /> },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <Report /> },
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
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <Report /> },
    ],
}

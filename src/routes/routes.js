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

export const roleRoutes = {
    ADMIN: [
        { path: 'accounts', component: () => <Accounts /> },
        { path: 'accounts/:id', component: () => <Account /> },
        { path: 'schools', component: () => <Schools /> },
        { path: 'schools/:id', component: () => <School /> },
    ],
    'SALES MANAGER': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        { path: 'target-schools', component: () => <TargetSchools /> },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchool />,
        },
        { path: 'salesmen', component: () => <Salesmen /> },
        { path: 'salesmen/:id', component: () => <Salesman /> },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <Report /> },
    ],
    SALESMAN: [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        { path: 'target-schools', component: () => <TargetSchools /> },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchool />,
        },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <Report /> },
    ],
}

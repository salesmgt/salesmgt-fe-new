import React from 'react'
import {
    Dashboards,
    Accounts,
    TargetSchools,
    WorkPlans,
    Schools,
    Salesmen,
    Reports,
    AccountsDetail,
    SchoolsDetail,
    TargetSchoolsDetail,
    SalesmenDetail,
    ReportsDetail,
} from '../pages'

export const roleRoutes = {
    ADMIN: [
        { path: 'accounts', component: () => <Accounts /> },
        { path: 'accounts/:id', component: () => <AccountsDetail /> },
        { path: 'schools', component: () => <Schools /> },
        { path: 'schools/:id', component: () => <SchoolsDetail /> },
        // { path: 'dashboards', component: () => <Dashboards /> },
    ],
    'SALES MANAGER': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        { path: 'target-schools', component: () => <TargetSchools /> },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchoolsDetail />,
        },
        { path: 'salesmen', component: () => <Salesmen /> },
        { path: 'salesmen/:id', component: () => <SalesmenDetail /> },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <ReportsDetail /> },
    ],
    SALESMAN: [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        { path: 'target-schools', component: () => <TargetSchools /> },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchoolsDetail />,
        },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <ReportsDetail /> },
    ],
}

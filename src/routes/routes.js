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
import AccountProvider from '../pages/Accounts/hooks/AccountContext'
import SalesmanProvider from '../pages/Salesmen/hooks/SalesmanContext'
import SchoolProvider from '../pages/Schools/hooks/SchoolContext'
import TargetSchoolProvider from '../pages/TargetSchools/hooks/TargetSchoolContext'

export const roleRoutes = {
    'ADMIN': [
        {
            path: 'accounts', component: () => (
                <AccountProvider>
                    <Accounts />
                </AccountProvider>
            )
        },
        { path: 'accounts/:id', component: () => <AccountsDetail /> },
        {
            path: 'schools', component: () => (
                <SchoolProvider>
                    <Schools />
                </SchoolProvider>
            )
        },
        { path: 'schools/:id', component: () => <SchoolsDetail /> },
    ],
    'SALES MANAGER': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        {
            path: 'target-schools', component: () => (
                <TargetSchoolProvider>
                    <TargetSchools />
                </TargetSchoolProvider>
            )
        },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchoolsDetail />,
        },
        {
            path: 'salesmen', component: () => (
                <SalesmanProvider>
                    <Salesmen />
                </SalesmanProvider>
            )
        },
        { path: 'salesmen/:id', component: () => <SalesmenDetail /> },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <ReportsDetail /> },
        {
            path: 'schools', component: () => (
                <SchoolProvider>
                    <Schools />
                </SchoolProvider>
            )
        },
        { path: 'schools/:id', component: () => <SchoolsDetail /> },
    ],
    'SALES SUPERVISOR': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        {
            path: 'target-schools', component: () => (
                <TargetSchoolProvider>
                    <TargetSchools />
                </TargetSchoolProvider>
            )
        },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchoolsDetail />,
        },
        {
            path: 'salesmen', component: () => (
                <SalesmanProvider>
                    <Salesmen />
                </SalesmanProvider>
            )
        },
        { path: 'salesmen/:id', component: () => <SalesmenDetail /> },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <ReportsDetail /> },
        {
            path: 'schools', component: () => (
                <SchoolProvider>
                    <Schools />
                </SchoolProvider>
            )
        },
        { path: 'schools/:id', component: () => <SchoolsDetail /> },
    ],
    'SALESMAN': [
        { path: 'dashboards', component: () => <Dashboards /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
        {
            path: 'target-schools', component: () => (
                <TargetSchoolProvider>
                    <TargetSchools />
                </TargetSchoolProvider>
            )
        },
        {
            path: 'target-schools/:id',
            component: () => <TargetSchoolsDetail />,
        },
        { path: 'reports', component: () => <Reports /> },
        { path: 'reports/:id', component: () => <ReportsDetail /> },
    ],
}

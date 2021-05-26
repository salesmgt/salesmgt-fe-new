import React from 'react'
import {
    Dashboards,
    Account,
    Accounts,
    Task,
    Tasks,
    WorkPlans,
    School,
    Schools,
    Report,
    Reports,
    Services,
    Service,
    Salesman,
    Salesmen
} from '../pages'
import AccountProvider from '../pages/Accounts/hooks/AccountContext'
import ReportProvider from '../pages/Reports/hooks/ReportContext'
import SchoolProvider from '../pages/Schools/hooks/SchoolContext'
import TaskProvider from '../pages/Tasks/hooks/TaskContext'
import ServiceProvider from '../pages/Services/hooks/ServiceContext'
import SalesmanProvider from '../pages/Salesmen/hooks/SalesmanContext'

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
        {
            path: 'schools',
            component: () => (
                <SchoolProvider>
                    <Schools />
                </SchoolProvider>
            ),
        },
        { path: 'schools/:id', component: () => <School /> },
        {
            path: 'tasks',
            component: () => (
                <TaskProvider>
                    <Tasks />
                </TaskProvider>
            ),
        },
        { path: 'tasks/:id', component: () => <Task /> },
        {
            path: 'reports',
            component: () => (
                <ReportProvider>
                    <Reports />
                </ReportProvider>
            ),
        },
        { path: 'reports/:id', component: () => <Report /> },
        {
            path: 'services',
            component: () => (
                <ServiceProvider>
                    <Services />
                </ServiceProvider>
            ),
        },
        {
            path: 'services/:id',
            component: () => (
                <ServiceProvider>
                    <Service />
                </ServiceProvider>
            )
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
        { path: 'work-plans', component: () => <WorkPlans /> },
    ],
    'SALES SUPERVISOR': [
        { path: 'dashboards', component: () => <Dashboards /> },
        {
            path: 'schools',
            component: () => (
                <SchoolProvider>
                    <Schools />
                </SchoolProvider>
            ),
        },
        { path: 'schools/:id', component: () => <School /> },
        {
            path: 'tasks',
            component: () => (
                <TaskProvider>
                    <Tasks />
                </TaskProvider>
            ),
        },
        { path: 'tasks/:id', component: () => <Task /> },
        {
            path: 'reports',
            component: () => (
                <ReportProvider>
                    <Reports />
                </ReportProvider>
            ),
        },
        { path: 'reports/:id', component: () => <Report /> },
        {
            path: 'salesmen',
            component: () => (
                <SalesmanProvider>
                    <Salesmen />
                </SalesmanProvider>
            ),
        },
        { path: 'salesmen/:id', component: () => <Salesman /> },
        { path: 'work-plans', component: () => <WorkPlans /> },
    ],
    SALESMAN: [
        { path: 'dashboards', component: () => <Dashboards /> },
        {
            path: 'tasks',
            component: () => (
                <TaskProvider>
                    <Tasks />
                </TaskProvider>
            ),
        },
        {
            path: 'tasks/:id', component: () => (
                <TaskProvider>
                    <Task />
                </TaskProvider>
            )
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
        {
            path: 'services',
            component: () => (
                <ServiceProvider>
                    <Services />
                </ServiceProvider>
            ),
        },
        {
            path: 'services/:id',
            component: () => (
                <ServiceProvider>
                    <Service />
                </ServiceProvider>
            )
        },
        { path: 'work-plans', component: () => <WorkPlans /> },
    ],
}

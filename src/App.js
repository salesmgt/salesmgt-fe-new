import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { SignIn, Errors } from '../../pages'
import { getError } from '../../pages/Errors/ErrorsConfig'
import { getMenuItems } from '../MyArea/MenuConfig'
import { MyLayout } from '../MyArea'

import {
    Dashboards,
    Users,
    TargetSchools,
    WorkPlans,
    Schools,
    Salesmen,
    Reports,
    Profiles,
} from '../../pages'

// import useToken from './utils/useToken'

// const Dashboards = lazy(() => import('./pages/Dashboards'))
// const Tasks = lazy(() => import('./pages/Tasks'))
// const WorkPlans = lazy(() => import('./pages/WorkPlans'))
// const Schools = lazy(() => import('./pages/Schools'))
// const Salesman = lazy(() => import('./pages/Salesman'))

function App() {
    // const [token, setToken] = useState()
    // const { token, setToken } = useToken()

    // if (!token) {
    //     return <SignIn setToken={setToken} />
    // }

    // const { user, roles } = React.useContext(contextValue)
    // const location = useLocation()

    const role = 'salesman'
    const errorCode = '404'
    return (
        <Switch>
            {/* <Redirect from="*" to="/apps/auth" /> */}
            {/* <Redirect exact from="/apps" to="/apps/auth" /> */}
            <Route path="/apps/auth" component={SignIn} />
            {/* <Route>
                <Errors error={getError(errorCode)} />
            </Route> */}

            <MyLayout menuItems={getMenuItems(role)}>
                <Route path="/apps/dashboards" component={Dashboards} />
                <Route path="/apps/users" component={Users} />
                <Route path="/apps/target-schools" component={TargetSchools} />
                <Route path="/apps/work-plans" component={WorkPlans} />
                <Route path="/apps/schools" component={Schools} />
                <Route path="/apps/salesmen" component={Salesmen} />
                <Route path="/apps/reports" component={Reports} />
                <Route path="/apps/profiles" component={Profiles} />
                {/* <Route>
                    <Errors error={getError(errorCode)} />
                </Route> */}
            </MyLayout>
        </Switch>
    )
}

export default App

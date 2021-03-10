import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { Login, Errors } from './pages'
import { getError } from './pages/Errors'
import { Layout, getMenuItems } from './layouts'

function App() {
    const ROLE = 'salesman'
    const ERRORCODE = '404'

    return (
        <Switch>
            <Route exact path="/" component={Login} />
            {/* <Route path="/apps" component={<Layout menuItems={getMenuItems(ROLE)} />} /> */}
            <Route path="/apps"
                render={() => <Layout menuItems={getMenuItems(ROLE)} />} />
            {/* <Route component={<Errors error={ getError(ERRORCODE)}/>}/> */}
            <Route path="/errors" render={() => <Errors error={ getError(ERRORCODE)}/>}/>
            <Redirect from="*" to="/errors"/>
        </Switch>
    )
}

export default App

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Logins, Errors, getError } from './pages'
import { Layouts } from './layouts'
import AuthProvider from './hooks/AuthContext'
import PrivateRoute from './routes/PrivateRoute'

function App() {
    return (
        <AuthProvider>
            <Switch>
                <Route exact path="/" component={Logins} />
                <PrivateRoute path="/apps" component={Layouts} />
                <Route
                    path="/errors"
                    component={() => <Errors defaultError={getError(404)} />}
                />
                <Redirect from="*" to="/errors" />
            </Switch>
        </AuthProvider>
    )
}

export default App

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Logins, Errors, getError } from './pages'
import { AppLayouts } from './layouts'
import AuthProvider from './hooks/AuthContext'
import AppProvider from './hooks/AppContext'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <Switch>
                    <PublicRoute
                        exact
                        path="/"
                        restricted={true}
                        component={Logins}
                    />
                    <PrivateRoute path="/apps" component={AppLayouts} />
                    <Route
                        path="/errors"
                        component={() => (
                            <Errors defaultError={getError(404)} />
                        )}
                    />
                    <Redirect from="*" to="/errors" />
                </Switch>
            </AppProvider>
        </AuthProvider>
    )
}

export default App

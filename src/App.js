import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Logins, Errors, getError } from './pages'
import { Layouts, getMenuItems } from './layouts'
import AuthProvider from './hooks/AuthProvider'
import ErrorProvider from './hooks/ErrorProvider'

function App() {
    const ROLE = 'salesman'
    const ERRORCODE = '404'
    // const errors = ERRORCODE

    return (
        <AuthProvider>
            <Switch>
                <Route exact path="/" component={Logins} />
                <Route
                    path="/apps"
                    render={() => <Layouts menuItems={getMenuItems(ROLE)} />}
                />
                <ErrorProvider>
                    <Route
                        path="/errors"
                        render={() => (
                            <Errors
                            error={getError(ERRORCODE)}
                            />
                        )}
                    />
                </ErrorProvider>
                <Redirect from="*" to="/errors" />
            </Switch>
        </AuthProvider>
    )
}

export default App

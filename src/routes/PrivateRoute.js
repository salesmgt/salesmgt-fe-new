import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'

function PrivateRoute({ component: Component, ...rest }) {
    const location = useLocation()
    const isAuthenticated = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: '/', state: { from: location } }}
                    />
                )
            }}
        />
    )
}

export default PrivateRoute

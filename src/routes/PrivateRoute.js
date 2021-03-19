import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
    const location = useLocation()
    const { user } = useAuth()

    const isAuthenticated = user != null ? true : false

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

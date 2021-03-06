import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

function PrivateRoute(props) {
    const { component: Component, ...rest } = props

    const { user } = useAuth()

    // const isAuthenticated = user != null ? true : false
    const isAuthenticated = !!user

    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }}
        />
    )
}

export default PrivateRoute

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

function VerifyRoute(props) {
    const { component: Component, ...rest } = props

    const { verifyCode } = useAuth()

    // const isAuthenticated = user != null ? true : false
    const isVerified = !!verifyCode

    return (
        <Route
            {...rest}
            render={(props) => {
                return isVerified ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }}
        />
    )
}

export default VerifyRoute

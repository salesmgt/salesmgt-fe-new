import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    const location = useLocation()
    // const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => {
                // return currentUser ? (
                //     <Component {...props} />
                // ) : (
                ;<Redirect to={{ pathname: '/', state: { from: location } }} />
                // )
            }}
        ></Route>
    )
}

export default PrivateRoute

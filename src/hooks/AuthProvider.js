import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider(props) {
    const { children } = props

    const { authTokens, setAuthTokens } = useState()

    const getAuthTokens = () => {
        setAuthTokens()
    }

    return (
        <AuthContext.Provider value={authTokens}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

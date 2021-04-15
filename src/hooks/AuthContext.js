import React, { createContext, useContext, useState } from 'react'
import * as Milks from '../utils/Milks'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function useAuthProvider() {
    const [user, setUser] = useState(Milks.getWithExpiry('notMe'))

    console.log(user)
    // const [authToken, setAuthToken] = useState(null)

    return {
        user,
        setUser,
        // authToken,
        // setAuthToken,
    }
}

function AuthProvider(props) {
    const { children } = props

    const auth = useAuthProvider()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider

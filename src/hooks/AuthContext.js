import React, { createContext, useContext, useState } from 'react'
import * as Milk from '../utils/Milk'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function useAuthProvider() {
    const [user, setUser] = useState(Milk.getWithExpiry('notMe'))

    if (!user) {
        localStorage.removeItem('dists')
        localStorage.removeItem('schEduLvls')
        localStorage.removeItem('schTypes')
        localStorage.removeItem('schScales')
        localStorage.removeItem('schStatus')
        localStorage.removeItem('roles')
    }

    return {
        user,
        setUser,
    }
}

function AuthProvider(props) {
    const { children } = props

    const auth = useAuthProvider()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider

import React, { createContext, useContext, useState } from 'react'
import * as Milk from '../utils/Milk'
import { milkName } from '../utils/Constants'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function useAuthProvider() {
    const [user, setUser] = useState(
        Milk.getMilkExpiry(milkName.token) ? Milk.getMilkExpiry(milkName.token) : null
    )

    if (!user) {
        Milk.makeSour(milkName.dists)
        Milk.makeSour(milkName.eduLvls)
        Milk.makeSour(milkName.types)
        Milk.makeSour(milkName.scales)
        Milk.makeSour(milkName.status)
        Milk.makeSour(milkName.roles)
        Milk.makeSour(milkName.schYears)
        Milk.makeSour(milkName.salesPurps)
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

import React, { createContext, useContext, useState } from 'react'
import * as Milk from '../utils/Milk'
import { milkNames } from '../constants/Generals'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function useAuthProvider() {
    const [user, setUser] = useState(
        Milk.getMilkExpiry(milkNames.token)
            ? Milk.getMilkExpiry(milkNames.token)
            : null
    )

    if (!user) {
        // Milk.makeSour(milkNames.dists)
        // Milk.makeSour(milkNames.eduLvls)
        // Milk.makeSour(milkNames.types)
        // Milk.makeSour(milkNames.scales)
        // Milk.makeSour(milkNames.status)
        // Milk.makeSour(milkNames.roles)
        // Milk.makeSour(milkNames.schYears)
        // Milk.makeSour(milkNames.salesPurps)

        Milk.makeSour([
            milkNames.dists,
            milkNames.eduLvls,
            milkNames.types,
            milkNames.scales,
            milkNames.status,
            milkNames.roles,
            milkNames.schYears,
            milkNames.salesPurps,
        ])
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

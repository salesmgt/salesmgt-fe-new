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

    const [verifyCode, setVerifyCode] = useState(null)

    if (!user) {
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
        verifyCode,
        setVerifyCode,
    }
}

function AuthProvider(props) {
    const { children } = props

    const auth = useAuthProvider()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider

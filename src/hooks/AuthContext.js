import React, { createContext, useContext, useState } from 'react'
import * as LoginsServices from '../pages/Logins/LoginsServices'
import * as Cookies from '../utils/Cookies'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function useAuthProvider() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('notMe')))
    const [authToken, setAuthToken] = useState(null)

    // const getAccessToken = (username, password) => {
    //     LoginsServices.checkUser(username, password).then((data) => {
    //         return data.token
    //     })
    //     // .catch((error) => {
    //     //     if (error.response) {
    //     //         console.log(error)
    //     //     }
    //     // })
    // }

    // const cookie = Cookies.getCookie('accessToken')
    // if (cookie != null) {
    //     setAuthToken(cookie)
    // } else {
    //     setAuthToken(getAccessToken())
    // }

    // React.useEffect(getAccessToken, [])

    return { user, setUser, authToken, setAuthToken }
}

function AuthProvider(props) {
    const { children } = props

    const auth = useAuthProvider()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider

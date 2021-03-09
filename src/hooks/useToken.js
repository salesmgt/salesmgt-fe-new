import { useState } from 'react'

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token')
        console.log('tStr:', tokenString)
        const userToken = JSON.parse(tokenString)
        console.log('usrT:', userToken)
        return userToken?.token
    }

    console.log('getT:', getToken.userToken)
    const [token, setToken] = useState(getToken())

    const saveToken = (userToken) => {
        console.log('saveT:','kokko')
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    return {
        token,
        setToken: saveToken,
    }
}
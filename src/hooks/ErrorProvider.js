import { createContext, useContext, useState } from 'react'

const ErrorContext = createContext()

export function useError() {
    return useContext(ErrorContext)
}

function ErrorProvider(props) {
    const { children } = props

    // const errors = '404'

    return <ErrorContext.Provider value="404">{children}</ErrorContext.Provider>
}

export default ErrorProvider

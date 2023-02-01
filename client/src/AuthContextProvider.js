import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const validateToken = useCallback(() => {
        axios.post('/tokenValidate')
            .then(response => {
                setLoading(false)
                setCurrentUser(response.data)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        validateToken()
    }, [validateToken])

    if (loading) return;
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
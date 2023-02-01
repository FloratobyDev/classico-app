import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const FavoriteContext = createContext()

const FavoriteProvider = ({ children }) => {
    const [favoriteLoading, setFavoriteLoading] = useState(true)
    const [favorites, setFavorite] = useState([])

    useEffect(() => {
        axios.get('/fetchUserFavorite')
            .then(response => {
                setFavorite(response.data.favorites)
                setFavoriteLoading(false)
            })

    }, [])


    return <FavoriteContext.Provider value={{ favorites, setFavorite, favoriteLoading, setFavoriteLoading }}>
        {children}
    </FavoriteContext.Provider>
}

export default FavoriteProvider
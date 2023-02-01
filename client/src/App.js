
import React, { useState } from 'react'
import AuthContextProvider from './AuthContextProvider'
import FavoriteProvider from './FavoriteProvider'
import MainPage from './pages/MainPage'
import SearchContextProvider from './SearchContextProvider'

const App = () => {
    const [login, setLogin] = useState(false)

    return (
        <div className='w-11/12 mx-auto h-full pb-20'>
            <AuthContextProvider>
                <SearchContextProvider>
                    <FavoriteProvider>
                        <MainPage />
                    </FavoriteProvider>
                </SearchContextProvider>
            </AuthContextProvider>
        </div>
    )
}

export default App
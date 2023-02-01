import React, { createContext, useState } from 'react'

export const SearchContext = createContext()

const SearchContextProvider = ({ children }) => {
    const [result, setResult] = useState(null)
    const [search, setSearch] = useState("")

    return (
        <SearchContext.Provider value={{ result, setResult, search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider
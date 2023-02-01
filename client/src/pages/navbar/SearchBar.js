import axios from 'axios'
import React, { useCallback, useContext, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import { SearchContext } from '../../SearchContextProvider'
const SearchBar = () => {
    const { search, setSearch, setResult } = useContext(SearchContext)

    const getResult = useCallback(async () => {
        axios.get('/search', {
            params: {
                q: search
            }
        })
            .then(response => {
                setResult(response.data)
            })
            .catch(err => {

            })

    }, [search, setResult])

    const proxyResult = useCallback(() => {

        if (search.length > 0) {
            getResult()
        }
        else {
            setResult(null)
        }
    }, [getResult, setResult, search])

    useEffect(() => {
        const timeout = setTimeout(async () => {
            proxyResult()
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [search, proxyResult])

    return (
        <div className='flex flex-row items-center gap-2 border-solid lg:border-4 border border-gray-800 py-1 lg:py-2 lg:px-4 px-2 rounded-lg focus:w-8/12 lg:w-3/12  '>
            <input onChange={event => {
                setSearch(event.target.value)
            }} value={search} className='outline-none w-full placeholder:text-black placeholder:font-raleway placeholder:font-semibold placeholder:text-sm placeholder:tracking-widest' type="text" placeholder='Search' />
            <BsSearch onClick={event => { setSearch(event.target.value) }} className='cursor-pointer rotate-90 text-2xl md:text-sm lg:text-sm' />
        </div>
    )
}

export default SearchBar
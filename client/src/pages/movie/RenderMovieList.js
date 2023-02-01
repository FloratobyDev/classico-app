import React, { useContext, useRef, useState } from 'react'
import { FavoriteContext } from '../../FavoriteProvider'
import { SearchContext } from '../../SearchContextProvider'
import MovieCard from './MovieCard'

const RenderMovieList = ({ otherComponent }) => {
    const { favorites } = useContext(FavoriteContext)
    const { result } = useContext(SearchContext)
    const [loadingImages, setLoadingImages] = useState(true)
    const imageLoadedCountRef = useRef(0)


    const handleImage = () => {
        imageLoadedCountRef.current += 1
        if (imageLoadedCountRef.current >= result?.length) {
            imageLoadedCountRef.current = 0
            setLoadingImages(false)
        }
    }

    const renderedMovieCards = result?.map(show => {
        return <MovieCard xs='m-1' handleImageLoad={handleImage} key={show._id} movieinfo={show} favoriteList={favorites} />
    })

    return result !== null ? result.length > 0 ?
        <div className='flex flex-row flex-wrap justify-center'>
            {renderedMovieCards}
        </div>
        :
        <div className='flex justify-center'>
            <p className='font-raleway text-lg tracking-widest'>No results found</p>
        </div>
        : otherComponent

}

export default RenderMovieList
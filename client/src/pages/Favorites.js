import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FavoriteContext } from '../FavoriteProvider'
import FavoriteCard from './FavoriteCard'
import MovieCard from './movie/MovieCard'
import RenderMovieList from './movie/RenderMovieList'

const Favorites = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/favoriteMediaInfo')
            .then(response => {
                console.log(response.data);
                setData(response.data.medias)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const renderedFavorites = data.map(favorite => {
        return <FavoriteCard key={favorite._id} movieinfo={favorite} />
    })

    return (
        <RenderMovieList otherComponent={
            <div className=''>
                <h2 className='text-5xl font-raleway tracking-widest text-center font-bold py-4 uppercase mb-6'>Favorites</h2>
                {data.length > 0 ? <div className='flex flex-row gap-5 justify-center flex-wrap bg-black p-4 rounded-lg '>{renderedFavorites}</div>
                    : <div className='flex justify-center'>
                        <p className='font-raleway text-lg tracking-wider'>Favorite a movie/show and it will show here.</p>
                    </div>
                }
            </div>
        } />
    )
}

export default Favorites
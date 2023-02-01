import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import RenderMovieList from '../../../pages/movie/RenderMovieList';
import { SearchContext } from '../../../SearchContextProvider';
import Comments from '../Comments';
import GroupMembers from '../GroupMembers';
import GroupTab from '../GroupTab';
import MovieInformation from '../MovieInformation';

//TODO: Fix conflix between video player and the search results. Whenever the user clicks on a view button in the video page, it only display the search.

const VideoPlayer = () => {
    const [searchParams] = useSearchParams()
    const [movieData, setMovieData] = useState({})

    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)
    const { search } = useContext(SearchContext)

    useEffect(() => {


    }, [search, searchParams])

    useEffect(() => {
        const fetchVideo = async () => {
            const movie = await axios.get('/video', {
                params: {
                    movieId: searchParams.get('movieId')
                }
            }).catch(err => {
                setError(err.response.data)
            })
            setMovieData(movie.data)
        }

        fetchVideo()
    }, [searchParams])


    return error ? <p>{error}</p> : <RenderMovieList otherComponent={<div className='w-full md:lg:w-9/12 mx-auto'>
        <MovieInformation movieData={movieData.data} />
        <Comments comments={movieData?.comments} />
    </div>} />


}

export default VideoPlayer
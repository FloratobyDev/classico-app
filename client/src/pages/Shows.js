import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FavoriteContext } from '../FavoriteProvider'

import RenderMovieList from './movie/RenderMovieList'
import Paginate from '../components/Paginate'
import MovieCard from './movie/MovieCard'
import SortTypes from './movie/SortTypes'
import { Dropdown } from '../components/Dropdown'
import Skeleton from '../components/Skeleton'

const Shows = () => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const maxLimitRef = useRef(0)
    const maxMoviesPerPage = 20
    const [loading, setLoading] = useState(true)

    const sortOptions = Object.values(SortTypes)
    const [sortValue, setSortValue] = useState(sortOptions[0])

    const [loadingImages, setLoadingImages] = useState(true)
    const imageLoadedCountRef = useRef(0)

    const navigate = useNavigate()

    useEffect(() => {

        axios.post('/authenticate')
            .then(data => {
                setLoading(false)
            })
            .catch(err => {
                navigate('/login')
            })

    }, [navigate])

    useEffect(() => {

        setLoadingImages(prev => true)

        if (maxLimitRef.current === 0) {
            (async () => {
                const response = await axios.get('/shows', {
                    params: {
                        skip: 1,
                        limit: maxMoviesPerPage,
                        maxLimit: 0,
                        sortValue
                    }
                })
                maxLimitRef.current = parseInt(response.data.count)
                setData(response.data.data)
                setLoading(false)
            })()
        }
        else {
            (async () => {
                const response = await axios.get('/shows', {
                    params: {
                        skip: page,
                        limit: maxMoviesPerPage,
                        sortValue
                    }
                })
                setData(response.data.data)
                setLoading(false)
            })()
        }

    }, [page, sortValue])

    const handleImage = () => {
        imageLoadedCountRef.current += 1
        if (imageLoadedCountRef.current >= data?.length) {
            imageLoadedCountRef.current = 0
            setLoadingImages(false)
        }
    }

    if (loading) return;

    return <RenderMovieList otherComponent={
        <div>
            <div className='flex flex-col lg:flex-row justify-center lg:justify-between lg:items-center py-5 pr-2'>
                <h2 className='text-5xl font-raleway tracking-widest text-center font-bold py-4 uppercase'>Shows</h2>
                <div className='flex gap-y-2 lg:gap-y-0 lg:flex-row items-center justify-center lg:justify-start'>
                    {maxLimitRef.current > 0 ? <Paginate className="hidden lg:flex" onPageChange={setPage} page={page} maxPage={6} maxLimit={Math.round(maxLimitRef.current / maxMoviesPerPage)} /> : ''}
                    {/* {maxLimitRef.current > 0 ? <Paginate className="hidden md:flex" onPageChange={setPage} page={page} maxPage={6} maxLimit={Math.round(maxLimitRef.current / maxMoviesPerPage)} /> : ''} */}
                    {maxLimitRef.current > 0 ? <Paginate className="flex lg:hidden" onPageChange={setPage} page={page} maxPage={2} maxLimit={Math.round(maxLimitRef.current / maxMoviesPerPage)} /> : ''}
                    <Dropdown sortValue={sortValue} setSortValue={setSortValue} sortOptions={sortOptions} />
                </div>
            </div>

            <div className=''>
                <div className='bg-black rounded-lg justify-center flex flex-row flex-wrap py-2 lg:py-3 gap-1 md:gap-2 lg:gap-2' >
                    {data?.map(movie => {
                        return <MovieCard handleImageLoad={handleImage} key={movie?._id} movieinfo={movie} />
                    })}
                </div>
                {loadingImages && <div className='grid-auto-fit'>
                    <Skeleton width={250} height={380} />
                    <Skeleton width={250} height={380} />
                    <Skeleton width={250} height={380} />
                    <Skeleton width={250} height={380} />
                    <Skeleton width={250} height={380} />
                    <Skeleton width={250} height={380} />
                </div>}
            </div>
        </div>} />

}

export default Shows
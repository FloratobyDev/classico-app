import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SubMovieCard from './SubMovieCard'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Skeleton from './Skeleton'
const GenreComponent = ({ genre, setHideModal, setGenre }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [loadingImages, setLoadingImages] = useState(true)
    const imageLoadedCountRef = useRef(0)

    const fetchGenre = useCallback(() => {
        axios.get('/fetchGenre', {
            params: {
                genre: genre,
                limit: 7
            }
        })
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                setError(err.response.data)
            })
    }, [genre])

    useEffect(() => {
        fetchGenre()
    }, [fetchGenre])

    const handleClick = () => {
        setGenre(genre)
        setHideModal(false)
    }

    const handleImage = () => {
        imageLoadedCountRef.current += 1
        if (imageLoadedCountRef.current >= data?.length) {
            setLoadingImages(false)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex flex-row justify-between items-center gap-2 mb-2'>
                <p className=' font-raleway font-bold text-2xl tracking-widest'>{genre}</p>
                <button onClick={handleClick} className='flex flex-row items-center gap-x-2 font-raleway tracking-wider font-semibold hover:font-bold text-xs'>SHOW MORE <AiOutlineArrowRight /></button>
            </div>
            <div className='flex flex-row flex-wrap gap-x-2 w-full bg-black rounded-lg p-4 md:p-6 lg:p-8'>

                <div className='flex flex-row flex-wrap justify-center gap-[5vw] gap-y-[2vw] lg:gap-[2vw] w-full'>
                    {data?.map(item => {
                        return <div className='' style={{ display: loadingImages ? 'none' : 'initial' }}>
                            <SubMovieCard movieInfo={item} handleImageLoad={handleImage} />
                        </div>
                    })}
                </div>

                {loadingImages && <div className='flex flex-row w-full gap-y-10 gap-x-5'>
                    <div>
                        <Skeleton xs="mt-5" width={150} height={200} />
                        <Skeleton xs="mt-3" width={150} height={20} />
                    </div>
                    <div>
                        <Skeleton xs="mt-5" width={150} height={200} />
                        <Skeleton xs="mt-3" width={150} height={20} />
                    </div>
                    <div>
                        <Skeleton xs="mt-5" width={150} height={200} />
                        <Skeleton xs="mt-3" width={150} height={20} />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default GenreComponent
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FavoriteContext } from '../../FavoriteProvider'
import { SearchContext } from '../../SearchContextProvider'
import classNames from 'classnames'
const MovieCard = ({ movieinfo, handleImageLoad, xs }) => {

    const [hide, setHidden] = useState(true)
    const [showInfo, setShowInfo] = useState(false)
    const [favorite, setFavoriteBool] = useState(false) //for now it's boolean
    const { setSearch } = useContext(SearchContext)

    const [add, setAdd] = useState(true) //for now it's boolean

    const { favorites, setFavorite } = useContext(FavoriteContext)

    const checkFavorite = useCallback(() => {
        setFavoriteBool(favorites.includes(movieinfo?._id))
    }, [favorites, movieinfo?._id])

    useEffect(() => {
        checkFavorite()
    }, [checkFavorite])

    useEffect(() => {
        if (movieinfo?.poster === undefined) {
            handleImageLoad()
        }
    }, [movieinfo, handleImageLoad])

    const handleFavorite = () => {

        if (!favorite) {
            axios.post('/addFavorite', {
                movieId: movieinfo?._id
            })
                .then(response => {
                    console.log('Setting favorite');
                    setFavorite([...favorite, movieinfo?._id])
                })
                .catch(err => {

                })
        }
        else {
            axios.post('/removeFavorite', {
                movieId: movieinfo?._id
            })
                .then(response => {
                    setFavorite(favorites.filter(fav => fav !== movieinfo?._id))
                })
                .catch(err => {

                })
        }
        setFavoriteBool(!favorite)
    }

    const mainClass = classNames('flex rounded-xl bg-white w-[40vw] h-48 md:h-72 w-[28.5vw] md:w-[21.5vw] lg:w-[16vw] lg:h-96 relative', xs)

    return <div className={mainClass} onMouseEnter={() => { setShowInfo(true) }} onMouseLeave={() => { setShowInfo(false) }}>
        <div className='lg:border-4 border-2 border-solid p-1 border-black hover:p-0 w-full rounded-xl bg-transparent grayscale hover:grayscale-0 cursor-pointer'>
            <img onError={() => {
                handleImageLoad()
            }} onLoad={() => {
                setHidden(false)
                handleImageLoad()
            }} style={{ opacity: showInfo ? ".10" : "1" }}
                className='h-full w-full rounded-lg'
                src={movieinfo?.poster} alt={movieinfo?.title} />
        </div>
        {
            showInfo &&

            <div className='flex flex-col justify-center lg:justify-between text-black w-full h-full text-left absolute p-4 border-2 border-solid border-white rounded-xl'>
                <div className='hidden lg:block'>
                    <p className='font-raleway font-bold'>{movieinfo?.title} <span>({movieinfo?.year})</span></p>
                    <div className='flex flex-row flex-wrap gap-1.5 my-2 w-full'>
                        {movieinfo?.genres?.map(genre => {
                            return <p key={genre} className='font-bold text-[10px] uppercase rounded-lg border border-solid border-black px-2'>{genre}</p>
                        })}
                    </div>
                    <p className='text-sm'>{movieinfo?.plot}</p>
                </div>
                <div className='flex flex-col lg:flex-row items-center gap-2'>
                    <Link onClick={() => { setSearch("") }} to={`/video?movieId=${movieinfo?._id}`} className='lg:w-10/12 w-full'>
                        <button className='font-raleway hover:bg-black hover:text-white flex flex-row items-start w-full justify-center border-4 border-black border-solid rounded-full py-1 text-md uppercase font-bold'>
                            <BsPlayFill style={{ fontSize: '1.5rem' }} />
                            <span className='hidden md:inline lg:inline'>
                                View
                            </span>
                        </button>
                    </Link>
                    <button onClick={handleFavorite} className='hover:bg-black hover:text-white border-4 w-full lg:w-auto flex justify-center border-black border-solid rounded-full p-1'>{favorite ? <AiFillStar style={{ fontSize: '1.5rem' }} /> : <AiOutlineStar style={{ fontSize: '1.5rem' }} />}</button>
                    {/* <button onClick={handleAdd} className='hover:bg-black hover:text-white border-2 border-black border-solid rounded-full p-1'>{add ? <IoMdAdd style={{ fontSize: '1.5rem' }} /> : <IoMdClose style={{ fontSize: '1.5rem' }} />}</button> */}
                </div>
            </div>
        }
    </div >
}


export default MovieCard
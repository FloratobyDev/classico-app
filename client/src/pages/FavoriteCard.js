import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { FavoriteContext } from '../FavoriteProvider'
import { SearchContext } from '../SearchContextProvider'

const FavoriteCard = ({ movieinfo }) => {

    const [hide, setHidden] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [favorite, setFavoriteBool] = useState(false) //for now it's boolean
    const { setSearch } = useContext(SearchContext)

    const { favorites, setFavorite } = useContext(FavoriteContext)

    useEffect(() => {
        setFavoriteBool(async () => await favorites.includes(movieinfo._id))
    }, [favorites, movieinfo])

    const handleFavorite = () => {

        if (!favorite) {

            axios.post('/addFavorite', {
                movieId: movieinfo?._id
            })
                .then(response => {
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
            setHidden(true)
        }
        setFavoriteBool(!favorite)
    }

    return <div className='flex rounded-xl md:w-5/12 lg:w-60 w-full h-96 relative border-white border-2' style={{ display: hide ? 'none' : 'flex' }} onMouseEnter={() => { setShowInfo(true) }} onMouseLeave={() => { setShowInfo(false) }}>

        <div className='border-4 border-solid w-full h-full rounded-lg border-black p-2'>
            <img style={{ opacity: showInfo ? ".10" : "1" }} className='w-full h-full rounded-lg bg-transparent grayscale hover:grayscale-0 cursor-pointer' src={movieinfo?.poster} alt="random" />
        </div>
        {showInfo &&

            <div className=' flex flex-col justify-between text-white w-full h-full text-left absolute p-4 border-2 border-solid border-black rounded-xl'>
                <div>
                    <p className='font-bold'>{movieinfo?.title} <span>({movieinfo?.year})</span></p>
                    <div className='flex flex-row flex-wrap gap-1.5 my-2 w-full'>
                        {movieinfo?.genres.map(genre => {
                            return <p key={genre} className='font-bold text-[10px] uppercase rounded-lg border border-solid border-black px-2'>{genre}</p>
                        })}
                    </div>
                    <p className='text-sm'>{movieinfo?.plot}</p>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <Link onClick={() => { setSearch("") }} to={`/video?movieId=${movieinfo._id}`} className='w-10/12'>
                        <button className='hover:bg-white hover:text-black flex flex-row items-center w-full justify-center border-2 border-white border-solid rounded-full py-1 text-md uppercase font-bold'>
                            <BsPlayFill style={{ fontSize: '1.5rem' }} />
                            View
                        </button>
                    </Link>
                    <button onClick={handleFavorite} className='hover:bg-white hover:text-black border-2 border-white border-solid rounded-full p-1'>{favorite ? <AiFillStar style={{ fontSize: '1.5rem' }} /> : <AiOutlineStar style={{ fontSize: '1.5rem' }} />}</button>
                    {/* <button onClick={handleAdd} className='hover:bg-black hover:text-white border-2 border-black border-solid rounded-full p-1'>{add ? <IoMdAdd style={{ fontSize: '1.5rem' }} /> : <IoMdClose style={{ fontSize: '1.5rem' }} />}</button> */}
                </div>
            </div>
        }
    </div >
}


export default FavoriteCard
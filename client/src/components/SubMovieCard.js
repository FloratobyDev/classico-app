import React from 'react'
import { Link } from 'react-router-dom'
const SubMovieCard = ({ movieInfo, handleImageLoad }) => {
    return (
        <div className='flex flex-col gap-2 my-2 w-36 lg:w-auto text-center'>
            <Link className='flex flex-col' to={`/video?movieId=${movieInfo?._id}`}>
                <div className='flex flex-col justify-center cursor-pointer h-48 w-30 lg:h-56 lg:w-44 rounded-lg  border-2 border-white p-2 hover:p-0 overflow-hidden' >
                    <img onLoad={() => { handleImageLoad() }} onError={() => { handleImageLoad() }} className='object-fit w-full h-full grayscale pointer-events-none  border-white rounded-lg' src={movieInfo?.poster || 'default-image.jpg'} alt={movieInfo?.title || 'randomMovie'} />
                </div>
            </Link>
            <Link className='flex flex-col' to={`/video?movieId=${movieInfo?._id}`}>
                <div className='flex flex-col items-center justify-center cursor-pointer'>
                    <p className='text-white text-sm font-raleway font-bold hover:underline lg:w-36'>{movieInfo?.title}</p>
                </div>
            </Link>
        </div>
    )

}

export default SubMovieCard
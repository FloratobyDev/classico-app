import { useContext, useState, useEffect, useCallback } from 'react'
import GroupMembers from './GroupMembers'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import { FavoriteContext } from '../../FavoriteProvider'
import Skeleton from '../Skeleton'

export const DataArray = ({ data, title }) => {

    let dataValue = ""
    const query = `https://www.google.com/search?q=${data}`
    if (data instanceof Array) dataValue = data.join(', ')
    else dataValue = data

    return <div className='flex flex-col lg:items-center md:flex-row md:justify-start gap-x-2 flex-wrap w-6/12'>
        <span className='font-raleway font-bold'>{title}:</span>
        <p className='font-medium text-sm tracking-wider capitalize'>{data}</p>
    </div>

}


const MovieInformation = ({ movieData }) => {

    const [favorite, setFavoriteBool] = useState(false)

    const hour = Math.floor(movieData?.runtime / 60) || 0
    const minutes = movieData?.runtime % 60 || 0
    const plot = movieData?.fullplot || movieData?.plot
    const [readMore, setReadMore] = useState(false)
    let releasedDate = null

    console.log(movieData?._id)

    const { favorites, setFavorite } = useContext(FavoriteContext)

    const checkFavorite = useCallback(() => {
        setFavoriteBool(favorites.includes(movieData?._id))
    }, [favorites, movieData?._id])

    useEffect(() => {
        checkFavorite()
    }, [checkFavorite])

    const handleFavorite = () => {

        if (!favorite) {
            axios.post('/addFavorite', {
                movieId: movieData?._id
            })
                .then(response => {
                    setFavorite([...favorites, movieData?._id])
                })
                .catch(err => {
                })
        }
        else {
            axios.post('/removeFavorite', {
                movieId: movieData?._id
            })
                .then(response => {
                    setFavorite(favorites.filter(fav => fav !== movieData?._id))
                })
                .catch(err => {

                })
        }
        setFavoriteBool(!favorite)
    }

    const convertMonth = numberValue => {
        let month = ""
        switch (numberValue) {
            case 1:
                month = "January"
                break;
            case 2:
                month = "February"
                break;
            case 3:
                month = "March"
                break;
            case 4:
                month = "April"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "June"
                break;
            case 7:
                month = "July"
                break;
            case 8:
                month = "August"
                break;
            case 9:
                month = "September"
                break;
            case 10:
                month = "October"
                break;
            case 11:
                month = "November"
                break;
            case 12:
                month = "December"
                break;
            default:
                break;
        }

        return month
    }

    if (movieData?.released) {
        releasedDate = new Date(movieData.released)
    }

    return (
        movieData ?
            <div className='flex flex-col md:flex-col lg:flex-row gap-5 '>
                <div className='inline-block mx-auto h-full w-[70vw] lg:w-[20vw] border-4 border-solid rounded-lg border-black bg-black p-2'>
                    <img className=' w-full rounded-lg border-2 border-white grayscale mr-10' src={movieData?.poster || 'default-image.jpg'} alt={`${movieData?.title}-movie`} />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='font-raleway tracking-wider font-bold text-xl md:text-4xl lg:text-4xl'>{movieData?.title} <span className='font-normal lg:text-2xl'>({movieData?.year})</span> </p>
                        <button onClick={handleFavorite} className='hover:bg-black hover:text-white border-2 border-black border-solid rounded-full p-1'>{favorite ? <AiFillStar style={{ fontSize: '1.5rem' }} /> : <AiOutlineStar style={{ fontSize: '1.5rem' }} />}</button>
                    </div>

                    <p className='py-2 text-xs lg:text-lg'>
                        {movieData?.rated && <span className=' mr-2 px-4 py-1 font-raleway font-semibold text-sm tracking-widest bg-gray-300 rounded-md'>
                            {movieData.rated}
                        </span>}
                        <span className=' font-raleway font-semibold mr-2 px-2 py-.5 lg:text-sm'>
                            {movieData?.genres.length > 1 && movieData?.genres[0]}{movieData?.genres.length > 1 && <span> / </span>}{movieData?.genres[1]}
                        </span>

                        {hour}h {minutes}m
                    </p>

                    <p className='w-auto md:lg:w-7/12 font-raleway font-semibold lg:text-sm my-4 tracking-wider'>{plot?.substring(0, readMore ? plot.length : 100)}  <span onClick={() => { setReadMore(!readMore) }} className=' text-blue-300 cursor-pointer'>{readMore ? 'read less...' : 'read more...'}</span></p>

                    <div className='lg:flex md:flex flex flex-row items-start flex-wrap gap-y-3 md:gap-y-1 md:px-5  lg:px-0 lg:gap-y-1 lg:flex-col w-11/12 mx-auto lg:mx-0'>
                        <GroupMembers members={movieData?.writers} name="Writers" />
                        <GroupMembers members={movieData?.directors} name="Directors" />
                        <GroupMembers members={movieData?.languages} name="Languages" />
                        <GroupMembers members={movieData?.genres} name="Genres" />
                        <GroupMembers members={movieData?.cast} name="Casts" />
                        <GroupMembers members={movieData?.countries} name="Countries" />
                        <DataArray data={movieData?.type} title="Type" />
                        <DataArray data={convertMonth(parseInt(releasedDate?.getMonth())) + " " + releasedDate?.getDay() + " " + releasedDate?.getFullYear()} title="Released Date" />
                        <DataArray data={movieData?.awards.text} title="Awards" />
                        <DataArray data={movieData?.imdb?.rating + "/10"} title="IMDB" />
                        <DataArray data={movieData?.tomatoes?.viewer?.rating + "/10"} title="Tomatoes" />
                    </div>
                </div>
            </div> : ""
    )
}

export default MovieInformation
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from './movie/MovieCard'
import axios from 'axios'
import MovieInformation from '../components/videoplayer/MovieInformation'
import { SearchContext } from '../SearchContextProvider'
import RenderMovieList from './movie/RenderMovieList'
import GenreComponent from '../components/GenreComponent'
import Modal from '../components/Modal'
import Skeleton from '../components/Skeleton'
import SubMovieCard from '../components/SubMovieCard'
import { MdClose } from 'react-icons/md'

const Home = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [genreLoading, setGenreLoading] = useState(true)
    const [error, setError] = useState(null)

    const [modalGenre, setModalGenre] = useState(null)
    const [hideModal, setHideModal] = useState(true)
    const [modalData, setModalData] = useState(null)

    const [genres, setGenres] = useState([])

    const navigate = useNavigate()

    async function fisherYatesShuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return await arr;
    }

    useEffect(() => {
        if (modalGenre) {
            axios.get('/fetchGenre', {
                params: {
                    genre: modalGenre,
                    limit: 40
                }
            })
                .then(async (response) => {
                    setModalData(response.data)
                })
                .catch(err => {
                    console.log(err.response.data);
                })
        }
    }, [modalGenre])

    useEffect(() => {
        axios.post('/authenticate')
            .then(data => {
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setError(err.response.data)
            })
    }, [navigate])

    useEffect(() => {
        console.log('shuffling');
        axios.get('/fetchGenreTypes', {
            params: {
                limit: 10
            }
        })
            .then(async (response) => {
                const shuffleData = await fisherYatesShuffle(response.data)
                setGenres(shuffleData)
                setGenreLoading(false)
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }, [])

    useEffect(() => {
        (async () => {
            const response = await axios.get('/home')
            setData(response.data)
        })()

    }, [])


    if (error) {
        return <p>{error}</p>
    }

    if (loading || genreLoading || !data) {
        return <div>
            <div className='flex flex-col md:flex-row lg:flex-row gap-5'>
                <Skeleton width={350} height={400} />
                <div className='flex flex-col w-full'>
                    <Skeleton width={350} height={30} />
                    <Skeleton xs="my-3 mx-2" width={150} height={20} />
                    <Skeleton xs="mt-5" width={400} height={40} />
                    <Skeleton xs="my-3 mx-2" width={300} height={20} />
                    <Skeleton xs="my-2 mx-2" width={300} height={20} />
                    <Skeleton xs="my-2 mx-2" width={300} height={20} />
                    <Skeleton xs="my-2 mx-2" width={300} height={20} />
                    <Skeleton xs="my-2 mx-2" width={300} height={20} />
                    <Skeleton xs="my-2 mx-2" width={300} height={20} />
                </div>
            </div>
        </div>
    }

    return <RenderMovieList otherComponent={
        <>
            {!hideModal && <Modal>
                <div className=' bg-[rgba(255,255,255,.8)] w-full h-full flex justify-center items-center '>
                    <div className=' border-8 bg-black rounded-lg  h-3/4 w-11/12 lg:w-6/12  border-black border-solid relative overflow-hidden'>
                        <button onClick={() => { setHideModal(true) }} className='border-2 border-white text-white absolute left-4 top-4 rounded-full p-2 px-2 z-50'><MdClose className='text-sm lg:text-2xl' /></button>
                        <div className='flex flex-row flex-wrap justify-center gap-2 overflow-y-scroll w-full h-full py-10'>
                            <p className='text-center font-bold text-4xl bg-transparent p-10 text-white'>{modalGenre}</p>
                            <div className='w-full h-full flex flex-row flex-wrap justify-center gap-5'>
                                {modalData?.map(data => {
                                    return <SubMovieCard movieInfo={data} handleImageLoad={() => { }} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>}

            <div style={{ position: 'initial' }}>

                <div className=' mb-8'>
                    <MovieInformation movieData={data.randomMovie} />
                </div>
                <div className='flex flex-col w-full gap-y-12'>
                    {genres.slice(0, 4).map(genre => {
                        return <GenreComponent key={genre} genre={genre} setGenre={setModalGenre} setHideModal={setHideModal} />
                    })}
                </div>
            </div>

        </>
    } />

}

export default Home
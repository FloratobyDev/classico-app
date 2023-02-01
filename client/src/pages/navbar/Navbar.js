import axios from 'axios'
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContextProvider'
import { SearchContext } from '../../SearchContextProvider'
import Profile from './Profile'
import SearchBar from './SearchBar'

const Navbar = () => {
    const tabs = ['Home', 'Movies', 'Shows', 'Favorites']
    const { currentUser } = useContext(AuthContext)
    const { setSearch, setResult } = useContext(SearchContext)
    // console.log(currentUser);
    const [validateLogin, setValidateLogin] = useState(false)
    console.log(validateLogin);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const [showTabs, setShowTabs] = useState(false)



    useEffect(() => {
        setValidateLogin(currentUser !== null)
    }, [currentUser])

    const renderedTabs = tabs.map((tab, idx) => {
        return <Link onClick={() => {
            setSearch("")
            setResult(null)
            setShowTabs(false)
        }} key={idx} to={tab.toLowerCase()}>
            <p className='cursor-pointer font-raleway font-medium text-lg tracking-widest md:tracking-normal lg:tracking-wider md:text-2xl lg:text-sm lg:font-semibold w-12 text-white lg:text-black hover:font-bold'>{tab}</p>
        </Link>
    })

    return (
        <div className='flex flex-row items-center justify-between lg:p-8 py-8 mb-6'>

            <div style={{ display: showTabs ? 'initial' : 'none' }} className=' transition-all w-3/4 md:w-1/2 absolute top-0 left-0 bg-black h-full z-50 overflow-hidden'>
                <div className='flex flex-col justify-center m-14 -translate-x-4'>
                    <AiOutlineClose style={{ color: 'white' }} className='mb-5 text-2xl' onClick={() => { setShowTabs(false) }} />
                    <div className='lg:flex flex flex-col gap-y-3'>
                        {renderedTabs}
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <div className='flex flex-row gap-3 items-start mr-10'>
                    <HiMenu onClick={() => { setShowTabs(true) }} className='text-2xl lg:hidden' />
                    <h1 className=' font-extrabold text-xl tracking-widest font-montserrat'>Classico</h1>
                </div>


                {validateLogin && <div className='hidden lg:flex flex-row gap-x-8'>
                    {renderedTabs}
                </div>}
            </div>
            {validateLogin ?
                <>
                    <SearchBar />
                    <Profile />
                </>
                :
                <div>
                    <Link to="/login">
                        <button className='rounded-md font-montserrat font-bold border-2 border-solid p-1 px-4 border-black'>Login</button>
                    </Link>
                </div>
            }


            {/* <p>{error}</p> */}
        </div>
    )
}

export default Navbar
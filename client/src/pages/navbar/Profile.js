import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthContextProvider'
const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext)
    const [settings, setSettings] = useState(false)
    const settingsRef = useRef()

    useEffect(() => {
        if (!settingsRef.current) return;
        const settingsClickListener = document.addEventListener('click', (event) => {

            if (!settingsRef.current?.contains(event.target)) {
                // console.log('setting to false');
                setSettings(false)
            }
        }, true)

        return () => {
            document.removeEventListener('click', settingsClickListener)
        }
    }, [])

    const handleClick = () => {
        console.log('clicking');
        setSettings((currentValue) => !currentValue)
        console.log('setting to click : ' + settings);
    }

    const handleLogout = async () => {
        axios.post('/logout')
            .then(() => {
                setCurrentUser(() => null)
                setSettings(false)
            })
    }

    return (
        <div className='relative lg:flex flex-row items-center gap-4 ml-2 md:ml-0 lg:ml-0'>
            <h2 className=' hidden md:block lg:block capitalize text-gray-800 font-raleway font-semibold lg:text-sm tracking-widest text-sm'>{currentUser?.username}</h2>
            <div ref={settingsRef} className='flex flex-col gap-10 z-10'>
                <RxAvatar onClick={handleClick} className='text-3xl cursor-pointer' />
                <div style={{ display: settings ? 'flex' : 'none' }} className='z-50 flex flex-col overflow-hidden absolute right-1 top-10 w-44 text-center border-2 border-solid rounded-lg border-black bg-white'>
                    <Link onClick={() => { setSettings(false) }} to='/profile-settings'>
                        <p className='hover:bg-gray-300 p-2'>Manage Profile</p>
                    </Link>
                    <Link onClick={handleLogout} to='/logout'>
                        <p className='hover:bg-gray-300 p-2'>Log out</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile
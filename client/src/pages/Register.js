import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../AuthContextProvider'
import { Link } from 'react-router-dom'
const Register = () => {

    const { setCurrentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        axios.post('/authenticate')
            .then(data => {
                navigate('/home')
            })
    }, [navigate])

    const handleSubmit = async (event) => {

        event.preventDefault()

        axios.post('/register', data)
            .then(response => {
                setCurrentUser(response.data)
                navigate('/home')
            })
            .catch(err => {
                setError(err.response.data)
            })
    }

    const handleClick = event => {
        setError('')
        setData({
            ...data,
            [event.target.id]: event.target.value
        })
    }

    return <div className=' flex items-center justify-center rounded-xl w-auto lg:w-6/12 mx-auto px-5'>
        <div className='border-solid border-black flex flex-col w-full md:w-8/12 lg:w-8/12 justify-center'>
            <div className='flex flex-col items-center md:mb-10 lg:mb-10 mb-5 md:gap-y-5 lg:gap-y-5 gap-y-2'>
                <img className='md:w-40 md:h-36 w-24 h-20' src="/old_tv.png" alt="" />
                <div className=' flex flex-col items-center text-center'>
                    <h1 className=' font-raleway py-4 font-bold text-lg md:text-3xl lg:text-3xl tracking-[5px]'>Welcome to Classico!</h1>
                </div>
            </div>
            <div className='border-4 border-dashed rounded-xl border-black pt-6'>
                <form className='flex flex-col items-center md:gap-3 lg:gap-3' onSubmit={handleSubmit}>
                    <div className='w-8/12 mx-auto flex flex-col gap-y-3 md:gap-y-8 lg:gap-y-8 mb-5'>
                        <div className='flex flex-col text-center gap-3'>
                            <label className='font-sm font-montserrat font-bold tracking-widest' htmlFor="name">Username</label>
                            <input onChange={handleClick} value={data.username} className='font-montserrat tracking-widest px-4 rounded-xl border-4 border-gray-800 p-2' id="username" type="text" required />
                        </div>
                        <div className='flex flex-col text-center gap-3'>
                            <label className='font-sm font-montserrat font-bold tracking-widest' htmlFor="email">Email</label>
                            <input onChange={handleClick} value={data.email} className='font-montserrat tracking-widest px-4 rounded-xl border-4 border-solid border-gray-800 p-2' id="email" type="email" required />
                        </div>
                        <div className='flex flex-col text-center gap-3'>
                            <label className='font-sm font-montserrat font-bold tracking-widest' htmlFor="password">Password</label>
                            <input onChange={handleClick} value={data.password} className='font-montserrat tracking-widest px-4 rounded-xl border-4 border-solid border-gray-800 p-2' id="password" type="password" autoComplete='true' required />
                        </div>
                    </div>
                    {error && <p className='text-center mb-2 text-red-500 font-bold'>{error}</p>}
                    <button type="submit" className='font-montserrat rounded-2xl font-bold hover:bg-black hover:text-white border-4 border-solid border-black p-2 w-4/12 mx-auto'>SIGN UP</button>
                </form>
                <div className='flex flex-row justify-center items-center gap-2 my-4'>
                    <p className='font-montserrat text-sm tracking-widest'>Got an account ?  </p>
                    <Link to="/login">
                        <p className='text-md font-bold tracking-widest hover:underline'>Login</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

export default Register
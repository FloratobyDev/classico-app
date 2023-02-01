import axios from 'axios'
import React, { useEffect, useState } from 'react'


const UserInfo = ({ name, info }) => {

    const [data, setData] = useState({
        infoName: name,
        newInfo: ""
    })

    const [confirmLoading, setConfirmLoading] = useState(false)

    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState("")

    const newInfo = `New ${name}`

    const handleChange = event => {
        console.log(event.target.id);
        if (error.length > 0) {
            setError("Error")
        }
        setData({
            ...data,
            newInfo: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        setConfirmLoading(true)
        axios.patch('/patchUserInfo', data)
            .then(response => {
                setConfirmLoading(false)
            })
            .catch(err => {
                setError(err.response.data)
            })
            .finally(() => {
                setData({
                    ...data,
                    newInfo: ""
                })
            })

    }

    return <div className='flex flex-col justify-between gap-y-2'>
        <div className='flex flex-row justify-between'>
            <p className='font-bold font-raleway texl-lg capitalize'>{name} : <span className='font-normal lowercase tracking-widest'>{info}</span></p>
            <p className='hover:underline cursor-pointer select-none' onClick={() => { setShowForm(!showForm) }}>Edit {name}</p>
        </div>

        <form style={{ display: showForm ? 'flex' : 'none' }} className='flex flex-row justify-between mb-4' onSubmit={handleSubmit}>

            <input className='border border-black px-2 rounded-lg' type="text" onChange={handleChange} value={data.newInfo} name={name} placeholder={newInfo} />
            <button className='font-bold border border-black px-2 rounded-lg' type="submit">{confirmLoading ? 'Confirming' : error.length > 0 ? { error } : 'Submit'}</button>
        </form>
    </div>
}

const ProfileSettings = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/fetchUserInfo')
            .then(response => {
                setUserInfo(response.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.response.data)
            })
    }, [])

    if (loading) return;
    if (error) return <p>Could not fetch user data</p>

    return (
        <div className='md:w-6/12 lg:w-6-12 w-11/12 mx-auto flex flex-col gap-y-4'>
            <h1 className='font-bold font-raleway text-2xl tracking-wider text-center md:text-left lg:text-left'>User Information</h1>
            <hr className=' border-black border-2' />
            <div className='flex flex-col mx-4 gap-y-2'>
                <UserInfo name="username" info={userInfo.username} />
                <UserInfo name="email" info={userInfo.email} />
                <UserInfo name="password" info={"******"} />
            </div>
        </div>
    )
}


export default ProfileSettings
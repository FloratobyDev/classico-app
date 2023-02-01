
import React, { useState, useContext } from 'react'
import Home from './Home'
import Navbar from './navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import MovieList from './movie/MovieList'
import Shows from './Shows'
import Favorites from './Favorites'
import ProfileSettings from './ProfileSettings'
import Login from './Login'
import Register from './Register'
import VideoPlayer from '../components/videoplayer/mainplayer/VideoPlayer'
import Logout from './Logout'


const MainPage = () => {

  return (
    <div className='mx-auto lg:w-11/12 h-full'>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/movies' element={<MovieList />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/video' element={<VideoPlayer />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/profile-settings' element={<ProfileSettings />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </main>

    </div>
  )
}

export default MainPage

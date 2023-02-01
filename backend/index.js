import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

//CONTROLLERS
import validateUser from './controller/validateUser.js'
import logoutUser from './controller/logoutUser.js'
import fetchVideo from './controller/video/fetchVideo.js'
import defaultAuthentication from './controller/defaultAuthentication.js'
import { databaseConnect } from './controller/connect.js'
import fetchHomeData from './controller/home/fetchHomeData.js'
import createUser from './controller/createUser.js'
import validateWithToken from './controller/validateWithToken.js'
import addFavorite from './controller/favorite/addFavorite.js'
import removeFavorite from './controller/favorite/removeFavorite.js'
import fetchUserFavorite from './controller/movies/fetchUserFavorite.js'
import fetchFavoriteMedias from './controller/movies/fetchFavoriteMedias.js'
import fetchResult from './controller/search/fetchResult.js'
import fetchShows from './controller/fetchShows.js'
import fetchGenre from './controller/home/fetchGenre.js'
import fetchGenreTypes from './controller/home/fetchGenreTypes.js'
import fetchUserInfo from './controller/profile-settings/fetchUserInfo.js'
import patchUserInfo from './controller/profile-settings/patchUserInfo.js'
import defaultFetch from './controller/movies/defaultFetch.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
mongoose.set('strictQuery', true)

databaseConnect()

app.get("/", defaultFetch)
app.patch('/patchUserInfo', patchUserInfo)
app.get('/fetchUserInfo', fetchUserInfo)
app.get('/shows', fetchShows)
app.get('/fetchGenre', fetchGenre)
app.get('/fetchGenreTypes', fetchGenreTypes)
app.post('/register', createUser)
app.post('/login', validateUser)
app.post('/logout', logoutUser)
app.get("/video", fetchVideo)
app.post('/authenticate', defaultAuthentication)
app.post('/tokenValidate', validateWithToken)
app.get('/home', fetchHomeData)
app.post('/addFavorite', addFavorite)
app.post('/removeFavorite', removeFavorite)
app.get('/fetchUserFavorite', fetchUserFavorite)
app.get('/favoriteMediaInfo', fetchFavoriteMedias)
app.get('/search', fetchResult)

app.listen(process.env.PORT, () => {
    console.log('Listening to port ' + process.env.PORT);
})

import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import { mongooseConnect, verifyToken } from '../utilityHelper.js'

const fetchFavoriteMedias = async (req, res) => {

    verifyToken(req, async (err, userInfo) => {

        const user = await User.findOne({
            _id: userInfo?.userId
        })

        if (user) {
            const { favorites } = user

            mongooseConnect('movies').find({ '_id': { $in: favorites } }).toArray()
                .then(response => {
                    res.status(200).json({
                        medias: response,
                        favorites: favorites
                    })
                })
                .catch(err => {
                    res.status.json('Couldnt find media')
                })
        }
        else {
            return res.status(400).json("User not found")
        }
    })

}

export default fetchFavoriteMedias
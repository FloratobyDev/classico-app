import User from "../../models/User.js"
import { verifyToken } from "../utilityHelper.js"

const addFavorite = async (req, res) => {
    verifyToken(req, async (err, userInfo) => {
        User.findById(userInfo.userId, (err, user) => {
            user.favorites.push(req.body.movieId)
            User.findByIdAndUpdate(userInfo.userId, user, (err) => {

                if (err) return res.status(400).json('Unable to add media')
                console.log('Successfully added')
                return res.status(200).json('Success!')
            })
        })
    })
}

export default addFavorite
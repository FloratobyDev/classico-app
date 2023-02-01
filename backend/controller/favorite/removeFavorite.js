import User from "../../models/User.js"
import { verifyToken } from "../utilityHelper.js"

const removeFavorite = async (req, res) => {
    verifyToken(req, async (err, userInfo) => {
        User.findById(userInfo.userId, (err, user) => {
            user.favorites.splice(user.favorites.indexOf(req.body.movieId), 1)
            User.findByIdAndUpdate(userInfo.userId, user, (err) => {
                if (err) return res.status(400).json('Unable to add media')
                return res.status(200).json('Success!')
            })
        })
    })
}

export default removeFavorite
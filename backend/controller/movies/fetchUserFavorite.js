import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import { verifyToken } from '../utilityHelper.js'

const fetchUserFavorite = async (req, res) => {

    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not logged in!")

    verifyToken(req, async (err, userInfo) => {

        const user = await User.findOne({
            _id: userInfo?.userId
        })

        if (user) {

            const { favorites } = user

            const token = jwt.sign({
                userId: user._id
            }, process.env.SECRET_KEY)

            res.cookie('accessToken', token, {
                httpOnly: true,
                sameSite: true
            }).status(200).json({
                favorites
            })
        }
        else {
            return res.status(400).json("User not found")
        }
    })

}

export default fetchUserFavorite
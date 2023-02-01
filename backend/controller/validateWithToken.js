import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { verifyToken } from './utilityHelper.js'

const validateWithToken = async (req, res) => {


    verifyToken(req, async (err, userInfo) => {

        if (err) return res.status(400).json('Token not found!')

        const user = await User.findOne({
            _id: userInfo?.userId
        })

        if (user) {

            const { username, email } = user

            const token = jwt.sign({
                userId: user._id
            }, process.env.SECRET_KEY)

            res.cookie('accessToken', token, {
                httpOnly: true,
                sameSite: true
            }).status(200).json({
                username, email
            })
        }
        else {
            return res.status(400).json("User not found")
        }
    })

}

export default validateWithToken
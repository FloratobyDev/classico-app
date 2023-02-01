import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const validateUser = async (req, res) => {

    const user = await User.findOne({
        username: req.body.username,
    })

    if (user) {

        const validUser = bcrypt.compareSync(req.body.password, user.password)

        if (validUser) {
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
            return res.status(400).json("Wrong password or username!")
        }
    }
    else {
        return res.status(400).json("User not found")
    }
}

export default validateUser
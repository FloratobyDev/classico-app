import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {

    const validEmail = await User.exists({ 'email': req.body.email })
    const validUsername = await User.exists({ 'username': req.body.username })

    if (validUsername) {
        res.status(400).json("Username already exists!")
        return;
    }
    if (validEmail) {
        res.status(400).json("Emails already exists!")
        return;
    }

    const salt = bcrypt.genSaltSync(10)
    const encyptedPassword = bcrypt.hashSync(req.body.password, salt)

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: encyptedPassword
    }, (err, user) => {

        if (err) return res.status(400).send(err);

        const { username, email } = user

        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY)

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: true
        }).status(200).send({ username, email })

    })
}

export default createUser
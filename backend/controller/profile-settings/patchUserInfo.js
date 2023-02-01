import { verifyToken } from "../utilityHelper.js"
import User from "../../models/User.js"
import bcrypt from 'bcrypt'
const patchUserInfo = async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json('Not logged in')

        User.findById(userInfo.userId, (err, user) => {
            const { infoName, newInfo } = req.body

            if (infoName === 'password') {
                const salt = bcrypt.genSaltSync(10)
                const encyptedPassword = bcrypt.hashSync(newInfo, salt)
                user[infoName] = encyptedPassword
            }
            else {
                user[infoName] = newInfo
            }

            User.findByIdAndUpdate(userInfo.userId, user, (err) => {
                if (err) return res.status(400).json('Unable to add media')
                return res.status(200).json('Success!')
            })
        })

    })
}

export default patchUserInfo
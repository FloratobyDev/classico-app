import { verifyToken } from "../utilityHelper.js"
import User from "../../models/User.js"

const fetchUserInfo = async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json('Not logged in')

        User.findOne({ '_id': userInfo.userId }, (err, user) => {
            if (err) return res.status(404).json('User not found.')

            const { username, email } = user

            return res.status(200).json({ username, email })
        })

    })
}

export default fetchUserInfo
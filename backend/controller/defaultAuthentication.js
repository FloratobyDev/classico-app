import { verifyToken } from "./utilityHelper.js"

const defaultAuthentication = async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json('Not logged in')
        return res.status(200).json(userInfo)
    })
}

export default defaultAuthentication 
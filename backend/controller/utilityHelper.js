import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const mongooseConnect = coll => {
    return mongoose.connection.useDb('sample_mflix').collection(coll)
}

const verifyToken = (req, callback) => {
    const token = req.cookies.accessToken

    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
        callback(err, userInfo)
    })
}



export { mongooseConnect, verifyToken }
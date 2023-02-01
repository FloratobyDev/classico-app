import { mongooseConnect, verifyToken } from "../utilityHelper.js"
import mongoose from "mongoose"
import { ObjectID } from 'bson'

const fetchVideo = async (req, res) => {


    verifyToken(req, (err, userInfo) => {

        if (err) return res.status(401).json("Not logged in")

        const objectId = new ObjectID(req.query.movieId)

        mongooseConnect('movies').find({ '_id': objectId })
            .toArray()
            .then(movie => {
                mongoose.connection
                    .useDb('sample_mflix')
                    .collection('comments')
                    .find({ 'movie_id': objectId })
                    .toArray()
                    .then(data => {
                        res.status(200).send({
                            data: movie.at(0),
                            comments: data
                        })
                    })
            })
    })
}

export default fetchVideo
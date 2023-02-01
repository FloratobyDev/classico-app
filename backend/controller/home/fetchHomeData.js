import { mongooseConnect, verifyToken } from "../utilityHelper.js"

const fetchHomeData = async (req, res) => {

    verifyToken(req, async (err, userInfo) => {
        if (err) return res.status(401).json('Not logged in')
        const randomMovie = await mongooseConnect('movies')
            .aggregate([{ $sample: { size: 1 } }])
            .toArray()
            .then(data => {
                return data[0]
            })
            .catch(err => {

            })

        const movies = await mongooseConnect('movies')
            .find({})
            .limit(5)
            .toArray()
            .catch(err => {

            })

        res.send({ randomMovie, movies })
    })
}



export default fetchHomeData
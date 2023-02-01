import { mongooseConnect } from "../utilityHelper.js"

const fetchGenre = async (req, res) => {


    mongooseConnect('movies')
        .find({ $and: [{ 'genres': { $in: [req.query.genre] } }, { 'poster': { $exists: true } }] })
        .limit(parseInt(req.query.limit))
        .toArray()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json('No results found')
        })
}

export default fetchGenre
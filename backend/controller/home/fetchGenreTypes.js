import { mongooseConnect, verifyToken } from "../utilityHelper.js"

const fetchGenreTypes = async (req, res) => {

    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not logged in!")

    verifyToken(req, async (err, userInfo) => {
        if (err) return res.status(401).json('No login token available')
        mongooseConnect('movies')
            .distinct('genres')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json('No results found')
            })
    })

}

export default fetchGenreTypes
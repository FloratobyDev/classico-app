import { mongooseConnect } from "../utilityHelper.js"


const fetchResult = async (req, res) => {

    const searchTerm = req.query.q.replace(/[^a-zA-Z0-9\s']/g, "");
    const query = new RegExp(searchTerm, "i")


    mongooseConnect('movies')
        .find({ 'title': { $regex: query } })
        .limit(100)
        .toArray()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('No results found')
        })

}

export default fetchResult
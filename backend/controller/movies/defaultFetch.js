import { mongooseConnect} from '../utilityHelper.js'
import SortTypes from '../../../src/pages/movie/SortTypes.js'

const defaultFetch = async (req, res) => {

    let count = 0;

    if (req.query.maxLimit) {
        count = await mongooseConnect('movies').countDocuments()
    }

    let value = {}

    switch (req.query.sortValue) {
        case SortTypes.earliest_released:
            value = { year: 1 }
            break;
        case SortTypes.latest_released:
            value = { year: -1 }
            break;
        case SortTypes.low_rate:
            value = { 'imdb.rating': 1 }
            break;
        case SortTypes.high_rate:
            value = { 'imdb.rating': -1 }
            break;
        default:
            console.log('No such sorting option');
    }


    const limit = parseInt(req.query.limit)
    const skip = (parseInt(req.query.skip) - 1) * limit

    mongooseConnect('movies')
        .find({ 'type': 'movie' })
        .sort(value)
        .skip(skip)
        .limit(limit)
        .toArray()
        .then(data => {
            res.status(200).send({
                data, count
            })
        })
        .catch(err => {
            res.sendStatus(400)
        })

}

export default defaultFetch
import { ObjectID } from 'bson'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: ObjectID
    }]
}, {
    collection: 'classico_user'
})

export default mongoose.model('User', UserSchema)
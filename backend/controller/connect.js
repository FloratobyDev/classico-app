import mongoose from "mongoose"

const databaseConnect = () => {

    const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@foods.2nkyahd.mongodb.net/sample_mflix`

    mongoose.connect(uri)
        .then(() => {
            mongoose.connection.useDb('sample_mflix')
        })
        .catch((err) => {
            console.log(uri)
        })

    mongoose.connection.on('connected', (err) => {
        console.log('results connected');
    })
}

export { databaseConnect }

